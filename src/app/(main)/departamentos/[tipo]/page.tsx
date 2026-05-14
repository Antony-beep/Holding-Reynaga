import { APARTMENTS } from "@/data/apartments";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, Play } from "lucide-react";
import DossierForm from "@/components/home/DossierForm";

export async function generateStaticParams() {
  return APARTMENTS.filter((a) => !a.isComingSoon).map((apt) => ({
    tipo: apt.type.toLowerCase().replace(" ", "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { tipo: string };
}) {
  const { tipo } = await params;
  const aptType = tipo.replace("-", " ");
  const apt = APARTMENTS.find(
    (a) => a.type.toLowerCase() === aptType.toLowerCase(),
  );

  if (!apt) {
    return { title: "Departamento No Encontrado" };
  }

  return {
    title: `Departamento en Venta ${apt.type} | Torres Titanium Huancayo`,
    description: `Descubre los detalles del Departamento ${apt.type} de ${apt.bedrooms} dormitorios en Torres Titanium, San Carlos, Huancayo. Vive con elegancia y confort.`,
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: { tipo: string };
}) {
  const { tipo } = await params;
  const aptType = tipo.replace("-", " ");
  const apt = APARTMENTS.find(
    (a) => a.type.toLowerCase() === aptType.toLowerCase(),
  );

  if (!apt || apt.isComingSoon) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="bg-deep-navy py-6 pt-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <Link
            href="/#departamentos"
            className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Catálogo
          </Link>
          <div className="flex items-center text-xs md:text-sm text-white/50 space-x-2">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="">Departamentos</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">{apt.type}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-architectural border border-black/5 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: Media */}
          <div className="order-2 lg:order-1 lg:w-3/5 bg-surface-container-lowest relative flex flex-col">
            {/* Video Section */}
            {apt.video && (
              <div className="relative w-full bg-surface-container-lowest flex items-center justify-center overflow-hidden border-b border-black/5 p-6 lg:p-10">
                <video 
                  className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                  controls
                  preload="metadata"
                  poster={`/images/DEPAS WEBP/${apt.type.toUpperCase()}/${apt.images[0]}`}
                >
                  <source
                    src={`/videos/Depas/${apt.video}`}
                    type="video/webm"
                  />
                  Tu navegador no soporta el formato de video.
                </video>
              </div>
            )}

            {/* Photo Gallery Grid */}
            <div className="p-6">
              <h3 className="font-display font-bold text-xl text-deep-navy mb-4">
                Galería del Inmueble
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {apt.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer border border-black/5 bg-gray-100"
                  >
                    <Image
                      src={`${apt.basePath}/${img}`}
                      alt={`Interior del ${apt.type} en Torres Titanium Huancayo - Vista ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Info & CTA */}
          <div className="order-1 lg:order-2 lg:w-2/5 p-8 lg:p-12 flex flex-col gap-10">
            <div>
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary mb-6 tracking-widest uppercase border border-primary/20">
                Línea {apt.area}
              </div>
              <h1 className="text-display font-black text-4xl md:text-5xl lg:text-6xl text-deep-navy mb-6 tracking-tight">
                {apt.type}
              </h1>

              <p className="font-body text-deep-navy/70 text-base md:text-lg mb-8 leading-relaxed">
                Descubre un diseño pensado para maximizar cada espacio. El
                departamento <strong>{apt.type}</strong> ofrece una experiencia
                residencial superior con acabados de primera y excelente
                iluminación natural.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-body text-deep-navy font-medium">
                    {apt.bedrooms} Dormitorios optimizados
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-body text-deep-navy font-medium">
                    Acabados europeos de lujo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-body text-deep-navy font-medium">
                    Diseño {apt.area.toLowerCase()} exclusivo
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-black/5">
              <h4 className="font-display font-bold text-deep-navy mb-4">
                Asegura este departamento
              </h4>
              <p className="text-sm text-deep-navy/60 mb-6">
                Congela el precio de preventa con S/ 1,000 hoy mismo.
              </p>
              <a
                href={`https://wa.me/51981407634?text=Hola, estoy muy interesado en el ${apt.type} y quiero agendar una visita/reserva.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-deep-navy hover:bg-primary text-white py-4 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1"
              >
                Reservar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
