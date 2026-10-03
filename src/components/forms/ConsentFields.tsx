"use client";

import Link from "next/link";
import { useId, type ChangeEventHandler } from "react";
import {
  LEAD_REQUIRED_CONSENT_TEXT,
  RECLAMO_REQUIRED_CONSENT_TEXT,
  MARKETING_CONSENT_TEXT,
} from "@/lib/privacy";

interface ConsentFieldsProps {
  kind: "lead" | "complaint";
  requiredAccepted: boolean;
  marketingAccepted: boolean;
  onRequiredChange: ChangeEventHandler<HTMLInputElement>;
  onMarketingChange: ChangeEventHandler<HTMLInputElement>;
  requiredName?: "privacy" | "veracidad";
  requiredError?: string | null;
  inputCls?: string;
}

export default function ConsentFields({
  kind,
  requiredAccepted,
  marketingAccepted,
  onRequiredChange,
  onMarketingChange,
  requiredName = kind === "complaint" ? "veracidad" : "privacy",
  requiredError,
  inputCls,
}: ConsentFieldsProps) {
  const id = useId();
  const requiredId = `${id}-${requiredName}`;
  const marketingId = `${id}-marketing`;
  const purposeId = `${id}-purpose`;
  const errorId = `${id}-error`;
  const cookiesNoteId = `${id}-cookies-note`;
  const requiredText = kind === "complaint"
    ? RECLAMO_REQUIRED_CONSENT_TEXT
    : LEAD_REQUIRED_CONSENT_TEXT;
  const checkboxCls = inputCls || "mt-0.5 h-4 w-4 shrink-0 rounded border-gray-400 accent-deep-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-navy";

  return (
    <fieldset className="min-w-0 flex flex-col gap-3">
      <legend className="sr-only">Atención de la solicitud y promociones opcionales</legend>
      <div>
        <label htmlFor={requiredId} className="flex items-start gap-3 min-h-11 cursor-pointer">
          <input
            type="checkbox"
            id={requiredId}
            name={requiredName}
            required
            checked={requiredAccepted}
            onChange={onRequiredChange}
            className={`${checkboxCls}${requiredError ? " border-red-500" : ""}`}
            data-error={kind === "complaint"
              ? "Confirme la veracidad de la información y la lectura de la Política de Privacidad para atender su reclamo o queja."
              : "Debe aceptar los Términos y la Política de Privacidad para que atendamos su solicitud."}
            aria-invalid={Boolean(requiredError)}
            aria-describedby={requiredError ? `${purposeId} ${errorId}` : purposeId}
          />
          <span className="font-body text-xs text-deep-navy/80 leading-relaxed font-medium">
            {requiredText.split(/(Términos|Política de Privacidad)/).map((part) => (
              part === "Términos" || part === "Política de Privacidad" ? (
                <Link
                  key={part}
                  href={part === "Términos" ? "/terminos-y-condiciones" : "/politica-de-privacidad"}
                  className="text-deep-navy font-bold underline underline-offset-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-navy"
                >
                  {part}
                </Link>
              ) : part
            ))}
          </span>
        </label>
        <p id={purposeId} className="ml-7 text-[11px] text-deep-navy/70 leading-relaxed">
          {kind === "complaint"
            ? "Esta declaración corresponde al registro y atención de su reclamo o queja."
            : "Usaremos tus datos para atender esta solicitud."}
        </p>
        {requiredError && (
          <p id={errorId} role="alert" className="ml-7 mt-1 text-xs text-red-700">
            {requiredError}
          </p>
        )}
      </div>
      <label htmlFor={marketingId} className="flex items-start gap-3 min-h-11 cursor-pointer">
        <input
          type="checkbox"
          id={marketingId}
          name="marketing"
          checked={marketingAccepted}
          onChange={onMarketingChange}
          className={checkboxCls}
          aria-describedby={cookiesNoteId}
        />
        <span className="font-body text-xs text-deep-navy/80 leading-relaxed font-medium">
          {MARKETING_CONSENT_TEXT}
        </span>
      </label>
      <p id={cookiesNoteId} className="ml-7 text-[11px] text-deep-navy/70 leading-relaxed">
        Los permisos de cookies se gestionan por separado.
      </p>
    </fieldset>
  );
}
