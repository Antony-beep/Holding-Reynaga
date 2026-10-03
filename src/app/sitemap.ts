import type { MetadataRoute } from "next";
import { APARTMENTS, buildApartmentSlug } from "@/data/apartments";
import { SITE_URL } from "@/lib/site";
import { PRIVACY_POLICY_DATE } from "@/lib/privacy";

export default function sitemap(): MetadataRoute.Sitemap {
  // Señal de frescura para AI: fecha de última actualización del contenido
  const lastModified = new Date("2026-09-30");
    const legalLastModified = new Date(PRIVACY_POLICY_DATE);

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

  return [...staticRoutes, ...apartmentRoutes];
}
