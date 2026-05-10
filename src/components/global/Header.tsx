"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Nosotros", href: "#nosotros" },
    { name: "Titanium", href: "#titanium" },
    { name: "Departamentos", href: "#departamentos" },
    { name: "Ubicación", href: "#ubicacion" },
    { name: "Contacto", href: "#contacto" },
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
        <div className="container mx-auto px-6 lg:pl-6 lg:pr-28 xl:pr-6 max-w-7xl flex items-center justify-between">
          <Link href="/" className={`relative z-50 transition-transform duration-300 origin-left ${isScrolled ? "scale-[0.85]" : "scale-100"}`}>
            {/* Default to white logic if hero is dark and not scrolled, else original logo */}
            <Image
              src="/images/logo_cortado.webp"
              alt="Holding Reynaga"
              width={240}
              height={60}
              style={{ width: "auto", height: "auto", maxHeight: "60px" }}
              className={`transition-all duration-300 ${
                !isScrolled ? "brightness-0 invert opacity-90" : "opacity-100"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium tracking-wide transition-colors text-white/90 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#reserva"
              className="bg-gold-metallic text-[#1a1a1a] text-sm tracking-wider uppercase font-bold px-7 py-3 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform hover:scale-105 hover:brightness-110 border border-[#FFE896]/50"
            >
              Reservar con S/ 1,000
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-50 text-white mix-blend-difference"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} color="#fff" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-surface z-[100] flex flex-col transition-transform duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <Image
            src="/images/logo_cortado.webp"
            alt="Holding Reynaga"
            width={180}
            height={45}
            style={{ width: "auto", height: "auto", maxHeight: "45px" }}
          />
          <button
            className="text-[#1a1c1c] p-2 rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
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
              className="text-display font-display text-4xl text-on-surface transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#reserva"
            className="bg-gold-metallic text-[#1a1a1a] mt-8 text-sm tracking-wider uppercase font-bold px-8 py-4 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE896]/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reservar con S/ 1,000
          </Link>
          
          {/* Mobile Social Links */}
          <div className="flex items-center gap-6 mt-12">
            <a href="https://www.instagram.com/holdingreynaga/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-surface/20 flex items-center justify-center text-surface/80 hover:bg-gold-metallic hover:text-black hover:border-gold-metallic transition-all duration-300">
              <InstagramIcon size={22} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61588196065630" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-surface/20 flex items-center justify-center text-surface/80 hover:bg-gold-metallic hover:text-black hover:border-gold-metallic transition-all duration-300">
              <FacebookIcon size={22} />
            </a>
            <a href="https://www.tiktok.com/@inmobiliariaholding" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-surface/20 flex items-center justify-center text-surface/80 hover:bg-gold-metallic hover:text-black hover:border-gold-metallic transition-all duration-300">
              <TikTokIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
