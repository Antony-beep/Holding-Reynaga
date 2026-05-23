"use client";

import { useState, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Download, FileText, ShieldCheck, LayoutDashboard, Lock, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectOverview() {
  const dossierImages = [
    { src: "/images/DEPAS WEBP/Dossier/DormitorioTipoA.webp", name: "Dormitorio Tipo A" },
    { src: "/images/DEPAS WEBP/Dossier/DormitorioTipoB.webp", name: "Dormitorio Tipo B" },
    { src: "/images/DEPAS WEBP/Dossier/DormitorioTipoC.webp", name: "Dormitorio Tipo C" },
    { src: "/images/DEPAS WEBP/Dossier/DormitorioTipoD.webp", name: "Dormitorio Tipo D" },
    { src: "/images/DEPAS WEBP/Dossier/DormitorioTipoG.webp", name: "Dormitorio Tipo G" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevenir scroll del cuerpo de la página cuando el lightbox está abierto
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (isLightboxOpen) return; // Pausar slider automático
    const timer = setInterval(() => {
      startTransition(() => {
        setCurrentIndex((prev) => (prev + 1) % dossierImages.length);
      });
    }, 3500); // Crossfade every 3.5s
    return () => clearInterval(timer);
  }, [dossierImages.length, isLightboxOpen]);

  return (
    <section
      id="titanium"
      className="relative z-10 flex flex-col w-full overflow-hidden border-y border-surface-container-highest"
    >
      <div className="w-full flex flex-col lg:flex-row">
        
        {/* Left Side (Dark Navy) */}
        <div className="flex-1 lg:w-1/2 bg-deep-navy flex items-center justify-center p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-[550px] relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full"></div>
              <span className="font-display font-bold text-primary tracking-[0.15em] text-xs md:text-sm uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                Material Exclusivo
              </span>
            </div>

            <h2 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tighter leading-[1.1]">
              Dossier{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#F3E5AB] to-[#D4AF37]">
                Informativo
              </span>
            </h2>

            <p className="font-body text-white/70 text-base md:text-lg mb-10 leading-relaxed font-light">
              Accede a los detalles técnicos, planos exclusivos y la memoria
              descriptiva completa de Torres Titanium. Al registrar tus datos,
              recibirás acceso inmediato para descargar el dossier comercial en
              formato digital de alta resolución.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col items-start gap-3 transition-colors hover:bg-white/10">
                <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                  <FileText className="text-[#D4AF37] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1.5">Planos Arquitectónicos</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Distribuciones, áreas y especificaciones técnicas.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl flex flex-col items-start gap-3 transition-colors hover:bg-white/10">
                <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                  <ShieldCheck className="text-[#D4AF37] w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1.5">Acabados Premium</h4>
                  <p className="text-white/60 text-xs leading-relaxed">Memoria descriptiva y calidades de cada espacio.</p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="w-full relative">
              <a
                href="/docs/dosier_informativo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] hover:from-[#B38728] hover:to-[#996515] text-white font-display font-bold tracking-widest text-xs md:text-sm uppercase px-8 py-5 flex items-center justify-center gap-3 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 w-full relative overflow-hidden group/btn border border-white/40 mb-4"
              >
                <div className="absolute inset-0 z-0 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-gold-shine mix-blend-overlay" />
                <span className="relative z-10 flex items-center gap-3 font-black">
                  DESCARGA Y OBTÉN MÁS DETALLES
                  <Download className="w-[18px] h-[18px] group-hover/btn:translate-y-1 transition-transform" />
                </span>
              </a>

              <div className="flex items-center justify-center gap-2">
                <Lock className="w-3 h-3 text-white/40" />
                <p className="text-[10px] text-white/50 font-medium">
                  Tus datos están protegidos bajo nuestra <span className="text-[#D4AF37] font-bold">política de privacidad</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Light Gray) */}
        <div className="flex-1 lg:w-1/2 bg-[#f4f5f7] flex flex-col relative min-h-[300px] lg:min-h-0 pt-6 lg:pt-0">
          
          {/* Image Slider Area */}
          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-5 md:p-8 z-10 w-full min-h-[400px] sm:min-h-[450px] lg:min-h-full">
            {/* Subtle glow behind image to give it separation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/50 rounded-full blur-3xl pointer-events-none z-0" />
            
            <div 
              className="relative w-full h-full min-h-[360px] sm:min-h-[400px] md:min-h-[450px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white bg-white group/slider cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              {dossierImages.map((item, index) => (
                <div 
                  key={item.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={`Dossier - ${item.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-1 md:p-2"
                    priority={index === 0}
                  />
                  {/* Etiqueta del Nombre */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-deep-navy/90 backdrop-blur-md px-4 py-1.5 md:px-5 md:py-2 rounded-lg border border-white/10 shadow-lg flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-widest uppercase">{item.name}</span>
                  </div>
                </div>
              ))}

              {/* Slider indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                {dossierImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => startTransition(() => setCurrentIndex(idx))}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "bg-[#D4AF37] w-6" : "bg-white/60 hover:bg-white w-1.5"
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar inside Right Side */}
          <div className="px-6 md:px-12 pb-8 pt-0 z-20 mt-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-surface-container-highest p-6 md:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-surface-container-highest">
                
                <div className="flex-1 flex items-center justify-start gap-4 w-full pt-4 md:pt-0 first:pt-0">
                  <div className="p-2 bg-[#f4f5f7] rounded-lg">
                    <LayoutDashboard className="text-deep-navy/60 w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-deep-navy font-bold text-sm">Planos</h4>
                    <p className="text-deep-navy/50 text-[11px] mt-0.5">En alta resolución</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-start gap-4 w-full pt-4 md:pt-0 md:pl-6">
                  <div className="p-2 bg-[#f4f5f7] rounded-lg">
                    <Download className="text-deep-navy/60 w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-deep-navy font-bold text-sm">Descarga</h4>
                    <p className="text-deep-navy/50 text-[11px] mt-0.5">Inmediata y segura</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-start gap-4 w-full pt-4 md:pt-0 md:pl-6">
                  <div className="p-2 bg-[#f4f5f7] rounded-lg">
                    <ShieldCheck className="text-deep-navy/60 w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-deep-navy font-bold text-sm">Uso</h4>
                    <p className="text-deep-navy/50 text-[11px] mt-0.5">Solo para fines informativos</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={() => startTransition(() => setIsLightboxOpen(false))}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); startTransition(() => setIsLightboxOpen(false)); }}
            className="fixed top-4 left-4 md:top-8 md:left-8 z-[100000] p-3 md:p-4 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors border border-white/20 backdrop-blur-md"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Lightbox Controls */}
          {dossierImages.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); startTransition(() => setCurrentIndex((prev) => (prev === 0 ? dossierImages.length - 1 : prev - 1))); }}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-[100000] p-2 md:p-3 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10 backdrop-blur-sm"
              >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); startTransition(() => setCurrentIndex((prev) => (prev + 1) % dossierImages.length)); }}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-[100000] p-2 md:p-3 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10 backdrop-blur-sm"
              >
                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
              </button>
            </>
          )}

          <div 
            className="relative w-[95vw] h-[75vh] md:w-[90vw] md:h-[85vh] flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={dossierImages[currentIndex].src}
              alt={`Dossier Full - ${dossierImages[currentIndex].name}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 cursor-default" onClick={(e) => e.stopPropagation()}>
            <span className="text-white font-bold tracking-widest uppercase text-xs md:text-sm bg-black/50 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
              {dossierImages[currentIndex].name}
            </span>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
