import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Catálogo de APIs/recurvos para descubrimiento automatizado (RFC 9727).
 * Se sirve como application/linkset+json con un arreglo "linkset".
 */
export async function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${SITE_URL}/api/apartments`,
        "service-desc": [
          {
            target: `${SITE_URL}/.well-known/ai-catalog.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            target: `${SITE_URL}/llms.txt`,
            type: "text/markdown",
            title: "Documentación del proyecto y del endpoint de departamentos",
          },
        ],
        status: [{ target: `${SITE_URL}/api/apartments` }],
      },
      {
        anchor: `${SITE_URL}/`,
        "service-desc": [
          {
            target: `${SITE_URL}/.well-known/ai-catalog.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            target: `${SITE_URL}/llms.txt`,
            type: "text/markdown",
          },
          {
            target: `${SITE_URL}/pricing.md`,
            type: "text/markdown",
            title: "Precios publicados estructurados",
          },
        ],
        status: [{ target: `${SITE_URL}/` }],
      },
    ],
  };

  return Response.json(linkset, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
