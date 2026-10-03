import { z } from "zod";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";

export const CONSENT_FIELD_ERRORS_ES: Record<string, string> = {
  consent: "Revise la declaración obligatoria del formulario.",
  "consent.policyVersion": "La política cambió. Actualice la página antes de enviar.",
  "consent.requiredAccepted": "Debe marcar la declaración obligatoria del formulario.",
  "consent.marketingAccepted": "Indique su elección de comunicaciones opcionales.",
};

export const consentSchema = z.object({
  policyVersion: z.literal(PRIVACY_POLICY_VERSION, {
    error: CONSENT_FIELD_ERRORS_ES["consent.policyVersion"],
  }),
  requiredAccepted: z.literal(true, {
    error: CONSENT_FIELD_ERRORS_ES["consent.requiredAccepted"],
  }),
  marketingAccepted: z.boolean({
    error: CONSENT_FIELD_ERRORS_ES["consent.marketingAccepted"],
  }),
});
