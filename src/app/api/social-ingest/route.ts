import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  getSocialPosts,
  replaceAutoPosts,
  upsertSocialPost,
  upsertSocialSync,
} from "@/lib/db";

export const runtime = "nodejs";

const THUMB_DIR = path.join(process.cwd(), "data", "social-thumbs");
const MAX_POSTS = 20;
const RATE_WINDOW_MS = 60 * 60_000;
const RATE_MAX = 10;

// ---- Rate limit simple (en memoria) ----
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

// ---- Esquema del paquete del scraper ----
const ingestSchema = z.object({
  posts: z
    .array(
      z.object({
        network: z.enum(["tiktok", "instagram", "facebook"]),
        postUrl: z.string().regex(/^https:\/\//, "URL inválida").max(300),
        caption: z.string().max(300).default(""),
        postedAt: z.string().max(19).nullable().optional(),
        thumbName: z.string().max(60).nullable().optional(),
        thumbB64: z.string().nullable().optional(),
      }),
    )
    .max(MAX_POSTS),
  sync: z
    .array(
      z.object({
        network: z.string().max(20),
        ok: z.boolean(),
        error: z.string().max(300).default(""),
        found: z.number().int().min(0).max(50).default(0),
      }),
    )
    .max(5)
    .optional(),
  replace: z.boolean().default(true),
});

/** Compara el secreto en tiempo constante. */
function secretMatches(provided: string | null): boolean {
  const real = process.env.SOCIAL_INGEST_SECRET;
  if (!real) return false;
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Valida los magic bytes de la imagen decodificada (PNG/JPEG/WebP). */
function validImageMagic(bytes: Buffer): boolean {
  if (bytes.length < 12) return false;
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47
  ) return true; // PNG
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return true; // JPEG
  if (bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
      bytes.subarray(8, 12).toString("ascii") === "WEBP") return true; // WebP
  return false;
}

/** Borra thumbs que ninguna publicación referencie. */
function pruneOrphanThumbs(): number {
  if (!fs.existsSync(THUMB_DIR)) return 0;
  const referenced = new Set(
    getSocialPosts()
      .map((p) => p.thumb_path)
      .filter((t): t is string => Boolean(t)),
  );
  let removed = 0;
  for (const file of fs.readdirSync(THUMB_DIR)) {
    if (file.startsWith(".")) continue;
    if (!referenced.has(`/social/${file}`)) {
      try {
        fs.unlinkSync(path.join(THUMB_DIR, file));
        removed += 1;
      } catch {
        // mejor esfuerzo
      }
    }
  }
  return removed;
}

export async function POST(request: NextRequest) {
  if (!process.env.SOCIAL_INGEST_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Endpoint no configurado (SOCIAL_INGEST_SECRET)." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Demasiadas solicitudes." }, { status: 429 });
  }

  if (!secretMatches(request.headers.get("x-ingest-secret"))) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Payload inválido." }, { status: 400 });
  }

  const parsed = ingestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: `Payload inválido: ${parsed.error.issues[0]?.message ?? "datos incorrectos"}` },
      { status: 400 },
    );
  }

  const { posts, sync, replace } = parsed.data;
  fs.mkdirSync(THUMB_DIR, { recursive: true });

  let ingested = 0;
  let thumbsOk = 0;

  // 1) Guardar thumbs y upsert de posts
  const urlsByNetwork: Record<string, string[]> = {};
  for (const post of posts) {
    let thumbPath = "";
    if (post.thumbName && post.thumbB64) {
      // Nombre con el patrón del sistema (red-hash.ext) — sin path traversal
      if (!/^[a-z]+-[a-f0-9]{12}\.(png|jpg|jpeg|webp)$/.test(post.thumbName)) {
        continue; // nombre inválido: se descarta el thumb, no el post
      }
      try {
        const bytes = Buffer.from(post.thumbB64, "base64");
        if (bytes.length > 0 && bytes.length <= 8 * 1024 * 1024 && validImageMagic(bytes)) {
          fs.writeFileSync(path.join(THUMB_DIR, post.thumbName), bytes);
          thumbPath = `/social/${post.thumbName}`;
          thumbsOk += 1;
        }
      } catch {
        // thumb corrupto: seguir sin él
      }
    }

    upsertSocialPost({
      network: post.network,
      post_url: post.postUrl,
      caption: post.caption,
      thumb_path: thumbPath,
      posted_at: post.postedAt ?? null,
      source: "auto",
    });
    (urlsByNetwork[post.network] ??= []).push(post.postUrl);
    ingested += 1;
  }

  // 2) Reemplazo: borrar los auto-posts antiguos de esa red
  let replaced = 0;
  if (replace) {
    for (const [network, urls] of Object.entries(urlsByNetwork)) {
      replaced += replaceAutoPosts(network, urls);
    }
  }

  // 3) Limpieza de thumbs huérfanos
  const pruned = pruneOrphanThumbs();

  // 4) Salud reportada por el scraper (para el panel /admin)
  for (const s of sync ?? []) {
    upsertSocialSync({
      network: s.network,
      last_ok: s.ok,
      error: s.error || undefined,
      posts_found: s.found,
    });
  }

  // 5) La home muestra el post destacado nuevo al instante
  if (ingested > 0) {
    revalidatePath("/");
  }

  return NextResponse.json({ ok: true, ingested, replaced, thumbsOk, pruned });
}
