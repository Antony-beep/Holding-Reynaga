"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck, BarChart3, Megaphone, Check } from "lucide-react";
import { readConsent, saveConsent, type ConsentState } from "@/lib/consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = readConsent();
    setPrefs({ analytics: consent.analytics, marketing: consent.marketing });

    // Mostrar el banner automáticamente SOLO si nunca se decidió nada.
    if (!consent.decided) {
      const handleShow = () => {
        setTimeout(() => setIsVisible(true), 3000);
      };
      window.addEventListener("preloaderFinished", handleShow);
      if ((window as any).__HERO_VIDEO_PLAYED__) handleShow();
      return () =>
        window.removeEventListener("preloaderFinished", handleShow);
    }

    // Re-apertura desde el Footer ("Preferencias de cookies").
    const handleOpen = () => {
      const current = readConsent();
      setPrefs({ analytics: current.analytics, marketing: current.marketing });
      setShowCustom(true);
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
    setShowCustom(false);
    setIsVisible(false);
  };

  const rejectAll = () => {
    saveConsent({ analytics: false, marketing: false });
    setShowCustom(false);
    setIsVisible(false);
  };

  const saveCustom = () => {
    // Recargar para aplicar de verdad los scripts que se apagan
    // (desmontar GA/Pixel ya cargados no es fiable sin recargar).
    const was = readConsent();
    const changed =
      was.analytics !== prefs.analytics || was.marketing !== prefs.marketing;
    saveConsent(prefs);
    if (was.decided && changed) {
      window.location.reload();
      return;
    }
    setShowCustom(false);
    setIsVisible(false);
  };

  // El banner solo existe mientras esté visible; tras aceptar, rechazar o
  // guardar preferencias desaparece (el re-acceso queda en el enlace
  // "Preferencias de cookies" del Footer).
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-24 md:w-[440px] z-50 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white/95 backdrop-blur-xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-deep-navy text-lg m-0 leading-tight">
                Privacidad y Cookies
              </h4>
              <p className="font-body text-xs text-deep-navy/60 mt-1 leading-relaxed">
                Usamos cookies necesarias para el funcionamiento del sitio y,
                con tu permiso, cookies de análisis y marketing. Puedes elegir
                qué aceptar. Más detalles en nuestra{" "}
                <Link
                  href="/terminos-y-condiciones#cookies"
                  className="text-primary font-bold hover:underline decoration-2 underline-offset-4"
                >
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              aria-label="Cerrar aviso de cookies"
              className="text-deep-navy/30 hover:text-deep-navy transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {showCustom && (
            <div className="flex flex-col gap-3 mb-5">
              {/* Necesarias — siempre activas */}
              <div className="flex items-center justify-between bg-surface-container-lowest border border-black/5 rounded-xl px-4 py-3">
                <div>
                  <p className="font-display font-bold text-sm text-deep-navy">
                    Cookies necesarias
                  </p>
                  <p className="text-[11px] text-deep-navy/50">
                    Imprescindibles para el sitio. Siempre activas.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-deep-navy/40 bg-white border border-black/5 rounded-full px-3 py-1">
                  Siempre
                </span>
              </div>

              {/* Analíticas */}
              <button
                type="button"
                onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                className="flex items-center justify-between bg-surface-container-lowest border border-black/5 rounded-xl px-4 py-3 hover:border-primary/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-display font-bold text-sm text-deep-navy">
                      Análisis y estadísticas
                    </p>
                    <p className="text-[11px] text-deep-navy/50">
                      Google Analytics: miden visitas de forma anónima.
                    </p>
                  </div>
                </div>
                <span
                  className={`relative inline-flex w-10 h-6 rounded-full transition-colors shrink-0 ${
                    prefs.analytics ? "bg-primary" : "bg-deep-navy/15"
                  }`}
                  aria-hidden
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                      prefs.analytics ? "left-5" : "left-1"
                    }`}
                  />
                </span>
              </button>

              {/* Marketing */}
              <button
                type="button"
                onClick={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                className="flex items-center justify-between bg-surface-container-lowest border border-black/5 rounded-xl px-4 py-3 hover:border-primary/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Megaphone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-display font-bold text-sm text-deep-navy">
                      Marketing y publicidad
                    </p>
                    <p className="text-[11px] text-deep-navy/50">
                      Meta Pixel: miden campañas y mejoran los anuncios.
                    </p>
                  </div>
                </div>
                <span
                  className={`relative inline-flex w-10 h-6 rounded-full transition-colors shrink-0 ${
                    prefs.marketing ? "bg-primary" : "bg-deep-navy/15"
                  }`}
                  aria-hidden
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                      prefs.marketing ? "left-5" : "left-1"
                    }`}
                  />
                </span>
              </button>
            </div>
          )}

          <div className="flex gap-3">
            {showCustom ? (
              <button
                onClick={saveCustom}
                className="flex-1 bg-deep-navy hover:bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Guardar preferencias
              </button>
            ) : (
              <>
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-deep-navy hover:bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-primary/30"
                >
                  Aceptar Todo
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 bg-surface-container-lowest border border-black/5 hover:bg-white text-deep-navy/60 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Solo necesarias
                </button>
              </>
            )}
          </div>

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => setShowCustom(!showCustom)}
              className="text-[11px] text-deep-navy/40 hover:text-primary font-medium transition-colors"
            >
              {showCustom ? "Volver" : "Personalizar preferencias"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
