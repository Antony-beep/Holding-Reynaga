import { google } from "googleapis";
import type { LeadRow } from "./db";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "Faltan GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_PRIVATE_KEY en las variables de entorno.",
    );
  }

  return new google.auth.JWT({
    email,
    // La clave puede venir con \n escapados cuando se pega como variable de entorno.
    key: rawKey.replace(/\\n/g, "\n"),
    scopes: SCOPES,
  });
}

export function leadToSheetRow(lead: LeadRow): (string | number)[] {
  return [
    lead.id,
    lead.created_at,
    lead.source,
    lead.name,
    lead.document,
    lead.phone,
    lead.email,
    lead.interest,
    lead.message,
  ];
}

/**
 * Agrega el lead como fila al final de la hoja de Google.
 * Lanza error si falla: el llamador decide si reintenta.
 */
export async function appendLeadToSheet(lead: LeadRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Falta GOOGLE_SHEET_ID en las variables de entorno.");
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [leadToSheetRow(lead)],
    },
  });
}

// ---- Libro de Reclamaciones: hoja "Reclamos" (espejo) ----

export async function ensureReclamosSheet(): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Falta GOOGLE_SHEET_ID en las variables de entorno.");
  }
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = (meta.data.sheets ?? []).some(
    (s) => s.properties?.title === "Reclamos",
  );
  if (exists) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title: "Reclamos" } } }],
    },
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Reclamos!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        "Código", "Fecha (UTC)", "Tipo", "Bien/Servicio", "Monto",
        "Nombre", "Documento", "Domicilio", "Teléfono", "Email",
        "Detalle", "Pedido", "Estado", "Respuesta", "Respuesta enviada",
      ]],
    },
  });
}

export async function appendReclamoToSheet(reclamo: {
  codigo: string;
  created_at: string;
  tipo: string;
  bien_contratado: string;
  bien_detalle: string;
  monto: string;
  nombre: string;
  documento: string;
  domicilio: string;
  telefono: string;
  email: string;
  detalle: string;
  pedido: string;
  estado: string;
  respuesta: string;
  respuesta_enviada_en: string | null;
}): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Falta GOOGLE_SHEET_ID en las variables de entorno.");
  }
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await ensureReclamosSheet();

  const bien = reclamo.bien_contratado + (reclamo.bien_detalle ? ` — ${reclamo.bien_detalle}` : "");
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Reclamos!A1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        reclamo.codigo,
        reclamo.created_at,
        reclamo.tipo,
        bien,
        reclamo.monto,
        reclamo.nombre,
        reclamo.documento,
        reclamo.domicilio,
        reclamo.telefono,
        reclamo.email,
        reclamo.detalle,
        reclamo.pedido,
        reclamo.estado,
        reclamo.respuesta,
        reclamo.respuesta_enviada_en ?? "",
      ]],
    },
  });
}
