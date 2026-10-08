import type { Metadata } from "next";
import Link from "next/link";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import {
  PillarBreadcrumb,
  PillarCta,
  WebPageJsonLd,
} from "@/components/seo/PillarShared";

export const metadata: Metadata = {
  title: {
    absolute: "Holding Reynaga | Inmobiliaria y constructora en Huancayo",
  },
  description:
    "Holding Inversiones Reynaga S.A.C. (RUC 20614870959): desarrolladora inmobiliaria de Huancayo, Junín. Conoce la empresa y su proyecto Torres Titanium en San Carlos.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/nosotros",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Holding Reynaga | Inmobiliaria y constructora en Huancayo",
    description:
      "Conoce a Holding Inversiones Reynaga S.A.C., desarrolladora del proyecto Torres Titanium en San Carlos, Huancayo.",
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: "Holding Reynaga — proyectos inmobiliarios en Huancayo" },
    ],
  },
};

export default function NosotrosPage() {
  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <WebPageJsonLd
        name="Holding Reynaga: inmobiliaria y constructora en Huancayo"
        description="Holding Inversiones Reynaga S.A.C., desarrolladora del proyecto Torres Titanium en San Carlos, Huancayo."
        path="/nosotros"
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Nosotros" },
        ]}
      />

      <div className="container mx-auto px-6 max-w-7xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-5xl text-deep-navy tracking-tight mb-6">
          Holding Reynaga: inmobiliaria y constructora en Huancayo
        </h1>
        <p className="text-deep-navy/70 text-lg leading-relaxed max-w-3xl mb-6">
          <strong>HOLDING INVERSIONES REYNAGA S.A.C.</strong> (RUC 20614870959) es una
          empresa de desarrollo inmobiliario con operaciones en Huancayo, región Junín,
          Perú. Su actividad actual se centra en el diseño, construcción y comercialización
          de proyectos residenciales en zonas consolidadas de la ciudad.
        </p>
        <p className="text-deep-navy/70 leading-relaxed max-w-3xl">
          Nuestro proyecto vigente es{" "}
          <Link href="/departamentos-en-san-carlos-huancayo" className="text-primary font-bold hover:underline">
            Torres Titanium
          </Link>
          : 59 departamentos en construcción en San Carlos, Huancayo, con modelos de 1 a 3
          dormitorios, estacionamientos para residentes y entrega prevista para 2027. Puedes
          recorrer el proyecto en la página principal o descargar el dossier completo.
        </p>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Datos corporativos
          </h2>
          <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 flex flex-col gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-deep-navy/50 mb-1">Razón social</p>
              <p className="font-display font-bold text-deep-navy">HOLDING INVERSIONES REYNAGA S.A.C.</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-deep-navy/50 mb-1">RUC</p>
              <p className="text-deep-navy">20614870959</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-deep-navy/50 mb-1">Punto de atención (ventas)</p>
              <p className="text-deep-navy">
                Av. San Agustín 154, San Carlos, Huancayo, Junín — lunes a sábado, de 8:30 a. m. a 1:30 p. m. y de 3:00 p. m. a 6:30 p. m.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-deep-navy/50 mb-1">Domicilio fiscal</p>
              <p className="text-deep-navy">
                Jr. Lino Nro. 132, Oficina 401, Huancayo Cercado (a una cuadra del Parque Grau)
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-deep-navy/50 mb-1">Contacto</p>
              <p className="text-deep-navy">
                WhatsApp y llamadas: +51 981 407 634 ·{" "}
                <Link href="/contacto" className="text-primary font-bold hover:underline">
                  Página de contacto
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-4 tracking-tight">
            Nuestro proyecto: Torres Titanium
          </h2>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            Torres Titanium es un edificio residencial en Av. San Agustín 154, San Carlos,
            Huancayo, con 59 departamentos de 1 a 3 dormitorios, dos sótanos de
            estacionamiento, dos ascensores y rooftop con zona de parrillas y área de juegos
            para niños.
          </p>
          <p className="text-deep-navy/70 leading-relaxed mb-4">
            Explora las opciones según lo que buscas:{" "}
            <Link href="/departamentos-en-huancayo" className="text-primary font-bold hover:underline">
              departamentos en Huancayo
            </Link>
            ,{" "}
            <Link href="/departamentos-1-dormitorio-huancayo" className="text-primary font-bold hover:underline">
              de 1 dormitorio
            </Link>
            ,{" "}
            <Link href="/departamentos-2-dormitorios-huancayo" className="text-primary font-bold hover:underline">
              de 2 dormitorios
            </Link>{" "}
            o{" "}
            <Link href="/departamentos-3-dormitorios-huancayo" className="text-primary font-bold hover:underline">
              de 3 dormitorios
            </Link>
            .
          </p>
          <p className="text-deep-navy/70 leading-relaxed">
            Para decisiones de compra también te servirá leer sobre{" "}
            <Link href="/guias/como-funciona-la-separacion-de-un-departamento" className="text-primary font-bold hover:underline">
              cómo funciona la separación de un departamento
            </Link>{" "}
            en nuestras{" "}
            <Link href="/guias" className="text-primary font-bold hover:underline">
              guías y recursos
            </Link>
            .
          </p>
        </section>

        <PillarCta context="Holding Reynaga y Torres Titanium" />
      </div>
    </div>
  );
}
