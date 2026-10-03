import { z } from "zod";
import { consentSchema } from "./consent";

const reservationDocumentSchema = z
  .string()
  .trim()
  .min(8, "Documento inválido")
  .max(12, "Documento inválido")
  .regex(/^[0-9A-Za-z]+$/, "Documento inválido");

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre es demasiado corto")
    .max(80, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo debe contener letras"),
  // La cotización descarta el documento, incluso si lo envía un cliente antiguo.
  document: z.unknown().optional(),
  phone: z
    .string()
    .trim()
    .min(9, "Teléfono inválido (mínimo 9 dígitos)")
    .max(20, "Teléfono inválido")
    .regex(/^\+?[0-9\s-]+$/, "Teléfono inválido"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Correo electrónico inválido")
    .min(5)
    .max(100),
  interest: z.enum(["", "1", "2", "3", "inv"]).default(""),
  message: z
    .string()
    .trim()
    .max(300, "El mensaje no puede superar 300 caracteres")
    .optional()
    .default(""),
  source: z.enum(["dossier", "fab"]).default("dossier"),
  consent: consentSchema,
  // Honeypot: cualquier string es válido aquí; si viene con contenido,
  // la ruta lo descarta silenciosamente fingiendo éxito (ver /api/leads).
  company: z.string().max(200).optional(),
  // Time-trap: milisegundos desde que el usuario abrió el formulario.
  // < 2000ms = bot. Validado en la ruta, no aquí (para fingir éxito).
  formTime: z.number().int().min(0).max(600_000).optional(),
  // Token de Cloudflare Turnstile (se valida contra la API de Cloudflare en la ruta)
  turnstileToken: z.string().max(2048).optional(),
}).transform((lead, ctx) => {
  if (lead.source === "dossier") return { ...lead, document: null };

  const document = reservationDocumentSchema.safeParse(lead.document);
  if (!document.success) {
    ctx.addIssue({ code: "custom", path: ["document"], message: "Documento inválido" });
    return z.NEVER;
  }
  return { ...lead, document: document.data };
});

export type LeadInput = z.infer<typeof leadSchema>;
