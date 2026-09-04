"use client";

import Link from 'next/link';
import { useState, useEffect, useTransition } from 'react';

export default function WhatsAppFAB() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isPreloading, setIsPreloading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Handle scroll for visibility
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Handle preloader visibility
    const handlePreloaderFinished = () => {
      setIsPreloading(false);
    };
    window.addEventListener("preloaderFinished", handlePreloaderFinished);

    // Failsafe: if video already played, preloader is definitely gone
    if (typeof window !== 'undefined' && (window as any).__HERO_VIDEO_PLAYED__) {
      setIsPreloading(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("preloaderFinished", handlePreloaderFinished);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          document: data.get("document"),
          phone: data.get("phone"),
          email: data.get("email"),
          company: honeypot,
          source: "fab",
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "No se pudo enviar. Intente nuevamente.");
      }
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error. Intente nuevamente.",
      );
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-40 flex items-end gap-3 transition-all duration-1000 ${
      isPreloading 
        ? "opacity-0 translate-y-8 pointer-events-none invisible" 
        : "opacity-100 translate-y-0 pointer-events-auto visible"
    }`}>
      
      {/* Reserva Hover Form Container */}
      <div className="relative flex flex-col items-end">
        
        {/* The Form */}
        <div className={`fixed sm:absolute bottom-[100px] sm:bottom-full left-1/2 sm:left-auto right-1/2 sm:right-0 -translate-x-1/2 sm:translate-x-0 mb-4 w-[90vw] max-w-[380px] sm:w-[380px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white p-7 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-bottom sm:origin-bottom-right overflow-hidden ${
          isFormOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}>
          
          {/* Soft gradient background decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />


          
          <div className="relative z-10">
            <div className="mb-6">
              <h3 className="font-display font-black text-deep-navy text-2xl mb-1.5 tracking-tight">Reserva Ahora</h3>
              <p className="font-body text-sm text-deep-navy/60 leading-relaxed">Déjanos tus datos y un asesor se comunicará contigo rápidamente.</p>
            </div>

            {success ? (
              <div className="flex flex-col items-center text-center gap-4 py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-display font-black text-xl text-deep-navy">¡Reserva recibida!</h4>
                <p className="font-body text-sm text-deep-navy/60 leading-relaxed">Un asesor se comunicará contigo en breve.</p>
                <button
                  type="button"
                  onClick={() => { setSuccess(false); setIsFormOpen(false); }}
                  className="text-deep-navy font-bold text-sm hover:underline"
                >
                  Cerrar
                </button>
              </div>
            ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl px-3 py-2.5">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-deep-navy/70 uppercase tracking-wider mb-1.5 ml-1">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ej. Juan Pérez"
                  maxLength={100}
                  className="w-full bg-gray-50/50 text-deep-navy font-body rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/40 border border-gray-200 focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-400 text-sm shadow-sm"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-deep-navy/70 uppercase tracking-wider mb-1.5 ml-1">DNI / CE</label>
                  <input
                    type="text"
                    name="document"
                    placeholder="00000000"
                    maxLength={8}
                    pattern="[A-Za-z0-9]+"
                    className="w-full bg-gray-50/50 text-deep-navy font-body rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/40 border border-gray-200 focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-400 text-sm shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-deep-navy/70 uppercase tracking-wider mb-1.5 ml-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+51 999 999 999"
                    minLength={9}
                    maxLength={15}
                    pattern="^\+?[0-9\s\-]{9,}$"
                    title="Ingresa un número de teléfono válido (mínimo 9 dígitos)"
                    className="w-full bg-gray-50/50 text-deep-navy font-body rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/40 border border-gray-200 focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-400 text-sm shadow-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-deep-navy/70 uppercase tracking-wider mb-1.5 ml-1">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  maxLength={100}
                  className="w-full bg-gray-50/50 text-deep-navy font-body rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#D4AF37]/40 border border-gray-200 focus:border-[#D4AF37]/50 transition-all placeholder:text-gray-400 text-sm shadow-sm"
                  required
                />
              </div>
              
              <label className="flex items-start gap-2.5 mt-2 cursor-pointer group/check">
                <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                  <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded bg-white checked:bg-deep-navy checked:border-deep-navy transition-all cursor-pointer shadow-sm" required />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-body text-[11px] text-deep-navy/60 leading-tight group-hover/check:text-deep-navy/90 transition-colors">
                  Acepto los <Link href="/terminos-y-condiciones" className="text-deep-navy font-bold hover:underline">Términos y Condiciones</Link> y la <Link href="/terminos-y-condiciones#privacidad" className="text-deep-navy font-bold hover:underline">Política de Privacidad</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-deep-navy hover:bg-[#1a2942] text-white font-display font-bold tracking-widest text-sm uppercase px-6 py-4 rounded-xl mt-3 transition-all shadow-[0_8px_20px_rgba(10,25,47,0.2)] hover:shadow-[0_12px_25px_rgba(10,25,47,0.3)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
              >
                {submitted ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  "Enviar Reserva"
                )}
              </button>
            </form>
            )}
          </div>
        </div>

        {/* The Golden Button */}
        <button 
          onClick={() => startTransition(() => setIsFormOpen(!isFormOpen))}
          className="flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] bg-[length:200%_auto] hover:bg-[position:right_center] text-deep-navy px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg font-display font-bold text-sm shadow-[0_10px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group/btn border border-white/40"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 z-0 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-gold-shine mix-blend-overlay" />
          
          <span className="relative z-10 tracking-wide uppercase text-[10px] sm:text-xs md:text-sm font-black whitespace-nowrap">
            <span className="hidden sm:inline">Reserva tu futuro ahora</span>
            <span className="inline sm:hidden">Reserva ahora</span>
          </span>
          <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 relative z-10 ${isFormOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>

      </div>

      {/* WhatsApp Button */}
      <Link 
        href="https://wa.me/51981407634" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3 sm:p-4 bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-lg text-white transition-all duration-300 hover:-translate-y-1 animate-pulse-wa z-50 flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.005-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </Link>
    </div>
  );
}
