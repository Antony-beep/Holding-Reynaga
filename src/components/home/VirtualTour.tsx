import Image from "next/image";
import { Play, Box } from "lucide-react";

export default function VirtualTour() {
  return (
    <section className="py-0 relative z-10 flex flex-col w-full">
      <div className="w-full bg-deep-navy flex flex-col lg:flex-row">
        
        {/* Text Container (Left) */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-20">
          <div className="w-full max-w-[550px]">
            <h2 className="text-display font-black text-5xl md:text-6xl text-white mb-6 tracking-tighter leading-[1.05]">
              Explora tu futuro <br/> hogar en 360°.
            </h2>
            
            <p className="font-body text-white/80 text-lg mb-12 leading-relaxed font-light">
              No imagines, vívelo. Nuestra maqueta virtual te permite recorrer cada rincón de los departamentos y áreas comunes con un realismo asombroso desde la comodidad de tu pantalla.
            </p>

            <button className="border-2 border-primary/50 flex items-center gap-4 pl-2 pr-8 py-2 w-max mx-auto sm:mx-0 hover:border-primary transition-colors group">
              <div className="bg-primary/10 p-3 group-hover:bg-primary transition-colors">
                <Play fill="var(--color-primary)" className="text-primary w-4 h-4 group-hover:text-white group-hover:fill-white transition-colors" />
              </div>
              <span className="font-display font-bold text-primary tracking-widest text-xs lg:text-sm uppercase group-hover:text-white transition-colors">Próximamente: Tour Virtual</span>
            </button>
          </div>
        </div>

        {/* Image Container (Right) */}
        <div className="flex-1 lg:w-1/2 relative min-h-[400px] lg:min-h-[700px]">
          <Image 
            src="/images/Fachada%20TT%205.webp" 
            alt="Maqueta Virtual" 
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <Box className="text-primary w-16 h-16 sm:w-20 sm:h-20 mb-4 opacity-90" />
            <span className="font-display font-black text-white/90 tracking-[0.2em] text-sm md:text-base uppercase text-center drop-shadow-md">Maqueta Virtual Interactiva</span>
          </div>
        </div>
        
      </div>
    </section>
  );
}
