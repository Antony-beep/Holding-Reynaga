import type { MetadataRoute } from "next";
import { APARTMENTS } from "@/data/apartments";

const BASE_URL = "https://inmobiliariaholdingreynaga.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/terminos-y-condiciones`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const apartmentRoutes: MetadataRoute.Sitemap = APARTMENTS.filter(
    (a) => !a.isComingSoon,
  ).map((a) => ({
    url: `${BASE_URL}/departamentos/${a.type.toLowerCase().replace(" ", "-")}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const vision360Routes: MetadataRoute.Sitemap = ["a", "b", "g"].map((t) => ({
    url: `${BASE_URL}/vision360/${t}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...apartmentRoutes, ...vision360Routes];
}
