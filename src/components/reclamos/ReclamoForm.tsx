"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { BIENES_CONTRATADOS } from "@/lib/schemas/reclamo";
import { useFormValidation } from "@/lib/form-validation";
import { useFormMountTime } from "@/lib/form-mount-time";
import { PRIVACY_POLICY_VERSION, type ConsentSubmission } from "@/lib/privacy";
import { useDocumentActivated } from "@/components/global/useDocumentActivated";
import ConsentFields from "@/components/forms/ConsentFields";
import CharCount from "@/components/ui/CharCount";
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
  const [bienTipo, setBienTipo] = useState<"producto" | "servicio" | "">("");
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
    marketing: false,
  });
  const fv = useFormValidation();
  const mt = useFormMountTime();
  const documentActivated = useDocumentActivated();
  const fieldId = useId();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!documentActivated) return;
    setError("");
    if (!fv.validate(e)) {
      setError("Revise los campos marcados en rojo.");
      return;
    }
    if (!bienTipo) {
      setError("Indique si contrató un PRODUCTO o un SERVICIO.");
      return;
    }
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
          bienTipo,
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
          consent: {
            policyVersion: PRIVACY_POLICY_VERSION,
            requiredAccepted: form.veracidad,
            marketingAccepted: form.marketing,
          } satisfies ConsentSubmission,
          company: honeypot,
          formTime: mt.formTime(),
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
          La copia de su hoja (formato oficial) está <strong>disponible para descargar ahora</strong>.
          También intentaremos enviar una copia al correo declarado; su entrega puede demorar o no completarse.
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
      noValidate
      method="post"
      action="/api/reclamos"
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white rounded-3xl border border-surface-container-highest shadow-architectural p-6 md:p-10 flex flex-col gap-5"
    >
      <noscript>
        <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-deep-navy">
          Active JavaScript para registrar su reclamo o queja de forma segura. El envío está deshabilitado mientras JavaScript no esté activo.
        </p>
      </noscript>
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
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl px-4 py-3 flex items-start gap-2">
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
            htmlFor={`${fieldId}-tipo-reclamo`}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              tipo === "reclamo"
                ? "border-deep-navy bg-deep-navy/5"
                : "border-surface-container-highest hover:border-deep-navy/40"
            }`}
          >
            <input
              type="radio"
              name="tipo"
              id={`${fieldId}-tipo-reclamo`}
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
            htmlFor={`${fieldId}-tipo-queja`}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              tipo === "queja"
                ? "border-deep-navy bg-deep-navy/5"
                : "border-surface-container-highest hover:border-deep-navy/40"
            }`}
          >
            <input
              type="radio"
              name="tipo"
              id={`${fieldId}-tipo-queja`}
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

      {/* Sección 2 oficial: PRODUCTO / SERVICIO */}
      <div>
        <label className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          ¿Qué contrató? (sección oficial) <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label
            htmlFor={`${fieldId}-bien-producto`}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              bienTipo === "producto"
                ? "border-deep-navy bg-deep-navy/5"
                : "border-surface-container-highest hover:border-deep-navy/40"
            }`}
          >
            <input
              type="radio"
              name="bienTipo"
              id={`${fieldId}-bien-producto`}
              className="sr-only"
              checked={bienTipo === "producto"}
              onChange={() => setBienTipo("producto")}
            />
            <p className="font-display font-bold text-sm text-deep-navy text-center">Producto</p>
            <p className="text-[11px] text-deep-navy/50 text-center mt-1">Ej.: departamento, brochure</p>
          </label>
          <label
            htmlFor={`${fieldId}-bien-servicio`}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              bienTipo === "servicio"
                ? "border-deep-navy bg-deep-navy/5"
                : "border-surface-container-highest hover:border-deep-navy/40"
            }`}
          >
            <input
              type="radio"
              name="bienTipo"
              id={`${fieldId}-bien-servicio`}
              className="sr-only"
              checked={bienTipo === "servicio"}
              onChange={() => setBienTipo("servicio")}
            />
            <p className="font-display font-bold text-sm text-deep-navy text-center">Servicio</p>
            <p className="text-[11px] text-deep-navy/50 text-center mt-1">Ej.: atención, asesoría</p>
          </label>
        </div>
      </div>

      {/* Bien o servicio */}
      <div>
        <label htmlFor={`${fieldId}-bien-contratado`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Identificación del bien contratado <span className="text-red-500">*</span>
        </label>
        <select
          name="bienContratado"
          id={`${fieldId}-bien-contratado`}
          aria-invalid={Boolean(fv.errorBox("bienContratado"))}
          aria-describedby={fv.errorBox("bienContratado") ? `${fieldId}-bien-contratado-error` : undefined}
          value={bienContratado}
          onChange={(e) => setBienContratado(e.target.value)}
          required
          className={fv.inputCls("bienContratado", inputCls)}
          data-error="Seleccione el bien o servicio contratado."
        >
          <option value="" disabled>Seleccione una opción</option>
          {BIENES_CONTRATADOS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
        {fv.errorBox("bienContratado") && (
          <p id={`${fieldId}-bien-contratado-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("bienContratado")}</p>
        )}
        {bienContratado === "otro" && (
          <>
            <label htmlFor={`${fieldId}-bien-otro`} className="sr-only">Descripción del bien o servicio contratado</label>
            <input
              type="text"
              id={`${fieldId}-bien-otro`}
              value={bienOtro}
              onChange={(e) => setBienOtro(e.target.value)}
              maxLength={200}
              required
              placeholder="Describa el bien o servicio"
              className={`${inputCls} mt-3`}
            />
          </>
        )}
      </div>

      {/* Monto */}
      <div>
        <label htmlFor={`${fieldId}-monto`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Monto reclamado (S/) <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            id={`${fieldId}-monto`}
            inputMode="numeric"
            placeholder="Ej. 157130.00"
            maxLength={20}
            value={montoNA ? "" : monto}
            disabled={montoNA}
            onChange={(e) => setMonto(e.target.value.replace(/[^0-9.]/g, ""))}
            className={inputCls}
            required={!montoNA}
          />
          <label htmlFor={`${fieldId}-monto-na`} className="flex items-center gap-2 text-xs text-deep-navy/70 font-medium shrink-0 cursor-pointer">
            <input
              type="checkbox"
              id={`${fieldId}-monto-na`}
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
        <label htmlFor={`${fieldId}-detalle`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Detalle del reclamo o queja <span className="text-red-500">*</span>
        </label>
        <textarea
          name="detalle"
          id={`${fieldId}-detalle`}
          aria-invalid={Boolean(fv.errorBox("detalle"))}
          aria-describedby={fv.errorBox("detalle") ? `${fieldId}-detalle-error` : undefined}
          value={form.detalle}
          onChange={(e) => { set("detalle", e.target.value); fv.clearError(e); }}
          required
          minLength={10}
          maxLength={1500}
          placeholder="Describa con detalle lo sucedido…"
          className={fv.inputCls("detalle", `${inputCls} min-h-[100px] resize-y`)}
          data-error="Describa el detalle (mínimo 10 caracteres)."
        />
        <CharCount value={form.detalle} max={1500} />
        {fv.errorBox("detalle") && <p id={`${fieldId}-detalle-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("detalle")}</p>}
      </div>

      {/* Pedido */}
      <div>
        <label htmlFor={`${fieldId}-pedido`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
          Pedido concreto <span className="text-red-500">*</span>
        </label>
        <textarea
          name="pedido"
          id={`${fieldId}-pedido`}
          aria-invalid={Boolean(fv.errorBox("pedido"))}
          aria-describedby={fv.errorBox("pedido") ? `${fieldId}-pedido-error` : undefined}
          value={form.pedido}
          onChange={(e) => { set("pedido", e.target.value); fv.clearError(e); }}
          required
          minLength={5}
          maxLength={1000}
          placeholder="¿Qué solicita como solución? (es parte del formato oficial)"
          className={fv.inputCls("pedido", `${inputCls} min-h-[70px] resize-y`)}
          data-error="Indique su pedido concreto (mínimo 5 caracteres)."
        />
        <CharCount value={form.pedido} max={1000} />
        {fv.errorBox("pedido") && <p id={`${fieldId}-pedido-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("pedido")}</p>}
      </div>

      <div className="border-t border-surface-container-highest pt-5 flex flex-col gap-5">
        <p className="font-display font-black text-xs uppercase tracking-widest text-deep-navy/50 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#B8860B]" />
          Datos del consumidor
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${fieldId}-nombre`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              id={`${fieldId}-nombre`}
              aria-invalid={Boolean(fv.errorBox("nombre"))}
              aria-describedby={fv.errorBox("nombre") ? `${fieldId}-nombre-error` : undefined}
              value={form.nombre}
              onChange={(e) => { set("nombre", e.target.value); fv.clearError(e); }}
              required minLength={3} maxLength={120}
              className={fv.inputCls("nombre", inputCls)}
              data-error="Ingrese su nombre completo (mínimo 3 caracteres)."
              placeholder="Ej. Juan Pérez Quispe"
            />
            {fv.errorBox("nombre") && <p id={`${fieldId}-nombre-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("nombre")}</p>}
          </div>
          <div>
            <label htmlFor={`${fieldId}-documento`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              DNI / CE / Pasaporte <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="documento"
              id={`${fieldId}-documento`}
              aria-invalid={Boolean(fv.errorBox("documento"))}
              aria-describedby={fv.errorBox("documento") ? `${fieldId}-documento-error` : undefined}
              value={form.documento}
              onChange={(e) => { set("documento", e.target.value); fv.clearError(e); }}
              required
              pattern="[0-9A-Za-z]{8,12}"
              minLength={8}
              maxLength={12}
              title="DNI 8 dígitos, CE o pasaporte"
              className={fv.inputCls("documento", inputCls)}
              data-error="Documento inválido (DNI 8 dígitos, CE o pasaporte)."
              placeholder="00000000"
            />
            {fv.errorBox("documento") && <p id={`${fieldId}-documento-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("documento")}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${fieldId}-domicilio`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Domicilio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="domicilio"
              id={`${fieldId}-domicilio`}
              aria-invalid={Boolean(fv.errorBox("domicilio"))}
              aria-describedby={fv.errorBox("domicilio") ? `${fieldId}-domicilio-error` : undefined}
              value={form.domicilio}
              onChange={(e) => { set("domicilio", e.target.value); fv.clearError(e); }}
              required minLength={5} maxLength={200}
              className={fv.inputCls("domicilio", inputCls)}
              data-error="Ingrese su domicilio (forma parte del formato oficial)."
              placeholder="Calle, número, distrito"
            />
            {fv.errorBox("domicilio") && <p id={`${fieldId}-domicilio-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("domicilio")}</p>}
          </div>
          <div>
            <label htmlFor={`${fieldId}-telefono`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="telefono"
              id={`${fieldId}-telefono`}
              aria-invalid={Boolean(fv.errorBox("telefono"))}
              aria-describedby={fv.errorBox("telefono") ? `${fieldId}-telefono-error` : undefined}
              value={form.telefono}
              onChange={(e) => { set("telefono", e.target.value); fv.clearError(e); }}
              required
              pattern="\+?[0-9\s-]{9,}"
              minLength={9}
              maxLength={20}
              title="Mínimo 9 dígitos"
              className={fv.inputCls("telefono", inputCls)}
              data-error="Ingrese un teléfono válido (mínimo 9 dígitos)."
              placeholder="+51 999 999 999"
            />
            {fv.errorBox("telefono") && <p id={`${fieldId}-telefono-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("telefono")}</p>}
          </div>
          <div>
            <label htmlFor={`${fieldId}-email`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id={`${fieldId}-email`}
              aria-invalid={Boolean(fv.errorBox("email"))}
              aria-describedby={fv.errorBox("email") ? `${fieldId}-email-error` : undefined}
              value={form.email}
              onChange={(e) => { set("email", e.target.value); fv.clearError(e); }}
              required maxLength={100}
              className={fv.inputCls("email", inputCls)}
              data-error="Ingrese un correo electrónico válido."
              placeholder="juan@ejemplo.com"
            />
            {fv.errorBox("email") && <p id={`${fieldId}-email-error`} className="text-red-700 text-[11px] mt-1">{fv.errorBox("email")}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${fieldId}-representante`} className="font-display font-bold text-[10px] uppercase tracking-widest text-deep-navy/60 block mb-2">
              Padre/Madre/Representante (solo si el consumidor es menor de edad)
            </label>
            <input
              type="text"
              name="representante"
              id={`${fieldId}-representante`}
              value={form.representante}
              onChange={(e) => { set("representante", e.target.value); fv.clearError(e); }}
              maxLength={120}
              className={inputCls}
              placeholder="Opcional"
            />
          </div>
        </div>
      </div>

      {/* Veracidad + captcha + submit */}
      <ConsentFields
        kind="complaint"
        requiredName="veracidad"
        requiredAccepted={form.veracidad}
        marketingAccepted={form.marketing}
        onRequiredChange={(e) => { set("veracidad", e.currentTarget.checked); fv.clearError(e); }}
        onMarketingChange={(e) => set("marketing", e.currentTarget.checked)}
        requiredError={fv.errorBox("veracidad")}
      />

      {siteKey && (
        <div className="flex justify-center">
          <Turnstile
            key={tsKey}
            siteKey={siteKey}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={() => {
              setTurnstileToken("");
              // Reintentar remontando el widget tras 3 segundos
              setTimeout(() => setTsKey((k) => k + 1), 3000);
            }}
            options={{ theme: "light", language: "es", size: "flexible", retry: "auto", retryInterval: 3000 }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!documentActivated || loading || (siteKey !== "" && turnstileToken === "")}
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
