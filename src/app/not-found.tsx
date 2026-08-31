"use client";

import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-[90vh] flex flex-col items-center justify-center bg-deep-navy text-white px-4 py-16 overflow-hidden">
      {/* Background Decorative Auras */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative architectural grid lines (luxury theme) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-xl text-center flex flex-col items-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center bg-white/5 backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-25" />
          <Compass className="w-12 h-12 text-primary animate-float" />
        </motion.div>

        {/* Huge Stylized 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-display font-black text-8xl md:text-9xl tracking-tighter text-gold-metallic mb-4 select-none"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight mb-4"
        >
          Página No Encontrada
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-white/70 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed font-light"
        >
          La ruta que intenta buscar no existe o ha sido trasladada. Permítanos guiarle de vuelta a su destino.
        </motion.p>

        {/* Elegant Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 bg-gold-metallic hover:opacity-95 text-deep-navy font-display font-bold tracking-widest text-xs uppercase px-8 py-4 rounded-xl shadow-[0_10px_25px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.25)] transition-all duration-300 overflow-hidden"
          >
            {/* Glossy shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <Home className="w-[16px] h-[16px] transition-transform duration-300 group-hover:scale-110" />
            <span>Volver al Inicio</span>
            <ArrowRight className="w-[16px] h-[16px] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Floating Sparkles/Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="particle" style={{ left: "10%", top: "40%", "--dx": "25px", "--dy": "-60px", "--duration": "5s", "--delay": "0s" } as React.CSSProperties} />
        <div className="particle" style={{ left: "85%", top: "20%", "--dx": "-30px", "--dy": "-80px", "--duration": "7s", "--delay": "1s" } as React.CSSProperties} />
        <div className="particle" style={{ left: "30%", top: "75%", "--dx": "40px", "--dy": "-45px", "--duration": "6s", "--delay": "2.5s" } as React.CSSProperties} />
        <div className="particle" style={{ left: "70%", top: "80%", "--dx": "-20px", "--dy": "-70px", "--duration": "4s", "--delay": "1.5s" } as React.CSSProperties} />
      </div>
    </main>
  );
}
