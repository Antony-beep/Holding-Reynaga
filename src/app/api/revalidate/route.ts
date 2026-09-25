import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Endpoint interno para que el scraper de redes (Python) o el admin
 * fuercen la regeneración de la home tras actualizar los posts.
 * Protegido con token en el header x-revalidate-secret o en el body.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { ok: false, error: "REVALIDATE_SECRET no configurado." },
      { status: 503 },
    );
  }

  let bodySecret: string | undefined;
  try {
    const body = (await request.json()) as { secret?: string };
    bodySecret = body?.secret;
  } catch {
    // Body vacío: nos quedamos con el header.
  }

  const provided = request.headers.get("x-revalidate-secret") ?? bodySecret;
  if (provided !== secret) {
    return Response.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  revalidatePath("/");
  return Response.json({ ok: true, revalidated: true, now: Date.now() });
}
