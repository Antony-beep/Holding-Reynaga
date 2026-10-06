import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, MapPin, Clock, Building2 } from "lucide-react";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { PillarBreadcrumb, WebPageJsonLd } from "@/components/seo/PillarShared";

export const metadata: Metadata = {
  title: {
    absolute: "Contacto | Holding Reynaga — Torres Titanium Huancayo",
  },
  description:
    "Contacta a Holding Reynaga: WhatsApp +51 981 407 634, punto de atención en Av. San Agustín 154, San Carlos, Huancayo. Horarios, dirección y dossier del proyecto.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/contacto",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Contacto | Holding Reynaga — Torres Titanium Huancayo",
    description:
      "WhatsApp, dirección y horarios de atención del proyecto Torres Titanium en San Carlos, Huancayo.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Contacto — Torres Titanium, San Carlos, Huancayo" },
    ],
  },
};

export default function ContactoPage() {
  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Contacto — Holding Reynaga"
        description="Canales de contacto, dirección y horarios del proyecto Torres Titanium en San Carlos, Huancayo."
        path="/contacto"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Contacto" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Contacto
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-10">
          El equipo de ventas de <strong>Holding Reynaga</strong> atiende consultas sobre
          los departamentos de Torres Titanium en San Carlos, Huancayo: precios,
          disponibilidad, planos, financiamiento y visitas al punto de atención.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna: canales */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-primary" aria-hidden="true" />
                <h2 className="font-display font-black text-xl text-deep-navy">WhatsApp y llamadas</h2>
              </div>
              <p className="text-deep-navy/70 mb-4">
                Atención directa con un asesor de ventas:
              </p>
              <a
                href="https://wa.me/51981407634?text=Hola, quiero información sobre los departamentos de Torres Titanium."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-widest"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                +51 981 407 634
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                <h2 className="font-display font-black text-xl text-deep-navy">Punto de atención</h2>
              </div>
              <p className="text-deep-navy/70 mb-2">
                <strong>Oficina de ventas:</strong> Av. San Agustín 154, San Carlos, Huancayo, Junín.
              </p>
              <p className="text-deep-navy/70 flex items-start gap-2">
                <Building2 className="w-4 h-4 mt-1 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <strong>Domicilio fiscal:</strong> Jr. Lino Nro. 132, Oficina 401, Huancayo
                  Cercado — HOLDING INVERSIONES REYNAGA S.A.C., RUC 20614870959.
                </span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
                <h2 className="font-display font-black text-xl text-deep-navy">Horarios de atención</h2>
              </div>
              <ul className="text-deep-navy/70 flex flex-col gap-2">
                <li className="flex justify-between gap-4 border-b border-black/5 pb-2">
                  <span>Lunes a viernes</span>
                  <strong className="text-deep-navy">8:30 a. m. – 6:00 p. m.</strong>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sábados</span>
                  <strong className="text-deep-navy">9:00 a. m. – 2:00 p. m.</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna: mapa */}
          <div className="bg-white rounded-2xl border border-black/5 overflow-hidden flex flex-col">
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <iframe
                title="Mapa: Torres Titanium, Av. San Agustín 154, San Carlos, Huancayo"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-75.210334%2C-12.053615%2C-75.190334%2C-12.041615&layer=mapnik&marker=-12.047615%2C-75.200334"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-display font-black text-xl text-deep-navy mb-3">
                ¿Prefieres explorar primero?
              </h2>
              <p className="text-deep-navy/70 leading-relaxed mb-4">
                Recorre el edificio desde la web con el{" "}
                <Link href="/#recorrido" className="text-primary font-bold hover:underline">
                  tour 360°
                </Link>
                , revisa las{" "}
                <Link href="/#departamentos" className="text-primary font-bold hover:underline">
                  tipologías y precios
                </Link>{" "}
                o descarga el{" "}
                <Link href="/#titanium" className="text-primary font-bold hover:underline">
                  dossier del proyecto
                </Link>
                . Si ya sabes qué buscas, lee{" "}
                <Link href="/guias/como-funciona-la-separacion-de-un-departamento" className="text-primary font-bold hover:underline">
                  cómo separar tu departamento
                </Link>
                .
              </p>
              <p className="text-deep-navy/70 leading-relaxed">
                También puedes escribirnos desde el formulario de cotización en la{" "}
                <Link href="/" className="text-primary font-bold hover:underline">
                  página principal
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
