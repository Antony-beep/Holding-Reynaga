"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Loader2,
  LogOut,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Database,
  Megaphone,
  UserX,
} from "lucide-react";
import SocialManager from "./SocialManager";
import ReclamosManager from "./ReclamosManager";

interface Lead {
  id: number;
  created_at: string;
  source: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  estado_lead: string;
  lead_notes: string;
  marketing_consent_accepted: number | null;
  marketing_revoked_at: string | null;
  sheets_synced: number;
}

type RangeKey = "week" | "month" | "all";

const RANGE_LABELS: Record<RangeKey, string> = {
  week: "Última semana",
  month: "Último mes",
  all: "Todos",
};

const AGE_OPTIONS = [
  { days: 30, label: "más de 1 mes" },
  { days: 90, label: "más de 3 meses" },
  { days: 180, label: "más de 6 meses" },
  { days: 365, label: "más de 1 año" },
];

export default function AdminDashboard() {
  const [view, setView] = useState<"leads" | "social" | "reclamos">("leads");
  const [range, setRange] = useState<RangeKey>("week");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<{
    total: number; nuevos: number; contactados: number;
    calificados: number; reservados: number; weekCount: number; monthCount: number;
    promoCount: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);
  const [cancelEmail, setCancelEmail] = useState("");
  const [sheetMatches, setSheetMatches] = useState<
    { row: number; id: string; createdAt: string; name: string; phone: string; email: string }[]
  >([]);
  const [sheetSearched, setSheetSearched] = useState(false);

  const load = useCallback(
    async (r: RangeKey, q?: string) => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ range: r });
        if (q && q.trim()) params.set("q", q.trim());
        const res = await fetch(`/api/admin/leads?${params}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          if (res.status === 401) {
            window.location.reload();
            return;
          }
          throw new Error(data.error || "No se pudieron cargar los leads.");
        }
        setLeads(data.leads ?? []);
        setTotal(data.total ?? 0);
        if (data.stats) setStats(data.stats);
        setSelected(new Set());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error inesperado.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    load(range);
  }, [range, load]);

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === leads.length
        ? new Set()
        : new Set(leads.map((l) => l.id)),
    );
  };

  const toggleOne = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePromos = async (lead: Lead) => {
    const acepta = lead.marketing_consent_accepted !== 1;
    const msg = acepta
      ? `¿El cliente ${lead.name} autorizó recibir promociones?\n\nRegistre esto solo si el cliente lo confirmó por algún canal (WhatsApp, llamada o correo).`
      : `¿Revocar las promociones de ${lead.name}?\n\nSe guardará la fecha de revocación como evidencia (Ley 29733).`;
    if (!window.confirm(msg)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cambiar_promos", id: lead.id, acepta }),
      });
      const d = await res.json();
      if (!d.ok) throw new Error(d.error);
      setNotice(acepta ? `Promos de ${lead.name}: autorizadas.` : `Promos de ${lead.name}: revocadas.`);
      await load(range, searchQuery || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally { setBusy(false); }
  };

  const deleteSelected = async () => {
    if (selected.size === 0) return;
    const n = selected.size;
    if (
      !window.confirm(
        `¿Eliminar ${n} lead${n > 1 ? "s" : ""} seleccionado${n > 1 ? "s" : ""} de la base de datos del VPS?\n\nLos que ya fueron sincronizados con Google Sheets se conservarán en la hoja de cálculo.`,
      )
    )
      return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [...selected] }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo eliminar.");
      setNotice(`${data.deleted} lead(s) eliminado(s) de la base del VPS.`);
      await load(range);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setBusy(false);
    }
  };

  const deleteOlderThan = async (days: number, label: string) => {
    if (!window.confirm(`¿Eliminar todos los leads de ${label}?\n\nLos ya sincronizados permanecerán en Google Sheets.`))
      return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ olderThanDays: days, confirm: true }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo eliminar.");
      setNotice(`${data.deleted} lead(s) de ${label} eliminado(s) de la base del VPS.`);
      await load(range);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  const searchSheets = async () => {
    const email = cancelEmail.trim();
    if (!email.includes("@")) {
      setError("Ingrese el correo del titular para buscar en Sheets.");
      return;
    }
    setBusy(true);
    setError("");
    setSheetMatches([]);
    setSheetSearched(false);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "buscar_en_sheets", email }),
      });
      const d = await res.json();
      if (!d.ok) throw new Error(d.error);
      setSheetMatches(d.matches ?? []);
      setSheetSearched(true);
      setNotice(
        `Sheets: ${d.matches?.length ?? 0} fila(s) · Base VPS: ${d.enBase?.length ?? 0} lead(s) para ${email}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally { setBusy(false); }
  };

  const deleteSheetsRows = async () => {
    const rows = sheetMatches.map((m) => m.row);
    if (rows.length === 0) return;
    if (
      !window.confirm(
        `¿Eliminar ${rows.length} fila(s) de Google Sheets?\n\n` +
          `Confirme solo si el titular solicitó la cancelación de sus datos (Ley 29733). ` +
          `Esta acción no se puede deshacer.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "borrar_de_sheets",
          email: cancelEmail.trim(),
          rows,
        }),
      });
      const d = await res.json();
      if (!d.ok) throw new Error(d.error);
      setSheetMatches([]);
      setSheetSearched(false);
      setNotice(d.message || `${d.deleted} fila(s) eliminadas de Sheets.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally { setBusy(false); }
  };

  const pendingSync = useMemo(
    () => leads.filter((l) => l.sheets_synced === 0).length,
    [leads],
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Switcher de vistas + logout global */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 w-fit">
          <button
            onClick={() => setView("leads")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === "leads"
                ? "bg-[#D4AF37] text-deep-navy"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setView("social")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === "social"
                ? "bg-[#D4AF37] text-deep-navy"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Redes Sociales
          </button>
          <button
            onClick={() => setView("reclamos")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              view === "reclamos"
                ? "bg-[#D4AF37] text-deep-navy"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Reclamos
          </button>
        </div>
        <button
          onClick={logout}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm hover:bg-red-500/20 hover:border-red-400/30 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </button>
      </div>

      {view === "leads" && (
      <>
      {/* Barra de estado */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-3">
          <span className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-[#D4AF37]" />
            Total en base: <strong className="text-white">{total}</strong>
          </span>
          <span className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-[#D4AF37]" />
            Pendientes a Sheets: <strong className="text-white">{pendingSync}</strong>
          </span>
          <button
            onClick={() => load(range)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Dashboard de métricas */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { label: "Nuevos", value: stats.nuevos, color: "text-[#D4AF37]" },
            { label: "Contactados", value: stats.contactados, color: "text-blue-300" },
            { label: "Calificados", value: stats.calificados, color: "text-purple-300" },
            { label: "Reservados", value: stats.reservados, color: "text-green-300" },
            { label: "Con promos", value: stats.promoCount, color: "text-teal-300" },
            { label: "Esta semana", value: stats.weekCount, color: "text-white" },
            { label: "Este mes", value: stats.monthCount, color: "text-white/70" },
            { label: "Total", value: stats.total, color: "text-white/40" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-center">
              <p className={`font-display font-black text-2xl ${s.color}`}>{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Búsqueda */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") load(range, searchQuery); }}
          placeholder="Buscar por nombre, email o teléfono..."
          className="flex-1 max-w-md bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
        />
        <button
          onClick={() => load(range, searchQuery)}
          className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl"
        >
          Buscar
        </button>
        {searchQuery && (
          <button
            onClick={() => { setSearchQuery(""); load(range, ""); }}
            className="bg-white/10 border border-white/15 text-white/60 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Pestañas de rango */}
      <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 w-fit">
        {(Object.keys(RANGE_LABELS) as RangeKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setRange(key)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              range === key
                ? "bg-[#D4AF37] text-deep-navy"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {RANGE_LABELS[key]}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-400/30 text-red-200 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      {notice && (
        <div className="bg-green-500/10 border border-green-400/30 text-green-200 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          {notice}
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px]">
          <thead>
            <tr className="text-left text-white/50 border-b border-white/10 bg-white/5">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={leads.length > 0 && selected.size === leads.length}
                  onChange={toggleAll}
                  className="accent-[#D4AF37]"
                  aria-label="Seleccionar todos"
                />
              </th>
              <th className="px-4 py-3">Fecha (UTC)</th>
              <th className="px-4 py-3">Origen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Documento</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Interés</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" title="Permiso de promociones (Ley 29733)">Promos</th>
              <th className="px-4 py-3">Sheets</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="px-4 py-12 text-center text-white/50">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Cargando leads...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-12 text-center text-white/50">
                  No hay leads en este rango de fechas.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className={`border-b border-white/5 transition-colors ${
                    selected.has(lead.id) ? "bg-[#D4AF37]/10" : "hover:bg-white/5"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(lead.id)}
                      onChange={() => toggleOne(lead.id)}
                      className="accent-[#D4AF37]"
                      aria-label={`Seleccionar lead ${lead.id}`}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-white/70">
                    {lead.created_at}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        lead.source === "fab"
                          ? "bg-[#D4AF37]/15 text-[#D4AF37]"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {lead.source === "fab" ? "Reserva" : "Dossier"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                  <td className="px-4 py-3 text-white/70">{lead.document}</td>
                  <td className="px-4 py-3 text-white/70">{lead.phone}</td>
                  <td className="px-4 py-3 text-white/70">{lead.email}</td>
                  <td className="px-4 py-3 text-white/70">
                    {lead.interest || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.estado_lead || "nuevo"}
                      onChange={async (e) => {
                        const nuevo = e.target.value;
                        setBusy(true);
                        try {
                          const res = await fetch("/api/admin/leads", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ action: "cambiar_estado", id: lead.id, estado: nuevo }),
                          });
                          const d = await res.json();
                          if (!d.ok) throw new Error(d.error);
                          setNotice("Estado de " + lead.name + " → " + nuevo);
                          await load(range, searchQuery || undefined);
                        } catch (err) {
                          setError(err instanceof Error ? err.message : "Error");
                        } finally { setBusy(false); }
                      }}
                      disabled={busy}
                      className={`text-[11px] font-bold rounded-full px-2 py-1 border-0 outline-none cursor-pointer ${
                        (lead.estado_lead === "nuevo" || !lead.estado_lead) ? "bg-amber-500/20 text-amber-300"
                        : lead.estado_lead === "contactado" ? "bg-blue-500/20 text-blue-300"
                        : lead.estado_lead === "calificado" ? "bg-purple-500/20 text-purple-300"
                        : lead.estado_lead === "visita_agendada" ? "bg-cyan-500/20 text-cyan-300"
                        : lead.estado_lead === "reservado" ? "bg-green-500/20 text-green-300"
                        : lead.estado_lead === "descartado" ? "bg-white/10 text-white/40"
                        : "bg-white/10 text-white/60"
                      }`}
                    >
                      <option value="nuevo" className="text-black">Nuevo</option>
                      <option value="contactado" className="text-black">Contactado</option>
                      <option value="calificado" className="text-black">Calificado</option>
                      <option value="visita_agendada" className="text-black">Visita agendada</option>
                      <option value="reservado" className="text-black">Reservado</option>
                      <option value="descartado" className="text-black">Descartado</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePromos(lead)}
                      disabled={busy}
                      title={
                        lead.marketing_consent_accepted === null
                          ? "Registro histórico sin evidencia de consentimiento"
                          : lead.marketing_revoked_at
                            ? `Revocadas: ${lead.marketing_revoked_at}`
                            : lead.marketing_consent_accepted === 1
                              ? "Aceptó promociones — clic para revocar"
                              : "Sin promociones — clic si el cliente autorizó"
                      }
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border-0 outline-none cursor-pointer disabled:opacity-40 flex items-center gap-1 ${
                        lead.marketing_consent_accepted === 1
                          ? "bg-teal-500/20 text-teal-300"
                          : lead.marketing_consent_accepted === 0
                            ? "bg-white/10 text-white/40"
                            : "bg-white/5 text-white/30"
                      }`}
                    >
                      <Megaphone className="w-3 h-3" aria-hidden="true" />
                      {lead.marketing_consent_accepted === 1
                        ? "Sí"
                        : lead.marketing_consent_accepted === 0
                          ? "No"
                          : "—"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {lead.sheets_synced === 1 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock3 className="w-4 h-4 text-amber-400" />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Acciones de limpieza */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white/80 font-display font-bold text-sm uppercase tracking-wider">
          <Trash2 className="w-4 h-4 text-[#D4AF37]" />
          Limpieza de la base de datos
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={deleteSelected}
            disabled={selected.size === 0 || busy}
            className="bg-red-500/15 border border-red-400/30 text-red-200 hover:bg-red-500/25 transition-colors rounded-xl px-5 py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Eliminar seleccionados ({selected.size})
          </button>

          <span className="text-white/30 text-sm">|</span>

          {AGE_OPTIONS.map((opt) => (
            <button
              key={opt.days}
              onClick={() => deleteOlderThan(opt.days, opt.label)}
              disabled={busy}
              className="bg-white/5 border border-white/10 text-white/70 hover:bg-red-500/15 hover:border-red-400/30 hover:text-red-200 transition-colors rounded-xl px-4 py-3 text-sm disabled:opacity-40"
            >
              Limpiar {opt.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-white/40 leading-relaxed">
          Los leads eliminados de esta base (VPS) permanecen en Google Sheets si
          ya habían sido sincronizados (✓ verde). La limpieza libera espacio del
          servidor, no afecta la hoja de cálculo.
        </p>
      </div>

      {/* Derecho de cancelación — borrado en Google Sheets (Ley 29733) */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white/80 font-display font-bold text-sm uppercase tracking-wider">
          <UserX className="w-4 h-4 text-red-300" />
          Derecho de cancelación — borrado en Google Sheets
        </div>

        <p className="text-xs text-white/50 leading-relaxed">
          Si un titular solicita la cancelación de sus datos, la ley exige suprimirlos
          de <strong>todos</strong> los sistemas: borre su lead de la base VPS
          (selección en la tabla) <strong>y</strong> sus filas de la hoja de cálculo.
          Primero busque, revise lo encontrado y solo después elimine.
        </p>

        <div className="flex gap-2 flex-wrap">
          <input
            type="email"
            value={cancelEmail}
            onChange={(e) => setCancelEmail(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") searchSheets(); }}
            placeholder="Correo del titular que pidió la cancelación..."
            className="flex-1 min-w-[260px] bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
          />
          <button
            onClick={searchSheets}
            disabled={busy || !cancelEmail.trim()}
            className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Buscar en Sheets
          </button>
        </div>

        {sheetSearched && sheetMatches.length === 0 && (
          <p className="text-sm text-white/50">
            No hay filas con ese correo en la hoja de leads.
          </p>
        )}

        {sheetMatches.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm">
              <p className="text-white/70">
                Encontradas <strong className="text-white">{sheetMatches.length}</strong> fila(s):
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {sheetMatches.map((m) => (
                  <li key={m.row} className="text-xs text-white/60 font-mono">
                    Fila {m.row} — id {m.id || "?"} · {m.name || "sin nombre"} · {m.createdAt || "sin fecha"}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={deleteSheetsRows}
              disabled={busy}
              className="bg-red-500/15 border border-red-400/30 text-red-200 hover:bg-red-500/25 transition-colors rounded-xl px-5 py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed w-fit"
            >
              Eliminar {sheetMatches.length} fila(s) de Sheets
            </button>
          </div>
        )}
      </div>
      </>
      )}

      {view === "social" && <SocialManager />}

      {view === "reclamos" && <ReclamosManager />}
    </div>
  );
}
