import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthorized } from "@/lib/auth";
import { checkBodySize, MAX_BODY_BYTES } from "@/lib/body-guard";
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
import { getDb } from "@/lib/db";
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
      "consent_recorded_at", "policy_version", "required_consent_text", "required_consent_accepted",
      "marketing_consent_text", "marketing_consent_accepted", "consent_purpose",
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
        r.consent_recorded_at ?? "", r.policy_version ?? "", r.required_consent_text ?? "",
        r.required_consent_accepted ?? "", r.marketing_consent_text ?? "",
        r.marketing_consent_accepted ?? "", r.consent_purpose ?? "",
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
      bien_label:
      (r.bien_tipo === "producto" ? "PRODUCTO — " : r.bien_tipo === "servicio" ? "SERVICIO — " : "") +
      labelBien(r.bien_contratado) + (r.bien_detalle ? ` — ${r.bien_detalle}` : ""),
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
  const sizeError = checkBodySize(request, MAX_BODY_BYTES.admin);
  if (sizeError) return sizeError;

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
        return NextResponse.json({ ok: true, message: "Respuesta registrada. Ya puede enviarla con el botón 'Enviar respuesta'." });
      }

      case "enviar_respuesta": {
        const id = Number(body.id);
        const reclamo = getReclamoById(id);
        if (!reclamo) throw new Error("Reclamo no encontrado.");
        if (!reclamo.respuesta || reclamo.respuesta.trim().length < 10) {
          throw new Error("Primero registre la respuesta (mínimo 10 caracteres).");
        }

        // Generar PDF de la hoja con la respuesta incluida
        const { generateReclamoPdf } = await import("@/lib/reclamos-pdf");
        const pdf = await generateReclamoPdf(reclamo);
        const pdfBase64 = Buffer.from(pdf).toString("base64");

        // Enviar vía Resend con PDF adjunto
        const result = await sendMail({
          to: reclamo.email,
          subject: `Respuesta a su reclamo ${reclamo.codigo} — Holding Reynaga`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#0a1931;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
                <h2 style="color:#fff;margin:0;">HOLDING INVERSIONES REYNAGA S.A.C.</h2>
                <p style="color:#D4AF37;margin:6px 0 0;letter-spacing:1px;">RESPUESTA A SU RECLAMO</p>
              </div>
              <div style="border:1px solid #e5e5e5;border-top:none;padding:24px;border-radius:0 0 12px 12px;">
                <p style="font-size:15px;">Estimado/a <strong>${reclamo.nombre}</strong>:</p>
                <p>En respuesta a su reclamo <strong>${reclamo.codigo}</strong>, registrado el ${reclamo.created_at}, le comunicamos lo siguiente:</p>
                <div style="background:#f9f9f9;padding:16px;border-left:4px solid #D4AF37;border-radius:4px;">
                  <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;">${reclamo.respuesta.replace(/</g, "<").replace(/\n/g, "<br>")}</p>
                </div>
                <p style="font-size:12px;color:#888;margin-top:24px;">
                  Adjuntamos la hoja de reclamación actualizada con esta respuesta.
                  Si no está conforme, puede acudir a INDECOPI en cualquier momento.
                </p>
                <p style="font-size:12px;color:#888;">
                  Atentamente,<br>
                  <strong>${reclamo.respondido_por || "Equipo de Atención"}</strong><br>
                  Holding Inversiones Reynaga S.A.C.<br>
                  Tel: +51 981 407 634
                </p>
              </div>
            </div>`,
          attachments: [{ filename: `${reclamo.codigo}-respuesta.pdf`, content: pdfBase64 }],
        });

        if (!result.ok) {
          throw new Error("No se pudo enviar el email: " + (result.error ?? "error desconocido") + ". Verifique la configuración de Resend.");
        }

        // Auto-marcar como enviada con evidencia del messageId de Resend
        const fechaEnvio = new Date().toISOString().slice(0, 19).replace("T", " ");
        updateReclamo(id, { respuesta_enviada_en: fechaEnvio });
        // Guardar messageId como evidencia de entrega
        getDb().prepare("UPDATE reclamos SET message_id = ? WHERE id = ?").run(result.messageId ?? "", id);

        return NextResponse.json({
          ok: true,
          message: `Respuesta enviada a ${reclamo.email}. Marcada como enviada automáticamente.${result.messageId ? " Evidencia: " + result.messageId : ""}`,
        });
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
