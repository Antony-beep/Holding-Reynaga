"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  activeLocationId: string | null;
}

const mapLocations = [
  {
    id: "titanium",
    coords: [-12.047615, -75.200334] as [number, number],
    type: "main",
    name: "Torres Titanium",
  },
  {
    id: "continental",
    coords: [-12.0474, -75.199086] as [number, number],
    type: "education",
    name: "Univ. Continental",
  },
  {
    id: "upla",
    coords: [-12.040383, -75.192639] as [number, number],
    type: "education",
    name: "UPLA",
  },
  {
    id: "roosevelt",
    coords: [-12.041842, -75.195334] as [number, number],
    type: "education",
    name: "Roosevelt",
  },
  {
    id: "grau",
    coords: [-12.050571, -75.195599] as [number, number],
    type: "park",
    name: "Parque Grau",
  },
  {
    id: "identidad",
    coords: [-12.049153, -75.197842] as [number, number],
    type: "park",
    name: "Parque Identidad",
  },
  {
    id: "tupac",
    coords: [-12.059964, -75.203606] as [number, number],
    type: "park",
    name: "Parque Túpac",
  },
  {
    id: "makro",
    coords: [-12.047023, -75.207445] as [number, number],
    type: "commercial",
    name: "Makro",
  },
  {
    id: "mallplaza",
    coords: [-12.062052, -75.20912] as [number, number],
    type: "commercial",
    name: "Mallplaza",
  },
  {
    id: "realplaza",
    coords: [-12.065998, -75.205251] as [number, number],
    type: "commercial",
    name: "Real Plaza",
  },
];

const SVGS = {
  main: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" style="width: 70px; height: 84px; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.3));">
      <path d="M50 2 C23.5 2 2 23.5 2 50 C2 75 50 118 50 118 C50 118 98 75 98 50 C98 23.5 76.5 2 50 2 Z" fill="#001F3F" stroke="#ffffff" stroke-width="4"/>
      <path d="M25 75 L25 50 L40 42 L40 75 Z" fill="#D4AF37" />
      <path d="M42 75 L42 30 L58 20 L58 75 Z" fill="#D4AF37" />
      <path d="M60 75 L60 48 L75 55 L75 75 Z" fill="#D4AF37" />
      <rect x="20" y="75" width="60" height="4" fill="#D4AF37" />
      <rect x="28" y="55" width="4" height="4" fill="#001F3F" />
      <rect x="34" y="55" width="4" height="4" fill="#001F3F" />
      <rect x="28" y="63" width="4" height="4" fill="#001F3F" />
      <rect x="34" y="63" width="4" height="4" fill="#001F3F" />
      <rect x="46" y="35" width="6" height="6" fill="#001F3F" />
      <rect x="46" y="45" width="6" height="6" fill="#001F3F" />
      <rect x="46" y="55" width="6" height="6" fill="#001F3F" />
      <rect x="46" y="65" width="6" height="6" fill="#001F3F" />
      <rect x="64" y="60" width="8" height="3" fill="#001F3F" />
      <rect x="64" y="66" width="8" height="3" fill="#001F3F" />
    </svg>
  `,
  education: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-[#00224A]"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  park: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-[#4A5D23]"><path d="M12 22v-7"/><path d="M12 15C8 15 5 11 5 7a7 7 0 0 1 14 0c0 4-3 8-7 8z"/></svg>`,
  commercial: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-[#00224A]"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
};

const createCustomIcon = (
  type: keyof typeof SVGS,
  isActive: boolean,
  isMain: boolean,
  name: string,
) => {
  const activeClass = isActive ? "active-pill" : "";
  const dropClass = "custom-marker-drop";

  if (isMain) {
    return L.divIcon({
      html: `
        <div class="marker-wrapper-main ${activeClass} ${dropClass}" style="width: 70px; height: 84px;">
          <div class="marker-pulse-main"></div>
          ${SVGS[type]}
        </div>
      `,
      className: "custom-leaflet-container",
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  }

  const baseClass = "secondary-pill";
  return L.divIcon({
    html: `
      <div class="marker-pill ${baseClass} ${activeClass} ${dropClass}">
        <div class="marker-icon-container">
          ${SVGS[type]}
        </div>
        <span class="marker-label">${name}</span>
      </div>
    `,
    className: "custom-leaflet-container",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// Component to handle map centering logic or hooks if needed
function MapEffects() {
  const map = useMap();
  useEffect(() => {
    // Optionally trigger layout reflow or handle bounds
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function LocationMap({ activeLocationId }: LocationMapProps) {
  return (
    <MapContainer
      center={[-12.052, -75.202]}
      zoom={15}
      scrollWheelZoom={false}
      attributionControl={false}
      className="w-full h-full bg-surface-container-low"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <MapEffects />

      {mapLocations.map((loc) => (
        <Marker
          key={loc.id}
          position={loc.coords}
          icon={createCustomIcon(
            loc.type as keyof typeof SVGS,
            activeLocationId === loc.id,
            loc.type === "main",
            loc.name,
          )}
          zIndexOffset={
            activeLocationId === loc.id ? 1000 : loc.type === "main" ? 500 : 0
          }
          eventHandlers={{
            click: () => {
              if (loc.id === "titanium") {
                window.open("https://maps.app.goo.gl/MDkQS5EhgYxrCp5b8", "_blank", "noopener,noreferrer");
              }
            }
          }}
        />
      ))}
    </MapContainer>
  );
}
