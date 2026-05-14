"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const handleShow = () => {
        setTimeout(() => {
          setIsVisible(true);
        }, 3000);
      };

      // Wait for preloader to finish
      window.addEventListener("preloaderFinished", handleShow);
      
      // Failsafe: if preloader already finished or video played
      if ((window as any).__HERO_VIDEO_PLAYED__) {
        handleShow();
      }

      return () => window.removeEventListener("preloaderFinished", handleShow);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return (
    <button 
      onClick={() => setIsVisible(true)}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-white border border-black/5 rounded-full shadow-lg flex items-center justify-center text-deep-navy/40 hover:text-primary transition-all duration-300 hover:scale-110"
      title="Política de Cookies"
    >
      <Cookie className="w-5 h-5" />
    </button>
  );

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-24 md:w-[400px] z-50 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white/95 backdrop-blur-xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl p-6 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-display font-bold text-deep-navy text-lg m-0 leading-tight">Privacidad y Cookies</h4>
              <p className="font-body text-xs text-deep-navy/60 mt-1 leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia y analizar el tráfico. Al continuar navegando, aceptas nuestra{" "}
                <Link href="/terminos-y-condiciones#cookies" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
                  Política de Cookies
                </Link>.
              </p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-deep-navy/30 hover:text-deep-navy transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={acceptCookies}
              className="flex-1 bg-deep-navy hover:bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-primary/30"
            >
              Aceptar Todo
            </button>
            <Link
              href="/terminos-y-condiciones"
              className="flex-1 bg-surface-container-lowest border border-black/5 hover:bg-white text-deep-navy/60 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
