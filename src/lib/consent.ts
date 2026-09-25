"use client";

/**
 * Consentimiento de cookies por categorías.
 *
 * Formato en localStorage["cookie-consent"]:
 *  - Nuevo: JSON {"analytics":bool,"marketing":bool}
 *  - Legado (usuarios previos): "accepted" | "true" (todo) | "rejected" (solo necesarias)
 *
 * Categorías:
 *  - necessary: siempre activas (no se pueden desactivar, no requieren consentimiento)
 *  - analytics: Google Analytics
 *  - marketing: Meta Pixel
 */

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentInfo extends ConsentState {
  /** true si el usuario ya tomó alguna decisión (guardada en este navegador). */
  decided: boolean;
}

const STORAGE_KEY = "cookie-consent";

export function readConsent(): ConsentInfo {
  if (typeof window === "undefined") {
    return { analytics: false, marketing: false, decided: false };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { analytics: false, marketing: false, decided: false };

  // Formato legado
  if (raw === "accepted" || raw === "true") {
    return { analytics: true, marketing: true, decided: true };
  }
  if (raw === "rejected") {
    return { analytics: false, marketing: false, decided: true };
  }

  // Formato nuevo (JSON)
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      decided: true,
    };
  } catch {
    return { analytics: false, marketing: false, decided: false };
  }
}

/** Guarda la decisión y notifica al resto de la app (GA, Pixel, etc.). */
export function saveConsent(state: ConsentState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(
    new CustomEvent("consent-updated", { detail: JSON.stringify(state) }),
  );
}
