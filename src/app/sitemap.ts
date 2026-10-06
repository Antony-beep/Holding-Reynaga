import type { MetadataRoute } from "next";
import { APARTMENTS, buildApartmentSlug } from "@/data/apartments";
import { GUIDES } from "@/data/guides";
import { SITE_URL } from "@/lib/site";
import { PRIVACY_POLICY_DATE } from "@/lib/privacy";

export default function sitemap(): MetadataRoute.Sitemap {
  // Señal de frescura para AI: fecha de última actualización del contenido
  const lastModified = new Date("2026-09-30");
    const legalLastModified = new Date(PRIVACY_POLICY_DATE);
    const seoLastModified = new Date("2026-10-03");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/terminos-y-condiciones`,
      lastModified: legalLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/politica-de-privacidad`,
      lastModified: legalLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/libro-de-reclamaciones`,
      lastModified: legalLastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Pilares y páginas SEO local
  const seoRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/departamentos-en-huancayo`,
      lastModified: seoLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/departamentos-en-san-carlos-huancayo`,
      lastModified: seoLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/departamentos-1-dormitorio-huancayo`,
      lastModified: seoLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/departamentos-2-dormitorios-huancayo`,
      lastModified: seoLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/departamentos-3-dormitorios-huancayo`,
      lastModified: seoLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified: seoLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: seoLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/guias`,
      lastModified: seoLastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Artículos (blog)
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/guias/${g.slug}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Tour 360° (páginas SSG indexables)
  const vision360Routes: MetadataRoute.Sitemap = (["a", "b", "g"] as const).map(
    (type) => ({
      url: `${SITE_URL}/vision360/${type}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    }),
  );

  const apartmentRoutes: MetadataRoute.Sitemap = APARTMENTS.filter(
    (a) => !a.isComingSoon,
  ).map((apartment) => ({
    url: `${SITE_URL}/departamentos/${buildApartmentSlug(apartment)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: apartment.images.slice(0, 5).map((image) =>
      new URL(
        `${apartment.basePath}/${encodeURIComponent(image)}`,
        SITE_URL,
      ).toString(),
    ),
  }));

  return [
    ...staticRoutes,
    ...seoRoutes,
    ...guideRoutes,
    ...vision360Routes,
    ...apartmentRoutes,
  ];
}
