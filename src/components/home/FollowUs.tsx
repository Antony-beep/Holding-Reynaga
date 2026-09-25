import { NETWORK_LABELS, SOCIAL_LINKS, type SocialNetwork } from "@/lib/social";

/** Ícono de cada red (SVG inline, sin JS). */
function NetworkIcon({ network }: { network: SocialNetwork }) {
  if (network === "facebook") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (network === "instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/**
 * CTA de redes sociales (solo texto + botones, 100% estático).
 * El video destacado vive en su propio componente: SocialVideos.
 */
export default function FollowUs() {
  return (
    <section
      id="siguenos"
      className="py-16 md:py-20 bg-deep-navy relative overflow-hidden border-t border-[#D4AF37]/10"
    >
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full" />
          <span className="font-display font-bold text-[#B38728] tracking-[0.15em] text-xs md:text-sm uppercase bg-[#BF953F]/10 px-4 py-1.5 rounded-full border border-[#BF953F]/20">
            Nuestras Redes
          </span>
          <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full" />
        </div>

        <h2 className="text-display font-black text-3xl md:text-4xl text-white tracking-tighter mb-5 leading-[1.15]">
          Vive el proyecto{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#996515]">
            todos los días
          </span>{" "}
          en redes
        </h2>

        <p className="font-body text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
          Avances de obra en tiempo real, recorridos exclusivos, consejos de
          inversión y estrenos en 360°: compartimos la vida Titanium a diario.
          Síguenos y sé el primero en enterarte de todo.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {(Object.keys(SOCIAL_LINKS) as SocialNetwork[]).map((network) => (
            <a
              key={network}
              href={SOCIAL_LINKS[network]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white/5 hover:bg-[#D4AF37] border border-white/15 hover:border-[#D4AF37] text-white hover:text-deep-navy px-5 py-3 rounded-xl font-display font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <NetworkIcon network={network} />
              {NETWORK_LABELS[network]}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
