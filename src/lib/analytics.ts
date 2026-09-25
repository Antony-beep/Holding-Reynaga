"use client";

import { readConsent } from "./consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara el evento de conversión de lead en GA4 y Meta Pixel,
 * respetando el consentimiento por categoría de cada uno.
 */
export function trackLeadSubmitted(source: "dossier" | "fab") {
  if (typeof window === "undefined") return;

  const consent = readConsent();

  // GA4 (categoría análisis): evento recomendado "generate_lead"
  if (consent.analytics && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      source,
      currency: "PEN",
    });
  }

  // Meta Pixel (categoría marketing): evento estándar "Lead"
  if (consent.marketing && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { source });
  }
}
