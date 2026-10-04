import { after, type NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas/lead";
import { CONSENT_FIELD_ERRORS_ES } from "@/lib/schemas/consent";
import { createConsentEvidence } from "@/lib/privacy";
import { getLeadById, insertLead, markLeadSynced } from "@/lib/db";
import { appendLeadToSheet } from "@/lib/sheets";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkBodySize, MAX_BODY_BYTES } from "@/lib/body-guard";
import {
  isContentRateLimited,
  CONTENT_RATE_LIMIT_MESSAGE,
} from "@/lib/content-rate-limit";

export const runtime = "nodejs";

// Mensajes de validación en español (por campo) para la API pública.
const FIELD_ERRORS_ES: Record<string, string> = {
  ...CONSENT_FIELD_ERRORS_ES,
  name: "Ingrese su nombre completo (solo letras, 3 a 80 caracteres).",
  document: "El documento debe tener 8 dígitos (DNI) o hasta 12 caracteres (CE).",
  phone: "Ingrese un teléfono válido (mínimo 9 dígitos).",
  email: "Ingrese un correo electrónico válido.",
  interest: "Seleccione una opción válida.",
  message: "El mensaje no puede superar los 300 caracteres.",
  source: "Solicitud inválida. Actualice la página e intente de nuevo.",
  company: "Solicitud inválida.",
  turnstileToken: "No se pudo verificar el captcha. Actualice la página.",
};

// Rate limit simple en memoria: 3 intentos cada 5 minutos por IP.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 5 * 60_000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > MAX_REQUESTS) return true;
  return false;
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Verificación del captcha: extraída a lib/turnstile.ts (compartida con
 * el Libro de Reclamaciones).
 */

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const sizeError = checkBodySize(request, MAX_BODY_BYTES.leads);
  if (sizeError) return sizeError;

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Espere 5 minutos e intente nuevamente." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const field = Array.isArray(firstIssue?.path)
      ? firstIssue.path.join(".")
      : String(firstIssue?.path ?? "");
    const msg =
      FIELD_ERRORS_ES[field] ??
      "Datos inválidos. Revise el formulario e intente de nuevo.";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  // Honeypot: si el campo oculto tiene contenido, es un bot.
  // Devolvemos éxito falso para no dar pistas, sin guardar nada.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  // Time-trap: si el formulario se envió en menos de 2 segundos, es un bot.
  // Éxito falso igual que el honeypot — el bot no sabe que fue rechazado.
  if (parsed.data.formTime !== undefined && parsed.data.formTime < 2000) {
    return NextResponse.json({ ok: true });
  }

  // Captcha Turnstile: si no valida, rechazamos (a los bots les devolvemos
  // éxito falso después de un pequeño retraso para no confirmar el rechazo).
  const captchaOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!captchaOk) {
    return NextResponse.json(
      { ok: false, error: "No se pudo verificar el captcha. Actualice la página e intente de nuevo." },
      { status: 400 },
    );
  }

  // Rate limit por contenido: mismo DNI/email no puede enviar 3+ veces en 10 min
  const contentLimit = isContentRateLimited(parsed.data.document || "", parsed.data.email);
  if (contentLimit.limited) {
    return NextResponse.json(
      { ok: false, error: CONTENT_RATE_LIMIT_MESSAGE },
      { status: 429 },
    );
  }

  const leadId = insertLead({
    source: parsed.data.source,
    name: parsed.data.name,
    document: parsed.data.document,
    phone: parsed.data.phone,
    email: parsed.data.email,
    interest: parsed.data.interest,
    message: parsed.data.message,
    ip,
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
    consent: createConsentEvidence(
      parsed.data.consent,
      parsed.data.source === "fab" ? "reservation_request" : "quotation",
    ),
  });

  // El lead ya está a salvo en SQLite. El envío a Google Sheets
  // ocurre después de responder; si falla queda marcado para reintento
  // vía scripts/sync-sheets.js (cron en el VPS).
  after(async () => {
    try {
      const lead = getLeadById(leadId);
      if (!lead) return;
      await appendLeadToSheet(lead);
      markLeadSynced(leadId);
    } catch (err) {
      console.error(`[leads] Fallo sync a Google Sheets (lead ${leadId}):`, err);
    }

    // Notificación por email al equipo de ventas
    try {
      const lead = getLeadById(leadId);
      if (!lead) return;
      const { sendMail } = await import("@/lib/mailer");
      const interestLabel: Record<string, string> = {
        "1": "1 Dormitorio", "2": "2 Dormitorios", "3": "3 Dormitorios",
        inv: "Inversión", "": "Sin especificar",
      };
      await sendMail({
        to: process.env.RECLAMOS_NOTIFY_EMAIL || "holdingreynagaventas@gmail.com",
        subject: `Nuevo lead #${leadId}: ${lead.name}${lead.interest ? " — " + (interestLabel[lead.interest] ?? lead.interest) : ""}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
            <div style="background:#0a1931;padding:18px 24px;border-radius:12px 12px 0 0;">
              <h3 style="color:#D4AF37;margin:0;">NUEVO LEAD #${leadId}</h3>
            </div>
            <div style="border:1px solid #e5e5e5;border-top:none;padding:20px 24px;border-radius:0 0 12px 12px;font-size:14px;">
              <p><strong>Nombre:</strong> ${lead.name}</p>
              <p><strong>Teléfono:</strong> ${lead.phone}${lead.document ? " | <strong>Doc:</strong> " + lead.document : ""}</p>
              <p><strong>Email:</strong> ${lead.email}</p>
              <p><strong>Interés:</strong> ${interestLabel[lead.interest] ?? lead.interest ?? "—"} | <strong>Origen:</strong> ${lead.source === "fab" ? "Reserva WhatsApp" : "Cotización"}</p>
              <p><strong>Promociones:</strong> ${lead.marketing_consent_accepted === 1 ? "✔ Aceptó recibir promociones (puede agregarlo a listas de difusión)" : lead.marketing_consent_accepted === 0 ? "No aceptó promociones — solo contacto 1-a-1, sin difusiones" : "Sin registro (lead histórico)"}</p>
              ${lead.message ? `<p style="background:#f9f9f9;padding:10px;border-left:3px solid #D4AF37;"><strong>Mensaje:</strong><br>${lead.message.replace(/</g, "<").replace(/\n/g, "<br>")}</p>` : ""}
              <p><strong>Registrado:</strong> ${lead.created_at}</p>
              <p style="margin-top:20px;">
                <a href="https://wa.me/${lead.phone.replace(/\D/g, "")}" style="background:#25D366;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;">Responder por WhatsApp</a>
              </p>
              <p style="font-size:11px;color:#888;margin-top:16px;">Gestionar desde el panel: https://inmobiliariaholdingreynaga.com/admin</p>
            </div>
          </div>`,
      });
    } catch (err) {
      console.error(`[leads] Fallo email notificación (lead ${leadId}):`, err);
    }
  });

  return NextResponse.json({ ok: true, id: leadId });
}
