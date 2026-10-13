"use client";

import { useEffect, useState } from "react";
import {
  X, MessageSquareText, ShieldCheck, NotebookPen, Megaphone,
  Loader2, Save, Eye, EyeOff,
} from "lucide-react";

export interface LeadDetail {
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
  consent_recorded_at: string | null;
  policy_version: string | null;
  required_consent_text: string | null;
  marketing_consent_text: string | null;
  consent_purpose: string | null;
}

const ESTADO_LABEL: Record<string, string> = {
  nuevo: "Nuevo", contactado: "Contactado", calificado: "Calificado",
  visita_agendada: "Visita agendada", reservado: "Reservado", descartado: "Descartado",
};
const ESTADO_COLOR: Record<string, string> = {
  nuevo: "bg-amber-500/20 text-amber-300", contactado: "bg-blue-500/20 text-blue-300",
  calificado: "bg-purple-500/20 text-purple-300", visita_agendada: "bg-cyan-500/20 text-cyan-300",
  reservado: "bg-green-500/20 text-green-300", descartado: "bg-white/10 text-white/40",
};
const INTERES_LABEL: Record<string, string> = {
  "1": "1 Dormitorio", "2": "2 Dormitorios", "3": "3 Dormitorios",
  inv: "Inversión", "": "Sin especificar",
};

export default function LeadDetailModal({
  lead,
  readOnly,
  onClose,
  onNotesSaved,
}: {
  lead: LeadDetail;
  readOnly: boolean;
  onClose: () => void;
  onNotesSaved: (leadId: number, notes: string) => void;
}) {
  const [notes, setNotes] = useState(lead.lead_notes);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const saveNotes = async () => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "guardar_notas", id: lead.id, notes }),
      });
      const d = await res.json();
      if (!d.ok) throw new Error(d.error);
      setNotice("Notas guardadas.");
      onNotesSaved(lead.id, notes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally { setBusy(false); }
  };

  const hasConsent = lead.consent_recorded_at !== null;
  const promos = lead.marketing_consent_accepted;
  const estado = lead.estado_lead || "nuevo";

  const dato = (label: string, value: string) => (
    <div>
      <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-white/85 text-sm break-all">{value || "—"}</p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle del lead ${lead.name}`}
    >
      <div
        className="bg-deep-navy border border-white/15 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="min-w-0">
            <h2 className="font-display font-black text-xl md:text-2xl text-white tracking-tight mb-1.5 truncate">
              {lead.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${ESTADO_COLOR[estado] ?? "bg-white/10 text-white/60"}`}>
                {ESTADO_LABEL[estado] ?? estado}
              </span>
              <span className="text-white/40 text-xs">Lead #{lead.id} · {lead.created_at}</span>
            </div>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl p-2 transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Datos de contacto */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
          {dato("Teléfono", lead.phone)}
          {dato("Email", lead.email)}
          {dato("Documento", lead.document)}
          {dato("Interés", INTERES_LABEL[lead.interest] ?? lead.interest)}
          {dato("Origen", lead.source === "fab" ? "Reserva (WhatsApp)" : "Dossier (contacto)")}
          {dato("Fecha (UTC)", lead.created_at)}
        </div>

        {/* Mensaje del cliente */}
        {lead.message ? (
          <div className="mt-4 bg-[#D4AF37]/8 border border-[#D4AF37]/25 rounded-2xl p-5">
            <p className="flex items-center gap-2 text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest mb-2.5">
              <MessageSquareText className="w-4 h-4" aria-hidden="true" />
              Mensaje del cliente
            </p>
            <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap">{lead.message}</p>
          </div>
        ) : (
          <p className="mt-4 text-white/40 text-xs">El cliente no escribió mensaje.</p>
        )}

        {/* Evidencia legal (Ley 29733) */}
        <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="flex items-center gap-2 text-white/70 font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Consentimiento (Ley N° 29733)
            </p>
            <button
              onClick={() => setShowConsent(!showConsent)}
              className="text-white/40 hover:text-white/80 text-xs flex items-center gap-1.5 transition-colors"
              aria-expanded={showConsent}
            >
              {showConsent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showConsent ? "Ocultar textos" : "Ver textos exactos"}
            </button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              promos === 1 ? "bg-teal-500/20 text-teal-300"
              : promos === 0 ? "bg-white/10 text-white/40"
              : "bg-white/5 text-white/30"
            }`}>
              <Megaphone className="w-3 h-3" aria-hidden="true" />
              Promos: {promos === 1 ? "Aceptó" : promos === 0 ? "No aceptó" : "—"}
            </span>
            {lead.marketing_revoked_at && (
              <span className="text-red-300/90 text-xs">Revocadas: {lead.marketing_revoked_at}</span>
            )}
            <span className="text-white/50 text-xs">
              {hasConsent
                ? `Registrado: ${lead.consent_recorded_at} · Política ${lead.policy_version}`
                : "Registro histórico sin evidencia capturada"}
            </span>
          </div>
          {showConsent && (
            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              {lead.required_consent_text && (
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Casilla obligatoria que aceptó</p>
                  <p className="text-white/60 text-xs leading-relaxed italic">"{lead.required_consent_text}"</p>
                </div>
              )}
              {lead.marketing_consent_text && (
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Casilla de promos que vio</p>
                  <p className="text-white/60 text-xs leading-relaxed italic">"{lead.marketing_consent_text}"</p>
                </div>
              )}
              {lead.consent_purpose && (
                <p className="text-white/40 text-[11px]">Finalidad declarada: {lead.consent_purpose}</p>
              )}
            </div>
          )}
        </div>

        {/* Notas internas */}
        <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="flex items-center gap-2 text-white/70 font-bold text-[10px] uppercase tracking-widest mb-3">
            <NotebookPen className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            Notas internas del equipo
          </p>
          {readOnly ? (
            <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap min-h-[60px]">
              {lead.lead_notes || "Sin notas."}
            </p>
          ) : (
            <>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escriba el seguimiento: llamadas, acuerdos, próxima visita… (máx. 2000 caracteres)"
                maxLength={2000}
                className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60 min-h-[100px]"
              />
              <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
                <p className="text-[11px] text-white/40">
                  Las notas son internas: el cliente nunca las ve. Quedan en la base del servidor.
                </p>
                <button
                  onClick={saveNotes}
                  disabled={busy}
                  className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl disabled:opacity-40 flex items-center gap-2"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Guardar notas
                </button>
              </div>
            </>
          )}
          {notice && <p className="text-green-300 text-xs mt-2">{notice}</p>}
          {error && <p className="text-red-300 text-xs mt-2">{error}</p>}
        </div>

        {/* Pie */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-white/40">
            Los cambios de <strong className="text-white/60">estado</strong> y <strong className="text-white/60">promos</strong> se hacen desde la tabla de leads.
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] text-deep-navy font-display font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
