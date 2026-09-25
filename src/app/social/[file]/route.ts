import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const THUMB_DIR = path.join(process.cwd(), "data", "social-thumbs");

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

/**
 * Sirve los thumbnails de las publicaciones sociales.
 * Se guardan en data/social-thumbs (fuera de public/) porque Next.js
 * en producción congela public/ al arrancar; esta ruta lee el disco
 * en cada request, así los thumbs nuevos aparecen al instante.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;

  // Solo nombres generados por el sistema (red-hash.ext) — sin path traversal.
  if (!/^[a-z]+-[a-f0-9]{12}\.(jpg|png|webp)$/.test(file)) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  const filePath = path.join(THUMB_DIR, file);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  const ext = file.split(".").pop() ?? "jpg";
  const buffer = fs.readFileSync(filePath);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": CONTENT_TYPES[ext] ?? "image/jpeg",
      // El nombre lleva hash del post: mientras exista, no cambia → caché agresiva.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
