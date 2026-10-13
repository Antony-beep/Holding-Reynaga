"use client";

import { useEffect } from "react";
import { X, BookOpen, Send, Save, CheckCircle2, Forward, Ban, RotateCcw, Download, Printer, Clock3 } from "lucide-react";

export default function ReclamosGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const Boton = ({ icon: Icon, nombre, desc, color = "bg-blue-500/15 text-blue-300" }: {
    icon: React.ComponentType<{ className?: string }>; nombre: string; desc: string; color?: string;
  }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <p className="font-bold text-white text-sm mb-1">{nombre}</p>
        <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );

  const Paso = ({ n, titulo, desc }: { n: number; titulo: string; desc: string }) => (
    <div className="flex items-start gap-3">
      <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-deep-navy font-black text-sm flex items-center justify-center shrink-0">{n}</span>
      <div className="min-w-0">
        <p className="font-bold text-white text-sm">{titulo}</p>
        <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );

  const seccion = "font-display font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-4 mt-8 first:mt-0 flex items-center gap-2";

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Guía de atención de reclamos y quejas (INDECOPI)"
    >
      <div
        className="bg-deep-navy border border-white/15 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl md:text-2xl text-white tracking-tight">
                Guía de Reclamos y Quejas
              </h2>
              <p className="text-white/50 text-xs md:text-sm">
                Libro de Reclamaciones conforme a INDECOPI — Ley N° 29571 y D.S. N° 011-2011-PCM (mod. D.S. N° 101-2022-PCM)
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl p-2 transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Qué es */}
        <h3 className={seccion}><BookOpen className="w-4 h-4" aria-hidden="true" /> 1. ¿Qué es el Libro de Reclamaciones?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Según INDECOPI, es el <strong className="text-white">registro donde el consumidor informa una queja o un reclamo</strong>,
          con la finalidad de dar al proveedor y al consumidor una <strong className="text-white">solución rápida</strong> del problema.
          El consumidor puede solicitarlo <strong className="text-white">en cualquier momento</strong> cuando el producto o
          servicio no sea de su agrado. Nuestro libro es <strong className="text-white">virtual</strong> (permitido por la
          normativa vigente), con el aviso oficial (Anexo II) impreso y visible en la sala de ventas.
        </p>

        {/* 2. Reclamo vs Queja */}
        <h3 className={seccion}>2. Reclamo vs. Queja — la diferencia según INDECOPI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-5">
            <p className="font-display font-black text-amber-300 text-lg mb-2">RECLAMO</p>
            <p className="text-sm text-white/75 leading-relaxed">
              Disconformidad <strong className="text-white">relacionada al producto o servicio</strong> brindado.
              El consumidor espera una solución o reparación.
            </p>
            <p className="text-xs text-white/50 mt-3 leading-relaxed">
              Ejemplos: acabados distintos a lo ofrecido, demora en la entrega de la unidad, cobros no informados.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-400/30 rounded-2xl p-5">
            <p className="font-display font-black text-purple-300 text-lg mb-2">QUEJA</p>
            <p className="text-sm text-white/75 leading-relaxed">
              Disconformidad <strong className="text-white">relacionada a la atención</strong> del proveedor,
              <em> sin relación directa</em> con el producto o servicio.
            </p>
            <p className="text-xs text-white/50 mt-3 leading-relaxed">
              Ejemplos: trato desconsiderado del personal, demora en responder mensajes, mala atención en la oficina.
            </p>
          </div>
        </div>
        <p className="text-xs text-white/40 mt-3">
          En el panel se distinguen por la columna <strong className="text-white/60">Tipo</strong> y el prefijo del código.
          La atención y el plazo legal son iguales para ambos.
        </p>

        {/* 3. Paso a paso */}
        <h3 className={seccion}>3. Cómo atender un reclamo, paso a paso</h3>
        <div className="flex flex-col gap-4">
          <Paso n={1} titulo="Reciba la alerta" desc="Al registrarse un reclamo, el sistema envía la hoja oficial en PDF al consumidor y una alerta al correo del equipo de ventas. El caso aparece en el panel con su código (ej. RECL-2026-0001) y su fecha de vencimiento calculada." />
          <Paso n={2} titulo="Abra el reclamo" desc="Haga clic en la fila: revise los datos del consumidor, el monto reclamado, el detalle del hecho y el pedido concreto. Ese 'pedido' es lo que debe responder." />
          <Paso n={3} titulo="Redacte la respuesta formal" desc="Escriba en el cuadro de texto (mínimo 10 caracteres) una respuesta clara, cordial y específica: qué se hará, cuándo y cómo. Complete 'Registrada por' con su nombre." />
          <Paso n={4} titulo="Guarde el borrador (opcional)" desc="Si no va a enviarla aún, use 'Guardar borrador': el texto queda almacenado y puede volver después. Ver sección 4." />
          <Paso n={5} titulo="Envíe la respuesta por email" desc="Confirme el envío: el consumidor recibe la respuesta con la hoja de reclamación actualizada en PDF adjunto, y el sistema registra la fecha, hora e identificador del correo como evidencia de entrega." />
          <Paso n={6} titulo="Cierre el caso" desc="Si el consumidor quedó conforme, use 'Marcar ATENDIDO'. Si no recibió el correo, use 'Reenviar copia al consumidor'." />
        </div>

        {/* 4. Borradores */}
        <h3 className={seccion}><Save className="w-4 h-4" aria-hidden="true" /> 4. ¿Dónde se guardan los borradores?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          El borrador se guarda <strong className="text-white">en la base de datos del servidor</strong> (campo
          "respuesta" del reclamo), dentro del VPS. Al reabrir el reclamo, el texto aparece cargado tal cual lo dejó.
          <strong className="text-white"> No se envía ningún correo</strong> hasta que presione
          "Enviar respuesta por email". Como respaldo, cada reclamo también se copia al espejo de Google Sheets del negocio.
        </p>

        {/* 5. Botones */}
        <h3 className={seccion}>5. Qué hace cada botón</h3>
        <div className="flex flex-col gap-2">
          <Boton icon={Save} nombre="Guardar borrador" desc="Guarda el texto de la respuesta en la base de datos. No envía nada. Úselo para redactar con calma o pedir revisión interna." color="bg-white/10 text-white/70" />
          <Boton icon={Send} nombre="Enviar respuesta por email" desc="Guarda y envía la respuesta formal al consumidor (PDF adjunto). Registra fecha, hora e identificador de Resend como evidencia de envío. Es la acción que detiene el plazo legal." color="bg-[#D4AF37]/15 text-[#D4AF37]" />
          <Boton icon={CheckCircle2} nombre="Marcar ATENDIDO" desc="Cierra el reclamo como atendido. Solo aparece después de enviar la respuesta. Úselo cuando el caso quedó resuelto." color="bg-green-500/15 text-green-300" />
          <Boton icon={Forward} nombre="Reenviar copia al consumidor" desc="Reenvía la hoja de reclamación en PDF. Úselo si el consumidor perdió o no recibió el correo original." color="bg-blue-500/15 text-blue-300" />
          <Boton icon={Ban} nombre="Anular" desc="Cancela el reclamo con motivo obligatorio (mínimo 10 caracteres) que queda en el historial legal. Úselo solo para registros duplicados o hechos por error; nunca para evadir una respuesta." color="bg-red-500/15 text-red-300" />
          <Boton icon={RotateCcw} nombre="Reabrir" desc="Devuelve un reclamo anulado a la lista de pendientes si se cerró por error." color="bg-white/10 text-white/70" />
          <Boton icon={Download} nombre="Export CSV (INDECOPI)" desc="Descarga el libro completo en formato CSV para fiscalizaciones de INDECOPI. Disponible para usuarios Operador y Admin." color="bg-purple-500/15 text-purple-300" />
          <Boton icon={Printer} nombre="Descargar aviso PDF" desc="El aviso oficial del Anexo II para imprimir y exhibir en un lugar visible de la sala de ventas." color="bg-white/10 text-white/70" />
        </div>

        {/* 6. Plazos */}
        <h3 className={seccion}><Clock3 className="w-4 h-4" aria-hidden="true" /> 6. Plazo legal y semáforo</h3>
        <p className="text-sm text-white/70 leading-relaxed mb-3">
          La respuesta escrita debe darse en un plazo máximo de <strong className="text-white">15 días hábiles,
          improrrogables</strong>. Los feriados nacionales no cuentan como hábiles (se gestionan en la pestaña Feriados).
          El panel calcula el vencimiento por usted:
        </p>
        <div className="flex flex-col gap-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
            <p className="text-sm text-white/70"><strong className="text-white">Verde/normal:</strong> hay tiempo hábil. Planifique la respuesta.</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-3.5 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
            <p className="text-sm text-white/75"><strong className="text-amber-300">Ámbar:</strong> quedan pocos días hábiles. Priorice la respuesta HOY.</p>
          </div>
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-3.5 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-400 shrink-0" aria-hidden="true" />
            <p className="text-sm text-white/75"><strong className="text-red-300">Rojo (vencido):</strong> plazo legal incumplido — riesgo de sanción de INDECOPI. Responda de inmediato y documente la causa del retraso.</p>
          </div>
        </div>

        {/* 7. Datos oficiales */}
        <h3 className={seccion}>7. Datos oficiales para tener en cuenta (INDECOPI)</h3>
        <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl p-5 text-sm text-white/70 leading-relaxed">
          <ul className="flex flex-col gap-2 list-disc pl-5">
            <li>Si ambas partes llegan a un acuerdo, la solución se registra en la sección <strong className="text-white">"Observaciones y acciones adoptadas por el proveedor"</strong> de la hoja.</li>
            <li>Las hojas de reclamaciones se conservan por <strong className="text-white">dos (2) años</strong>. Nuestro historial vive en la base del servidor y en el espejo de Google Sheets.</li>
            <li>El aviso del Libro (Anexo II) debe estar en <strong className="text-white">lugar visible y accesible</strong> del establecimiento; si tuviera varios locales, corresponde un libro por cada uno.</li>
            <li>El registro de un reclamo <strong className="text-white">no limita ni sustituye</strong> el derecho del consumidor de acudir a INDECOPI en cualquier momento.</li>
            <li>El reclamo/queja nunca debe condicionarse: la atención de su solicitud no exige aceptar promociones ni renunciar a derechos.</li>
          </ul>
        </div>

        {/* Pie */}
        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-white/40 leading-relaxed">
            Fuente oficial: <span className="text-white/60">enlinea.indecopi.gob.pe — Guía de Consumo MYPE</span> ·
            Código de Protección y Defensa del Consumidor (Ley N° 29571).
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
