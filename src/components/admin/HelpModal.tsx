"use client";

import { useEffect } from "react";
import { X, HelpCircle, Megaphone, Users } from "lucide-react";

const ESTADOS = [
  {
    nombre: "Nuevo",
    color: "bg-amber-500/20 text-amber-300",
    desc: "Recién llegó por el formulario. Nadie lo ha contactado todavía. Prioridad: llamar o escribir lo antes posible.",
  },
  {
    nombre: "Contactado",
    color: "bg-blue-500/20 text-blue-300",
    desc: "Ya hubo una primera conversación (llamada, WhatsApp o correo). Acuerde el siguiente paso y anótelo en notas.",
  },
  {
    nombre: "Calificado",
    color: "bg-purple-500/20 text-purple-300",
    desc: "Confirmó interés real y capacidad de compra. Prospecto serio: coordine una visita al proyecto.",
  },
  {
    nombre: "Visita agendada",
    color: "bg-cyan-500/20 text-cyan-300",
    desc: "Tiene cita para conocer el proyecto o la oficina. Confirme la visita un día antes.",
  },
  {
    nombre: "Reservado",
    color: "bg-green-500/20 text-green-300",
    desc: "Pagó los S/ 1,000 y firmó su Constancia de Separación. La unidad quedó comprometida a su nombre.",
  },
  {
    nombre: "Descartado",
    color: "bg-white/10 text-white/40",
    desc: "No responde, perdió interés o no califica. Se conserva en la base y en Google Sheets por historial.",
  },
];

const ROLES = [
  {
    nombre: "Admin",
    color: "bg-[#D4AF37]/15 text-[#D4AF37]",
    desc: "Control total: todo lo del Operador, más borrar leads, derecho de cancelación en Google Sheets, feriados, configuración del Libro de Reclamaciones y gestión de usuarios.",
  },
  {
    nombre: "Operador",
    color: "bg-blue-500/20 text-blue-300",
    desc: "El día a día comercial: cambia estados de leads, autoriza/revoca promos, responde reclamos por correo y publica en redes. NO puede borrar leads ni tocar configuración.",
  },
  {
    nombre: "Lectura",
    color: "bg-white/10 text-white/60",
    desc: "Solo visualiza: ve leads, reclamos y redes, pero sin botones de acción ni exportación de datos (protege los datos personales).",
  },
];

const PROMOS = [
  {
    nombre: "Sí",
    color: "bg-teal-500/20 text-teal-300",
    desc: "Aceptó recibir promociones: puede incluirse en listas de difusión por WhatsApp, llamada o correo.",
  },
  {
    nombre: "No",
    color: "bg-white/10 text-white/40",
    desc: "Rechazó la casilla del formulario o revocó después. Solo contacto 1 a 1 cuando él lo pida (Ley 29733).",
  },
  {
    nombre: "—",
    color: "bg-white/5 text-white/30",
    desc: "Registro histórico sin evidencia de consentimiento. Trátelo como \"No\".",
  },
];

export default function HelpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Guía del panel: estados de leads y tipos de usuario"
    >
      <div
        className="bg-deep-navy border border-white/15 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl md:text-2xl text-white tracking-tight">
                Guía rápida del panel
              </h2>
              <p className="text-white/50 text-xs md:text-sm">
                Estados de los leads, indicador de promos y tipos de usuario.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl p-2 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Estados de leads */}
        <section aria-labelledby="help-estados">
          <h3 id="help-estados" className="font-display font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
            Estados de un Lead (embudo de ventas)
          </h3>
          <div className="flex flex-col gap-2">
            {ESTADOS.map((e) => (
              <div key={e.nombre} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${e.color}`}>
                  {e.nombre}
                </span>
                <p className="text-sm text-white/70 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-3 leading-relaxed">
            El estado se cambia con el menú desplegable de cada lead y se guarda al instante.
            Un lead bien clasificado alimenta las tarjetas de métricas del dashboard.
          </p>
        </section>

        {/* Promos */}
        <section aria-labelledby="help-promos" className="mt-8">
          <h3 id="help-promos" className="font-display font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
            <Megaphone className="w-4 h-4" aria-hidden="true" />
            Indicador de Promos (Ley 29733)
          </h3>
          <div className="flex flex-col gap-2">
            {PROMOS.map((p) => (
              <div key={p.nombre} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1 ${p.color}`}>
                  <Megaphone className="w-3 h-3" aria-hidden="true" />
                  {p.nombre}
                </span>
                <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-3 leading-relaxed">
            Clic en el botón para cambiar el estado con confirmación. Cada cambio queda
            registrado con fecha y hora como evidencia legal, y solo el propio cliente
            puede autorizar promociones — nunca se marcan por defecto.
          </p>
        </section>

        {/* Roles */}
        <section aria-labelledby="help-roles" className="mt-8">
          <h3 id="help-roles" className="font-display font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" aria-hidden="true" />
            Tipos de usuario del panel
          </h3>
          <div className="flex flex-col gap-2">
            {ROLES.map((r) => (
              <div key={r.nombre} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${r.color}`}>
                  {r.nombre}
                </span>
                <p className="text-sm text-white/70 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 mt-3 leading-relaxed">
            Solo los usuarios Admin pueden crear, restablecer o desactivar cuentas
            (pestaña Usuarios). Al desactivar a alguien, sus sesiones abiertas se
            cierran de inmediato. Los reclamos vencen a los 15 días hábiles: revise
            el semáforo de la pestaña Reclamos todos los días.
          </p>
        </section>

        {/* Pie */}
        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-white/40 leading-relaxed">
            ¿Más detalle? Consulte el <strong className="text-white/60">Manual de Uso del Panel</strong> (documento Word de gerencia).
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] text-deep-navy font-display font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
