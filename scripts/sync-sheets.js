/**
 * Reintentar el envío a Google Sheets de leads que no se sincronizaron.
 *
 * Uso en el VPS (desde la carpeta del proyecto):
 *   node --env-file=.env.local scripts/sync-sheets.js
 *
 * Sugerencia de cron en el VPS (cada 15 minutos, en los minutos 0/15/30/45):
 *   0,15,30,45 * * * * cd /ruta/al/proyecto && node --env-file=.env.local scripts/sync-sheets.js >> /var/log/sync-sheets.log 2>&1
 */
const path = require("node:path");
const fs = require("node:fs");
const Database = require("better-sqlite3");
const { google } = require("googleapis");

const DB_PATH = path.join(__dirname, "..", "data", "leads.db");

if (!fs.existsSync(DB_PATH)) {
  console.log("sync-sheets: no hay base de datos aún, nada que hacer.");
  process.exit(0);
}

const required = [
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_SHEET_ID",
];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`sync-sheets: falta la variable de entorno ${key}`);
    process.exit(1);
  }
}

async function main() {
  const db = new Database(DB_PATH);
  let ok = 0;
  let failed = 0;

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  // ---- Leads comerciales (hoja principal) ----
  const pending = db
    .prepare("SELECT * FROM leads WHERE sheets_synced = 0 ORDER BY id ASC LIMIT 100")
    .all();

  for (const lead of pending) {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [
            [
              lead.id,
              lead.created_at,
              lead.source,
              lead.name,
              lead.document,
              lead.phone,
              lead.email,
              lead.interest,
              lead.message,
            ],
          ],
        },
      });
      db.prepare(
        "UPDATE leads SET sheets_synced = 1, sheets_synced_at = datetime('now') WHERE id = ?",
      ).run(lead.id);
      ok += 1;
    } catch (err) {
      failed += 1;
      console.error(`sync-sheets: fallo lead #${lead.id}:`, err.message);
    }
  }

  // ---- Libro de Reclamaciones (hoja "Reclamos", espejo legal) ----
  // Asegura que la hoja exista antes de sincronizar.
  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID });
    const exists = (meta.data.sheets ?? []).some((s) => s.properties?.title === "Reclamos");
    if (!exists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: { requests: [{ addSheet: { properties: { title: "Reclamos" } } }] },
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Reclamos!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["Código", "Fecha (UTC)", "Tipo", "Bien/Servicio", "Monto", "Nombre", "Documento", "Domicilio", "Teléfono", "Email", "Detalle", "Pedido", "Estado", "Respuesta", "Respuesta enviada"]],
        },
      });
    }
  } catch (err) {
    console.error("sync-sheets: no se pudo preparar la hoja Reclamos:", err.message);
  }

  const pendingReclamos = db
    .prepare("SELECT * FROM reclamos WHERE sheets_synced = 0 ORDER BY id ASC LIMIT 100")
    .all();

  for (const r of pendingReclamos) {
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Reclamos!A1",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[
            r.codigo, r.created_at, r.tipo,
            r.bien_contratado + (r.bien_detalle ? ` — ${r.bien_detalle}` : ""),
            r.monto, r.nombre, r.documento, r.domicilio, r.telefono, r.email,
            r.detalle, r.pedido, r.estado, r.respuesta, r.respuesta_enviada_en ?? "",
          ]],
        },
      });
      db.prepare(
        "UPDATE reclamos SET sheets_synced = 1, sheets_synced_at = datetime('now') WHERE id = ?",
      ).run(r.id);
      ok += 1;
    } catch (err) {
      failed += 1;
      console.error(`sync-sheets: fallo reclamo ${r.codigo}:`, err.message);
    }
  }

  console.log(`sync-sheets: ${ok} sincronizados, ${failed} con error.`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("sync-sheets: error fatal:", err);
  process.exit(1);
});
