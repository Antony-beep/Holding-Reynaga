"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    __HERO_VIDEO_PLAYED__?: boolean;
  }
}

const PriceTag = ({ className = "" }: { className?: string }) => (
  <div
    className={`cursor-pointer origin-[10%_50%] hover:scale-[1.05] transition-transform duration-300 hero-tag-animated drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] relative inline-block group ${className}`}
  >
    <div
      className="overflow-hidden w-[220px] xl:w-[260px] relative inline-block backdrop-blur-md rounded-r-xl border-[0.5px] border-white/10"
      style={{
        clipPath: "polygon(1.5rem 0, 100% 0, 100% 100%, 1.5rem 100%, 0 50%)",
      }}
    >
      {/* Simulación del agujero de la etiqueta */}
      <div className="absolute left-[0.45rem] top-[50%] -translate-y-1/2 w-3 h-3 bg-[#0a0f1a]/80 border-[1.5px] border-surface/40 rounded-full z-30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />

      <div className="bg-gold-metallic pl-10 xl:pl-12 pr-6 pt-5 pb-5 relative z-0 border-b border-[#FFE896]/30">
        <span className="text-black text-xs xl:text-sm font-black tracking-[0.3em] uppercase block relative z-10 text-left opacity-95">
          Separa con
        </span>
      </div>
      <div className="bg-[#001736]/95 pl-10 xl:pl-12 pr-6 pt-5 pb-8 relative z-0">
        <span
          className="text-surface font-display text-[2.2rem] xl:text-[2.8rem] leading-none font-black italic tracking-tighter drop-shadow-lg inline-block"
          style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.8)" }}
        >
          S/1,000
        </span>
      </div>
    </div>
  </div>
);

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== "undefined") {
      if (window.__HERO_VIDEO_PLAYED__) {
        // Already played once in this session, play immediately
        if (videoRef.current) {
          videoRef.current.play().catch((e) => console.log(e));
        }
      } else {
        // First time, wait for preloader (2000ms delay + 500ms fadeout)
        const timer = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch((e) => console.log(e));
          }
          window.__HERO_VIDEO_PLAYED__ = true;
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-deep-navy">
        {/* Video Background */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-[60%_center] md:object-center opacity-80"
        >
          <source src="/videos/HeroOficial.mp4" type="video/mp4" />
        </video>

        {/* Slightly darker gradient on the left to ensure text readability (Moved behind the vectors) */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/85 via-deep-navy/40 to-transparent z-0" />

        {/* Vector Architectural Overlay */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-45 pointer-events-none mix-blend-screen overflow-hidden">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              className="svg-architectural-line"
              stroke="#D4AF37"
              strokeWidth="1.5"
              fill="none"
            >
              {/* Vertical Grid Lines */}
              <line x1="320" y1="0" x2="320" y2="1080" opacity="0.3" />
              <line x1="640" y1="0" x2="640" y2="1080" opacity="0.3" />
              <line x1="960" y1="0" x2="960" y2="1080" opacity="0.3" />
              <line x1="1280" y1="0" x2="1280" y2="1080" opacity="0.3" />
              <line x1="1600" y1="0" x2="1600" y2="1080" opacity="0.3" />

              {/* Horizontal Grid Lines */}
              <line x1="0" y1="180" x2="1920" y2="180" opacity="0.25" />
              <line x1="0" y1="360" x2="1920" y2="360" opacity="0.25" />
              <line x1="0" y1="540" x2="1920" y2="540" opacity="0.25" />
              <line x1="0" y1="720" x2="1920" y2="720" opacity="0.25" />
              <line x1="0" y1="900" x2="1920" y2="900" opacity="0.25" />

              {/* Full-width Diagonal Structural Lines */}
              <line
                x1="0"
                y1="1080"
                x2="1920"
                y2="0"
                strokeWidth="2"
                opacity="0.35"
              />
              <line
                x1="0"
                y1="0"
                x2="1920"
                y2="1080"
                strokeWidth="2"
                opacity="0.35"
              />
              <line
                x1="0"
                y1="540"
                x2="1920"
                y2="1080"
                strokeWidth="1.5"
                opacity="0.3"
              />
              <line
                x1="0"
                y1="1080"
                x2="960"
                y2="0"
                strokeWidth="1.5"
                opacity="0.3"
              />

              {/* Left Side Specific Architectural Elements */}
              <path
                d="M 0 200 L 400 200 M 0 250 L 350 250 M 0 300 L 450 300"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <circle
                cx="200"
                cy="800"
                r="150"
                strokeWidth="1.5"
                opacity="0.25"
              />
              <path
                d="M 100 600 L 300 1000 M 50 700 L 400 1080"
                strokeWidth="2"
                opacity="0.3"
              />
              <rect
                x="50"
                y="400"
                width="200"
                height="150"
                strokeWidth="1"
                opacity="0.2"
              />

              {/* Right Building Silhouette */}
              <path
                d="M 1300 100 L 1700 100 L 1700 1080 L 1300 1080 Z"
                strokeWidth="2"
                opacity="0.6"
              />
              <path
                d="M 1400 50 L 1400 1080 M 1500 50 L 1500 1080 M 1600 50 L 1600 1080"
                strokeWidth="1.5"
                opacity="0.45"
              />
              <path
                d="M 1300 250 L 1700 250 M 1300 450 L 1700 450 M 1300 650 L 1700 650 M 1300 850 L 1700 850"
                strokeWidth="1.5"
                opacity="0.5"
              />

              {/* Center / Left Complex Structures */}
              <path
                d="M 150 300 L 450 300 L 450 1080 L 150 1080 Z"
                strokeWidth="1.8"
                opacity="0.3"
              />
              <path
                d="M 250 350 L 450 350 M 250 450 L 450 450 M 250 550 L 450 550"
                strokeWidth="1.2"
                opacity="0.2"
              />

              <path
                d="M 640 400 L 960 400 L 960 1080 L 640 1080 Z"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <polygon
                points="640,400 800,200 960,400"
                strokeWidth="1.5"
                opacity="0.35"
                fill="none"
              />

              <circle
                cx="960"
                cy="540"
                r="300"
                strokeWidth="1"
                opacity="0.3"
                fill="none"
              />
              <circle
                cx="960"
                cy="540"
                r="450"
                strokeWidth="1"
                opacity="0.25"
                fill="none"
              />
            </g>
          </svg>
        </div>

        {/* Particles Layer */}
        {isMounted && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
            {[...Array(40)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="particle"
                style={
                  {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    "--dx": `${(Math.random() - 0.5) * 100}px`,
                    "--dy": `${-100 - Math.random() * 200}px`,
                    "--duration": `${6 + Math.random() * 8}s`,
                    "--delay": `${Math.random() * 5}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Stats Strip - High Prominence */}
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-5 lg:gap-6 2xl:gap-10 z-40 bg-[#0a0f1a]/40 backdrop-blur-xl border border-r-0 border-white/10 rounded-l-[1.25rem] lg:rounded-l-[1.5rem] 2xl:rounded-l-[2rem] py-6 lg:py-8 2xl:py-16 pl-3 pr-4 lg:pl-5 lg:pr-8 2xl:px-8 shadow-[-15px_0_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:bg-[#0a0f1a]/60">
        <div className="flex flex-col items-center gap-2 lg:gap-3 2xl:gap-4 group">
          <span className="text-gold-metallic font-display font-black text-xl lg:text-2xl 2xl:text-4xl tracking-tighter group-hover:scale-110 transition-transform drop-shadow-lg">
            13
          </span>
          <span
            className="text-surface/95 font-body text-[0.55rem] lg:text-[0.6rem] 2xl:text-xs font-bold uppercase tracking-[0.3em] lg:tracking-[0.4em] 2xl:tracking-[0.5em] rotate-180 drop-shadow"
            style={{ writingMode: "vertical-rl" }}
          >
            Pisos
          </span>
        </div>

        {/* Elegant Divider */}
        <div className="w-[1px] h-4 lg:h-6 2xl:h-10 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent"></div>

        <div className="flex flex-col items-center gap-2 lg:gap-3 2xl:gap-4 group">
          <span className="text-gold-metallic font-display font-black text-xl lg:text-2xl 2xl:text-4xl tracking-tighter group-hover:scale-110 transition-transform drop-shadow-lg">
            59
          </span>
          <span
            className="text-surface/95 font-body text-[0.55rem] lg:text-[0.6rem] 2xl:text-xs font-bold uppercase tracking-[0.3em] lg:tracking-[0.4em] 2xl:tracking-[0.5em] rotate-180 drop-shadow"
            style={{ writingMode: "vertical-rl" }}
          >
            Residencias
          </span>
        </div>

        {/* Elegant Divider */}
        <div className="w-[1px] h-4 lg:h-6 2xl:h-10 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent"></div>

        <div className="flex flex-col items-center gap-2 lg:gap-3 2xl:gap-4 group">
          <span className="text-gold-metallic font-display font-black text-lg lg:text-xl 2xl:text-3xl tracking-tighter group-hover:scale-110 transition-transform drop-shadow-lg">
            2027
          </span>
          <span
            className="text-surface/95 font-body text-[0.55rem] lg:text-[0.6rem] 2xl:text-xs font-bold uppercase tracking-[0.3em] lg:tracking-[0.4em] 2xl:tracking-[0.5em] rotate-180 drop-shadow"
            style={{ writingMode: "vertical-rl" }}
          >
            Entrega
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 md:px-12 max-w-[90rem] mx-auto w-full mt-24 lg:mt-6 xl:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column Text & CTAs */}
          <motion.div
            className="col-span-1 lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 2.1 },
              },
            }}
          >
            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="text-surface text-[0.60rem] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold mb-2 lg:mb-3 xl:mb-6 drop-shadow-md opacity-90 pl-1"
            >
              Holding Reynaga Presenta
            </motion.p>

            {/* Main Title Stacked */}
            <h1 className="text-display font-display text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[6.5rem] 2xl:text-[8.5rem] leading-[0.9] drop-shadow-2xl mb-3 lg:mb-4 xl:mb-8 flex flex-col">
              <motion.div
                className="flex overflow-hidden mb-1 sm:mb-2 pb-1"
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                  },
                }}
              >
                {"TORRES".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="text-surface font-extralight tracking-tight drop-shadow-lg"
                    variants={{
                      hidden: {
                        y: 150,
                        opacity: 0,
                        clipPath:
                          "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                      },
                      visible: {
                        y: 0,
                        opacity: 1,
                        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                        transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] },
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
              <motion.span
                className="text-outline-to-fill block font-black"
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -50,
                    scaleX: 0.9,
                    transformOrigin: "left",
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    scaleX: 1,
                    transition: { duration: 1.2, ease: "easeOut" },
                  },
                }}
              >
                TITANIUM
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="font-body text-surface/90 text-sm sm:text-base lg:text-base xl:text-xl 2xl:text-2xl max-w-xl mb-4 lg:mb-5 xl:mb-12 leading-relaxed font-light drop-shadow"
            >
              Elegancia Urbana en el Corazón de Huancayo.
              <br className="hidden md:block" /> Vive cerca de TODO.
            </motion.p>

            {/* Inline Features Tags */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-5 lg:mb-6 xl:mb-10 drop-shadow-lg w-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <div className="bg-surface/10 backdrop-blur-md border border-surface/20 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-surface"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-surface text-[0.60rem] sm:text-xs opacity-70 uppercase tracking-wider font-semibold">
                    Congela el precio
                  </p>
                  <p className="text-surface font-bold text-xs sm:text-base lg:text-sm xl:text-base">
                    Moneda Local
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTAs Row */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 xl:gap-6 w-full sm:w-auto mt-2 lg:mt-3 xl:mt-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              {/* Main Button */}
              <button className="bg-gold-metallic text-black px-4 sm:px-6 xl:px-8 py-3.5 sm:py-4 rounded-lg font-body font-black tracking-[0.15em] sm:tracking-widest transition-all duration-300 hover:scale-105 hover:brightness-110 uppercase text-[0.65rem] sm:text-sm lg:text-xs xl:text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] min-h-[48px] sm:min-h-[56px] xl:min-h-[60px] flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto border border-[#FFE896]/50">
                Reserva Tu Departamento
                <svg
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>

              {/* Secondary Button */}
              <button className="bg-surface/5 hover:bg-surface/10 backdrop-blur-md border border-white/40 text-surface px-4 sm:px-6 xl:px-8 py-3.5 sm:py-4 rounded-lg font-body font-bold tracking-[0.15em] sm:tracking-widest transition-all duration-300 hover:scale-[1.03] uppercase text-[0.65rem] sm:text-sm lg:text-xs xl:text-sm shadow-[0_10px_30px_rgba(0,0,0,0.3)] min-h-[48px] sm:min-h-[56px] xl:min-h-[60px] flex items-center justify-center w-full sm:w-auto">
                Ver Catálogo
              </button>
            </motion.div>

            {/* Mobile/Tablet Horizontal Stats Strip */}
            <motion.div
              className="lg:hidden w-full flex justify-between items-center bg-surface/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 mt-6 drop-shadow-2xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <span className="text-gold-metallic font-display font-black text-xl sm:text-2xl drop-shadow-md">
                  13
                </span>
                <span className="text-surface/80 text-[0.50rem] sm:text-[0.65rem] uppercase tracking-[0.2em] font-bold">
                  Pisos
                </span>
              </div>
              <div className="w-[1px] h-8 sm:h-10 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <span className="text-gold-metallic font-display font-black text-xl sm:text-2xl drop-shadow-md">
                  59
                </span>
                <span className="text-surface/80 text-[0.50rem] sm:text-[0.65rem] uppercase tracking-[0.2em] font-bold">
                  Residencias
                </span>
              </div>
              <div className="w-[1px] h-8 sm:h-10 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <span className="text-gold-metallic font-display font-black text-xl sm:text-2xl drop-shadow-md">
                  2027
                </span>
                <span className="text-surface/80 text-[0.50rem] sm:text-[0.65rem] uppercase tracking-[0.2em] font-bold">
                  Entrega
                </span>
              </div>
            </motion.div>

            {/* Mobile Tag (Visible solo en dispositivos móviles) */}
            <motion.div
              className="mt-6 sm:mt-10 mb-8 w-full flex justify-center lg:hidden z-20 scale-90 sm:scale-100 origin-top"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 0.9,
                  transition: { duration: 0.5 },
                },
              }}
            >
              <PriceTag />
            </motion.div>
          </motion.div>

          {/* Right Column (Open for Video visibility) */}
          <div className="hidden lg:block col-span-5 xl:col-span-6 relative h-full pointer-events-none">
            {/* Animated Floating Tag positioned over the building */}
            <div className="absolute top-[25%] xl:top-[35%] right-[22%] xl:right-[15%] pointer-events-auto z-50 mix-blend-normal transform scale-[0.75] xl:scale-100 origin-right">
              <PriceTag />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 lg:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 lg:gap-2 z-20 animate-bounce-scroll pointer-events-none opacity-80">
        <span className="text-surface/60 text-[0.55rem] lg:text-[0.6rem] tracking-[0.4em] uppercase font-bold">
          Descubre
        </span>
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
