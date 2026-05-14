"use client";

const GALLERY_ITEMS = [
  { img: "Woman_exercising.webp", title: "Fitness Center", span: "md:col-span-2 md:row-span-2" },
  { img: "Sala_tertulias_condominio.webp", title: "Lobby Principal", span: "md:col-span-1 md:row-span-2" },
  { img: "Pérgolas_de_sol.webp", title: "Rooftop & Pérgolas", span: "md:col-span-1 md:row-span-2" },
  { img: "Create_campfire_area.webp", title: "Campfire & Relax", span: "md:col-span-2 md:row-span-1" },
  { img: "area_de_juegos.webp", title: "Sala de Juegos", span: "md:col-span-1 md:row-span-1" },
  { img: "ascensores.webp", title: "Hall de Ascensores", span: "md:col-span-1 md:row-span-1" },
  { img: "sótano_de_Estacionamiento.webp", title: "Estacionamiento Premium", span: "md:col-span-1 md:row-span-1" },
  { img: "Gabinetes_Contra_Incendios.webp", title: "Seguridad Integral", span: "md:col-span-1 md:row-span-1" },
  { img: "area_parrillas_barra.webp", title: "Bar & Parrillas", span: "md:col-span-2 md:row-span-1" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-12 md:py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-10 md:mb-14 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full"></div>
            <span className="font-display font-bold text-[#B38728] tracking-[0.15em] text-xs md:text-sm uppercase bg-[#BF953F]/10 px-4 py-1.5 rounded-full border border-[#BF953F]/20">
              Amenidades Premium
            </span>
            <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full hidden sm:block"></div>
          </div>
          <h2 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-deep-navy tracking-tighter mb-6 leading-[1.1]">
            Espacios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#996515]">Conexión</span>
          </h2>
          <p className="text-deep-navy/70 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Áreas diseñadas para elevar tu estilo de vida cotidiano, desde el primer café hasta el atardecer en el rooftop.
          </p>
        </div>

        {/* Bento Box Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[160px] lg:auto-rows-[190px]">
          {GALLERY_ITEMS.map((item, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 border border-surface-container-low ${item.span}`}
            >
              {/* Image */}
              <img 
                src={`/images/galeria/${item.img}`} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Text / Title content */}
              <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-6 h-0.5 bg-primary mb-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <p className="text-white font-display text-sm md:text-base lg:text-lg font-bold tracking-wide drop-shadow-md">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center md:text-right">
          <p className="text-xs text-on-surface/40 font-body italic">
            * Las imágenes mostradas son de carácter referencial.
          </p>
        </div>
      </div>
    </section>
  );
}
