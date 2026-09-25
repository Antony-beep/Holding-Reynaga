"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Loader2, RefreshCw, AlertTriangle, CheckCircle2, Clock3,
  XCircle, Save, Send, Download, Printer, CalendarDays, Settings2, ListTodo,
} from "lucide-react";

interface Reclamo {
  id: number;
  codigo: string;
  created_at: string;
  tipo: "reclamo" | "queja";
  bien_label: string;
  monto: string;
  detalle: string;
  pedido: string;
  nombre: string;
  documento: string;
  domicilio: string;
  telefono: string;
  email: string;
  representante: string;
  estado: "pendiente" | "atendido" | "anulado";
  respuesta: string;
  respuesta_enviada_en: string | null;
  respondido_por: string;
  anulado_motivo: string;
  email_cliente_enviado: number;
  email_ventas_enviado: number;
  deadline: string;
  daysLeft: number;
  vencido: boolean;
}

interface HolidayRow { id: number; fecha: string }

type Tab = "reclamos" | "feriados" | "config";

export default function ReclamosManager() {
  const [tab, setTab] = useState<Tab>("reclamos");
  const [reclamos, setReclamos] = useState<Reclamo[]>([]);
  const [holidays, setHolidays] = useState<HolidayRow[]>([]);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  // Detalle del reclamo seleccionado (derivado del estado fresco tras cada acción)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = reclamos.find((r) => r.id === selectedId) ?? null;
  const [respuestaText, setRespuestaText] = useState("");
  const [respondidoPor, setRespondidoPor] = useState("");
  const [anularMotivo, setAnularMotivo] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reclamos", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (res.status === 401) { window.location.reload(); return; }
        throw new Error(data.error || "No se pudo cargar.");
      }
      setReclamos(data.reclamos ?? []);
      setHolidays(data.holidays ?? []);
      setNotifyEmail(data.notifyEmail ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const action = async (payload: Record<string, unknown>) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/reclamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "La acción falló.");
      setNotice(data.message ?? "Hecho.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setBusy(false);
    }
  };

  const openDetail = (r: Reclamo) => {
    setSelectedId(r.id);
    setRespuestaText(r.respuesta ?? "");
    setRespondidoPor(r.respondido_por ?? "");
    setAnularMotivo("");
    setNotice("");
    setError("");
  };

  const pending = reclamos.filter((r) => r.estado === "pendiente").length;
  const vencidos = reclamos.filter((r) => r.estado === "pendiente" && r.vencido).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Resumen + acciones rápidas */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm flex items-center gap-2">
          <ListTodo className="w-4 h-4 text-[#D4AF37]" />
          Pendientes: <strong className="text-white">{pending}</strong>
        </span>
        <span className={`rounded-xl px-4 py-2 text-sm border flex items-center gap-2 ${vencidos > 0 ? "bg-red-500/15 border-red-400/40 text-red-200" : "bg-white/5 border-white/10 text-white/60"}`}>
          <AlertTriangle className="w-4 h-4" />
          Vencidos: <strong>{vencidos}</strong>
        </span>
        <button onClick={load} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Actualizar
        </button>
        <a href="/api/admin/reclamos?export=csv" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV (INDECOPI)
        </a>
      </div>

      {/* Sub-pestañas */}
      <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 w-fit">
        {([["reclamos", "Reclamos"], ["feriados", "Feriados"], ["config", "Configuración"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tab === key ? "bg-[#D4AF37] text-deep-navy" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-400/30 text-red-200 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {notice && (
        <div className="bg-green-500/10 border border-green-400/30 text-green-200 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> {notice}
        </div>
      )}

      {/* ===== TAB: RECLAMOS ===== */}
      {tab === "reclamos" && (
        <>
          {!selected ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[860px]">
                <thead>
                  <tr className="text-left text-white/50 border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3">Código</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Consumidor</th>
                    <th className="px-4 py-3">Registrado</th>
                    <th className="px-4 py-3">Vence</th>
                    <th className="px-4 py-3">Plazo</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={8} className="px-4 py-12 text-center text-white/50">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Cargando reclamosâ€¦
                    </td></tr>
                  ) : reclamos.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-12 text-center text-white/50">
                      No hay reclamos registrados. Cuando un consumidor registre uno, aparecerá aquí.
                    </td></tr>
                  ) : reclamos.map((r) => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => openDetail(r)}>
                      <td className="px-4 py-3 font-bold text-[#D4AF37]">{r.codigo}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${r.tipo === "reclamo" ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "bg-white/10 text-white/70"}`}>
                          {r.tipo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/80">{r.nombre}<span className="block text-[11px] text-white/40">{r.email}</span></td>
                      <td className="px-4 py-3 text-white/60 whitespace-nowrap text-xs">{r.created_at}</td>
                      <td className="px-4 py-3 text-white/60 whitespace-nowrap text-xs">{r.deadline}</td>
                      <td className="px-4 py-3">
                        {r.estado !== "pendiente" ? (
                          <span className="text-white/30 text-xs">â€”</span>
                        ) : (
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.vencido ? "bg-red-500/20 text-red-300" : r.daysLeft <= 5 ? "bg-amber-500/20 text-amber-300" : "bg-green-500/20 text-green-300"}`}>
                            {r.vencido ? "VENCIDO" : `${r.daysLeft} días háb.`}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          r.estado === "atendido" ? "bg-green-500/15 text-green-300"
                          : r.estado === "anulado" ? "bg-white/10 text-white/50"
                          : "bg-amber-500/15 text-amber-300"}`}>
                          {r.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/40">â†’</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Detalle del reclamo seleccionado */
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <button onClick={() => { setSelectedId(null); load(); }} className="text-xs text-white/50 hover:text-white mb-2">← Volver a la lista</button>
                  <h3 className="font-display font-black text-2xl text-[#D4AF37]">{selected.codigo}</h3>
                  <p className="text-xs text-white/50 mt-1">
                    {selected.tipo.toUpperCase()} · Registrado {selected.created_at} · Vence {selected.deadline} {" "}
                    {selected.estado === "pendiente" && (
                      <span className={selected.vencido ? "text-red-300 font-bold" : "text-amber-300 font-bold"}>
                        ({selected.vencido ? "VENCIDO" : `${selected.daysLeft} días hábiles restantes`})
                      </span>
                    )}
                  </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  selected.estado === "atendido" ? "bg-green-500/15 text-green-300"
                  : selected.estado === "anulado" ? "bg-white/10 text-white/50"
                  : "bg-amber-500/15 text-amber-300"}`}>
                  {selected.estado}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="text-white/50 font-bold text-[10px] uppercase tracking-widest">Consumidor</p>
                  <p className="text-white/85">{selected.nombre} â€” Doc: {selected.documento}</p>
                  <p className="text-white/60 text-xs">{selected.domicilio}</p>
                  <p className="text-white/60 text-xs">ðŸ“ž {selected.telefono} · âœ‰ {selected.email}</p>
                  {selected.representante && <p className="text-white/60 text-xs">Representante: {selected.representante}</p>}
                  <p className="text-white/40 text-[11px]">
                    Emails del sistema: consumidor {selected.email_cliente_enviado ? "âœ“ enviado" : "âœ— pendiente"} · ventas {selected.email_ventas_enviado ? "âœ“" : "âœ—"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-white/50 font-bold text-[10px] uppercase tracking-widest">Hoja</p>
                  <p className="text-white/85">Bien: {selected.bien_label}</p>
                  <p className="text-white/85">Monto: {selected.monto || "N/A"}</p>
                  <p className="text-white/60 text-xs bg-white/5 rounded-xl p-3 leading-relaxed whitespace-pre-wrap">{selected.detalle}</p>
                  <p className="text-white/60 text-xs"><strong className="text-white/80">Pedido:</strong> {selected.pedido}</p>
                </div>
              </div>

              {selected.estado === "anulado" && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-3 text-xs text-red-200">
                  Anulado: {selected.anulado_motivo}
                </div>
              )}

              {/* Gestión de la respuesta */}
              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Settings2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Respuesta al consumidor (flujo: registrar â†’ enviar desde su correo â†’ marcar enviada)
                </p>
                <textarea
                  value={respuestaText}
                  onChange={(e) => setRespuestaText(e.target.value)}
                  placeholder="Escriba la respuesta formal que se enviará al consumidorâ€¦"
                  className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60 min-h-[110px]"
                  maxLength={3000}
                />
                <input
                  value={respondidoPor}
                  onChange={(e) => setRespondidoPor(e.target.value)}
                  placeholder="Registrada por (nombre de quien responde)"
                  className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
                  maxLength={120}
                />
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => action({ action: "guardar_respuesta", id: selected.id, respuesta: respuestaText, respondidoPor })} disabled={busy}
                    className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl disabled:opacity-50 flex items-center gap-2">
                    <Save className="w-4 h-4" /> Guardar respuesta
                  </button>
                  <button onClick={() => action({ action: "marcar_enviada", id: selected.id })} disabled={busy || !selected.respuesta}
                    className="bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl disabled:opacity-40 flex items-center gap-2">
                    <Send className="w-4 h-4" /> Marcar respuesta enviada
                  </button>
                  <button onClick={() => action({ action: "marcar_atendido", id: selected.id })} disabled={busy || !selected.respuesta_enviada_en}
                    className="bg-green-600/80 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl disabled:opacity-40 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Marcar ATENDIDO
                  </button>
                  <button onClick={() => action({ action: "reenviar_emails", id: selected.id })} disabled={busy}
                    className="bg-white/10 border border-white/15 text-white/70 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl disabled:opacity-40 flex items-center gap-2">
                    <Send className="w-4 h-4" /> Reenviar copia al consumidor
                  </button>
                  {selected.estado !== "anulado" ? (
                    <button
                      onClick={() => {
                        const motivo = window.prompt("Motivo de anulación (queda en el historial legal, mínimo 10 caracteres):");
                        if (motivo && motivo.trim().length >= 10) action({ action: "anular", id: selected.id, motivo });
                        else if (motivo !== null) setError("El motivo debe tener al menos 10 caracteres.");
                      }}
                      disabled={busy}
                      className="bg-red-500/15 border border-red-400/30 text-red-200 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl disabled:opacity-40 flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Anular
                    </button>
                  ) : (
                    <button onClick={() => action({ action: "reabrir", id: selected.id })} disabled={busy}
                      className="bg-white/10 border border-white/15 text-white/70 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2">
                      Reabrir
                    </button>
                  )}
                </div>
                {selected.respuesta && (
                  <p className="text-[11px] text-white/40">
                    Respuesta registrada por <strong>{selected.respondido_por || "â€”"}</strong>
                    {selected.respuesta_enviada_en ? ` · enviada al consumidor el ${selected.respuesta_enviada_en}` : " · aún no marcada como enviada"}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ===== TAB: FERIADOS ===== */}
      {tab === "feriados" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-white/60 text-sm leading-relaxed">
            Los feriados se excluyen del cómputo de los <strong>15 días hábiles</strong>.
            Feriados nacionales 2026 precargados; agregue decretos de puente o nuevos años.
          </p>
          <div className="flex gap-2 flex-wrap">
            <input type="date" id="nuevo-feriado" className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/60" />
            <button
              onClick={() => {
                const input = document.getElementById("nuevo-feriado") as HTMLInputElement;
                if (input.value) action({ action: "add_holiday", fecha: input.value });
              }}
              disabled={busy}
              className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Agregar
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {holidays.map((h) => (
              <div key={h.id} className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                <span className="text-xs text-white/80 font-mono">{h.fecha}</span>
                <button onClick={() => action({ action: "delete_holiday", id: h.id })} disabled={busy}
                  className="text-white/40 hover:text-red-300 transition-colors" aria-label={`Eliminar feriado ${h.fecha}`}>
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== TAB: CONFIGURACIÃ“N ===== */}
      {tab === "config" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5 max-w-xl">
          <div className="flex flex-col gap-3">
            <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Correo de notificación de reclamos</p>
            <div className="flex gap-2 flex-wrap">
              <input
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                type="email"
                className="flex-1 min-w-[240px] bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/60"
              />
              <button onClick={() => action({ action: "guardar_config", notifyEmail })} disabled={busy}
                className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2">
                <Save className="w-4 h-4" /> Guardar
              </button>
              <button onClick={() => action({ action: "test_email" })} disabled={busy}
                className="bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2">
                <Send className="w-4 h-4" /> Enviar email de prueba
              </button>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Recomendación: enviar el email de prueba tras cada cambio. Un correo muerto
              significa que nadie se entera de los reclamos â†’ plazos legales incumplidos.
            </p>
          </div>

          <div className="border-t border-white/10 pt-5 flex flex-col gap-3">
            <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">Aviso oficial (Anexo II) para la sala de ventas</p>
            <a href="/api/admin/reclamos?aviso=1"
              className="bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2 w-fit hover:bg-white/20 transition-colors">
              <Printer className="w-4 h-4" /> Descargar aviso PDF
            </a>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Imprimir y exhibir en lugar visible de la sala de ventas (Av. San Agustín 154),
              junto al libro físico de respaldo.
            </p>
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-[11px] text-white/40 leading-relaxed flex items-center gap-2">
              <Clock3 className="w-3.5 h-3.5 shrink-0" />
              Los reclamos son registros legales: no se pueden eliminar, solo atender o
              anular con motivo. INDECOPI puede requerirlos en cualquier momento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
