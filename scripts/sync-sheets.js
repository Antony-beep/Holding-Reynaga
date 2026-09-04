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
  const pending = db
    .prepare("SELECT * FROM leads WHERE sheets_synced = 0 ORDER BY id ASC LIMIT 100")
    .all();

  if (pending.length === 0) {
    console.log("sync-sheets: todos los leads ya están sincronizados.");
    return;
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  let ok = 0;
  let failed = 0;

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

  console.log(`sync-sheets: ${ok} sincronizados, ${failed} con error.`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("sync-sheets: error fatal:", err);
  process.exit(1);
});
