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
    <footer className="bg-deep-navy text-surface py-16" id="contacto">
      <div className="container mx-auto px-6 max-w-7xl">
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
            <p className="text-surface/80 max-w-sm font-body leading-relaxed">
              Desarrollando espacios urbanos de alto valor, diseño excepcional y exclusividad en el corazón de Huancayo.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-5 mt-2">
              <a href="https://www.instagram.com/holdingreynaga/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center text-white/80 hover:bg-gold-metallic hover:text-black transition-all duration-300">
                <InstagramIcon size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61588196065630" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center text-white/80 hover:bg-gold-metallic hover:text-black transition-all duration-300">
                <FacebookIcon size={20} />
              </a>
              <a href="https://www.tiktok.com/@inmobiliariaholding" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface/10 flex items-center justify-center text-white/80 hover:bg-gold-metallic hover:text-black transition-all duration-300">
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-display text-xl text-primary-container font-semibold uppercase tracking-widest">Oficina de Ventas</h3>
            <div className="flex flex-col gap-4 mt-3">
              <a href="tel:+51981407634" className="flex items-center gap-3 text-surface/90 hover:text-white transition-colors">
                <Phone size={20} className="text-primary-container" />
                <span className="font-medium">+51 981 407 634</span>
              </a>
              <div className="flex items-start gap-3 text-surface/90 text-left">
                <MapPin size={20} className="text-primary-container mt-1 shrink-0" />
                <span className="font-medium max-w-[250px]">Jr. Lino 132 oficina 401 a una cuadra del parque grau</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="font-display text-xl text-primary-container font-semibold uppercase tracking-widest">Enlaces Rápidos</h3>
            <div className="flex flex-col gap-3 mt-3">
              <Link href="#nosotros" className="text-surface/80 hover:text-white transition-colors">Nosotros</Link>
              <Link href="#ubicacion" className="text-surface/80 hover:text-white transition-colors">Ubicación</Link>
              <Link href="#galeria" className="text-surface/80 hover:text-white transition-colors">Áreas Comunes</Link>
              <Link href="#recorrido" className="text-surface/80 hover:text-white transition-colors">Tour 360°</Link>
              <Link href="#departamentos" className="text-surface/80 hover:text-white transition-colors">Departamentos</Link>
              <Link href="#titanium" className="text-surface/80 hover:text-white transition-colors">Dossier Informativo</Link>
              <Link href="#reserva" className="text-primary hover:text-white transition-colors font-medium mt-2">Reservar Unidad</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-surface/10 text-center text-sm text-surface/60 font-body">
          <p>&copy; {new Date().getFullYear()} Holding Reynaga. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
