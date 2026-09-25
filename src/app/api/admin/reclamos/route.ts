import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthorized } from "@/lib/auth";
import {
  addHoliday,
  deleteHoliday,
  getHolidayRows,
  getReclamoById,
  getReclamos,
  getReclamosConfig,
  setReclamosConfig,
  updateReclamo,
} from "@/lib/db";
import { businessDaysLeft, deadlineHabil, limaToday } from "@/lib/holidays";
import { sendMail, getNotifyEmail } from "@/lib/mailer";
import { generateAvisoPdf } from "@/lib/reclamos-pdf";
import { labelBien } from "@/lib/schemas/reclamo";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
}

/** GET: lista de reclamos (+deadline/días restantes), config y feriados. */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  const url = new URL(request.url);

  // Aviso Anexo II (PDF para imprimir en sala de ventas)
  if (url.searchParams.get("aviso") === "1") {
    const pdf = await generateAvisoPdf();
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="aviso-libro-reclamaciones-anexo-ii.pdf"',
      },
    });
  }

  // Export CSV para INDECOPI
  if (url.searchParams.get("export") === "csv") {
    const rows = getReclamos();
    const header = [
      "codigo", "fecha_registro_utc", "deadline_habil", "tipo", "bien", "monto",
      "detalle", "pedido", "nombre", "documento", "domicilio", "telefono", "email",
      "representante", "estado", "respuesta", "respuesta_enviada", "anulado_motivo",
    ];
    const esc = (v: string) => `"${(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push([
        r.codigo, r.created_at, deadlineHabil(r.created_at, 15), r.tipo,
        labelBien(r.bien_contratado) + (r.bien_detalle ? ` - ${r.bien_detalle}` : ""),
        r.monto, r.detalle, r.pedido, r.nombre, r.documento, r.domicilio,
        r.telefono, r.email, r.representante, r.estado, r.respuesta,
        r.respuesta_enviada_en ?? "", r.anulado_motivo,
      ].map((v) => esc(String(v))).join(","));
    }
    const csv = "\uFEFF" + lines.join("\r\n"); // BOM para Excel en Windows
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="libro-reclamaciones.csv"',
      },
    });
  }

  const reclamos = getReclamos().map((r) => {
    const deadline = deadlineHabil(r.created_at, 15);
    return {
      ...r,
      bien_label: labelBien(r.bien_contratado) + (r.bien_detalle ? ` — ${r.bien_detalle}` : ""),
      deadline,
      daysLeft: businessDaysLeft(deadline),
      vencido: limaToday() > deadline,
    };
  });

  return NextResponse.json({
    ok: true,
    reclamos,
    holidays: getHolidayRows(),
    notifyEmail: getReclamosConfig("notify_email") ?? getNotifyEmail(),
    today: limaToday(),
  });
}

/** POST: acciones sobre reclamos, feriados y configuración. */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const action = String(body.action ?? "");

  try {
    switch (action) {
      case "guardar_respuesta": {
        const id = Number(body.id);
        const respuesta = String(body.respuesta ?? "").slice(0, 3000);
        const respondidoPor = String(body.respondidoPor ?? "").slice(0, 120);
        const reclamo = getReclamoById(id);
        if (!reclamo) throw new Error("Reclamo no encontrado.");
        if (respuesta.trim().length < 10) throw new Error("La respuesta debe tener al menos 10 caracteres.");
        updateReclamo(id, { respuesta, respondido_por: respondidoPor });
        return NextResponse.json({ ok: true, message: "Respuesta registrada. Recuerde enviarla al consumidor desde su correo y luego marcar 'Respuesta enviada'." });
      }

      case "marcar_enviada": {
        const id = Number(body.id);
        const reclamo = getReclamoById(id);
        if (!reclamo) throw new Error("Reclamo no encontrado.");
        if (!reclamo.respuesta) throw new Error("Primero registre la respuesta.");
        updateReclamo(id, { respuesta_enviada_en: new Date().toISOString().slice(0, 19).replace("T", " ") });
        return NextResponse.json({ ok: true, message: "Marcada como enviada. Ahora puede marcar el reclamo como ATENDIDO." });
      }

      case "marcar_atendido": {
        const id = Number(body.id);
        const reclamo = getReclamoById(id);
        if (!reclamo) throw new Error("Reclamo no encontrado.");
        if (!reclamo.respuesta_enviada_en) throw new Error("Marque primero la respuesta como enviada.");
        updateReclamo(id, { estado: "atendido" });
        return NextResponse.json({ ok: true, message: "Reclamo marcado como atendido." });
      }

      case "anular": {
        const id = Number(body.id);
        const motivo = String(body.motivo ?? "").slice(0, 500);
        if (motivo.trim().length < 10) throw new Error("El motivo de anulación es obligatorio (mínimo 10 caracteres). Queda registrado en el historial legal.");
        updateReclamo(id, { estado: "anulado", anulado_motivo: motivo });
        return NextResponse.json({ ok: true, message: "Reclamo anulado con motivo. El registro se conserva." });
      }

      case "reabrir": {
        const id = Number(body.id);
        updateReclamo(id, { estado: "pendiente", anulado_motivo: "" });
        return NextResponse.json({ ok: true, message: "Reclamo reabierto." });
      }

      case "reenviar_emails": {
        const id = Number(body.id);
        const reclamo = getReclamoById(id);
        if (!reclamo) throw new Error("Reclamo no encontrado.");
        const { generateReclamoPdf } = await import("@/lib/reclamos-pdf");
        const pdf = await generateReclamoPdf(reclamo);
        const pdfBase64 = Buffer.from(pdf).toString("base64");
        const result = await sendMail({
          to: reclamo.email,
          subject: `Hoja de Reclamación ${reclamo.codigo} — Holding Reynaga (reenvío de copia)`,
          html: `<p style="font-family:Arial,sans-serif">Adjuntamos nuevamente la copia de su hoja de reclamación <strong>${reclamo.codigo}</strong>.</p>`,
          attachments: [{ filename: `${reclamo.codigo}.pdf`, content: pdfBase64 }],
        });
        if (!result.ok) throw new Error(result.error ?? "El envío falló.");
        updateReclamo(id, { email_cliente_enviado: 1 });
        return NextResponse.json({ ok: true, message: "Copia reenviada al consumidor." });
      }

      case "guardar_config": {
        const email = String(body.notifyEmail ?? "").trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          throw new Error("Correo inválido.");
        }
        setReclamosConfig("notify_email", email);
        return NextResponse.json({ ok: true, message: `Notificaciones de reclamos se enviarán a ${email}.` });
      }

      case "test_email": {
        const to = getNotifyEmail();
        const result = await sendMail({
          to,
          subject: "Prueba — Libro de Reclamaciones (Holding Reynaga)",
          html: `<p style="font-family:Arial,sans-serif">Correo de prueba del sistema de notificaciones de reclamos. Si lee esto, el destino <strong>${to}</strong> funciona correctamente.</p>`,
        });
        if (!result.ok) throw new Error(result.error ?? "El envío falló.");
        return NextResponse.json({ ok: true, message: `Correo de prueba enviado a ${to}. Revise la bandeja (y spam).` });
      }

      case "add_holiday": {
        const fecha = String(body.fecha ?? "");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) throw new Error("Fecha inválida (YYYY-MM-DD).");
        const added = addHoliday(fecha);
        return NextResponse.json({ ok: true, message: added ? "Feriado agregado." : "El feriado ya existía." });
      }

      case "delete_holiday": {
        const id = Number(body.id);
        deleteHoliday(id);
        return NextResponse.json({ ok: true, message: "Feriado eliminado." });
      }

      default:
        return NextResponse.json({ ok: false, error: "Acción desconocida." }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Error inesperado." },
      { status: 400 },
    );
  }
}
