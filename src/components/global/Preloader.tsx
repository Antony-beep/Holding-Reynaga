"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finishLoading = () => {
      setLoading(false);
      // Dispatch an event so other components (like Hero) know when to start
      window.dispatchEvent(new Event("preloaderFinished"));
    };

    const handleLoad = () => {
      // Pequeño buffer para asegurar que la animación de entrada se vea fluida
      setTimeout(finishLoading, 400);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Failsafe: nunca bloquear la pantalla por más de 1.5s artificialmente
      const fallback = setTimeout(finishLoading, 1500);
      
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#10162A]"
        >
          {/* Logo - Ahora es el punto focal principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={400}
              height={180}
              className="w-auto h-32 md:h-48 object-contain"
              priority
            />
          </motion.div>

          {/* Ladrillos dorados - Ahora más sutiles y elegantes */}
          <div className="flex gap-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-1.5 md:w-6 md:h-2 bg-gold-metallic rounded-[1px] shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                initial={{ opacity: 0.3, y: 0 }}
                animate={{ opacity: 1, y: -6 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
