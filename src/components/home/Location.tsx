"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { GraduationCap, TreePine, ShoppingBag, ShoppingCart } from "lucide-react";

const LocationMap = dynamic(() => import("./LocationMap"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-deep-navy animate-pulse" /> 
});

export default function Location() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);

  const pointsOfInterest = [
    { id: "continental", name: "Universidad Continental", time: "1 min", Icon: GraduationCap },
    { id: "upla", name: "UPLA", time: "3 min", Icon: GraduationCap },
    { id: "roosevelt", name: "Roosevelt", time: "4 min", Icon: GraduationCap },
    { id: "grau", name: "Parque Grau", time: "2 min", Icon: TreePine },
    { id: "identidad", name: "Parque Identidad Wanka", time: "4 min", Icon: TreePine },
    { id: "tupac", name: "Parque Túpac", time: "8 min", Icon: TreePine },
    { id: "makro", name: "Makro", time: "5 min", Icon: ShoppingCart },
    { id: "mallplaza", name: "C.C. Mallplaza Huancayo", time: "8 min", Icon: ShoppingBag },
    { id: "realplaza", name: "C.C. Real Plaza", time: "12 min", Icon: ShoppingBag }
  ];

  return (
    <section id="ubicacion" className="py-16 md:py-24 bg-surface relative z-10 flex flex-col w-full overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Location Block */}
        <div className="w-full bg-deep-navy rounded-3xl shadow-architectural border border-surface-container-highest flex flex-col lg:flex-row overflow-hidden group">
          
          {/* Text Container (Left) */}
          <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16 relative">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-full max-w-[550px] relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full"></div>
                <span className="font-display font-bold text-primary tracking-[0.15em] text-xs md:text-sm uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  Alta Plusvalía
                </span>
              </div>

              <h2 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tighter leading-[1.1]">
                Ubicación <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#F3E5AB] to-[#D4AF37]">Estratégica</span>
              </h2>
              
              <p className="font-body text-white/70 text-base md:text-lg mb-8 leading-relaxed font-light">
                Ubicados en <strong className="text-white font-semibold">Av. San Agustín 154, San Carlos</strong>. El epicentro del desarrollo residencial en Huancayo, brindando conexión inigualable a las instituciones de mayor prestigio.
              </p>

              {/* Semantic SEO Distances (Visually Hidden) */}
              <div className="sr-only">
                <h3>Distancias clave desde Torres Titanium:</h3>
                <ul>
                  {pointsOfInterest.map((poi) => (
                    <li key={poi.id}>A {poi.time} de {poi.name}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-display text-xs md:text-sm text-primary font-bold uppercase tracking-[0.15em] mb-2 opacity-90">Conectividad a paso de calle</h3>
                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/50">
                  {pointsOfInterest.map((poi) => (
                    <div 
                      key={poi.id} 
                      className="flex items-center justify-between border-b border-white/10 pb-3 transition-colors duration-300 hover:border-primary/50 cursor-pointer group/item"
                      onMouseEnter={() => setActiveLocationId(poi.id)}
                      onMouseLeave={() => setActiveLocationId(null)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`bg-white/5 p-2.5 rounded-xl transition-colors duration-300 ${activeLocationId === poi.id ? 'bg-primary/20' : 'group-hover/item:bg-white/10'}`}>
                           <poi.Icon className={`transition-colors duration-300 ${activeLocationId === poi.id ? 'text-[#D4AF37]' : 'text-white/60 group-hover/item:text-[#D4AF37]'}`} size={18} />
                        </div>
                        <span className={`font-body font-medium text-sm md:text-base transition-colors duration-300 ${activeLocationId === poi.id ? 'text-white' : 'text-white/80 group-hover/item:text-white'}`}>
                          {poi.name}
                        </span>
                      </div>
                      <span className="font-display text-xs md:text-sm font-bold bg-white/5 px-3 py-1.5 rounded-lg text-[#F3E5AB] border border-white/10 shadow-sm transition-all duration-300 group-hover/item:shadow-md group-hover/item:bg-primary/10">
                        {poi.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Container (Right) */}
          <div className="w-full lg:w-1/2 relative h-[500px] sm:h-[550px] lg:h-auto overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-deep-navy/10 z-10 pointer-events-none mix-blend-overlay lg:hidden" />
             <div className="absolute inset-0 z-0">
               <LocationMap activeLocationId={activeLocationId} />
             </div>
             {/* Soft Gradients to blend map with dark bg (Only on mobile) */}
             <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-deep-navy/80 to-transparent lg:hidden z-20 pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
