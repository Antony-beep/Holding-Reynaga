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
