import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { ReclamoRow } from "./db";
import { labelBien } from "./schemas/reclamo";

/**
 * Generación de PDFs del Libro de Reclamaciones:
 *  - Hoja de reclamación según el formato del Anexo I del D.S. 011-2011-PCM
 *  - Aviso del Anexo II para imprimir en la sala de ventas
 */

const NAVY = rgb(0.039, 0.098, 0.192); // #0a1931
const GOLD = rgb(0.71, 0.686, 0.059); // aproximado #b5af0fâ†’ uso dorado sobrio
const BLACK = rgb(0.1, 0.1, 0.12);
const GRAY = rgb(0.45, 0.45, 0.5);

/**
 * Sanitiza texto para las fuentes estándar de PDF (WinAnsi/Latin-1):
 * reemplaza tipografías Unicode y elimina emojis/surrogates que harían
 * fallar la codificación.
 */
function sanitize(text: string): string {
  if (!text) return "";
  return text
    .replace(/[\u2018\u2019\u201B]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00a0/g, " ")
    .replace(/[^\x00-\xFF\n]/g, "") // fuera de Latin-1 (emojis, etc.)
    .replace(/\r/g, "");
}

/** Corta el texto en líneas que quepan en el ancho disponible. */
function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const lines: string[] = [];
  for (const rawLine of sanitize(text).split("\n")) {
    if (!rawLine.trim()) {
      lines.push("");
      continue;
    }
    const words = rawLine.split(/\s+/);
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

class DocWriter {
  doc: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  y: number;
  readonly margin = 48;
  readonly width = 595.28; // A4
  readonly height = 841.89;

  constructor(doc: PDFDocument, font: PDFFont, bold: PDFFont) {
    this.doc = doc;
    this.font = font;
    this.bold = bold;
    this.page = doc.addPage([this.width, this.height]);
    this.y = this.height - this.margin;
  }

  ensureSpace(needed: number) {
    if (this.y - needed < this.margin + 40) {
      this.page = this.doc.addPage([this.width, this.height]);
      this.y = this.height - this.margin;
    }
  }

  text(
    content: string,
    opts: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb>; x?: number; maxWidthFactor?: number; gap?: number } = {},
  ) {
    const size = opts.size ?? 10;
    const font = opts.bold ? this.bold : this.font;
    const maxWidth = this.width - this.margin * 2 - (opts.x ?? 0);
    for (const line of wrapText(content, font, size, maxWidth)) {
      this.ensureSpace(size + 4);
      this.page.drawText(line, {
        x: this.margin + (opts.x ?? 0),
        y: this.y,
        size,
        font,
        color: opts.color ?? BLACK,
      });
      this.y -= size + 3;
    }
    this.y -= opts.gap ?? 0;
  }

  sectionTitle(title: string) {
    this.ensureSpace(34);
    this.page.drawRectangle({
      x: this.margin,
      y: this.y - 6,
      width: this.width - this.margin * 2,
      height: 18,
      color: NAVY,
    });
    this.page.drawText(sanitize(title), {
      x: this.margin + 8,
      y: this.y - 1,
      size: 10,
      font: this.bold,
      color: rgb(1, 1, 1),
    });
    this.y -= 30;
  }

  line(color = GRAY) {
    this.page.drawLine({
      start: { x: this.margin, y: this.y },
      end: { x: this.width - this.margin, y: this.y },
      thickness: 0.6,
      color,
    });
    this.y -= 12;
  }

  /** Bloque con etiqueta en negrita y contenido envuelto. */
  field(label: string, content: string) {
    if (!content || !content.trim()) return;
    this.ensureSpace(30);
    this.page.drawText(sanitize(label), {
      x: this.margin,
      y: this.y,
      size: 9,
      font: this.bold,
      color: NAVY,
    });
    this.y -= 13;
    this.text(content, { size: 10, x: 12 });
    this.y -= 4;
  }
}

export async function generateReclamoPdf(reclamo: ReclamoRow): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Hoja de Reclamacion ${reclamo.codigo}`);
  doc.setAuthor("Holding Inversiones Reynaga S.A.C.");
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const w = new DocWriter(doc, font, bold);

  // Encabezado
  w.page.drawRectangle({
    x: 0,
    y: w.height - 110,
    width: w.width,
    height: 110,
    color: NAVY,
  });
  w.page.drawText("HOLDING INVERSIONES REYNAGA S.A.C.", {
    x: 48, y: w.height - 48, size: 15, font: bold, color: rgb(1, 1, 1),
  });
  w.page.drawText("Libro de Reclamaciones Virtual - Ley N° 29571 / D.S. N° 011-2011-PCM", {
    x: 48, y: w.height - 66, size: 8.5, font, color: rgb(0.83, 0.686, 0.216),
  });
  w.page.drawText(`HOJA DE RECLAMACION  ${reclamo.codigo}`, {
    x: 48, y: w.height - 92, size: 13, font: bold, color: rgb(0.83, 0.686, 0.216),
  });
  w.y = w.height - 130;

  w.field("Fecha de registro:", `${reclamo.created_at} (hora del servidor, UTC)`);
  w.field("Tipo:", reclamo.tipo === "reclamo" ? "RECLAMO (disconformidad relacionada al producto o servicio)" : "QUEJA (disconformidad no relacionada al producto o servicio, e.j. atencion)");
  w.line();

  // A. Datos del proveedor
  w.sectionTitle("A. DATOS GENERALES DEL PROVEEDOR");
  w.field("Razón Social:", "HOLDING INVERSIONES REYNAGA S.A.C.");
  w.field("RUC:", "20614870959");
  w.field("Domicilio:", "Jr. Lino Nro. 132, Oficina 401, Huancayo Cercado, Huancayo, Junin - Peru");
  w.field("Sala de Ventas:", "Av. San Agustin 154, San Carlos, Huancayo");
  w.field("Libro:", "Reclamos (formato virtual) - Código correlativo propio, no requiere legalizacion ni registro ante INDECOPI.");

  // B. Datos del consumidor
  w.sectionTitle("B. DATOS GENERALES DEL CONSUMIDOR");
  w.field("Nombre:", reclamo.nombre);
  w.field("Documento (DNI/CE/Pasaporte):", reclamo.documento);
  w.field("Domicilio:", reclamo.domicilio);
  w.field("Teléfono:", reclamo.telefono);
  w.field("Correo electrónico:", reclamo.email);
  if (reclamo.representante) w.field("Padre/Madre/Representante (menor de edad):", reclamo.representante);

  // C. Bien contratado y monto
  w.sectionTitle("C. descripción del bien O SERVICIO Y MONTO RECLAMADO");
  const bien = labelBien(reclamo.bien_contratado) + (reclamo.bien_detalle ? ` - ${reclamo.bien_detalle}` : "");
  w.field("Bien o servicio contratado:", bien);
  w.field("Monto reclamado:", reclamo.monto || "N/A");

  // D. Detalle
  w.sectionTitle("D. DETALLE DEL RECLAMO O QUEJA");
  w.text(reclamo.detalle, { size: 10 });
  w.y -= 6;

  // E. Pedido
  w.sectionTitle("E. PEDIDO CONCRETO DEL CONSUMIDOR");
  w.text(reclamo.pedido, { size: 10 });
  w.y -= 6;

  // F. Acciones y observaciones del proveedor (en blanco en la copia del consumidor)
  w.sectionTitle("F. ACCIONES Y/U OBSERVACIONES DEL PROVEEDOR");
  if (reclamo.estado === "atendido" && reclamo.respuesta) {
    w.text(`Respuesta registrada por ${reclamo.respondido_por || "el proveedor"}:`, { size: 9.5, bold: true });
    w.text(reclamo.respuesta, { size: 10 });
    if (reclamo.respuesta_enviada_en) {
      w.field("Respuesta enviada al consumidor el:", reclamo.respuesta_enviada_en);
    }
  } else {
    for (let i = 0; i < 4; i++) w.line();
  }
  if (reclamo.estado === "anulado" && reclamo.anulado_motivo) {
    w.field("Anulado con motivo:", reclamo.anulado_motivo);
  }

  // Pie legal
  w.y -= 8;
  w.ensureSpace(70);
  w.line();
  w.text(
    "La atención de este reclamo se realizará en un plazo máximo de quince (15) días hábiles, improrrogables, conforme al artículo 146 del Código de Protección y Defensa del Consumidor.",
    { size: 8, color: GRAY },
  );
  w.text(
    "Copia de esta hoja fue remitida al correo electrónico declarado por el consumidor. El consumidor puede solicitar copia y/o registrar su reclamo ante INDECOPI en cualquier momento.",
    { size: 8, color: GRAY },
  );
  w.text(
    `Documento generado electrónicamente por el Libro de Reclamaciones Virtual - ${reclamo.codigo}`,
    { size: 8, bold: true, color: NAVY },
  );

  return doc.save();
}

/** Aviso del Anexo II (D.S. 011-2011-PCM) para imprimir en la sala de ventas. */
export async function generateAvisoPdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle("Aviso Libro de Reclamaciones - Anexo II");
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([595.28, 841.89]);

  // Marco
  page.drawRectangle({
    x: 40, y: 40, width: 515.28, height: 761.89,
    borderColor: NAVY, borderWidth: 3,
  });
  page.drawRectangle({
    x: 40, y: 701.89, width: 515.28, height: 100,
    color: NAVY,
  });
  page.drawText("AVISO", {
    x: 297.64 - bold.widthOfTextAtSize("AVISO", 42) / 2,
    y: 735, size: 42, font: bold, color: rgb(1, 1, 1),
  });
  page.drawText("LIBRO DE RECLAMACIONES", {
    x: 297.64 - bold.widthOfTextAtSize("LIBRO DE RECLAMACIONES", 16) / 2,
    y: 715, size: 16, font: bold, color: rgb(0.83, 0.686, 0.216),
  });

  const body =
    "Este establecimiento cuenta con un Libro de Reclamaciones, el mismo que puede ser solicitado por usted, de acuerdo a lo establecido en el Código de Protección y Defensa del Consumidor, aprobado por el Decreto Legislativo N° 29571.";
  const lines = wrapText(body, font, 13, 435);
  let y = 650;
  for (const line of lines) {
    page.drawText(line, { x: 80, y, size: 13, font, color: BLACK });
    y -= 20;
  }

  y -= 20;
  const rows: [string, string][] = [
    ["Nombre / Razón Social:", "HOLDING INVERSIONES REYNAGA S.A.C."],
    ["RUC:", "20614870959"],
    ["Dirección:", "Jr. Lino Nro. 132, Oficina 401, Huancayo Cercado, Huancayo, Junín - Perú"],
    ["Sala de Ventas:", "Av. San Agustín 154, San Carlos, Huancayo"],
    ["Libro de Reclamaciones Virtual:", "https://inmobiliariaholdingreynaga.com/libro-de-reclamaciones"],
  ];
  for (const [label, value] of rows) {
    page.drawText(sanitize(label), { x: 80, y, size: 11, font: bold, color: NAVY });
    y -= 16;
    for (const line of wrapText(value, font, 11, 435)) {
      page.drawText(line, { x: 90, y, size: 11, font, color: BLACK });
      y -= 15;
    }
    y -= 10;
  }

  page.drawText(
    "Formato del Anexo II del Decreto Supremo N° 011-2011-PCM - imprimir y exhibir en lugar visible del establecimiento.",
    { x: 80, y: 60, size: 8, font, color: GRAY },
  );

  return doc.save();
}
