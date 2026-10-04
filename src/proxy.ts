import { NextResponse, type NextRequest } from "next/server";

import { APARTMENTS, getApartmentBySlug } from "@/data/apartments";
import { LLMS_MARKDOWN, apartmentMarkdown } from "@/lib/agent-content";

/**
 * Negociación de contenido para agentes de IA (Markdown for Agents):
 * las peticiones con Accept: text/markdown reciben una versión markdown
 * de la página; los navegadores siguen recibiendo HTML por defecto.
 * Docs: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

export const config = {
  matcher: ["/", "/departamentos/:path*"],
};

function wantsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  // Solo negociar markdown; text/html y */* siguen por el flujo normal.
  return accept.includes("text/markdown");
}

function markdownResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Vary": "Accept",
      "x-markdown-tokens": String(Math.ceil(body.length / 4)),
    },
  });
}

export function proxy(request: NextRequest) {
  if (!wantsMarkdown(request)) {
    // Informar a las cachés que la respuesta depende de la cabecera Accept.
    // append() para no sobrescribir el Vary que añade Next internamente.
    const response = NextResponse.next();
    response.headers.append("Vary", "Accept");
    return response;
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return markdownResponse(LLMS_MARKDOWN);
  }

  const slug = decodeURIComponent(pathname.split("/")[2] ?? "");
  const apartment = slug ? getApartmentBySlug(slug) : undefined;
  if (!apartment || apartment.isComingSoon) {
    const disponibles = APARTMENTS.filter((a) => !a.isComingSoon)
      .map((a) => `- ${a.type}`)
      .join("\n");
    return markdownResponse(
      `# Departamento no encontrado\n\nTipos disponibles:\n\n${disponibles}\n`,
      404,
    );
  }

  return markdownResponse(apartmentMarkdown(apartment));
}
