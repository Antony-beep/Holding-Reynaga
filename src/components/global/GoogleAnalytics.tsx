"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readConsent } from "@/lib/consent";

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
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

  useEffect(() => {
    const readAnalytics = () => setAnalyticsAllowed(readConsent().analytics);
    readAnalytics();
    window.addEventListener("consent-updated", readAnalytics);
    return () => window.removeEventListener("consent-updated", readAnalytics);
  }, []);

  // Registrar cada navegación como page_view (SPA)
  useEffect(() => {
    if (!analyticsAllowed || !measurementId) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
    });
  }, [pathname, analyticsAllowed, measurementId]);

  if (!analyticsAllowed || !measurementId) return null;

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
