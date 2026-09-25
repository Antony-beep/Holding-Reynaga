import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, Clock3, FileText, Mail } from "lucide-react";
import ReclamoForm from "@/components/reclamos/ReclamoForm";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Hoja de reclamación virtual de Holding Inversiones Reynaga S.A.C. (Torres Titanium) conforme al Código de Protección y Defensa del Consumidor — Ley N° 29571.",
};

export default function LibroReclamacionesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-surface pb-16">
      {/* Encabezado */}
      <div className="bg-deep-navy pt-32 pb-14 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-1.5 h-6 bg-gradient-to-b from-[#BF953F] to-[#B38728] rounded-full" />
            <span className="font-display font-bold text-[#B38728] tracking-[0.15em] text-xs uppercase bg-[#BF953F]/10 px-4 py-1.5 rounded-full border border-[#BF953F]/20">
              Ley N° 29571 · D.S. N° 011-2011-PCM
            </span>
          </div>
          <h1 className="text-display font-black text-4xl md:text-5xl text-white tracking-tighter mb-4 leading-[1.1]">
            Libro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#996515]">Reclamaciones</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-2xl font-light leading-relaxed">
            Registre aquí su reclamo o queja. Es su derecho como consumidor y
            nuestro equipo tiene un plazo máximo de <strong className="text-white/80">15 días hábiles</strong> para
            atenderlo por escrito.
          </p>
        </div>
      </div>

      {/* Info previa */}
      <div className="container mx-auto px-6 max-w-4xl -mt-8 relative z-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-surface-container-highest shadow-architectural p-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <p className="font-display font-bold text-sm text-deep-navy mb-1">Reclamo vs. Queja</p>
            <p className="text-xs text-deep-navy/60 leading-relaxed">
              <strong>Reclamo</strong>: disconformidad con el producto o servicio.
              <strong> Queja</strong>: disconformidad con la atención recibida.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-surface-container-highest shadow-architectural p-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Clock3 className="w-5 h-5" />
            </div>
            <p className="font-display font-bold text-sm text-deep-navy mb-1">15 días hábiles</p>
            <p className="text-xs text-deep-navy/60 leading-relaxed">
              Respuesta escrita por correo, improrrogable, desde el registro de su hoja.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-surface-container-highest shadow-architectural p-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <p className="font-display font-bold text-sm text-deep-navy mb-1">Copia inmediata</p>
            <p className="text-xs text-deep-navy/60 leading-relaxed">
              Al registrar, recibe su hoja en PDF con código único, descargable y por correo.
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="container mx-auto px-6 max-w-4xl">
        <ReclamoForm />
      </div>

      {/* Pie informativo */}
      <div className="container mx-auto px-6 max-w-4xl mt-10">
        <div className="bg-white/60 border border-surface-container-highest rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-sm text-deep-navy/60">
          <Mail className="w-5 h-5 text-[#B8860B] shrink-0" />
          <p className="leading-relaxed text-center sm:text-left">
            Proveedor: <strong className="text-deep-navy">HOLDING INVERSIONES REYNAGA S.A.C.</strong> —
            RUC 20614870959 — Jr. Lino Nro. 132, Oficina 401, Huancayo. Sala de
            ventas: Av. San Agustín 154, San Carlos. Este Libro de Reclamaciones
            Virtual se rige por el{" "}
            <Link href="/terminos-y-condiciones" className="text-[#B8860B] font-bold hover:underline">
              Código de Protección y Defensa del Consumidor
            </Link>
            . Puede acudir a INDECOPI en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}
