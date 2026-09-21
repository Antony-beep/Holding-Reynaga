"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 (gtag.js).
 *
 * Se activa SOLO cuando ambas condiciones se cumplen:
 *  1. NEXT_PUBLIC_GA_MEASUREMENT_ID está configurada (empieza con "G-")
 *  2. El usuario aceptó las cookies (mismo consentimiento que el Meta Pixel)
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [consentGranted, setConsentGranted] = useState(false);

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

  useEffect(() => {
    const readConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      setConsentGranted(consent === "accepted" || consent === "true");
    };
    readConsent();
    window.addEventListener("consent-updated", readConsent);
    return () => window.removeEventListener("consent-updated", readConsent);
  }, []);

  // Registrar cada navegación como page_view (SPA)
  useEffect(() => {
    if (!consentGranted || !measurementId) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
    });
  }, [pathname, consentGranted, measurementId]);

  if (!consentGranted || !measurementId) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${measurementId}', { anonymize_ip: true });
          `,
        }}
      />
    </>
  );
}
