import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "El nombre es demasiado corto")
    .max(80, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo debe contener letras"),
  document: z
    .string()
    .trim()
    .regex(/^[0-9A-Za-z]{8,12}$/, "Documento inválido (8 caracteres para DNI)"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{9,}$/, "Teléfono inválido (mínimo 9 dígitos)")
    .max(20),
  email: z.string().trim().toLowerCase().email("Correo electrónico inválido").max(100),
  interest: z.string().max(50).optional().default(""),
  message: z.string().max(300).optional().default(""),
  source: z.enum(["dossier", "fab"]).default("dossier"),
  // Honeypot: cualquier string es válido aquí; si viene con contenido,
  // la ruta lo descarta silenciosamente fingiendo éxito (ver /api/leads).
  company: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
