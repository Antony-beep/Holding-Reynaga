import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getSocialFeed, pickFeaturedSocialPost } from "@/lib/db";
import {
  NETWORK_LABELS,
  SOCIAL_LINKS,
  relativeTimeEs,
  type SocialNetwork,
} from "@/lib/social";
import type { SocialPostRow } from "@/lib/db";

/** Verifica que el thumbnail realmente exista en disco (server-side). */
function thumbExists(publicPath: string): boolean {
  if (!publicPath) return false;
  try {
    const fileName = publicPath.replace(/^\/social\//, "");
    return fs.existsSync(
      path.join(process.cwd(), "data", "social-thumbs", fileName),
    );
  } catch {
    return false;
  }
}

/**
 * Trunca por CODE POINTS (no por unidades UTF-16): partir un emoji por la
 * mitad genera un surrogate huérfano (carácter inválido) que rompe la
 * hidratación de React — el HTML del servidor y el payload del cliente
 * serializan ese byte roto de formas distintas.
 */
function truncate(text: string, max = 140): string {
  if (!text) return "";
  const chars = Array.from(text); // divide por puntos de código (emojis enteros)
  if (chars.length <= max) return text;
  return `${chars.slice(0, max).join("").trimEnd()}…`;
}

const NETWORK_COLORS: Record<SocialNetwork, string> = {
  tiktok: "text-[#FE2C55]",
  instagram: "text-[#E1306C]",
  facebook: "text-[#4267F2]",
};

function NetworkIcon({
  network,
  size = 20,
}: {
  network: SocialNetwork;
  size?: number;
}) {
  if (network === "facebook") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (network === "instagram") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/**
 * Sección de video destacado: reel vertical 9:16 (publicación aleatoria
 * del día) + mini-feed con la última publicación de cada red social.
 * Server Component puro: cero JS en cliente.
 */
export default function SocialVideos() {
  const post = pickFeaturedSocialPost();
  const feed = getSocialFeed(5);
  const hasThumb = post ? thumbExists(post.thumb_path) : false;

  if (!post) {
    return (
      <section
        id="video-redes"
        className="py-16 md:py-20 bg-deep-navy relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </div>
            <h3 className="text-white font-display font-bold text-lg">
              Pronto: nuestro mejor contenido de redes
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Estamos preparando esta sección. Mientras tanto, síguenos en
              nuestras redes para ver los avances del proyecto.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {(Object.keys(SOCIAL_LINKS) as SocialNetwork[]).map((network) => (
                <a
                  key={network}
                  href={SOCIAL_LINKS[network]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/5 hover:bg-[#D4AF37] border border-white/15 hover:border-[#D4AF37] text-white hover:text-deep-navy px-4 py-2 rounded-xl font-display font-bold text-[11px] uppercase tracking-wider transition-all duration-300"
                >
                  <NetworkIcon network={network} size={14} />
                  {NETWORK_LABELS[network]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="video-redes"
      className="py-16 md:py-20 bg-deep-navy relative overflow-hidden"
    >
      {/* Decoración de fondo coherente con el resto de la página */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-10 md:mb-14 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full" />
            <span className="font-display font-bold text-[#B38728] tracking-[0.15em] text-xs md:text-sm uppercase bg-[#BF953F]/10 px-4 py-1.5 rounded-full border border-[#BF953F]/20">
              Desde nuestras redes
            </span>
            <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full" />
          </div>
          <h2 className="text-display font-black text-4xl md:text-5xl text-white tracking-tighter mb-4 leading-[1.1]">
            Mira lo que estamos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#996515]">
              compartiendo
            </span>
          </h2>
          <p className="font-body text-white/60 text-sm md:text-base max-w-xl font-light">
            Avances de obra, recorridos exclusivos y novedades del proyecto,
            directo desde nuestras redes sociales.
          </p>
        </div>

        {/* Reel + mini-feed */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-14">
          {/* El reel del día (9:16) */}
          <a
            href={post.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative w-full max-w-[280px] lg:max-w-[300px] shrink-0 rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:-translate-y-1 bg-white/5"
          >
            <div className="relative aspect-[9/16] overflow-hidden">
              {hasThumb ? (
                <Image
                  src={post.thumb_path}
                  alt={`${NETWORK_LABELS[post.network]} — ${truncate(post.caption, 60) || "Publicación de Holding Reynaga"}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 300px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-[#1a2942] to-[#0a1931] flex items-center justify-center">
                  <div className="text-[#D4AF37]/30 scale-[3]">
                    <NetworkIcon network={post.network} />
                  </div>
                </div>
              )}

              {/* Overlay inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/95 via-deep-navy/20 to-transparent pointer-events-none" />

              {/* Badge de red */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 text-deep-navy px-3 py-1.5 rounded-full font-display font-bold text-[10px] uppercase tracking-wider shadow-md">
                <span className="text-[#D4AF37]">
                  <NetworkIcon network={post.network} size={14} />
                </span>
                {NETWORK_LABELS[post.network]}
              </div>

              {/* Play central */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-deep-navy ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Caption + meta */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {post.caption && (
                  <p className="text-white font-display font-bold text-sm leading-snug mb-2 drop-shadow-md line-clamp-2">
                    {truncate(post.caption, 140)}
                  </p>
                )}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60 text-[11px] font-medium shrink-0">
                    {relativeTimeEs(post.posted_at) ?? "Última publicación"}
                  </span>
                  <span className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                    Ver en {NETWORK_LABELS[post.network]} →
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* Mini-feed: la última publicación de cada red */}
          <div className="w-full max-w-xl flex flex-col gap-3 lg:pt-2">
            <p className="font-display font-bold text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1 text-center lg:text-left">
              Últimas publicaciones
            </p>

            {feed.map((item: SocialPostRow) => {
              const itemThumb = thumbExists(item.thumb_path);
              const isFeatured = item.id === post.id;
              return (
                <a
                  key={item.id}
                  href={item.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                    isFeatured
                      ? "border-[#D4AF37]/50 bg-[#D4AF37]/10"
                      : "border-white/10 bg-white/5 hover:border-[#D4AF37]/40 hover:bg-white/10"
                  }`}
                >
                  {/* Miniatura 44px */}
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-white/10">
                    {itemThumb ? (
                      <Image
                        src={item.thumb_path}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/30">
                        <NetworkIcon network={item.network} size={16} />
                      </div>
                    )}
                  </div>

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={NETWORK_COLORS[item.network]}>
                        <NetworkIcon network={item.network} size={13} />
                      </span>
                      <span className="font-display font-bold text-[11px] uppercase tracking-wider text-white/60">
                        {NETWORK_LABELS[item.network]}
                      </span>
                      {relativeTimeEs(item.posted_at) && (
                        <span className="text-[11px] text-white/30 font-medium">
                          · {relativeTimeEs(item.posted_at)}
                        </span>
                      )}
                      {isFeatured && (
                        <span className="ml-auto font-display font-bold text-[9px] uppercase tracking-wider text-deep-navy bg-[#D4AF37] px-2 py-0.5 rounded-full">
                          ▶ En el reel
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/80 leading-snug line-clamp-2">
                      {truncate(item.caption, 140) ||
                        "Nueva publicación de Holding Reynaga"}
                    </p>
                  </div>

                  {/* Flecha hover */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                    aria-hidden
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
