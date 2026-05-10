import Image from "next/image";
import { Download, FileText, Box, Star } from "lucide-react";

export default function ProjectOverview() {
  return (
    <section
      id="titanium"
      className="py-0 border-y border-surface-container-highest relative z-10 flex flex-col w-full"
    >
      {/* Dossier Informativo Block */}
      <div className="w-full bg-deep-navy flex flex-col lg:flex-row">
        {/* Text Container (Left) */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center order-2 lg:order-1 p-8 md:p-12 lg:p-14">
          <div className="w-full max-w-[550px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-5 bg-primary"></div>
              <span className="font-display font-semibold text-primary tracking-[0.1em] text-sm uppercase">
                Material Exclusivo
              </span>
            </div>

            <h2 className="text-display font-black text-5xl md:text-6xl text-white mb-6 tracking-tighter">
              Dossier Informativo
            </h2>

            <p className="font-body text-white/80 text-lg mb-10 leading-relaxed font-light">
              Accede a los detalles técnicos, planos exclusivos y la memoria
              descriptiva completa de Torres Titanium. Al registrar tus datos,
              recibirás acceso inmediato para descargar el dossier comercial en
              formato digital de alta resolución.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-12">
              <div className="flex items-center gap-3">
                <FileText className="text-primary w-5 h-5 shrink-0" />
                <span className="font-display font-bold text-white text-sm">
                  Planos de Arquitectura
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Box className="text-primary w-5 h-5 shrink-0" />
                <span className="font-display font-bold text-white text-sm">
                  Acabados Premium
                </span>
              </div>
            </div>

            <button className="bg-primary text-white font-display font-bold tracking-widest text-sm uppercase px-8 py-5 flex items-center justify-center gap-3 w-full sm:w-max mx-auto sm:mx-0 hover:bg-primary-container transition-colors shadow-lg">
              Descarga y obten mas detalles
              <Download className="w-4 h-4 mb-0.5" />
            </button>
          </div>
        </div>

        {/* Image Container (Right) */}
        <div className="flex-1 lg:w-1/2 relative min-h-[350px] lg:min-h-[550px] order-1 lg:order-2">
          <Image
            src="/images/Fachada%20TT%201.webp"
            alt="Interiores Torres Titanium"
            fill
            className="object-cover"
          />
          {/* Gold Star Badge */}
          <div className="absolute top-0 right-0 lg:right-auto lg:left-0 bg-primary p-4 md:p-6 shadow-lg z-10 flex">
            <Star fill="white" className="text-white w-6 h-6 md:w-8 md:h-8 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
