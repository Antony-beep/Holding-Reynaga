import Image from "next/image";
import { Play, Box } from "lucide-react";
import Link from "next/link";

export default function VirtualTour() {
  return (
    <section
      id="recorrido"
      className="bg-deep-navy relative z-10 flex flex-col w-full overflow-hidden border-y border-surface-container-highest"
    >
      {/* Virtual Tour Block - Full Width Edge to Edge */}
      <div className="w-full flex flex-col lg:flex-row overflow-hidden group">
        {/* Text Container (Left) */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center py-16 px-8 md:py-20 md:px-12 lg:py-24 lg:px-16 xl:px-24 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-[550px] relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full"></div>
              <span className="font-display font-bold text-primary tracking-[0.15em] text-xs md:text-sm uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                Maqueta Interactiva
              </span>
            </div>

            <h2 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tighter leading-[1.1]">
              Explora tu futuro <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#F3E5AB] to-[#D4AF37]">
                hogar en 360°
              </span>
            </h2>

            <p className="font-body text-white/70 text-base md:text-lg mb-10 leading-relaxed font-light">
              No imagines, vívelo. Nuestra maqueta virtual te permite recorrer
              cada rincón de los departamentos y áreas comunes con un realismo
              asombroso desde la comodidad de tu pantalla.
            </p>

            <Link
              href="/vision360/a"
              className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] hover:from-[#B38728] hover:to-[#996515] text-white font-display font-bold tracking-widest text-xs md:text-sm uppercase px-8 py-5 flex items-center justify-center gap-3 rounded-2xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 w-full relative overflow-hidden group/btn border border-white/40"
            >
              <div className="absolute inset-0 z-0 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-gold-shine mix-blend-overlay" />
              <span className="relative z-10 flex items-center gap-3 font-black">
                INICIAR TOUR VIRTUAL
                <Play
                  className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform"
                  fill="currentColor"
                />
              </span>
            </Link>
          </div>
        </div>

        {/* Image Container (Right) */}
        <div className="flex-1 lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-deep-navy/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none mix-blend-overlay" />
          <Image
            src="/images/360/Departamento_visto_360.webp"
            alt="Maqueta virtual 3D del proyecto residencial Torres Titanium en San Carlos, Huancayo"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Soft Gradient to blend image with dark bg on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent lg:hidden z-10" />

          {/* Central Box Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <div className="bg-deep-navy/60 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20 flex flex-col items-center shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform group-hover:scale-110 transition-transform duration-500">
              <Box className="text-[#D4AF37] w-12 h-12 sm:w-16 sm:h-16 mb-4 animate-pulse" />
              <span className="font-display font-black text-white tracking-[0.2em] text-sm md:text-base uppercase text-center drop-shadow-md">
                Maqueta Virtual
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
