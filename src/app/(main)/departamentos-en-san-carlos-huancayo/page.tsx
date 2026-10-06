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
    absolute: "Departamentos en San Carlos, Huancayo | Torres Titanium",
  },
  description:
    "Departamentos en venta en San Carlos, Huancayo: Torres Titanium, de 1 a 3 dormitorios desde S/ 163,332.50, separación con S/ 1,000 y entrega prevista para 2027.",
  alternates: { canonical: "/departamentos-en-san-carlos-huancayo" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/departamentos-en-san-carlos-huancayo",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Departamentos en San Carlos, Huancayo | Torres Titanium",
    description:
      "Departamentos de 1 a 3 dormitorios en preventa en San Carlos, Huancayo. Precios, tipologías y separación con S/ 1,000.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Torres Titanium, departamentos en San Carlos, Huancayo" },
    ],
  },
};

const SAN_CARLOS_FAQS = [
  {
    question: "¿Qué departamentos hay en venta en San Carlos, Huancayo?",
    answer:
      "En Torres Titanium, Av. San Agustín 154, San Carlos, hay departamentos en preventa de 1, 2 y 3 dormitorios: el Tipo G de 1 dormitorio (41.35 m²), los Tipos B y D de 2 dormitorios, y los Tipos A y C de 3 dormitorios, con precios publicados desde S/ 163,332.50 hasta S/ 361,741.00.",
  },
  {
    question: "¿Dónde exactamente queda el proyecto en San Carlos?",
    answer:
      "Torres Titanium se ubica en la Av. San Agustín 154, San Carlos, Huancayo, Junín. La zona conecta con la Universidad Continental, la UPLA, el Parque Grau y centros comerciales de Huancayo.",
  },
  {
    question: "¿Cuánto cuesta un departamento en San Carlos, Huancayo?",
    answer:
      "Los precios publicados en Torres Titanium van desde S/ 163,332.50 (Tipo G, 1 dormitorio) hasta S/ 361,741.00 (Tipo A, 3 dormitorios de 91.58 m²). El precio por m² publicado ronda S/ 3,950. Durante la preventa hay bonos publicados de S/ 24,900 a S/ 47,850; su vigencia y aplicación se confirman con el equipo de ventas.",
  },
  {
    question: "¿Cómo separo un departamento en San Carlos con S/ 1,000?",
    answer:
      "La separación aplica a todos los tipos: al pagar S/ 1,000 el precio vigente queda congelado, la unidad se retira de la oferta y se firma una Constancia de Separación con el precio, el monto, el número de departamento, el área y la fecha. Luego se elabora un cronograma de pago del 10% del valor del departamento. Los detalles se confirman con ventas.",
  },
  {
    question: "¿Qué amenidades tiene el edificio en San Carlos?",
    answer:
      "Torres Titanium incluye estacionamientos para residentes en dos sótanos, dos ascensores, rooftop con pérgolas, zona de parrillas y área de juegos para niños. La entrega está prevista para 2027.",
  },
] as const;

export default function SanCarlosPage() {
  const disponibles = APARTMENTS.filter((a) => !a.isComingSoon);

  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Departamentos en venta en San Carlos, Huancayo"
        description="Departamentos en preventa de 1 a 3 dormitorios en San Carlos, Huancayo: Torres Titanium, desde S/ 163,332.50."
        path="/departamentos-en-san-carlos-huancayo"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Departamentos en Huancayo", href: "/departamentos-en-huancayo" },
          { name: "San Carlos, Huancayo" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Departamentos en venta en San Carlos, Huancayo
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-6">
          <strong>Torres Titanium</strong> es un proyecto residencial de 59 departamentos en
          preventa en la Av. San Agustín 154, San Carlos, Huancayo (Junín, Perú), desarrollado
          por <strong>Holding Inversiones Reynaga S.A.C.</strong> Ofrece departamentos de
          1, 2 y 3 dormitorios con precios publicados, cocheras para residentes y entrega
          prevista para 2027.
        </p>
        <p className="text-deep-navy/70 leading-relaxed max-w-3xl">
          En esta página encontrarás las tipologías disponibles con sus precios reales, las
          ventajas de la zona de San Carlos y el proceso de separación. También puedes explorar
          los{" "}
          <Link href="/departamentos-en-huancayo" className="text-primary font-bold hover:underline">
            departamentos en Huancayo
          </Link>{" "}
          o las opciones por tamaño:{" "}
          <Link href="/departamentos-1-dormitorio-huancayo" className="text-primary font-bold hover:underline">
            1 dormitorio
          </Link>
          ,{" "}
          <Link href="/departamentos-2-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            2 dormitorios
          </Link>{" "}
          y{" "}
          <Link href="/departamentos-3-dormitorios-huancayo" className="text-primary font-bold hover:underline">
            3 dormitorios
          </Link>
          .
        </p>

        <ApartmentMiniCards apartments={disponibles} title="Departamentos en venta en San Carlos: tipologías y precios" />

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            ¿Por qué comprar un departamento en San Carlos, Huancayo?
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            San Carlos es una de las zonas residenciales más cotizadas de Huancayo. Su
            ubicación intermedia entre el Cercado y las zonas altas la convierte en un punto
            estratégico: desde la Av. San Agustín 154 se llega con facilidad a la Universidad
            Continental, la UPLA, el Parque Grau y los centros comerciales de la ciudad.
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            Vivir en San Carlos permite combinar la cercanía al centro económico de Huancayo
            con una atmósfera residencial. Por eso, los{" "}
            <Link href="/departamentos-en-san-carlos-huancayo" className="text-primary font-bold hover:underline">
              departamentos en San Carlos
            </Link>{" "}
            son una de las búsquedas inmobiliarias más frecuentes de la región Junín.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Cómo separar un departamento en San Carlos
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            Torres Titanium está en preventa: puedes separar tu unidad con S/ 1,000. Al
            separar, el precio vigente queda congelado, la unidad se retira de la oferta a
            otros clientes y se firma una Constancia de Separación del Departamento con el
            precio de venta, el monto de separación, el número de departamento, el área y la
            fecha.
          </p>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            Después se elabora un cronograma de pago del 10% del valor del departamento,
            acorde a tus ingresos mensuales. Durante la preventa hay bonos publicados de
            S/ 24,900 a S/ 47,850. Si quieres más detalles, lee{" "}
            <Link href="/guias/como-funciona-la-separacion-de-un-departamento" className="text-primary font-bold hover:underline">
              cómo funciona la separación de un departamento
            </Link>{" "}
            o revisa nuestra{" "}
            <Link href="/guias" className="text-primary font-bold hover:underline">
              guía para comprar en Huancayo
            </Link>
            .
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            El equipo de ventas atiende en la Av. San Agustín 154, San Carlos, de lunes a
            viernes de 8:30 a. m. a 6:00 p. m. y sábados de 9:00 a. m. a 2:00 p. m. También
            puedes escribir por WhatsApp o visitar la página de{" "}
            <Link href="/contacto" className="text-primary font-bold hover:underline">
              contacto
            </Link>
            .
          </p>
        </section>

        <FaqBlock faqs={SAN_CARLOS_FAQS} />

        <PillarCta context="los departamentos en San Carlos" />
      </div>
    </div>
  );
}
