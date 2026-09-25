"use client";

import { useState } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { BIENES_CONTRATADOS } from "@/lib/schemas/reclamo";
import {
  ShieldCheck, FileText, Send, Loader2, CheckCircle2, Download,
  AlertTriangle, ArrowLeft,
} from "lucide-react";

interface SuccessState {
  codigo: string;
  deadline: string;
  pdfBase64: string;
}

export default function ReclamoForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [tsKey, setTsKey] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [tipo, setTipo] = useState<"reclamo" | "queja">("reclamo");
  const [bienContratado, setBienContratado] = useState("");
  const [bienOtro, setBienOtro] = useState("");
  const [monto, setMonto] = useState("");
  const [montoNA, setMontoNA] = useState(false);
  const [form, setForm] = useState({
    detalle: "",
    pedido: "",
    nombre: "",
    documento: "",
    domicilio: "",
    telefono: "",
    email: "",
    representante: "",
    veracidad: false,
  });

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const set = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const downloadPdf = (state: SuccessState) => {
    const binary = atob(state.pdfBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Hoja-Reclamacion-${state.codigo}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!bienContratado) {
      setError("Seleccione el bien o servicio contratado.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reclamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          bienContratado,
          bienDetalle: bienContratado === "otro" ? bienOtro : "",
          monto: montoNA ? "N/A" : monto,
          detalle: form.detalle,
          pedido: form.pedido,
          nombre: form.nombre,
          documento: form.documento,
          domicilio: form.domicilio,
          telefono: form.telefono,
          email: form.email,
          representante: form.representante,
          veracidad: form.veracidad,
          company: honeypot,
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo registrar la hoja. Intente nuevamente.");
      }
      setSuccess({ codigo: data.codigo, deadline: data.deadline, pdfBase64: data.pdfBase64 });
      downloadPdf({ codigo: data.codigo, deadline: data.deadline, pdfBase64: data.pdfBase64 });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      setTurnstileToken("");
      setTsKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-surface-container-lowest border border-surface-container-highest text-deep-navy font-body font-medium rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm";

  if (success) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-surface-container-highest shadow-architectural p-8 md:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="font-display font-black text-2xl text-deep-navy mb-2">
          Hoja registrada con éxito
        </h2>
        <p className="text-deep-navy/60 text-sm mb-6">
          Su hoja de reclamación fue registrada en nuestro Libro de Reclamaciones.
        </p>

        <div className="bg-deep-navy rounded-2xl p-5 mb-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1">
            Código de su hoja
          </p>
          <p className="font-display font-black text-3xl text-[#D4AF37] tracking-wide">
            {success.codigo}
          </p>
        </div>

        <p className="text-sm text-deep-navy/70 leading-relaxed mb-2">
          La copia de su hoja (formato oficial) se <strong>descargó automáticamente</strong>,
          y también fue <strong>enviada a su correo</strong> declarado.
        </p>
        <p className="text-xs text-deep-navy/50 mb-6">
          Plazo legal de atención: <strong>15 días hábiles</strong> — fecha límite
          estimada: <strong>{success.deadline}</strong>.
        </p>

        <button
          onClick={() => downloadPdf(success)}
          className="inline-flex items-center gap-2 bg-deep-navy hover:bg-primary text-white font-display font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all"
        >
          <Download className="w-4 h-4" />
          Descargar copia (PDF)
        </button>
        <p className="mt-4">
          <Link href="/" className="text-sm text-[#B8860B] font-bold hover:underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white rounded-3xl border border-surface-container-highest shadow-architectural p-6 md:p-10 flex flex-col gap-5"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl px-4 py-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Tipo: reclamo o queja */}
      <div>
        <p className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 mb-2">
          Tipo de hoja <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              tipo === "reclamo"
                ? "border-deep-navy bg-deep-navy/5"
                : "border-surface-container-highest hover:border-deep-navy/40"
            }`}
          >
            <input
              type="radio"
              name="tipo"
              className="sr-only"
              checked={tipo === "reclamo"}
              onChange={() => setTipo("reclamo")}
            />
            <p className="font-display font-bold text-sm text-deep-navy">Reclamo</p>
            <p className="text-xs text-deep-navy/50 leading-relaxed mt-1">
              Disconformidad con el producto o servicio recibido (p. ej., departamento,
              reserva, información entregada).
            </p>
          </label>
          <label
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              tipo === "queja"
                ? "border-deep-navy bg-deep-navy/5"
                : "border-surface-container-highest hover:border-deep-navy/40"
            }`}
          >
            <input
              type="radio"
              name="tipo"
              className="sr-only"
              checked={tipo === "queja"}
              onChange={() => setTipo("queja")}
            />
            <p className="font-display font-bold text-sm text-deep-navy">Queja</p>
            <p className="text-xs text-deep-navy/50 leading-relaxed mt-1">
              Disconformidad con la atención al público (trato, demoras en atención),
              sin relación directa con el producto.
            </p>
          </label>
        </div>
      </div>

      {/* Bien o servicio */}
      <div>
        <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Bien o servicio contratado <span className="text-red-500">*</span>
        </label>
        <select
          value={bienContratado}
          onChange={(e) => setBienContratado(e.target.value)}
          required
          className={inputCls}
        >
          <option value="" disabled>Seleccione una opción</option>
          {BIENES_CONTRATADOS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
        {bienContratado === "otro" && (
          <input
            type="text"
            value={bienOtro}
            onChange={(e) => setBienOtro(e.target.value)}
            maxLength={200}
            required
            placeholder="Describa el bien o servicio"
            className={`${inputCls} mt-3`}
          />
        )}
      </div>

      {/* Monto */}
      <div>
        <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Monto reclamado (S/) <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ej. 157130.00"
            maxLength={20}
            value={montoNA ? "" : monto}
            disabled={montoNA}
            onChange={(e) => setMonto(e.target.value.replace(/[^0-9.]/g, ""))}
            className={inputCls}
            required={!montoNA}
          />
          <label className="flex items-center gap-2 text-xs text-deep-navy/70 font-medium shrink-0 cursor-pointer">
            <input
              type="checkbox"
              checked={montoNA}
              onChange={(e) => setMontoNA(e.target.checked)}
              className="accent-[#B8860B]"
            />
            No aplica
          </label>
        </div>
      </div>

      {/* Detalle */}
      <div>
        <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Detalle del reclamo o queja <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.detalle}
          onChange={(e) => set("detalle", e.target.value)}
          required
          minLength={10}
          maxLength={1500}
          placeholder="Describa con detalle lo sucedido…"
          className={`${inputCls} min-h-[100px] resize-y`}
        />
      </div>

      {/* Pedido */}
      <div>
        <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Pedido concreto <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.pedido}
          onChange={(e) => set("pedido", e.target.value)}
          required
          minLength={5}
          maxLength={1000}
          placeholder="¿Qué solicita como solución? (es parte del formato oficial)"
          className={`${inputCls} min-h-[70px] resize-y`}
        />
      </div>

      <div className="border-t border-surface-container-highest pt-5 flex flex-col gap-5">
        <p className="font-display font-black text-xs uppercase tracking-widest text-deep-navy/50 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#B8860B]" />
          Datos del consumidor
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input type="text" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required minLength={3} maxLength={120} className={inputCls} placeholder="Ej. Juan Pérez Quispe" />
          </div>
          <div>
            <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              DNI / CE / Pasaporte <span className="text-red-500">*</span>
            </label>
            <input type="text" value={form.documento} onChange={(e) => set("documento", e.target.value)} required pattern="[0-9A-Za-z]{8,12}" title="DNI 8 dígitos, CE o pasaporte" className={inputCls} placeholder="00000000" />
          </div>
          <div className="sm:col-span-2">
            <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Domicilio <span className="text-red-500">*</span>
            </label>
            <input type="text" value={form.domicilio} onChange={(e) => set("domicilio", e.target.value)} required minLength={5} maxLength={200} className={inputCls} placeholder="Calle, número, distrito" />
          </div>
          <div>
            <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input type="tel" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} required pattern="\+?[0-9\s-]{9,}" title="Mínimo 9 dígitos" className={inputCls} placeholder="+51 999 999 999" />
          </div>
          <div>
            <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required maxLength={100} className={inputCls} placeholder="juan@ejemplo.com" />
          </div>
          <div className="sm:col-span-2">
            <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Padre/Madre/Representante (solo si el consumidor es menor de edad)
            </label>
            <input type="text" value={form.representante} onChange={(e) => set("representante", e.target.value)} maxLength={120} className={inputCls} placeholder="Opcional" />
          </div>
        </div>
      </div>

      {/* Veracidad + captcha + submit */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.veracidad}
          onChange={(e) => set("veracidad", e.target.checked)}
          required
          className="mt-1 w-4 h-4 accent-[#B8860B]"
        />
        <span className="text-xs text-deep-navy/70 leading-relaxed">
          Declaro que la información proporcionada es <strong>verdadera</strong> y
          acepto el tratamiento de mis datos conforme a la{" "}
          <Link href="/terminos-y-condiciones#privacidad" className="text-[#B8860B] font-bold hover:underline">
            Política de Privacidad
          </Link>{" "}
          (Ley N° 29733).
        </span>
      </label>

      {siteKey && (
        <div className="flex justify-center">
          <Turnstile
            key={tsKey}
            siteKey={siteKey}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
            options={{ theme: "light", language: "es", size: "flexible" }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading || (siteKey !== "" && turnstileToken === "")}
        className="w-full bg-[#B8860B] hover:bg-[#996515] text-white font-display font-bold tracking-widest text-xs uppercase px-6 py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? "Registrando hoja…" : "Registrar Hoja de Reclamación"}
      </button>

      <p className="text-[11px] text-deep-navy/40 text-center leading-relaxed flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        Formato oficial Anexo I del D.S. N° 011-2011-PCM · Atención en 15 días hábiles
      </p>
    </form>
  );
}
