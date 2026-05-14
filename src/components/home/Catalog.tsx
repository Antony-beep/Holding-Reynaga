"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { APARTMENTS } from "@/data/apartments";

export default function Catalog() {
  const [activeTab, setActiveTab] = useState(APARTMENTS[0].type);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const activeApartment = APARTMENTS.find(a => a.type === activeTab) || APARTMENTS[0];

  const handleTabChange = (type: string) => {
    startTransition(() => {
      setActiveTab(type);
      setActiveImageIndex(0);
    });
  };

  const handlePrevImage = () => {
    startTransition(() => {
      setActiveImageIndex(prev => prev > 0 ? prev - 1 : activeApartment.images.length - 1);
    });
  };

  const handleNextImage = () => {
    startTransition(() => {
      setActiveImageIndex(prev => prev < activeApartment.images.length - 1 ? prev + 1 : 0);
    });
  };

  const handleDotClick = (idx: number) => {
    startTransition(() => {
      setActiveImageIndex(idx);
    });
  };

  return (
    <section id="departamentos" className="py-12 md:py-16 bg-surface border-b border-surface-container-low overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header & Tabs */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 lg:mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full"></div>
              <span className="font-display font-bold text-[#B38728] tracking-[0.15em] text-xs md:text-sm uppercase bg-[#BF953F]/10 px-4 py-1.5 rounded-full border border-[#BF953F]/20">
                Línea Residencial
              </span>
            </div>
            <h2 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-deep-navy tracking-tighter mb-4 leading-[1.1]">
              Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#996515] block mt-1">Departamentos</span>
            </h2>
            <p className="text-deep-navy/70 font-body text-base md:text-lg leading-relaxed font-light">
              Descubre nuestras opciones diseñadas para ofrecer la máxima exclusividad y confort.
            </p>
          </div>
          
          <div className="w-full xl:w-auto mt-4 xl:mt-0 relative">
            <div className="overflow-x-auto pb-2 -mb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex justify-start xl:justify-center bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-highest p-1.5 gap-1.5 min-w-max mx-auto xl:mx-0">
                {APARTMENTS.map((apt) => (
                  <button
                    key={apt.type}
                    onClick={() => handleTabChange(apt.type)}
                    className={`flex-none snap-center px-4 py-2 rounded-lg font-display text-sm font-bold transition-all duration-300 ${
                      activeTab === apt.type 
                        ? "bg-deep-navy text-white shadow-sm transform scale-[1.02]" 
                        : "text-on-surface hover:bg-surface hover:text-primary"
                    }`}
                  >
                    {apt.type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Layout */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row gap-6 items-stretch"
          >
          {activeApartment.isComingSoon ? (
            <div className="w-full bg-surface-container-lowest rounded-3xl overflow-hidden shadow-architectural border border-surface-container-highest flex items-center justify-center min-h-[350px] lg:min-h-[450px] text-center p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-container-highest opacity-50" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary mb-4 tracking-widest uppercase border border-primary/20">
                  En Desarrollo
                </div>
                <h3 className="font-display text-4xl lg:text-5xl text-deep-navy mb-3 font-bold">{activeApartment.type}</h3>
                <h4 className="font-display text-2xl lg:text-3xl text-primary font-bold mb-4 leading-tight tracking-wider uppercase">Próximamente</h4>
                <p className="font-body text-on-surface/70 text-sm lg:text-base leading-relaxed">
                  Estamos afinando los últimos detalles de esta exclusiva configuración. Mantente atento para descubrir una nueva dimensión de vida premium corporativa.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Main Display (65%) */}
              <div className="lg:w-[65%] bg-surface-container-lowest rounded-3xl overflow-hidden shadow-architectural group relative flex flex-col">
                <div className="relative w-full h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden bg-deep-navy">
                  
                  {/* Blurred Backdrop for Portrait Images */}
                  {activeApartment.images && activeApartment.images.map((imgName, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <img 
                        key={`blur-${idx}`}
                        src={`${activeApartment.basePath}/${imgName}`}
                        alt=""
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding="async"
                        style={{ transitionProperty: 'opacity, transform', willChange: 'opacity, transform' }}
                        className={`absolute inset-0 w-full h-full object-cover blur-2xl duration-1000 ease-in-out transform-gpu pointer-events-none ${
                          isActive ? 'opacity-40 scale-110 z-0' : 'opacity-0 scale-100 -z-10'
                        }`}
                      />
                    );
                  })}

                  {/* Main Foreground Images */}
                  {activeApartment.images && activeApartment.images.map((imgName, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <img 
                        key={`main-${idx}`}
                        src={`${activeApartment.basePath}/${imgName}`}
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding="async"
                        style={{ transitionProperty: 'opacity, transform', willChange: 'opacity, transform' }}
                        onError={(e) => { 
                          e.currentTarget.onerror = null; 
                          e.currentTarget.src = "/images/Otraseccion.png"; 
                        }}
                        alt={`Departamento en venta Tipo ${activeApartment.type} en San Carlos Huancayo - Imagen ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain duration-1000 ease-in-out transform-gpu pointer-events-none group-hover:scale-105 ${
                          isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-[1.02]'
                        }`}
                      />
                    );
                  })}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/70 via-transparent to-deep-navy/10 pointer-events-none transition-opacity duration-500 z-10" />
                  
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap gap-2 z-20">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full font-display font-bold text-[10px] md:text-xs text-deep-navy shadow-md uppercase tracking-wider border border-white/20">
                      {activeApartment.bedrooms} Dormitorios
                    </span>
                  </div>

                  {/* Carousel Controls */}
                  {activeApartment.images && activeApartment.images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        disabled={isPending}
                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 md:p-3 rounded-full text-white transition-all z-30 shadow-sm hover:scale-110 border border-white/10 disabled:opacity-50"
                        aria-label="Imagen anterior"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button 
                        onClick={handleNextImage}
                        disabled={isPending}
                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 md:p-3 rounded-full text-white transition-all z-30 shadow-sm hover:scale-110 border border-white/10 disabled:opacity-50"
                        aria-label="Siguiente imagen"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-1.5 md:gap-2 z-30">
                        {activeApartment.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            disabled={isPending}
                            aria-label={`Ver imagen ${idx + 1}`}
                            className={`transition-all duration-300 rounded-full shadow-sm disabled:cursor-not-allowed ${
                              activeImageIndex === idx 
                                ? 'w-6 md:w-8 h-1.5 md:h-2 bg-white' 
                                : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Details & CTA (35%) */}
              <div className="lg:w-[35%] flex flex-col">
                <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 xl:p-10 shadow-architectural h-full flex flex-col justify-between relative overflow-hidden border border-surface-container-highest group hover:border-primary/30 transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[80px] -z-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1.5 bg-surface-container-highest rounded-full text-[10px] lg:text-xs font-bold text-primary mb-5 tracking-widest uppercase shadow-sm border border-surface-container-highest">
                      Línea {activeApartment.area}
                    </div>
                    <h3 className="font-display text-4xl lg:text-5xl text-deep-navy mb-4 font-bold tracking-tight">{activeApartment.type}</h3>
                    <div className="w-10 h-1 bg-primary mb-5 rounded-full" />
                    <p className="font-body text-on-surface/75 mb-6 leading-relaxed text-sm lg:text-base">
                      Concebido bajo estrictos cánones de asimetría espacial y flujo de luz natural, esta configuración representa la vida premium corporativa en su máxima expresión.
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-auto pt-6 border-t border-surface-container-highest flex flex-col gap-3">
                    <a 
                      href={`/departamentos/${activeApartment.type.toLowerCase().replace(' ', '-')}`}
                      className="block text-center w-full bg-white hover:bg-surface border-2 border-deep-navy text-deep-navy py-4 md:py-5 px-6 rounded-xl font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-300 shadow-md transform hover:-translate-y-1"
                    >
                      Ver Detalles Completos
                    </a>
                    <a 
                      href={`https://wa.me/51981407634?text=Hola, quiero más información sobre el departamento ${activeApartment.type} en Torres Titanium.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full bg-deep-navy hover:bg-primary text-white py-4 md:py-5 px-6 rounded-xl font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-300 shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1"
                    >
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
