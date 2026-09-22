"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispara el evento de conversión de lead en GA4 y Meta Pixel.
 * Respeta el consentimiento de cookies: si el usuario no aceptó, no hace nada.
 */
export function trackLeadSubmitted(source: "dossier" | "fab") {
  if (typeof window === "undefined") return;

  const consent = localStorage.getItem("cookie-consent");
  if (consent !== "accepted" && consent !== "true") return;

  // GA4: evento recomendado "generate_lead"
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      source,
      currency: "PEN",
    });
  }

  // Meta Pixel: evento estándar "Lead"
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", { source });
  }
}
