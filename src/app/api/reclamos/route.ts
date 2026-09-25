import { after, NextResponse, type NextRequest } from "next/server";
import {
  getReclamoById,
  insertReclamo,
  markReclamoSynced,
  nextReclamoCodigo,
  updateReclamo,
} from "@/lib/db";
import { reclamoSchema, RECLAMO_FIELD_ERRORS_ES } from "@/lib/schemas/reclamo";
import { verifyTurnstile } from "@/lib/turnstile";
import { generateReclamoPdf } from "@/lib/reclamos-pdf";
import { sendMail, getNotifyEmail } from "@/lib/mailer";
import { appendReclamoToSheet } from "@/lib/sheets";
import { deadlineHabil } from "@/lib/holidays";

export const runtime = "nodejs";

// Rate limit generoso para un documento legal: 5 por hora por IP.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60_000;
const MAX_REQUESTS = 5;

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const entry = rateLimit.get(ip);
  if (entry && entry.resetAt > Date.now() && entry.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intente nuevamente en una hora." },
      { status: 429 },
    );
  }
  if (!entry || entry.resetAt <= Date.now()) {
    rateLimit.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS });
  } else {
    entry.count += 1;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const parsed = reclamoSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const field = Array.isArray(firstIssue?.path)
      ? firstIssue.path.join(".")
      : String(firstIssue?.path ?? "");
    const msg =
      RECLAMO_FIELD_ERRORS_ES[field] ??
      "Datos inválidos. Revise el formulario e intente de nuevo.";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot: éxito falso sin guardar nada
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const captchaOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!captchaOk) {
    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo verificar el captcha. Actualice la página e intente de nuevo.",
      },
      { status: 400 },
    );
  }

  const codigo = nextReclamoCodigo();
  const id = insertReclamo({
    codigo,
    tipo: data.tipo,
    bien_contratado: data.bienContratado,
    bien_detalle: data.bienDetalle ?? "",
    monto: data.monto ?? "",
    detalle: data.detalle,
    pedido: data.pedido,
    nombre: data.nombre,
    documento: data.documento,
    domicilio: data.domicilio,
    telefono: data.telefono,
    email: data.email,
    representante: data.representante ?? "",
    ip,
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
  });

  const reclamo = getReclamoById(id);
  if (!reclamo) {
    return NextResponse.json(
      { ok: false, error: "No se pudo registrar la hoja. Intente nuevamente." },
      { status: 500 },
    );
  }

  // PDF de la hoja: se devuelve en la respuesta para descarga inmediata
  const pdfBytes = await generateReclamoPdf(reclamo);
  const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
  const deadline = deadlineHabil(reclamo.created_at, 15);

  // Emails + espejo en Sheets: tras responder. El reclamo YA está a salvo.
  after(async () => {
    // 1) Copia al consumidor con el PDF adjunto
    try {
      const result = await sendMail({
        to: reclamo.email,
        subject: `Hoja de Reclamación ${codigo} — Holding Reynaga`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
            <div style="background:#0a1931; padding: 24px; border-radius: 12px 12px 0 0; text-align:center;">
              <h2 style="color:#fff; margin:0;">HOLDING INVERSIONES REYNAGA S.A.C.</h2>
              <p style="color:#D4AF37; margin:6px 0 0; letter-spacing:1px;">LIBRO DE RECLAMACIONES VIRTUAL</p>
            </div>
            <div style="border:1px solid #e5e5e5; border-top:none; padding:24px; border-radius:0 0 12px 12px;">
              <p style="font-size:15px;">Hola <strong>${reclamo.nombre}</strong>:</p>
              <p>Su <strong>${reclamo.tipo}</strong> fue registrado correctamente.</p>
              <p style="background:#f4f4f4; padding:12px; border-radius:8px; text-align:center; font-size:16px;">
                <strong>Código de hoja:</strong><br>
                <span style="font-size:22px; color:#0a1931;"><strong>${codigo}</strong></span>
              </p>
              <p>Le adjuntamos la <strong>copia de su hoja de reclamación</strong> (formato oficial del D.S. N° 011-2011-PCM).</p>
              <p style="font-size:13px;">La atención de su ${reclamo.tipo} se realizará en un plazo máximo de <strong>15 días hábiles</strong>, improrrogables, conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571).</p>
              <p style="font-size:12px; color:#888;">Fecha límite estimada de respuesta: <strong>${deadline}</strong></p>
            </div>
          </div>`,
        attachments: [{ filename: `${codigo}.pdf`, content: pdfBase64 }],
      });
      updateReclamo(id, { email_cliente_enviado: result.ok ? 1 : 0 });
      if (!result.ok) console.error(`[reclamos] Email cliente ${codigo}: ${result.error}`);
    } catch (err) {
      console.error(`[reclamos] Email cliente ${codigo} falló:`, err);
    }

    // 2) Notificación al equipo de ventas
    try {
      const notifyTo = getNotifyEmail();
      const result = await sendMail({
        to: notifyTo,
        subject: `Nuevo ${reclamo.tipo} ${codigo} — vence el ${deadline}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
            <div style="background:#0a1931; padding:18px 24px; border-radius:12px 12px 0 0;">
              <h3 style="color:#D4AF37; margin:0;">NUEVO ${reclamo.tipo.toUpperCase()} — ${codigo}</h3>
            </div>
            <div style="border:1px solid #e5e5e5; border-top:none; padding:20px 24px; border-radius:0 0 12px 12px; font-size:14px;">
              <p><strong>Registrado:</strong> ${reclamo.created_at} &nbsp;|&nbsp; <strong>Vence:</strong> ${deadline}</p>
              <p><strong>Consumidor:</strong> ${reclamo.nombre} — DNI/Doc: ${reclamo.documento}</p>
              <p><strong>Teléfono:</strong> ${reclamo.telefono} &nbsp;|&nbsp; <strong>Email:</strong> ${reclamo.email}</p>
              <p><strong>Bien/Servicio:</strong> ${reclamo.bien_contratado}${reclamo.bien_detalle ? ` — ${reclamo.bien_detalle}` : ""} &nbsp;|&nbsp; <strong>Monto:</strong> ${reclamo.monto || "N/A"}</p>
              <p style="background:#f9f9f9; padding:10px; border-left:3px solid #D4AF37;"><strong>Detalle:</strong><br>${reclamo.detalle.replace(/\n/g, "<br>")}</p>
              <p><strong>Pedido:</strong> ${reclamo.pedido}</p>
              <p style="font-size:12px; color:#c00;">⚠ Recordar: el plazo legal de respuesta es de 15 días hábiles. Gestionar desde el panel /admin.</p>
            </div>
          </div>`,
      });
      updateReclamo(id, { email_ventas_enviado: result.ok ? 1 : 0 });
      if (!result.ok) console.error(`[reclamos] Email ventas ${codigo}: ${result.error}`);
    } catch (err) {
      console.error(`[reclamos] Email ventas ${codigo} falló:`, err);
    }

    // 3) Espejo en Google Sheets (hoja "Reclamos")
    try {
      await appendReclamoToSheet(reclamo);
      markReclamoSynced(id);
    } catch (err) {
      console.error(`[reclamos] Sync Sheets ${codigo} falló:`, err);
    }
  });

  return NextResponse.json({
    ok: true,
    codigo,
    deadline,
    pdfBase64,
    tipo: reclamo.tipo,
  });
}
