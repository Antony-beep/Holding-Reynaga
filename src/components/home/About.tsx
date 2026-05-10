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
            className="flex-1 w-full order-1 lg:order-2 relative"
          >
            <div className="relative h-[450px] sm:h-[600px] lg:h-[750px] w-full rounded-sm overflow-hidden shadow-2xl">
              <Image 
                src="/images/Fachada%20TT%205.webp" 
                alt="Fachada Torres Titanium" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            
            {/* Overlap Quote Box */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -bottom-8 -left-6 sm:-left-12 lg:-left-16 bg-white p-8 md:p-10 shadow-architectural max-w-[280px] md:max-w-[340px] z-20 rounded-sm border-t-4 border-primary"
            >
              <p className="text-deep-navy font-body italic text-lg md:text-xl font-medium leading-relaxed mb-6">
                "Buscamos que cada residente sienta que su hogar es una pieza de arte habitable."
              </p>
              <div className="flex items-center gap-2">
                <span className="w-6 h-px bg-primary"></span>
                <span className="text-primary font-display font-bold text-xs tracking-widest uppercase">Arq. Principal</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
