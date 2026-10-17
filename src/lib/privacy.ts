export const PRIVACY_POLICY_VERSION = "2026-10-18.1";
export const PRIVACY_POLICY_DATE = "2026-10-18";
export const COOKIE_CONSENT_VERSION = PRIVACY_POLICY_VERSION;

export const LEAD_REQUIRED_CONSENT_TEXT =
  "Acepto los Términos y la Política de Privacidad para que atiendan mi solicitud.";
export const RECLAMO_REQUIRED_CONSENT_TEXT =
  "Declaro que la información proporcionada es verdadera y he leído la Política de Privacidad para la atención de mi reclamo o queja.";
export const MARKETING_CONSENT_TEXT =
  "Acepto recibir promociones y avances por WhatsApp, llamada o correo. Esta autorización es opcional y puedo revocarla.";

export const LEGAL_REVIEW_MARKER = "[[REVISAR CON ABOGADO]]";

export const RESERVATION_CONDITIONS =
  `Separación con S/ 1,000.00 para todos los tipos de departamento.\n\nLa suscripción presencial de la Constancia de Separación del Departamento y el abono de S/ 1,000.00 otorgan al cliente el congelamiento del precio de lista vigente y el retiro temporal de la unidad inmobiliaria del mercado por el plazo determinado en dicha Constancia, destinado a la evaluación crediticia y la suscripción del Contrato de Compraventa de Bien Futuro. La Constancia de Separación indica el precio de venta, el monto de separación, el número de departamento, el área y la fecha de separación.\n\nEl abono de S/ 1,000.00 se imputará íntegramente como parte de la cuota inicial (10% del valor del departamento) al momento de suscribirse el Contrato de Compraventa. El cronograma de pago de la cuota inicial se elabora acorde a los ingresos mensuales del cliente. El congelamiento del precio inicia con la separación y culmina si el cliente incumple reiteradamente el cronograma acordado o desiste voluntariamente de la compra.\n\nDevolución antes de la firma del contrato notarial: en caso de que el cliente no obtenga la aprobación del financiamiento bancario por causas no imputables a él antes de la firma de la minuta, se devolverá el 100% del monto de separación (S/ 1,000.00) sin penalidad alguna dentro de los diez (10) días hábiles siguientes. En caso de desistimiento voluntario e injustificado del cliente o de incumplimiento reiterado del cronograma acordado en la Constancia de Separación, se aplicarán las condiciones de resolución previstas expresamente en el texto de la Constancia de Separación entregada al cliente antes de su pago. Una vez suscrita la minuta y la escritura pública de compraventa, las causales de resolución y penalidades se regirán por lo pactado en dicho contrato notarial.\n\nNo hay cargos adicionales por la separación.`;

export const RESERVATION_PRICE_CLAUSE =
  `Todos los precios publicados en el sitio web (desde S/ 163,332.50 hasta S/ 361,741.00) están expresados en moneda nacional (Soles - S/) y constituyen el precio total al contado de la unidad, incluyendo los impuestos de ley aplicables (IGV conforme al régimen tributario de primera venta de inmuebles). Los precios no incluyen gastos notariales, gastos registrales ni el costo de unidades de estacionamiento o depósito, salvo que se indique expresamente lo contrario en la cotización escrita. Tipo de cambio referencial en caso de operaciones en dólares: S/ 3.80 (sujeto a variación de mercado). Los precios están sujetos a la disponibilidad de la unidad al momento de la separación.\n\n${RESERVATION_CONDITIONS}\n\nNo se modificarán unilateralmente las condiciones de una reserva ya formalizada mediante la Constancia de Separación.`;

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
