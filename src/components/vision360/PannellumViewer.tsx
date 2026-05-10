"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    let isMounted = true;

    const initViewer = async () => {
      try {
        if (typeof window !== "undefined") {
          // Importamos pannellum de forma dinámica solo en el cliente
          await import("pannellum/build/pannellum.js");

          if (isMounted && viewerRef.current && (window as any).pannellum) {
            // Destruir instancia previa si existe
            if (viewerInstance.current) {
              viewerInstance.current.destroy();
            }

            // Inicializar pannellum
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
              },
            );
          }
        }
      } catch (error) {
        console.error("Error cargando Pannellum:", error);
      }
    };

    initViewer();

    return () => {
      isMounted = false;
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
        viewerInstance.current = null;
      }
    };
  }, [imagePath, title]);

  return (
    <div className="w-full h-screen relative bg-black">
      {/* Contenedor del visor */}
      <div id="panorama-viewer" ref={viewerRef} className="w-full h-full" />

      {/* Botón Volver */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => window.history.back()}
          className="bg-black/60 text-white/90 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/80 hover:text-white transition-all flex items-center gap-2 font-medium text-sm shadow-xl"
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
        </button>
      </div>
    </div>
  );
}
