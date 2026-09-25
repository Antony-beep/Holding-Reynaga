import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { isAuthorized } from "@/lib/auth";
import {
  deleteSocialPostsByIds,
  getSocialPosts,
  getSocialSync,
  upsertSocialPost,
} from "@/lib/db";
import { isValidNetwork } from "@/lib/social";

export const runtime = "nodejs";

const THUMB_DIR = path.join(process.cwd(), "data", "social-thumbs");
const MAX_THUMB_BYTES = 8 * 1024 * 1024; // 8 MB

function unauthorized() {
  return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
}

/** Ruta absoluta del archivo de thumbnail a partir de thumb_path público (/social/xxx.jpg). */
function thumbAbsolutePath(publicPath: string): string {
  const fileName = publicPath.replace(/^\/social\//, "");
  return path.join(THUMB_DIR, fileName);
}

/** Descarga el thumbnail a public/social/ para servirlo local (URLs de CDN expiran). */
async function downloadThumb(
  network: string,
  postUrl: string,
  imageUrl: string,
): Promise<string> {
  const res = await fetch(imageUrl, {
    signal: AbortSignal.timeout(15_000),
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
  });
  if (!res.ok) throw new Error(`Descarga fallida (HTTP ${res.status})`);
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error("La URL no es una imagen.");
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.byteLength > MAX_THUMB_BYTES) {
    throw new Error("Imagen demasiado grande (>8MB).");
  }

  fs.mkdirSync(THUMB_DIR, { recursive: true });
  const hash = crypto.createHash("sha1").update(postUrl).digest("hex").slice(0, 12);
  const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
  const fileName = `${network}-${hash}.${ext}`;
  fs.writeFileSync(path.join(THUMB_DIR, fileName), buffer);
  return `/social/${fileName}`;
}

/** TikTok expone oEmbed público: dado el URL del video, extrae título y thumbnail. */
async function fetchTiktokOembed(postUrl: string) {
  const res = await fetch(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(postUrl)}`,
    { signal: AbortSignal.timeout(10_000) },
  );
  if (!res.ok) throw new Error(`oEmbed de TikTok falló (HTTP ${res.status})`);
  const data = (await res.json()) as { title?: string; thumbnail_url?: string };
  return {
    caption: typeof data.title === "string" ? data.title : "",
    thumbnail_url: typeof data.thumbnail_url === "string" ? data.thumbnail_url : "",
  };
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  const posts = getSocialPosts();
  const sync = getSocialSync();
  return NextResponse.json({ ok: true, posts, sync });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  let body: {
    network?: string;
    url?: string;
    caption?: string;
    imageUrl?: string;
    postedAt?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const { network, url } = body;
  if (!network || !isValidNetwork(network)) {
    return NextResponse.json(
      { ok: false, error: "Red inválida (facebook, instagram o tiktok)." },
      { status: 400 },
    );
  }
  if (typeof url !== "string" || !/^https:\/\//.test(url)) {
    return NextResponse.json(
      { ok: false, error: "Ingrese una URL válida (https://...)." },
      { status: 400 },
    );
  }

  let caption = typeof body.caption === "string" ? body.caption.trim().slice(0, 300) : "";
  let imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

  try {
    // TikTok: auto-completar caption e imagen vía oEmbed público
    if (network === "tiktok" && (!caption || !imageUrl)) {
      const oembed = await fetchTiktokOembed(url);
      caption = caption || oembed.caption;
      imageUrl = imageUrl || oembed.thumbnail_url;
    }

    // Descargar thumbnail si existe
    let thumbPath = "";
    if (imageUrl && /^https:\/\//.test(imageUrl)) {
      thumbPath = await downloadThumb(network, url, imageUrl);
    }

    const postedAt =
      typeof body.postedAt === "string" && body.postedAt.trim()
        ? body.postedAt.trim().slice(0, 19)
        : null;

    upsertSocialPost({
      network,
      post_url: url,
      caption,
      thumb_path: thumbPath,
      posted_at: postedAt,
      source: "manual",
    });

    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error:
          err instanceof Error
            ? err.message
            : "No se pudo guardar la publicación.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  let body: { ids?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const ids = Array.isArray(body.ids)
    ? body.ids.map((v) => Number(v)).filter((n) => Number.isInteger(n) && n > 0).slice(0, 200)
    : [];
  if (ids.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No se indicaron publicaciones válidas." },
      { status: 400 },
    );
  }

  // Borrar también los thumbnails huérfanos (mejor esfuerzo)
  const posts = getSocialPosts();
  for (const id of ids) {
    const post = posts.find((p) => p.id === id);
    if (post?.thumb_path) {
      try {
        fs.unlinkSync(thumbAbsolutePath(post.thumb_path));
      } catch {
        // El archivo puede no existir: ignorar.
      }
    }
  }

  const deleted = deleteSocialPostsByIds(ids);
  revalidatePath("/");
  return NextResponse.json({ ok: true, deleted });
}
