import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import ProjectOverview from "@/components/home/ProjectOverview";
import Location from "@/components/home/Location";
import VirtualTour from "@/components/home/VirtualTour";
import Catalog from "@/components/home/Catalog";
import Gallery from "@/components/home/Gallery";
import DossierForm from "@/components/home/DossierForm";
import FAQ from "@/components/home/FAQ";

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
      <FAQ />
      <DossierForm />
    </div>
  );
}
