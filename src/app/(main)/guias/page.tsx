import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { GUIDES } from "@/data/guides";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { PillarBreadcrumb, WebPageJsonLd } from "@/components/seo/PillarShared";

export const metadata: Metadata = {
  title: {
    absolute: "Guías y recursos para comprar un departamento en Huancayo",
  },
  description:
    "Guías prácticas de Holding Reynaga: cuánto cuesta un departamento en Huancayo, comprar en preventa y cómo funciona la separación de S/ 1,000.",
  alternates: { canonical: "/guias" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/guias",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Guías y recursos para comprar un departamento en Huancayo",
    description:
      "Precios reales, preventa y separación: guías para comprar un departamento en Huancayo.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Guías para comprar un departamento en Huancayo" },
    ],
  },
};

export default function GuiasPage() {
  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Guías y recursos para comprar un departamento en Huancayo"
        description="Colección de guías de Holding Reynaga sobre precios, preventa y separación de departamentos en Huancayo."
        path="/guias"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Guías y recursos" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Guías y recursos para comprar un departamento en Huancayo
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-10">
          Guías prácticas escritas por el equipo de{" "}
          <Link href="/nosotros" className="text-primary font-bold hover:underline">
            Holding Reynaga
          </Link>{" "}
          con los datos reales del proyecto{" "}
          <Link href="/departamentos-en-san-carlos-huancayo" className="text-primary font-bold hover:underline">
            Torres Titanium en San Carlos
          </Link>
          : precios publicados, bonos de preventa y el proceso de separación paso a paso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="group bg-white rounded-2xl border border-black/5 shadow-architectural p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="font-display font-black text-lg text-deep-navy mb-3 leading-snug">
                {g.h1}
              </h2>
              <p className="text-sm text-deep-navy/70 leading-relaxed mb-4 flex-grow">{g.description}</p>
              <span className="text-primary font-bold text-xs uppercase tracking-wider group-hover:underline">
                Leer guía →
              </span>
            </Link>
          ))}
        </div>

        <p className="text-xs text-deep-navy/50 mt-8 leading-relaxed max-w-3xl">
          Los precios y condiciones citados en las guías son los publicados por el proyecto
          y pueden variar con disponibilidad y campañas vigentes. La información comercial
          definitiva se confirma siempre con el equipo de ventas.
        </p>
      </div>
    </div>
  );
}
