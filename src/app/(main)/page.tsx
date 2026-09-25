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
import FollowUs from "@/components/home/FollowUs";

/**
 * La home se regenera cada 24h (alineado con el scraping diario de redes).
 * El scraper también puede forzar la regeneración vía /api/revalidate.
 */
export const revalidate = 86400;

export default function Home() {
  return (
    <div className="flex flex-col w-full">
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
      <FollowUs />
    </div>
  );
}
