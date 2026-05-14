import Image from "next/image";
import { Download, FileText, ShieldCheck, LayoutDashboard, Lock } from "lucide-react";

export default function ProjectOverview() {
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
          
          {/* Image Area */}
          <div className="flex-1 relative flex items-center justify-center p-4 md:p-6 z-10 w-full min-h-[250px]">
            {/* Subtle glow behind image to give it separation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/50 rounded-full blur-3xl pointer-events-none z-0" />
            
            <Image
              src="/images/DEPAS WEBP/maqueta dossier.webp"
              alt="Maqueta del dossier informativo del proyecto inmobiliario Torres Titanium en San Carlos, Huancayo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-2 md:p-4 transition-transform duration-1000 hover:scale-[1.03] z-10 drop-shadow-2xl"
            />
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
    </section>
  );
}
