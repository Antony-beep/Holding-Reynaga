"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { GraduationCap, TreePine, ShoppingBag, ShoppingCart } from "lucide-react";

const LocationMap = dynamic(() => import("./LocationMap"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-surface-container-low animate-pulse rounded-xl" /> 
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
    <section id="ubicacion" className="py-24 bg-surface">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col">
            <h2 className="text-display font-display text-4xl lg:text-5xl text-deep-navy mb-6">
              Ubicación <span className="text-primary text-gradient">Estratégica</span>
            </h2>
            <p className="font-body text-on-surface/80 text-lg mb-10 leading-relaxed">
              Ubicados en <strong className="text-deep-navy font-semibold">Av. San Agustín 154, San Carlos</strong>. El epicentro del desarrollo residencial en Huancayo, brindando conexión inigualable a las instituciones de mayor prestigio.
            </p>

            <div className="flex flex-col gap-4">
              <h3 className="font-display text-xl text-deep-navy font-semibold uppercase tracking-wider mb-2">Conectividad a paso de calle</h3>
              <div className="flex flex-col gap-2.5 max-h-[400px] overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-surface-container-low/50 [&::-webkit-scrollbar-thumb]:bg-surface-container-highest [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/50">
                {pointsOfInterest.map((poi) => (
                  <div 
                    key={poi.id} 
                    className="flex items-center justify-between border-b border-surface-container-highest pb-2.5 transition-colors duration-300 hover:border-primary cursor-pointer group"
                    onMouseEnter={() => setActiveLocationId(poi.id)}
                    onMouseLeave={() => setActiveLocationId(null)}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`bg-surface-container-highest p-2 rounded-full transition-colors duration-300 ${activeLocationId === poi.id ? 'bg-primary/20' : 'group-hover:bg-primary/10'}`}>
                         <poi.Icon className={`transition-colors duration-300 ${activeLocationId === poi.id ? 'text-primary' : 'text-primary-container group-hover:text-primary'}`} size={16} />
                      </div>
                      <span className={`font-body font-medium text-sm md:text-base transition-colors duration-300 ${activeLocationId === poi.id ? 'text-primary' : 'text-on-surface/90 group-hover:text-deep-navy'}`}>
                        {poi.name}
                      </span>
                    </div>
                    <span className="font-display text-xs md:text-sm font-bold bg-surface-container-low px-2.5 py-1 rounded text-[#704627] border border-[#704627]/30 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-[#704627]/5">
                      {poi.time} walk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-surface-container-low translate-y-0 lg:translate-y-8">
            <LocationMap activeLocationId={activeLocationId} />
          </div>
          
        </div>
      </div>
    </section>
  );
}
