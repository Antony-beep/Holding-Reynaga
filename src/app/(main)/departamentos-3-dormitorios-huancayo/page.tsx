import type { Metadata } from "next";
import Link from "next/link";
import { APARTMENTS } from "@/data/apartments";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import {
  PillarBreadcrumb,
  ApartmentMiniCards,
  FaqBlock,
  PillarCta,
  WebPageJsonLd,
} from "@/components/seo/PillarShared";

export const metadata: Metadata = {
  title: {
    absolute: "Departamentos de 3 dormitorios en Huancayo | Torres Titanium",
  },
  description:
    "Departamentos de 3 dormitorios en venta en Huancayo: Tipos A y C en Torres Titanium, San Carlos — hasta 91.58 m². Separa con S/ 1,000 y entrega 2027.",
  alternates: { canonical: "/departamentos-3-dormitorios-huancayo" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/departamentos-3-dormitorios-huancayo",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Departamentos de 3 dormitorios en Huancayo | Torres Titanium",
    description:
      "Tipos A y C: departamentos de 3 dormitorios en San Carlos, Huancayo, hasta 91.58 m².",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Departamento de 3 dormitorios en Huancayo — Torres Titanium" },
    ],
  },
};

const FAQS_3DORM = [
  {
    question: "¿Qué departamentos de 3 dormitorios hay en Huancayo?",
    answer:
      "En Torres Titanium (San Carlos, Huancayo) hay dos modelos de 3 dormitorios: el Tipo C de 72.57 m² con 1 baño (S/ 286,651.50) y el Tipo A de 91.58 m² con 2 baños completos, lavandería y balcón parrillero (S/ 361,741.00), el más amplio del proyecto.",
  },
  {
    question: "¿Cuál es el departamento más grande de Torres Titanium?",
    answer:
      "El Tipo A: 91.58 m² con 3 dormitorios y 2 baños completos, sala-comedor, cocina, lavandería y balcón parrillero. Su precio publicado es de S/ 361,741.00 y es la tipología Premium del proyecto.",
  },
  {
    question: "¿Un departamento de 3 dormitorios cabe en mi presupuesto?",
    answer:
      "Los precios publicados de 3 dormitorios van de S/ 286,651.50 (Tipo C) a S/ 361,741.00 (Tipo A).\n\nCon la separación de S/ 1,000 se congela el precio y se firma un cronograma de pago del 10% del valor acorde a tus ingresos. El equipo de ventas también informa sobre opciones de financiamiento.",
  },
  {
    question: "¿Qué incluyen los departamentos de 3 dormitorios?",
    answer:
      "Sala-comedor, cocina, dormitorios, baños completos y lavandería. El Tipo A añade balcón parrillero y el Tipo C vista natural. Todos entregan con acabados de primera, y el edificio cuenta con dos ascensores, estacionamientos en dos sótanos y rooftop.",
  },
] as const;

export default function TresDormitoriosPage() {
  const disponibles = APARTMENTS.filter((a) => !a.isComingSoon);
  const tresDorm = disponibles.filter((a) => a.bedrooms === "3");

  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Departamentos de 3 dormitorios en Huancayo"
        description="Tipos A y C de Torres Titanium: departamentos de 3 dormitorios en San Carlos, Huancayo."
        path="/departamentos-3-dormitorios-huancayo"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Departamentos en Huancayo", href: "/departamentos-en-huancayo" },
          { name: "3 dormitorios" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Departamentos de 3 dormitorios en Huancayo
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-6">
          Las familias que buscan espacio encuentran en <strong>Torres Titanium</strong> dos
          modelos de 3 dormitorios en San Carlos, Huancayo: el <strong>Tipo C</strong> de
          72.57 m² con vista natural (S/ 286,651.50) y el <strong>Tipo A</strong> de 91.58 m²
          con 2 baños completos y balcón parrillero (S/ 361,741.00), la tipología Premium del
          proyecto.
        </p>
        <p className="text-deep-navy/70 leading-relaxed max-w-3xl">
          Compara también los{" "}
          <Link href="/departamentos-1-dormitorio-huancayo" className="text-primary font-bold hover:underline">
            departamentos de 1 dormitorio
          </Link>{" "}
          y los de{" "}
          <Link href="/departamentos-2-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            2 dormitorios
          </Link>
          , o conoce la zona en la página de{" "}
          <Link href="/departamentos-en-san-carlos-huancayo" className="text-primary font-bold hover:underline">
            departamentos en San Carlos, Huancayo
          </Link>
          .
        </p>

        <ApartmentMiniCards apartments={tresDorm} title="Modelos de 3 dormitorios disponibles" />

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Espacio para la familia en San Carlos
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            Un tercer dormitorio resuelve el crecimiento de la familia: habitación para los
            hijos, estudio o cuarto de visitas. El Tipo A añade un segundo baño completo —
            clave para familias — y balcón parrillero, mientras que el Tipo C optimiza cada
            m² con vista natural.
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            El edificio complementa la vida familiar con área de juegos para niños, zona de
            parrillas y rooftop, además de estacionamientos para residentes en dos sótanos.
            La entrega está prevista para 2027.
          </p>
        </section>

        <FaqBlock faqs={FAQS_3DORM} />

        <PillarCta context="los departamentos de 3 dormitorios" />
      </div>
    </div>
  );
}
