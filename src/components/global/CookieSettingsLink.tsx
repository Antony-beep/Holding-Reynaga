"use client";

import { Cookie } from "lucide-react";

/**
 * Enlace discreto del Footer para re-abrir el panel de preferencias
 * de cookies en cualquier momento (buena práctica de privacidad).
 */
export default function CookieSettingsLink() {
  const open = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  return (
    <button
      type="button"
      onClick={open}
      className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
    >
      <Cookie className="w-3.5 h-3.5" />
      Preferencias de Cookies
    </button>
  );
}
