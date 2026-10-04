import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            // Web Linking (RFC 8288): descubre recursos para agentes de IA
            key: "Link",
            value: [
              '</llms.txt>; rel="service-doc"',
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/ai-catalog.json>; rel="service-desc"',
            ].join(", "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
