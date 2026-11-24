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
    absolute: "Departamentos de 1 dormitorio en Huancayo | Torres Titanium",
  },
  description:
    "Departamentos de 1 dormitorio en venta en Huancayo: Tipo G en Torres Titanium, San Carlos — 41.35 m², 1 baño. Separa con S/ 1,000.",
  alternates: { canonical: "/departamentos-1-dormitorio-huancayo" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/departamentos-1-dormitorio-huancayo",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Departamentos de 1 dormitorio en Huancayo | Torres Titanium",
    description:
      "Tipo G: 41.35 m², 1 baño. Departamentos de 1 dormitorio en San Carlos, Huancayo. Separa con S/ 1,000.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Departamento de 1 dormitorio en Huancayo — Torres Titanium" },
    ],
  },
};

const FAQS_1DORM = [
  {
    question: "¿Qué departamento de 1 dormitorio hay en venta en Huancayo?",
    answer:
      "El Tipo G de Torres Titanium (San Carlos, Huancayo): 1 dormitorio, 1 baño, 41.35 m², sala-comedor, cocina, lavandería y balcón interior. Consulta disponibilidad y cotización con ventas.",
  },
  {
    question: "¿Para quién es un departamento de 1 dormitorio?",
    answer:
      "Para quienes buscan su primera propiedad, una inversión en esta etapa o una vivienda compacta de fácil mantenimiento: profesionales, estudiantes de posgrado o quienes viven solos y valoran la ubicación sobre la superficie.",
  },
  {
    question: "¿El departamento de 1 dormitorio incluye estacionamiento?",
    answer:
      "El edificio tiene estacionamientos para residentes en dos sótanos. La disponibilidad, asignación y condiciones de cada cochera se confirman con el equipo de ventas.",
  },
] as const;

export default function UnDormitorioPage() {
  const disponibles = APARTMENTS.filter((a) => !a.isComingSoon);
  const unDorm = disponibles.filter((a) => a.bedrooms === "1");

  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Departamentos de 1 dormitorio en Huancayo"
        description="Tipo G de Torres Titanium: 41.35 m², 1 baño en San Carlos, Huancayo. Separa con S/ 1,000."
        path="/departamentos-1-dormitorio-huancayo"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Departamentos en Huancayo", href: "/departamentos-en-huancayo" },
          { name: "1 dormitorio" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Departamentos de 1 dormitorio en Huancayo
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-6">
          En <strong>Torres Titanium</strong> (San Carlos, Huancayo) el modelo de 1 dormitorio
          es el <strong>Tipo G</strong>: 41.35 m² distribuidos en sala-comedor, cocina, 1
          baño completo, lavandería y balcón interior. Consulta disponibilidad y cotización
          vigente con nuestro equipo de ventas.
        </p>
        <p className="text-deep-navy/70 leading-relaxed max-w-3xl">
          Si necesitas más espacio, compara también los{" "}
          <Link href="/departamentos-2-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            departamentos de 2 dormitorios
          </Link>{" "}
          y los de{" "}
          <Link href="/departamentos-3-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            3 dormitorios
          </Link>
          , o revisa la guía general de{" "}
          <Link href="/departamentos-en-huancayo" className="text-primary font-bold hover:underline">
            departamentos en venta en Huancayo
          </Link>
          .
        </p>

        <ApartmentMiniCards apartments={unDorm} title="Modelo de 1 dormitorio disponible" />

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Ventajas de un departamento de 1 dormitorio
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            Un departamento de 1 dormitorio en una zona consolidada como San Carlos combina
            tres ventajas: precio de entrada más accesible, costos de mantenimiento menores
            y alta demanda de alquiler si en el futuro decides invertir. Al ser un proyecto
            nuevo en construcción, incluye acabados de primera e iluminación natural.
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            La ubicación en Av. San Agustín 154 conecta con la Universidad Continental, la
            UPLA y el Parque Grau, lo que resulta práctico tanto para vivir como para
            alquilar a estudiantes o profesionales.
          </p>
        </section>

        <FaqBlock faqs={FAQS_1DORM} />

        <PillarCta context="el departamento Tipo G" />
      </div>
    </div>
  );
}
