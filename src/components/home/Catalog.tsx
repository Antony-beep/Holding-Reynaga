"use client";

import { useState } from "react";

const APARTMENTS = [
  {
    type: "Tipo A",
    bedrooms: "2 o 3",
    area: "Premium",
    images: ["A (1).webp", "A (2).webp", "A (3).webp", "A (4).webp", "A (5).webp", "A (6).webp", "A (6B).webp", "A (7).webp", "A (8).webp", "A (9).webp"],
    basePath: "/images/DEPAS WEBP/TIPO A"
  },
  {
    type: "Tipo B",
    bedrooms: "2 o 3",
    area: "Familiar",
    images: ["B (1).webp", "B (2).webp", "B (3).webp", "B (4).webp", "B (5).webp", "B (6).webp", "B (7).webp", "B (8).webp"],
    basePath: "/images/DEPAS WEBP/TIPO B"
  },
  {
    type: "Tipo C",
    bedrooms: "1 o 2",
    area: "Moderno",
    images: ["C (1).webp", "C (2).webp", "C (3).webp", "C (4).webp", "C (4B).webp", "C (5).webp", "C (6).webp", "C (7).webp", "C (7B).webp"],
    basePath: "/images/DEPAS WEBP/TIPO C"
  },
  {
    type: "Tipo D",
    bedrooms: "2",
    area: "Confort",
    images: ["D (1).webp", "D (2).webp", "D (3).webp", "D (4).webp", "D (5).webp", "D (6).webp", "D (7).webp", "D (8).webp", "D (9).webp", "D (10).webp"], 
    basePath: "/images/DEPAS WEBP/TIPO D"
  },
  {
    type: "Tipo F",
    bedrooms: "-",
    area: "-",
    images: [],
    basePath: "",
    isComingSoon: true
  },
  {
    type: "Tipo G",
    bedrooms: "2 o 3",
    area: "Elegante",
    images: ["G (1).webp", "G (2).webp", "G (3).webp", "G (4).webp", "G (5).webp", "G (6).webp"],
    basePath: "/images/DEPAS WEBP/TIPO G"
  },
  {
    type: "Tipo H",
    bedrooms: "Exclusivo",
    area: "Luxury",
    images: [],
    basePath: "",
    isComingSoon: true
  }
];

export default function Catalog() {
  const [activeTab, setActiveTab] = useState(APARTMENTS[0].type);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeApartment = APARTMENTS.find(a => a.type === activeTab) || APARTMENTS[0];

  return (
    <section id="departamentos" className="py-12 md:py-16 bg-surface border-b border-surface-container-low overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header & Tabs */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 lg:mb-8 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-display font-display text-3xl lg:text-4xl xl:text-5xl text-deep-navy tracking-tight mb-2">
              Catálogo de <span className="text-primary text-gradient block mt-1">Departamentos</span>
            </h2>
            <p className="text-on-surface/70 font-body text-sm lg:text-base">
              Descubre nuestras opciones diseñadas para ofrecer la máxima exclusividad y confort.
            </p>
          </div>
          
          <div className="w-full xl:w-auto mt-4 xl:mt-0 relative">
            <div className="overflow-x-auto pb-2 -mb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex justify-start xl:justify-center bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-highest p-1.5 gap-1.5 min-w-max mx-auto xl:mx-0">
                {APARTMENTS.map((apt) => (
                  <button
                    key={apt.type}
                    onClick={() => {
                      setActiveTab(apt.type);
                      setActiveImageIndex(0);
                    }}
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
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
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
                  {activeApartment.images && activeApartment.images.map((imgName, idx) => (
                    <img 
                      key={`blur-${idx}`}
                      src={`${activeApartment.basePath}/${imgName}`}
                      alt=""
                      className={`absolute inset-0 w-full h-full object-cover blur-2xl transition-all duration-1000 ease-in-out ${
                        activeImageIndex === idx ? 'opacity-40 scale-110 z-0' : 'opacity-0 scale-100 -z-10'
                      }`}
                    />
                  ))}

                  {/* Main Foreground Images */}
                  {activeApartment.images && activeApartment.images.map((imgName, idx) => (
                    <img 
                      key={`main-${idx}`}
                      src={`${activeApartment.basePath}/${imgName}`}
                      onError={(e) => { 
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = "/images/Otraseccion.png"; 
                      }}
                      alt={`Departamento ${activeApartment.type} - Imagen ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out group-hover:scale-105 ${
                        activeImageIndex === idx ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-[1.02]'
                      }`}
                    />
                  ))}
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
                        onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : activeApartment.images.length - 1)}
                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 md:p-3 rounded-full text-white transition-all z-30 shadow-sm group-hover:scale-110 border border-white/10"
                        aria-label="Imagen anterior"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex(prev => prev < activeApartment.images.length - 1 ? prev + 1 : 0)}
                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 md:p-3 rounded-full text-white transition-all z-30 shadow-sm group-hover:scale-110 border border-white/10"
                        aria-label="Siguiente imagen"
                      >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-1.5 md:gap-2 z-30">
                        {activeApartment.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            aria-label={`Ver imagen ${idx + 1}`}
                            className={`transition-all duration-300 rounded-full shadow-sm ${
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
                  
                  <div className="relative z-10 mt-auto pt-6 border-t border-surface-container-highest">
                    <a 
                      href={`https://wa.me/51981407634?text=Hola, quiero más información sobre el departamento ${activeApartment.type} en Torres Titanium.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full bg-deep-navy hover:bg-primary text-white py-4 md:py-5 px-6 rounded-xl font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-300 shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1"
                    >
                      Cotizar este Tipo
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
