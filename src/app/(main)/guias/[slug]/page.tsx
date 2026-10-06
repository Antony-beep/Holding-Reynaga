import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuideBySlug } from "@/data/guides";
import { SITE_URL } from "@/lib/site";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { PillarBreadcrumb } from "@/components/seo/PillarShared";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guía no encontrada" };
  return {
    title: { absolute: `${guide.metaTitle} | Holding Reynaga` },
    description: guide.description,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: {
      type: "article",
      locale: "es_PE",
      url: `/guias/${guide.slug}`,
      siteName: "Holding Reynaga | Torres Titanium",
      title: guide.metaTitle,
      description: guide.description,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      images: [
        { url: "/og.jpg", width: 1200, height: 630, alt: guide.h1 },
      ],
    },
  };
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    inLanguage: "es-PE",
    mainEntityOfPage: `${SITE_URL}/guias/${guide.slug}`,
    image: `${SITE_URL}/og.jpg`,
    author: {
      "@type": "Organization",
      name: "HOLDING INVERSIONES REYNAGA S.A.C.",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "HOLDING INVERSIONES REYNAGA S.A.C.",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
    },
  };

  return (
    <div className="flex flex-col w-full bg-surface pb-20">
      <OrganizationJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <PillarBreadcrumb
        trail={[
          { name: "Inicio", href: "/" },
          { name: "Guías y recursos", href: "/guias" },
          { name: guide.h1 },
        ]}
      />

      <div className="container mx-auto px-6 max-w-3xl mt-10">
        <h1 className="font-display font-black text-3xl md:text-4xl text-deep-navy tracking-tight mb-4">
          {guide.h1}
        </h1>
        <p className="text-xs text-deep-navy/50 mb-6">
          Publicado: {guide.datePublished} · Actualizado: {guide.dateModified} ·{" "}
          <Link href="/nosotros" className="text-primary font-bold hover:underline">
            Holding Reynaga
          </Link>
        </p>
        <p className="text-deep-navy/70 text-lg leading-relaxed mb-10">{guide.intro}</p>

        {guide.sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="font-display font-black text-xl md:text-2xl text-deep-navy mb-4 tracking-tight">
              {s.heading}
            </h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-deep-navy/70 leading-relaxed mb-4">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="flex flex-col gap-2 mb-4">
                {s.list.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-deep-navy/70 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 mt-12">
          <h2 className="font-display font-black text-lg text-deep-navy mb-4">
            Sigue explorando
          </h2>
          <ul className="flex flex-col gap-2">
            {guide.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-primary font-bold hover:underline">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
