import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Bots de búsqueda y IA — permitidos explícitamente
        // (GPTBot y ChatGPT-User: ChatGPT; PerplexityBot: Perplexity;
        //  ClaudeBot y anthropic-ai: Claude; Google-Extended: Gemini/AI Overviews;
        //  Bingbot: Copilot; CCBot: Common Crawl — formación, no búsqueda)
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
