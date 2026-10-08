import Link from "next/link";
import { ChevronRight, MessageCircle, FileDown } from "lucide-react";
import type { Apartment } from "@/data/apartments";
import { buildApartmentSlug } from "@/data/apartments";
import { SITE_URL } from "@/lib/site";

/** Breadcrumb visual en barra superior (deep-navy) + BreadcrumbList JSON-LD. */
export function PillarBreadcrumb({
  trail,
}: {
  trail: { name: string; href?: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
  return (
    <div className="bg-deep-navy py-6 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center flex-wrap gap-1 text-xs md:text-sm text-white/50">
          {trail.map((item, i) => (
            <span key={item.name} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3" aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-white font-semibold">{item.name}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Tarjetas de tipologías con precio real, enlazando a cada página de tipo. */
export function ApartmentMiniCards({
  apartments,
  title = "Tipologías disponibles",
}: {
  apartments: Apartment[];
  title?: string;
}) {
  return (
    <section aria-labelledby="tipologias-h2" className="mt-12">
      <h2 id="tipologias-h2" className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-6 tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apartments.map((apt) => (
          <Link
            key={apt.type}
            href={`/departamentos/${buildApartmentSlug(apt)}`}
            className="group bg-white rounded-2xl border border-black/5 shadow-architectural p-6 hover:-translate-y-1 transition-transform duration-300"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
              {apt.area} · {apt.bedrooms} {apt.bedrooms === "1" ? "dormitorio" : "dormitorios"}
            </p>
            <h3 className="font-display font-black text-xl text-deep-navy mb-3">
              Departamento {apt.type}
            </h3>
            <p className="text-sm text-deep-navy/70 leading-relaxed mb-4">
              {apt.sqm} m² · {apt.baths === "1" ? "1 baño" : `${apt.baths} baños`}
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-deep-navy/50 font-bold">
                  Precio publicado
                </p>
                <p className="font-display font-black text-lg text-deep-navy">{apt.price}</p>
              </div>
              <span className="text-primary font-bold text-xs uppercase tracking-wider group-hover:underline">
                Ver más →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Bloque de FAQ con <details> + FAQPage JSON-LD opcional. */
export function FaqBlock({
  faqs,
  withSchema = true,
  heading = "Preguntas frecuentes",
}: {
  faqs: readonly { question: string; answer: string }[];
  withSchema?: boolean;
  heading?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
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
    <section aria-labelledby="faq-h2" className="mt-12">
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <h2 id="faq-h2" className="font-display font-black text-2xl md:text-3xl text-deep-navy mb-6 tracking-tight">
        {heading}
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map((f) => (
          <details key={f.question} className="bg-white rounded-2xl border border-black/5 p-5 group">
            <summary className="font-display font-bold text-deep-navy cursor-pointer list-none flex items-center justify-between gap-4">
              {f.question}
              <ChevronRight className="w-4 h-4 text-primary shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
            </summary>
            <div className="mt-4 flex flex-col gap-3">
              {f.answer.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm text-deep-navy/70 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** CTA final: WhatsApp + dossier. */
export function PillarCta({
  context = "el proyecto",
}: {
  context?: string;
}) {
  return (
    <section className="mt-12 bg-deep-navy rounded-3xl p-8 md:p-12 text-center">
      <h2 className="font-display font-black text-2xl md:text-3xl text-white mb-4 tracking-tight">
        ¿Quieres conocer {context}?
      </h2>
      <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
        El equipo de ventas de Holding Reynaga puede atenderte por WhatsApp, agendar una
        visita al punto de atención en Av. San Agustín 154, San Carlos, o enviarte el
        dossier del proyecto.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="https://wa.me/51981407634?text=Hola, quiero información sobre departamentos en San Carlos, Huancayo."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-widest"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          Escribir por WhatsApp
        </a>
        <Link
          href="/#titanium"
          className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
        >
          <FileDown className="w-4 h-4" aria-hidden="true" />
          Descargar dossier
        </Link>
      </div>
    </section>
  );
}

/** Schema WebPage para páginas informativas nuevas. */
export function WebPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": `${SITE_URL}/#torres-titanium` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
