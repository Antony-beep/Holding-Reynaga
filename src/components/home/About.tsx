"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-[#F4F4F4] relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left Text Block */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.2 }}
            className="flex-1 w-full lg:max-w-2xl order-2 lg:order-1 pt-8 lg:pt-0"
          >
            <motion.div 
              variants={fadeUpVariant} 
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} 
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-1.5 h-6 bg-primary"></div>
              <span className="font-display font-semibold text-primary tracking-[0.15em] text-sm md:text-base uppercase">Arquitectura Monumental</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeUpVariant} 
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} 
              className="text-display font-black text-5xl lg:text-6xl text-deep-navy mb-8 leading-[1.05] tracking-tighter"
            >
              Una visión de <br />
              permanencia y elegancia <br />
              urbana.
            </motion.h2>
            
            <motion.p 
              variants={fadeUpVariant} 
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} 
              className="font-body text-on-surface/80 text-xl mb-12 leading-relaxed max-w-lg"
            >
              Inspirados en la solidez del concreto y la calidez del bronce, Holding Reynaga redefine el horizonte urbano con una propuesta que equilibra la estética minimalista y el confort absoluto. Cada ángulo ha sido diseñado para maximizar la luz natural y ofrecer espacios que respiran.
            </motion.p>

            {/* Stats row */}
            <motion.div 
              variants={fadeUpVariant} 
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} 
              className="grid grid-cols-2 gap-8 md:gap-12 mt-12 mb-4"
            >
              <div>
                <div className="text-primary font-display font-bold text-4xl mb-2">12+</div>
                <div className="text-deep-navy font-display font-bold text-xs md:text-sm tracking-widest uppercase">Niveles de Lujo</div>
              </div>
              <div>
                <div className="text-primary font-display font-bold text-4xl mb-2">10+</div>
                <div className="text-deep-navy font-display font-bold text-xs md:text-sm tracking-widest uppercase">Amenidades Exclusivas</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Block with floating Quote */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="flex-1 w-full order-1 lg:order-2 relative group"
          >
            <div className="relative h-[450px] sm:h-[600px] lg:h-[750px] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50">
              
              {/* Dynamic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-deep-navy/20 to-transparent group-hover:opacity-0 transition-opacity duration-[1s] z-10 pointer-events-none mix-blend-multiply" />
              
              <Image 
                src="/images/Fachada%20TT%205.webp" 
                alt="Fachada exterior del edificio de departamentos Torres Titanium en venta en San Carlos Huancayo" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />

              {/* Creative Floating Badge Top Right */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/30 flex items-center gap-3 shadow-lg z-20 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-display font-bold text-white tracking-widest text-xs uppercase drop-shadow-md">Diseño de Autor</span>
              </div>
            </div>
            
            {/* Overlap Quote Box */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -bottom-8 -left-6 sm:-left-12 lg:-left-16 bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] max-w-[280px] md:max-w-[340px] z-30 rounded-3xl border border-white/60 group-hover:-translate-y-3 transition-transform duration-[1s] ease-out"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] rounded-t-3xl" />
              <p className="text-deep-navy font-body italic text-lg md:text-xl font-medium leading-relaxed mb-6">
                "Buscamos que cada residente sienta que su hogar es una pieza de arte habitable."
              </p>
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#D4AF37]"></span>
                <span className="text-[#D4AF37] font-display font-bold text-xs tracking-[0.2em] uppercase">Arq. Principal</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
