"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PIXEL_ID = "1385005433052216";

export default function MetaPixel() {
  const pathname = usePathname();
  const [consentGranted, setConsentGranted] = useState(false);

  // Leer el consentimiento guardado y reaccionar si el usuario cambia
  // su preferencia en esta misma sesión (sin recargar la página).
  useEffect(() => {
    const readConsent = () => {
      const consent = localStorage.getItem("cookie-consent");
      // "true" cubre a usuarios que aceptaron con la versión anterior del banner
      setConsentGranted(consent === "accepted" || consent === "true");
    };

    readConsent();
    window.addEventListener("consent-updated", readConsent);
    return () => window.removeEventListener("consent-updated", readConsent);
  }, []);

  // Registrar vistas de página en cada navegación, solo con consentimiento.
  useEffect(() => {
    if (consentGranted && typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, consentGranted]);

  // Sin consentimiento, el pixel NUNCA se carga: ni el script ni el pixel de imagen.
  if (!consentGranted) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
