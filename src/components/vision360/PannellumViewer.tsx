"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Move, Hand } from "lucide-react";
import "pannellum/build/pannellum.css";

interface PannellumViewerProps {
  imagePath: string;
  title: string;
}

export default function PannellumViewer({
  imagePath,
  title,
}: PannellumViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);
  const [showHint, setShowHint] = useState(true);
  const params = useParams();
  const currentType = (params?.type as string) || "a";

  useEffect(() => {
    let isMounted = true;

    const initViewer = async () => {
      try {
        if (typeof window !== "undefined") {
          await import("pannellum/build/pannellum.js");

          if (isMounted && viewerRef.current && (window as any).pannellum) {
            if (viewerInstance.current) {
              viewerInstance.current.destroy();
            }

            viewerInstance.current = (window as any).pannellum.viewer(
              viewerRef.current.id,
              {
                type: "equirectangular",
                panorama: imagePath,
                autoLoad: true,
                title: title,
                author: "Torres Titanium",
                compass: false,
                showFullscreenCtrl: true,
                showZoomCtrl: true,
                mouseZoom: true,
                hfov: 120,
                minHfov: 50,
                maxHfov: 120,
              },
            );
          }
        }
      } catch (error) {
        console.error("Error cargando Pannellum:", error);
      }
    };

    initViewer();

    // Auto-hide hint after 6 seconds
    const hintTimer = setTimeout(() => {
      if (isMounted) setShowHint(false);
    }, 6000);

    return () => {
      isMounted = false;
      clearTimeout(hintTimer);
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
        viewerInstance.current = null;
      }
    };
  }, [imagePath, title]);

  return (
    <div
      className="w-full h-screen relative bg-black"
      onPointerDown={() => setShowHint(false)}
      onTouchStart={() => setShowHint(false)}
    >
      {/* Contenedor del visor */}
      <div id="panorama-viewer" ref={viewerRef} className="w-full h-full" />

      {/* UX Overlay: Drag Hint */}
      <div
        className={`absolute inset-0 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-1000 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-deep-navy/70 backdrop-blur-md border border-white/20 p-6 rounded-3xl flex flex-col items-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-bounce-scroll">
          <div className="relative mb-3 flex items-center justify-center">
            <Hand className="w-12 h-12 text-[#D4AF37] animate-pulse-wa" />
            <Move className="w-6 h-6 text-white absolute -bottom-1 -right-1" />
          </div>
          <span className="font-display font-black text-white tracking-[0.1em] text-sm uppercase text-center">
            Arrastra para
            <br />
            explorar en 360°
          </span>
        </div>
      </div>

      {/* Botón Volver */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="bg-black/60 text-white/90 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 flex items-center gap-2 font-display font-bold uppercase tracking-wider text-xs md:text-sm shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver
        </Link>
      </div>

      {/* Botones de Departamentos */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full px-4 flex justify-center">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full flex items-center gap-2 shadow-2xl">
          {[
            { id: "a", label: "Depto A" },
            { id: "b", label: "Depto B" },
            { id: "g", label: "Depto G" },
          ].map((depto) => (
            <Link
              key={depto.id}
              href={`/vision360/${depto.id}`}
              className={`px-5 py-2.5 rounded-full font-display font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ${
                currentType === depto.id
                  ? "bg-gradient-to-r from-[#BF953F] to-[#B38728] text-white shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {depto.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
