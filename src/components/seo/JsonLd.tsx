import type { Apartment } from "@/data/apartments";
import { FAQS } from "@/data/faqs";
import { SITE_URL } from "@/lib/site";
import { RESERVATION_PRICE_CLAUSE } from "@/lib/privacy";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "HOLDING INVERSIONES REYNAGA S.A.C.",
            alternateName: "Holding Reynaga",
            url: SITE_URL,
            logo: `${SITE_URL}/images/logo.webp`,
            image: `${SITE_URL}/og.jpg`,
            taxID: "20614870959",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Jr. Lino Nro. 132, Oficina 401 (a 1 cuadra del Parque Grau)",
              addressLocality: "Huancayo",
              addressRegion: "Junín",
              addressCountry: "PE",
            },
            location: { "@id": `${SITE_URL}/#sales-office` },
            sameAs: [
              "https://www.instagram.com/holdingreynaga/",
              "https://www.facebook.com/profile.php?id=61588196065630",
              "https://www.tiktok.com/@inmobiliariaholding",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+51981407634",
              email: "holdingreynagaredes@gmail.com",
              contactType: "sales",
              availableLanguage: "Spanish",
            },
          },
          {
            "@type": "RealEstateAgent",
            "@id": `${SITE_URL}/#sales-office`,
            name: "Torres Titanium Inmobiliaria y Constructora Holding Reynaga",
            url: SITE_URL,
            telephone: "+51981407634",
            email: "holdingreynagaredes@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Av. San Agustín 154, San Carlos",
              addressLocality: "Huancayo",
              addressRegion: "Junín",
              addressCountry: "PE",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                  "https://schema.org/Saturday",
                ],
                opens: "08:30",
                closes: "13:30",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "https://schema.org/Monday",
                  "https://schema.org/Tuesday",
                  "https://schema.org/Wednesday",
                  "https://schema.org/Thursday",
                  "https://schema.org/Friday",
                  "https://schema.org/Saturday",
                ],
                opens: "15:00",
                closes: "18:30",
              },
            ],
            parentOrganization: { "@id": `${SITE_URL}/#organization` },
          },
        ],
      }}
    />
  );
}

export function ProjectJsonLd() {
  const apartmentSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${SITE_URL}/#torres-titanium`,
    name: "Torres Titanium",
    description:
      "Torres Titanium es un proyecto residencial de 59 departamentos en construcción ubicado en Av. San Agustín 154, San Carlos, Huancayo, Junín, Perú. Ofrece departamentos de 1, 2 y 3 dormitorios desde S/ 257,000, separación con S/ 1,000 y bonos de preventa de S/ 24,900 a S/ 47,850. Incluye 2 sótanos de estacionamiento, 2 ascensores y rooftop. Entrega prevista entre octubre y diciembre de 2027.",
    url: SITE_URL,
    image: `${SITE_URL}/og.jpg`,
    telephone: "+51981407634",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. San Agustín 154, San Carlos",
      addressLocality: "Huancayo",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.047615,
      longitude: -75.200334,
    },
    numberOfAccommodationUnits: 59,
    petsAllowed: false,
    amenityFeature: [
      "Estacionamientos para residentes en el mismo edificio",
      "Dos sótanos de estacionamiento",
      "Dos ascensores",
      "Rooftop con pérgolas",
      "Zona de parrillas",
      "Área de juegos para niños",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    // Freshness signal para AI: fecha de actualización del contenido
    dateModified: "2026-11-23",
    // Precio referencial de entrada para AI agents (extractable, sin JS)
    makesOffer: {
      "@type": "AggregateOffer",
      lowPrice: 257000,
      priceCurrency: "PEN",
      offerCount: 59,
      url: `${SITE_URL}/#departamentos`,
    },
    // Bono de preventa — dato único extraíble (schema con texto corrido)
    disambiguatingDescription:
      `Bonos de preventa de S/ 24,900 a S/ 47,850. Separación anunciada con S/ 1,000; el formulario solo solicita atención, no formaliza una reserva ni realiza cobros. ${RESERVATION_PRICE_CLAUSE.replace(/\n\n/g, " ")} Entrega prevista entre octubre y diciembre de 2027.`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        // El schema recibe texto corrido; los saltos dobles son solo para la UI.
        text: answer.replace(/\n\n/g, " "),
      },
    })),
  };

  return (
    <>
      <JsonLd data={apartmentSchema} />
      <JsonLd data={faqSchema} />
    </>
  );
}

export function ApartmentJsonLd({
  apartment,
  slug,
}: {
  apartment: Apartment;
  slug: string;
}) {
  const apartmentUrl = `${SITE_URL}/departamentos/${slug}`;
  const apartmentSchema = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "@id": `${apartmentUrl}#apartment`,
    name: `Departamento ${apartment.type} en San Carlos, Huancayo`,
    description: `Departamento de ${apartment.bedrooms} ${apartment.bedrooms === "1" ? "dormitorio" : "dormitorios"} y ${apartment.baths === "1" ? "1 baño" : `${apartment.baths} baños`}, con ${apartment.sqm} m², en Torres Titanium, proyecto en construcción en San Carlos, Huancayo.`,
    url: apartmentUrl,
    image: apartment.images.map((image) =>
      new URL(`${apartment.basePath}/${encodeURIComponent(image)}`, SITE_URL).toString(),
    ),
    floorSize: {
      "@type": "QuantitativeValue",
      value: Number(apartment.sqm),
      unitCode: "MTK",
    },
    numberOfBedrooms: Number(apartment.bedrooms),
    numberOfBathroomsTotal: Number(apartment.baths),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. San Agustín 154, San Carlos",
      addressLocality: "Huancayo",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
    containedInPlace: { "@id": `${SITE_URL}/#torres-titanium` },
    dateModified: "2026-11-23",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Departamentos",
        item: `${SITE_URL}/#departamentos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: apartment.type,
        item: apartmentUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={apartmentSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}


