import React from 'react';

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent"],
    "name": "Holding Reynaga",
    "image": "https://inmobiliariaholdingreynaga.com/images/logo.webp",
    "@id": "https://inmobiliariaholdingreynaga.com",
    "url": "https://inmobiliariaholdingreynaga.com",
    "telephone": "981407634",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. San Agustín 154, San Carlos",
      "addressLocality": "Huancayo",
      "addressRegion": "Junín",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -12.047615,
      "longitude": -75.200334
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$$"
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": "Torres Titanium",
    "description": "Elegancia Urbana en el Corazón de Huancayo. Vive cerca de TODO.",
    "url": "https://inmobiliariaholdingreynaga.com",
    "telephone": "981407634",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. San Agustín 154, San Carlos",
      "addressLocality": "Huancayo",
      "addressRegion": "Junín",
      "addressCountry": "PE"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Rooftop con Zonas de Esparcimiento",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Área para Parrillas con Barra",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Área para Fogata",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Mirador",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Área para Tertulias",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Área de Juegos para Niños",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Pérgolas de Sol y Sombra",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "2 Sótanos de Estacionamiento",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "2 Ascensores Modernos",
        "value": "True"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Recepción y Cámaras de Vigilancia",
        "value": "True"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Dónde está ubicado el proyecto Torres Titanium?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Torres Titanium está estratégicamente ubicado en la Av. San Agustín 154, San Carlos, Huancayo, Junín. Una zona de alta plusvalía que brinda una conexión inigualable a las instituciones de mayor prestigio."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son los precios de preventa y cómo puedo separar mi departamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Actualmente contamos con precios exclusivos de preventa desde S/ 163,332.50 hasta S/ 361,741.00, según el tipo y tamaño del departamento. Además, contamos con bonos de preventa de S/ 24,900 a S/ 47,850. Puedes asegurar el tuyo y congelar el precio separándolo con solo S/ 1,000."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tipos de departamentos ofrecen y de cuántos dormitorios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos departamentos flat y dúplex diseñados para brindar la máxima comodidad y elegancia. Contamos con distribuciones optimizadas que incluyen opciones de 1, 2 y 3 dormitorios."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuándo es la fecha de entrega del proyecto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La entrega de los departamentos de Torres Titanium está programada para el año 2027. Actualmente nos encontramos en fase de preventa."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
