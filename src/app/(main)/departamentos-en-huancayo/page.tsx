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
    absolute: "Departamentos en Huancayo en venta | Torres Titanium",
  },
  description:
    "Departamentos en venta en Huancayo: conoce el mercado, zonas, precios reales y el proyecto Torres Titanium en San Carlos. Separación con S/ 1,000 y entrega 2027.",
  alternates: { canonical: "/departamentos-en-huancayo" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/departamentos-en-huancayo",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Departamentos en Huancayo en venta | Torres Titanium",
    description:
      "Guía de departamentos en venta en Huancayo: zonas, tipologías, precios reales y proceso de separación.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Departamentos en venta en Huancayo — Torres Titanium" },
    ],
  },
};

const HUANCAYO_FAQS = [
  {
    question: "¿Cuánto cuesta un departamento en Huancayo?",
    answer:
      "En el proyecto Torres Titanium de San Carlos, los precios publicados van desde S/ 163,332.50 por un departamento de 1 dormitorio (41.35 m²) hasta S/ 361,741.00 por uno de 3 dormitorios (91.58 m²).\n\nEl precio por m² publicado ronda S/ 3,950 y existen bonos de preventa de S/ 24,900 a S/ 47,850.",
  },
  {
    question: "¿Dónde conviene comprar un departamento en Huancayo?",
    answer:
      "Depende de tu presupuesto y rutina. San Carlos es una zona residencial bien conectada con universidades, el Parque Grau y centros comerciales; allí se ubica Torres Titanium (Av. San Agustín 154). El Cercado concentra la actividad comercial. Antes de decidir, visita la zona a diferentes horas y revisa el acceso a tu trabajo o estudio.",
  },
  {
    question: "¿Hay departamentos nuevos en preventa en Huancayo?",
    answer:
      "Sí. Torres Titanium es un proyecto de 59 departamentos nuevos en construcción en San Carlos, Huancayo, con entrega prevista para 2027. Comprar en esta etapa permite separar con S/ 1,000, congelar el precio vigente y acceder a los bonos publicados.",
  },
  {
    question: "¿Qué tipos de departamento ofrece Torres Titanium en Huancayo?",
    answer:
      "Siete tipologías (A, B, C, D, F, G y H), con modelos publicados de 1, 2 y 3 dormitorios: el Tipo G de 1 dormitorio, los Tipos B y D de 2 dormitorios, y los Tipos A y C de 3 dormitorios. Algunas tipologías figuran como próximamente.",
  },
  {
    question: "¿Cómo visito el proyecto o pido información?",
    answer:
      "Puedes escribir por WhatsApp al +51 981 407 634 o visitar el punto de atención en Av. San Agustín 154, San Carlos, Huancayo, de lunes a sábado, de 8:30 a. m. a 1:30 p. m. y de 3:00 p. m. a 6:30 p. m. El equipo de Holding Reynaga comparte el dossier y coordina visitas.",
  },
] as const;

export default function HuancayoPage() {
  const disponibles = APARTMENTS.filter((a) => !a.isComingSoon);

  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Departamentos en Huancayo en venta"
        description="Zonas, precios reales y proyecto Torres Titanium: departamentos en venta en Huancayo, Junín."
        path="/departamentos-en-huancayo"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Departamentos en Huancayo" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Departamentos en venta en Huancayo
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-6">
          Buscar un departamento en Huancayo implica comparar zonas, precios y proyectos.
          Esta guía reúne lo esencial para decidir: cómo es el mercado local, qué zonas
          conviene revisar y qué ofrece <strong>Torres Titanium</strong>, el proyecto
          residencial de <strong>Holding Inversiones Reynaga S.A.C.</strong> en San Carlos,
          con precios publicados desde S/ 163,332.50.
        </p>
        <p className="text-deep-navy/70 leading-relaxed max-w-3xl mb-4">
          Si tu interés es una zona concreta, empieza por los{" "}
          <Link href="/departamentos-en-san-carlos-huancayo" className="text-primary font-bold hover:underline">
            departamentos en San Carlos, Huancayo
          </Link>
          . Si buscas por tamaño, revisa las opciones de{" "}
          <Link href="/departamentos-1-dormitorio-huancayo" className="text-primary font-bold hover:underline">
            1
          </Link>
          ,{" "}
          <Link href="/departamentos-2-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            2
          </Link>{" "}
          o{" "}
          <Link href="/departamentos-3-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            3 dormitorios
          </Link>
          .
        </p>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Zonas para comprar un departamento en Huancayo
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            <strong>San Carlos.</strong> Zona residencial intermedia, bien conectada con la
            Universidad Continental, la UPLA, el Parque Grau y los centros comerciales.
            Aquí se ubica Torres Titanium (Av. San Agustín 154), con departamentos de 1 a 3
            dormitorios. Es la zona donde Holding Reynaga concentra su proyecto actual.
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            <strong>Cercado de Huancayo.</strong> El centro comercial y financiero de la
            ciudad, con el Parque Grau como referencia. Conviene comparar precio por m²,
            ruido y disponibilidad de estacionamiento frente a zonas residenciales como San
            Carlos.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Precios de departamentos en Huancayo
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            Los precios publicados de Torres Titanium van desde S/ 163,332.50 (Tipo G, 1
            dormitorio de 41.35 m²) hasta S/ 361,741.00 (Tipo A, 3 dormitorios de 91.58 m²),
            lo que equivale a un precio por m² publicado de alrededor de S/ 3,950. Durante
            la preventa hay bonos de S/ 24,900 a S/ 47,850.
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            Para un análisis más completo lee{" "}
            <Link href="/guias/cuanto-cuesta-un-departamento-en-huancayo" className="text-primary font-bold hover:underline">
              ¿cuánto cuesta un departamento en Huancayo?
            </Link>{" "}
            y consulta siempre el precio y la disponibilidad vigentes con el equipo de ventas.
          </p>
        </section>

        <ApartmentMiniCards
          apartments={disponibles}
          title="Torres Titanium: departamentos nuevos en Huancayo"
        />

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Cómo comprar un departamento en Huancayo
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            El proceso típico en un proyecto en construcción como Torres Titanium tiene tres
            pasos: primero, elegir la tipología y verificar disponibilidad; segundo, separar
            la unidad con S/ 1,000 — lo que congela el precio vigente y retira la unidad de
            la oferta — firmando una Constancia de Separación; tercero, seguir el cronograma
            de pago del 10% del valor del departamento acordado con ventas.
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            Antes de decidir conviene revisar los planos, la ubicación exacta, las
            amenidades y el cronograma. Nuestra guía sobre{" "}
            <Link href="/guias/conviene-comprar-un-departamento-en-preventa-en-huancayo" className="text-primary font-bold hover:underline">
              comprar en preventa en Huancayo
            </Link>{" "}
            resume los puntos a favor y los riesgos a evaluar.
          </p>
        </section>

        <FaqBlock faqs={HUANCAYO_FAQS} />

        <PillarCta context="los departamentos en Huancayo" />
      </div>
    </div>
  );
}
