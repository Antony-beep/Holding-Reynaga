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
    absolute: "Departamentos de 2 dormitorios en Huancayo | Torres Titanium",
  },
  description:
    "Departamentos de 2 dormitorios en venta en Huancayo: Tipos B y D en Torres Titanium, San Carlos — desde S/ 257,777.00. Separa con S/ 1,000 y entrega 2027.",
  alternates: { canonical: "/departamentos-2-dormitorios-huancayo" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/departamentos-2-dormitorios-huancayo",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Departamentos de 2 dormitorios en Huancayo | Torres Titanium",
    description:
      "Tipos B y D: departamentos de 2 dormitorios en San Carlos, Huancayo, desde S/ 257,777.00.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Departamento de 2 dormitorios en Huancayo — Torres Titanium" },
    ],
  },
};

const FAQS_2DORM = [
  {
    question: "¿Qué departamentos de 2 dormitorios hay en Huancayo?",
    answer:
      "En Torres Titanium (San Carlos, Huancayo) hay dos modelos de 2 dormitorios: el Tipo D de 65.26 m² con 2 baños (S/ 257,777.00) y el Tipo B de 77.77 m² con 2 baños, sala-comedor, cocina, lavandería y balcón parrillero (S/ 307,191.50).",
  },
  {
    question: "¿Cuál es la diferencia entre el Tipo B y el Tipo D?",
    answer:
      "Ambos tienen 2 dormitorios y 2 baños completos. El Tipo B es más grande (77.77 m² frente a 65.26 m²) e incluye balcón parrillero; el Tipo D es más compacto y económico, con vista natural. La elección depende de tu presupuesto y del espacio que necesites.",
  },
  {
    question: "¿Un departamento de 2 dormitorios es buena inversión en Huancayo?",
    answer:
      "Es la tipología con mayor equilibrio entre precio y demanda: sirve para parejas, familias pequeñas o como inversión en alquiler. Con la separación de S/ 1,000 puedes congelar el precio vigente y acceder a los bonos publicados.",
  },
  {
    question: "¿Puedo visitar los departamentos de 2 dormitorios?",
    answer:
      "Sí. El equipo de ventas atiende en Av. San Agustín 154, San Carlos, Huancayo (lunes a sábado, de 8:30 a. m. a 1:30 p. m. y de 3:00 p. m. a 6:30 p. m.) y coordina visitas. También puedes pedir el dossier y los planos por WhatsApp al +51 981 407 634.",
  },
] as const;

export default function DosDormitoriosPage() {
  const disponibles = APARTMENTS.filter((a) => !a.isComingSoon);
  const dosDorm = disponibles.filter((a) => a.bedrooms === "2");

  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Departamentos de 2 dormitorios en Huancayo"
        description="Tipos B y D de Torres Titanium: departamentos de 2 dormitorios en San Carlos, Huancayo."
        path="/departamentos-2-dormitorios-huancayo"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Departamentos en Huancayo", href: "/departamentos-en-huancayo" },
          { name: "2 dormitorios" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Departamentos de 2 dormitorios en Huancayo
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-6">
          <strong>Torres Titanium</strong> ofrece dos modelos de 2 dormitorios en San Carlos,
          Huancayo: el <strong>Tipo D</strong> de 65.26 m² (S/ 257,777.00) y el{" "}
          <strong>Tipo B</strong> de 77.77 m² (S/ 307,191.50), ambos con 2 baños completos,
          sala-comedor, cocina y lavandería. Son las opciones más equilibradas del proyecto
          para parejas y familias que empiezan.
        </p>
        <p className="text-deep-navy/70 leading-relaxed max-w-3xl">
          Compara también los{" "}
          <Link href="/departamentos-1-dormitorio-huancayo" className="text-primary font-bold hover:underline">
            departamentos de 1 dormitorio
          </Link>{" "}
          y los de{" "}
          <Link href="/departamentos-3-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            3 dormitorios
          </Link>
          , o explora los{" "}
          <Link href="/departamentos-en-san-carlos-huancayo" className="text-primary font-bold hover:underline">
            departamentos en San Carlos
          </Link>
          .
        </p>

        <ApartmentMiniCards apartments={dosDorm} title="Modelos de 2 dormitorios disponibles" />

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            ¿Por qué elegir un departamento de 2 dormitorios?
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            El segundo dormitorio da flexibilidad real: habitación de invitados, cuarto de
            trabajo, nursery o espacio para un hijo. Los dos modelos incluyen 2 baños
            completos, un diferencial frente a departamentos antiguos de la ciudad, además
            de balcón parrillero en el Tipo B y vista natural en el Tipo D.
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            Ambos se entregan con acabados de primera, y el edificio incluye dos ascensores,
            estacionamientos en dos sótanos y rooftop con zona de parrillas. La entrega está
            prevista para 2027.
          </p>
        </section>

        <FaqBlock faqs={FAQS_2DORM} />

        <PillarCta context="los departamentos de 2 dormitorios" />
      </div>
    </div>
  );
}
