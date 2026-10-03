import { NextResponse, type NextRequest } from "next/server";

/**
 * Guarda de tamaño de request body: rechaza payloads demasiado grandes
 * ANTES de intentar parsear JSON. Evita DoS por requests gigantes.
 * Debe llamarse antes de request.json() en todas las APIs públicas.
 */

export const MAX_BODY_BYTES = {
  leads: 16 * 1024,      // 16 KB (formularios de leads son pequeños)
  reclamos: 64 * 1024,   // 64 KB (hojas de reclamación pueden tener texto largo)
  ingest: 32 * 1024 * 1024, // 32 MB (incluye thumbnails en base64)
  admin: 128 * 1024,     // 128 KB (acciones del panel)
  revalidate: 4 * 1024,  // 4 KB (solo un token)
};

export function checkBodySize(
  request: NextRequest,
  limit: number,
): NextResponse | null {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > limit) {
    return NextResponse.json(
      { ok: false, error: "Solicitud demasiado grande." },
      { status: 413 },
    );
  }
  return null;
}
