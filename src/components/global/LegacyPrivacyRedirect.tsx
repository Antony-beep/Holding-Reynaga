"use client";

import { useEffect } from "react";

export default function LegacyPrivacyRedirect() {
  useEffect(() => {
    const redirectLegacyHash = () => {
      const { hash, search } = window.location;
      if (hash !== "#privacidad" && hash !== "#cookies") return;

      const destinationHash = hash === "#cookies" ? "#cookies" : "";
      window.location.replace(`/politica-de-privacidad${search}${destinationHash}`);
    };

    redirectLegacyHash();
    window.addEventListener("hashchange", redirectLegacyHash);
    return () => window.removeEventListener("hashchange", redirectLegacyHash);
  }, []);

  return null;
}
