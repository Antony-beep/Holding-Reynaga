import { z } from "zod";

export const BIENES_CONTRATADOS = [
  { value: "departamento-a", label: "Departamento Tipo A" },
  { value: "departamento-b", label: "Departamento Tipo B" },
  { value: "departamento-c", label: "Departamento Tipo C" },
  { value: "departamento-d", label: "Departamento Tipo D" },
  { value: "departamento-g", label: "Departamento Tipo G" },
  { value: "reserva", label: "Reserva / Separación (S/ 1,000)" },
  { value: "atencion-comercial", label: "Atención comercial en sala de ventas" },
  { value: "informacion-web", label: "Información de la web / publicidad" },
  { value: "brochure", label: "Brochure / dossier del proyecto" },
  { value: "otro", label: "Otro" },
] as const;

export const reclamoSchema = z.object({
  tipo: z.enum(["reclamo", "queja"]),
  bienContratado: z.enum([
    "departamento-a", "departamento-b", "departamento-c", "departamento-d",
    "departamento-g", "reserva", "atencion-comercial", "informacion-web",
    "brochure", "otro",
  ]),
  bienDetalle: z.string().max(200).optional().default(""),
  monto: z.string().max(20).optional().default(""),
  detalle: z
    .string()
    .trim()
    .min(10, "Describa el detalle de su reclamo o queja (mínimo 10 caracteres).")
    .max(1500),
  pedido: z
    .string()
    .trim()
    .min(5, "Indique el pedido concreto (¿qué solicita?)")
    .max(1000),
  nombre: z
    .string()
    .trim()
    .min(3, "Ingrese su nombre completo.")
    .max(120),
  documento: z
    .string()
    .trim()
    .regex(/^[0-9A-Za-z]{8,12}$/, "Documento inválido (DNI 8 dígitos, CE o pasaporte)."),
  domicilio: z
    .string()
    .trim()
    .min(5, "Ingrese su domicilio (forma parte del formato oficial).")
    .max(200),
  telefono: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{9,}$/, "Ingrese un teléfono válido (mínimo 9 dígitos).")
    .max(20),
  email: z.string().trim().toLowerCase().email("Ingrese un correo electrónico válido.").max(100),
  representante: z.string().max(120).optional().default(""),
  veracidad: z.literal(true, {
    error: "Debe aceptar la declaratoria de veracidad de la información.",
  }),
  // Honeypot (debe venir vacío)
  company: z.string().max(200).optional(),
  turnstileToken: z.string().max(2048).optional(),
});

export type ReclamoInput = z.infer<typeof reclamoSchema>;

/** Mensajes de validación en español por campo (API pública). */
export const RECLAMO_FIELD_ERRORS_ES: Record<string, string> = {
  tipo: "Seleccione si presenta un reclamo o una queja.",
  bienContratado: "Seleccione el bien o servicio contratado.",
  bienDetalle: "Describa el bien o servicio.",
  monto: "Indique el monto reclamado o marque 'No aplica'.",
  detalle: "Describa el detalle de su reclamo o queja.",
  pedido: "Indique su pedido concreto.",
  nombre: "Ingrese su nombre completo.",
  documento: "Documento inválido (DNI 8 dígitos, CE o pasaporte).",
  domicilio: "Ingrese su domicilio.",
  telefono: "Ingrese un teléfono válido (mínimo 9 dígitos).",
  email: "Ingrese un correo electrónico válido.",
  representante: "Dato del representante inválido.",
  veracidad: "Debe aceptar la declaratoria de veracidad.",
  company: "Solicitud inválida.",
  turnstileToken: "No se pudo verificar el captcha. Actualice la página.",
};

export function labelBien(value: string): string {
  return BIENES_CONTRATADOS.find((b) => b.value === value)?.label ?? value;
}
