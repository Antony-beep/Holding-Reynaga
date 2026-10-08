import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { GUIDES } from "@/data/guides";

export default function GuidesStrip() {
  return (
    <section id="guias" className="py-20 md:py-32 bg-surface relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary"></div>
            <span className="font-display font-bold text-primary tracking-[0.2em] text-sm uppercase">
              Guías y recursos
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <h2 className="text-display font-black text-4xl md:text-5xl text-deep-navy tracking-tight mb-4">
            Aprende antes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#B38728]">comprar</span>
          </h2>
          <p className="font-body text-deep-navy/70 text-base md:text-lg max-w-2xl mx-auto">
            Guías escritas por el equipo de Holding Reynaga con los datos reales del
            proyecto: precios, preventa y el proceso de separación paso a paso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="group bg-white rounded-2xl border border-black/5 shadow-architectural p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display font-black text-lg text-deep-navy mb-3 leading-snug">
                {g.h1}
              </h3>
              <p className="font-body text-sm text-deep-navy/70 leading-relaxed flex-grow">
                {g.description.slice(0, 110)}…
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider group-hover:underline">
                Leer guía
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 border-2 border-deep-navy/15 text-deep-navy font-bold px-7 py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-deep-navy hover:text-white hover:border-deep-navy transition-colors"
          >
            Ver todas las guías
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
