export const PRIVACY_POLICY_VERSION = "2026-10-02.2";
export const PRIVACY_POLICY_DATE = "2026-10-02";
export const COOKIE_CONSENT_VERSION = PRIVACY_POLICY_VERSION;

export const LEAD_REQUIRED_CONSENT_TEXT =
  "Acepto los Términos y la Política de Privacidad para que atiendan mi solicitud.";
export const RECLAMO_REQUIRED_CONSENT_TEXT =
  "Declaro que la información proporcionada es verdadera y he leído la Política de Privacidad para la atención de mi reclamo o queja.";
export const MARKETING_CONSENT_TEXT =
  "Acepto recibir promociones y avances por WhatsApp, llamada o correo. Esta autorización es opcional y puedo revocarla.";

export const LEGAL_REVIEW_MARKER = "[[REVISAR CON ABOGADO]]";

export const RESERVATION_CONDITIONS =
  `Separación con S/ 1,000 para todos los tipos de departamento. Al separar: se congela el precio vigente en ese momento y la unidad se retira de la oferta a otros clientes. Se firma una Constancia de Separación del Departamento que indica el precio de venta, el monto de separación, el número de departamento, el área y la fecha de separación. Se elabora un cronograma de pago del 10% del valor del departamento, acorde a los ingresos mensuales del cliente. El congelamiento del precio inicia con la separación y culmina si el cliente incumple reiteradamente el cronograma de pago o desiste voluntariamente de la compra. La devolución del monto de separación se rige por las cláusulas del contrato notarial. No hay cargos adicionales.`;

export const RESERVATION_PRICE_CLAUSE =
  `Los precios publicados son referenciales y están sujetos a disponibilidad de la unidad. ${RESERVATION_CONDITIONS} No se modificarán unilateralmente las condiciones de una reserva ya formalizada mediante la Constancia de Separación.`;

export type ConsentPurpose = "quotation" | "reservation_request" | "complaint";

export interface ConsentSubmission {
  policyVersion: string;
  requiredAccepted: boolean;
  marketingAccepted: boolean;
}

export interface ConsentEvidence extends ConsentSubmission {
  recordedAt: string;
  requiredText: string;
  marketingText: string;
  purpose: ConsentPurpose;
}

/** Capture server receipt time and the authoritative text of the displayed revision. */
export function createConsentEvidence(
  submission: ConsentSubmission,
  purpose: ConsentPurpose,
  recordedAt = new Date().toISOString(),
): ConsentEvidence {
  if (submission.policyVersion !== PRIVACY_POLICY_VERSION) {
    throw new Error("La política cambió. Actualice la página antes de enviar.");
  }
  if (submission.requiredAccepted !== true || typeof submission.marketingAccepted !== "boolean") {
    throw new Error("Revise la declaración obligatoria del formulario.");
  }
  if (!Number.isFinite(Date.parse(recordedAt))) {
    throw new Error("Fecha de recepción inválida.");
  }

  return {
    policyVersion: PRIVACY_POLICY_VERSION,
    recordedAt,
    requiredAccepted: true,
    requiredText: purpose === "complaint" ? RECLAMO_REQUIRED_CONSENT_TEXT : LEAD_REQUIRED_CONSENT_TEXT,
    marketingAccepted: submission.marketingAccepted,
    marketingText: MARKETING_CONSENT_TEXT,
    purpose,
  };
}
