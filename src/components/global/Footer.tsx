import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-surface py-16 relative overflow-hidden border-t border-t-[#D4AF37]/20" id="contacto">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Image
              src="/images/logo.webp"
              alt="Holding Reynaga Logo"
              width={200}
              height={56}
              style={{ width: "auto", height: "auto" }}
              className="brightness-0 invert opacity-100"
            />
            <p className="text-surface/80 max-w-sm font-body leading-relaxed text-sm sm:text-base">
              Desarrollando espacios urbanos de alto valor, diseño excepcional y exclusividad en el corazón de Huancayo.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-5 mt-2">
              <a href="https://www.instagram.com/holdingreynaga/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-primary/20">
                <InstagramIcon size={18} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61588196065630" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-primary/20">
                <FacebookIcon size={18} />
              </a>
              <a href="https://www.tiktok.com/@inmobiliariaholding" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary/20 hover:border-primary/50 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-primary/20">
                <TikTokIcon size={16} />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-primary to-transparent hidden md:block"></div>
              <h3 className="font-display text-xs md:text-sm text-primary font-bold uppercase tracking-[0.2em]">Oficina de Ventas</h3>
            </div>
            <div className="flex flex-col gap-5 mt-2 w-full max-w-[300px] md:max-w-none mx-auto md:mx-0">
              <a href="tel:+51981407634" className="flex items-center gap-4 text-surface/80 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <span className="font-medium text-sm sm:text-base">+51 981 407 634</span>
              </a>
              <a href="mailto:holdingreynagaredes@gmail.com" className="flex items-center gap-4 text-surface/80 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <span className="font-medium break-all text-xs sm:text-sm">holdingreynagaredes@gmail.com</span>
              </a>
              <div className="flex items-start gap-4 text-surface/80 text-left group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors shrink-0 mt-1">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span className="font-medium max-w-[220px] text-sm sm:text-base leading-relaxed">
                  Jr. Lino 132, Oficina 401<br/>
                  <span className="text-xs text-surface/60 font-light block mt-0.5">A una cuadra del parque Grau</span>
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-primary to-transparent hidden md:block"></div>
              <h3 className="font-display text-xs md:text-sm text-primary font-bold uppercase tracking-[0.2em]">Enlaces Rápidos</h3>
            </div>
            <div className="flex flex-col gap-3 mt-2 text-center md:text-left">
              <Link href="#nosotros" className="text-surface/70 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm sm:text-base inline-block">Nosotros</Link>
              <Link href="#ubicacion" className="text-surface/70 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm sm:text-base inline-block">Ubicación</Link>
              <Link href="#galeria" className="text-surface/70 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm sm:text-base inline-block">Áreas Comunes</Link>
              <Link href="#recorrido" className="text-surface/70 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm sm:text-base inline-block">Tour 360°</Link>
              <Link href="#departamentos" className="text-surface/70 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm sm:text-base inline-block">Departamentos</Link>
              <Link href="#titanium" className="text-surface/70 hover:text-primary transition-all duration-300 hover:translate-x-1 text-sm sm:text-base inline-block mb-2">Dossier Informativo</Link>
              
              <Link href="#reserva" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#BF953F] via-[#F3E5AB] to-[#D4AF37] bg-[length:200%_auto] hover:bg-[position:right_center] text-deep-navy font-bold px-6 py-3 rounded-xl transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.3)] mt-2 w-fit mx-auto md:mx-0 text-xs sm:text-sm uppercase tracking-widest border border-white/40">
                Reservar Unidad
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-surface/50 font-body">
          <p className="order-2 md:order-1 text-center md:text-left">&copy; {new Date().getFullYear()} Holding Reynaga. Todos los derechos reservados.</p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 order-1 md:order-2 flex-wrap">
            <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            <span className="w-1 h-1 rounded-full bg-surface/30"></span>
            <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">Políticas de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
