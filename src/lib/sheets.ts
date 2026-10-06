import { google } from "googleapis";
import type { ConsentEvidenceRow, LeadRow } from "./db";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const CONSENT_SHEET_HEADERS = [
  "consent_recorded_at", "policy_version", "required_consent_text",
  "required_consent_accepted", "marketing_consent_text",
  "marketing_consent_accepted", "consent_purpose",
] as const;

function consentToSheetRow(consent: ConsentEvidenceRow): (string | number)[] {
  return CONSENT_SHEET_HEADERS.map((key) => consent[key] ?? "");
}

async function ensureConsentHeaders(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  firstColumn: "J" | "P",
  sheetPrefix = "",
): Promise<void> {
  const start = firstColumn.charCodeAt(0);
  const range = `${sheetPrefix}${firstColumn}1:${String.fromCharCode(start + 6)}1`;
  const current = await sheets.spreadsheets.values.get({
    spreadsheetId, range, valueRenderOption: "FORMULA",
  });
  const headers = current.data.values?.[0] ?? [];
  // Solo completa celdas vacías; no reescribe encabezados personales ni fórmulas.
  const missing = CONSENT_SHEET_HEADERS.flatMap((header, index) =>
    headers[index] == null || headers[index] === ""
      ? [{ range: `${sheetPrefix}${String.fromCharCode(start + index)}1`, values: [[header]] }]
      : [],
  );
  if (missing.length === 0) return;
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "USER_ENTERED",
      data: missing.length === CONSENT_SHEET_HEADERS.length
        ? [{ range, values: [[...CONSENT_SHEET_HEADERS]] }]
        : missing,
    },
  });
}

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
    lead.document ?? "",
    lead.phone,
    lead.email,
    lead.interest,
    lead.message,
    ...consentToSheetRow(lead),
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

  await ensureConsentHeaders(sheets, spreadsheetId, "J");
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

// ---- Derecho de cancelación (Ley 29733): búsqueda y borrado de filas ----

export interface SheetLeadMatch {
  /** Número de fila en la hoja (1-indexed, encabezado = fila 1). */
  row: number;
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
}

function requireSheetId(): string {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Falta GOOGLE_SHEET_ID en las variables de entorno.");
  }
  return spreadsheetId;
}

/** Busca todas las filas de leads cuyo email coincida (insensible a mayúsculas). */
export async function findLeadRowsInSheet(email: string): Promise<SheetLeadMatch[]> {
  const spreadsheetId = requireSheetId();
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    // A=id, B=fecha, C=origen, D=nombre, E=documento, F=teléfono, G=email
    range: "A2:G",
  });
  const wanted = email.trim().toLowerCase();
  const matches: SheetLeadMatch[] = [];
  (res.data.values ?? []).forEach((r, i) => {
    if (String(r[6] ?? "").trim().toLowerCase() !== wanted) return;
    matches.push({
      row: i + 2,
      id: String(r[0] ?? ""),
      createdAt: String(r[1] ?? ""),
      name: String(r[3] ?? ""),
      phone: String(r[5] ?? ""),
      email: String(r[6] ?? ""),
    });
  });
  return matches;
}

/**
 * Elimina filas de leads de la hoja. Antes de borrar re-verifica que cada fila
 * solicitada siga perteneciendo al email indicado (la hoja pudo moverse entre
 * la búsqueda y la confirmación). Devuelve cuántas filas se borraron de verdad.
 */
export async function deleteLeadRowsFromSheet(
  email: string,
  rows: number[],
): Promise<number> {
  const matches = await findLeadRowsInSheet(email);
  const matchRows = new Set(matches.map((m) => m.row));
  const valid = [...new Set(rows)]
    .map(Number)
    .filter((r) => Number.isInteger(r) && r >= 2 && matchRows.has(r))
    .sort((a, b) => b - a); // de mayor a menor para no desplazar índices
  if (valid.length === 0) return 0;

  const spreadsheetId = requireSheetId();
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetId = (meta.data.sheets ?? [])[0]?.properties?.sheetId;
  if (sheetId == null) {
    throw new Error("No se pudo identificar la hoja de leads en el spreadsheet.");
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: valid.map((row) => ({
        deleteDimension: {
          range: { sheetId, dimension: "ROWS", startIndex: row - 1, endIndex: row },
        },
      })),
    },
  });
  return valid.length;
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
  if (exists) {
    await ensureConsentHeaders(sheets, spreadsheetId, "P", "Reclamos!");
    return;
  }

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
        ...CONSENT_SHEET_HEADERS,
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
  bien_tipo: string;
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
} & ConsentEvidenceRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Falta GOOGLE_SHEET_ID en las variables de entorno.");
  }
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await ensureReclamosSheet();

  const bien =
    (reclamo.bien_tipo === "producto" ? "PRODUCTO — " : reclamo.bien_tipo === "servicio" ? "SERVICIO — " : "") +
    reclamo.bien_contratado + (reclamo.bien_detalle ? ` — ${reclamo.bien_detalle}` : "");
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
        ...consentToSheetRow(reclamo),
      ]],
    },
  });
}
