"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    // Si no estamos en la home, dejamos que el Link nativo haga la redirección
    if (pathname !== "/") return;

    e.preventDefault();
    // Extraemos el hash si el id viene como "/#algo" o "#algo"
    const sectionId = id.includes("#") ? id.split("#")[1] : id;
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Limpiar el hash de la URL para que el botón sea funcional múltiples veces
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
      }, 1000);
    }
    
    if (isMobileMenuOpen) startTransition(() => setIsMobileMenuOpen(false));
  };

  const navLinks = [
    { name: "Nosotros", href: "/#nosotros" },
    { name: "Ubicación", href: "/#ubicacion" },
    { name: "Áreas Comunes", href: "/#galeria" },
    { name: "Tour 360°", href: "/#recorrido" },
    { name: "Departamentos", href: "/#departamentos" },
    { name: "Dossier", href: "/#titanium" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-deep-navy/95 backdrop-blur-xl shadow-md py-1"
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto px-6 lg:px-12 xl:px-20 2xl:px-24 max-w-[90rem] flex items-center justify-between">
          <Link href="/" className={`relative z-50 transition-transform duration-300 origin-left ${isScrolled ? "scale-[0.85]" : "scale-100"}`}>
            {/* Default to white logic if hero is dark and not scrolled, else original logo */}
            <Image
              src="/images/logo_cortado.webp"
              alt="Holding Reynaga"
              width={240}
              height={60}
              priority
              style={{ width: "auto", height: "auto", maxHeight: "40px" }}
              className={`transition-all duration-300 lg:max-h-[45px] xl:max-h-[50px] 2xl:max-h-[60px] ${
                !isScrolled ? "brightness-0 invert opacity-90" : "opacity-100"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-2 xl:gap-4 2xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[12px] xl:text-[13px] 2xl:text-base font-medium tracking-wide transition-colors text-white/90 hover:text-primary cursor-pointer whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/51981407634?text=Hola,%20quiero%20reservar%20mi%20departamento%20con%20S/1,000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-metallic text-[#1a1a1a] text-[11px] 2xl:text-sm tracking-wider uppercase font-bold px-4 py-2 2xl:px-7 2xl:py-3 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform hover:scale-105 hover:brightness-110 border border-[#FFE896]/50 cursor-pointer"
            >
              Reservar con S/ 1,000
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden relative z-50 text-white mix-blend-difference"
            onClick={() => startTransition(() => setIsMobileMenuOpen(true))}
          >
            <Menu size={28} color="#fff" />
          </button>
        </div>

        {/* Sub-bar: Holding Reynaga presenta (Appears on scroll) */}
        <div 
          className={`absolute left-0 w-full bg-[#f4f4f4] border-b border-black/5 transition-all duration-500 ease-out overflow-hidden flex items-center justify-center shadow-sm ${
            isScrolled ? "h-6 opacity-100 top-full" : "h-0 opacity-0 top-[80%]"
          }`}
        >
          <span className="text-[6.5px] min-[340px]:text-[7px] min-[360px]:text-[8px] sm:text-[9px] md:text-[11px] font-black uppercase tracking-normal min-[360px]:tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.5em] text-deep-navy/70 whitespace-nowrap">
            Holding Reynaga <span className="text-primary mx-0.5 sm:mx-1">presenta</span> Torres Titanium
          </span>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-deep-navy z-[100] flex flex-col transition-transform duration-500 ease-in-out xl:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <Image
            src="/images/logo_cortado.webp"
            alt="Holding Reynaga"
            width={180}
            height={45}
            style={{ width: "auto", height: "auto", maxHeight: "45px" }}
            className="brightness-0 invert opacity-90"
          />
          <button
            className="text-white p-2 rounded-full hover:bg-white/5 transition-colors"
            onClick={() => startTransition(() => setIsMobileMenuOpen(false))}
          >
            <X size={32} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center pb-20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-display font-display text-4xl text-white/90 transition-colors hover:text-primary cursor-pointer"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/51981407634?text=Hola,%20quiero%20reservar%20mi%20departamento%20con%20S/1,000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-metallic text-[#1a1a1a] mt-8 text-sm tracking-wider uppercase font-bold px-8 py-4 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE896]/50 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reservar con S/ 1,000
          </a>
          
          {/* Mobile Social Links */}
          <div className="flex items-center gap-6 mt-12">
            <a href="https://www.instagram.com/holdingreynaga/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold-metallic hover:text-black hover:border-gold-metallic transition-all duration-300">
              <InstagramIcon size={22} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61588196065630" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold-metallic hover:text-black hover:border-gold-metallic transition-all duration-300">
              <FacebookIcon size={22} />
            </a>
            <a href="https://www.tiktok.com/@inmobiliariaholding" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-gold-metallic hover:text-black hover:border-gold-metallic transition-all duration-300">
              <TikTokIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
