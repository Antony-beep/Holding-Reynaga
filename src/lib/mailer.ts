import { Resend } from "resend";
import { getReclamosConfig } from "./db";

export interface SendMailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: string }[]; // base64
}

export interface SendMailResult {
  ok: boolean;
  error?: string;
}

const FROM_DOMAIN = "inmobiliariaholdingreynaga.com";

/**
 * Envío de emails vía Resend. Si RESEND_API_KEY no está configurada,
 * devuelve ok:false sin romper el flujo (el reclamo ya está guardado
 * en la base de datos; el error queda registrado para reenvío manual).
 */
export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY no configurada." };
  }

  const from =
    process.env.RESEND_FROM_EMAIL || `libro@${FROM_DOMAIN}`;
  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: `Holding Reynaga <${from}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
      attachments: input.attachments,
    });
    if (result.error) {
      return { ok: false, error: result.error.message };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Error desconocido de envío.",
    };
  }
}

/** Correo de notificación interna: el valor guardado en el admin prevalece. */
export function getNotifyEmail(): string {
  const stored = getReclamosConfig("notify_email");
  if (stored) return stored;
  return process.env.RECLAMOS_NOTIFY_EMAIL || "holdingreynagaventas@gmail.com";
}
