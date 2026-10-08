import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import ProjectOverview from "@/components/home/ProjectOverview";
import Location from "@/components/home/Location";
import VirtualTour from "@/components/home/VirtualTour";
import Catalog from "@/components/home/Catalog";
import Gallery from "@/components/home/Gallery";
import DossierForm from "@/components/home/DossierForm";
import SocialVideos from "@/components/home/SocialVideos";
import FAQ from "@/components/home/FAQ";
import GuidesStrip from "@/components/home/GuidesStrip";
import FollowUs from "@/components/home/FollowUs";
import { ProjectJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Departamentos en venta en Huancayo | Torres Titanium",
  },
  description:
    "Departamentos en construcción en San Carlos, Huancayo: 1, 2 y 3 dormitorios, bonos vigentes de S/ 24,900 a S/ 47,850, cocheras para residentes y entrega prevista para 2027.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Departamentos en venta en Huancayo | Torres Titanium",
    description:
      "En construcción en San Carlos, Huancayo: modelos de 1 a 3 dormitorios, bonos vigentes y estacionamientos para residentes.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Torres Titanium, proyecto de departamentos en San Carlos, Huancayo",
      },
    ],
  },
};

/**
 * La home se regenera cada 24h (alineado con el scraping diario de redes).
 * El scraper también puede forzar la regeneración vía /api/revalidate.
 */
export const revalidate = 86400;

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <ProjectJsonLd />
      <Hero />
      <About />
      <Location />
      <Gallery />
      <VirtualTour />
      <Catalog />
      <ProjectOverview />
      <DossierForm />
      <SocialVideos />
      <FAQ />
      <GuidesStrip />
      <FollowUs />
    </div>
  );
}
