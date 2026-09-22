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
} from "lucide-react";

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
  const [range, setRange] = useState<RangeKey>("week");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);

  const load = useCallback(
    async (r: RangeKey) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/leads?range=${r}`, {
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

  const pendingSync = useMemo(
    () => leads.filter((l) => l.sheets_synced === 0).length,
    [leads],
  );

  return (
    <div className="flex flex-col gap-6">
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
        <button
          onClick={logout}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm hover:bg-red-500/20 hover:border-red-400/30 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </button>
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
        <table className="w-full text-sm min-w-[900px]">
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
              <th className="px-4 py-3">Sheets</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-white/50">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Cargando leads...
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-white/50">
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
    </div>
  );
}
