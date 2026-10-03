"use client";

/**
 * Consentimiento de cookies por categorías — Ley 29733 (Perú) / GDPR-equivalente.
 *
 * Registro en localStorage["cookie-consent"]:
 * {
 *   analytics: boolean,
 *   marketing: boolean,
 *   timestamp: string (ISO UTC),
 *   version: string (versión del texto de la política mostrada),
 *   source: string (origen del consentimiento: banner | footer | custom)
 * }
 *
 * Formatos legados soportados:
 *  - "accepted" | "true" → todo aceptado (sin fecha)
 *  - "rejected" → solo necesarias (sin fecha)
 *  - JSON sin timestamp → formato v1 (sin evidencia)
 *
 * IMPORTANTE: cookies de marketing NO equivalen a autorización para
 * promociones por WhatsApp, llamada o correo. Esa autorización es
 * un campo separado en los formularios (consent_promotional).
 */

/** Versión del texto de cookies que el usuario vio al aceptar.
 *  Cambiar cuando cambie el texto legal. */
export const CONSENT_TEXT_VERSION = "2026-10-01";

export interface ConsentRecord {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
  source: "banner" | "footer" | "custom";
}

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentInfo extends ConsentState {
  /** true si el usuario ya tomó alguna decisión (guardada en este navegador). */
  decided: boolean;
  /** Fecha ISO UTC de la decisión, null si no se capturó (formato legado). */
  timestamp: string | null;
  /** Versión del texto que el usuario vio, null si no se capturó. */
  version: string | null;
}

const STORAGE_KEY = "cookie-consent";

export function readConsent(): ConsentInfo {
  if (typeof window === "undefined") {
    return { analytics: false, marketing: false, decided: false, timestamp: null, version: null };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { analytics: false, marketing: false, decided: false, timestamp: null, version: null };

  // Formato legado sin evidencia
  if (raw === "accepted" || raw === "true") {
    return { analytics: true, marketing: true, decided: true, timestamp: null, version: null };
  }
  if (raw === "rejected") {
    return { analytics: false, marketing: false, decided: true, timestamp: null, version: null };
  }

  // Formato actual (JSON con timestamp y versión) o formato v1 (sin ellos)
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      decided: true,
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : null,
      version: typeof parsed.version === "string" ? parsed.version : null,
    };
  } catch {
    return { analytics: false, marketing: false, decided: false, timestamp: null, version: null };
  }
}

/** Guarda la decisión con evidencia y notifica a GA/Pixel. */
export function saveConsent(
  state: ConsentState,
  source: ConsentRecord["source"] = "banner",
): void {
  const record: ConsentRecord = {
    ...state,
    timestamp: new Date().toISOString(),
    version: CONSENT_TEXT_VERSION,
    source,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(
    new CustomEvent("consent-updated", { detail: JSON.stringify(state) }),
  );
}
