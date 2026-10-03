"use client";

import { useState, type ChangeEvent } from "react";
import type React from "react";

/**
 * Validación visual inline para todos los formularios del sitio:
 * al intentar enviar, valida con checkValidity() y muestra el error de
 * cada campo inválido debajo del campo; se limpia al corregir.
 *
 * IMPORTANTE: el <form> debe llevar noValidate para que la validación
 * nativa del navegador no bloquee el submit antes de este handler.
 */

export interface FieldError {
  [name: string]: string | undefined;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<FieldError>({});

  const validate = (e: React.FormEvent<HTMLFormElement>): boolean => {
    const form = e.currentTarget;
    const next: FieldError = {};
    for (const el of Array.from(form.elements)) {
      const input = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!input.name || typeof input.checkValidity !== "function") continue;
      if (!input.checkValidity()) {
        next[input.name] =
          input.dataset.error ||
          input.validationMessage ||
          "Valor inválido.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const clearError = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name } = e.currentTarget;
    if (name && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputCls = (name: string, base: string): string => {
    if (errors[name]) return `${base} border-red-400 focus:border-red-500 focus:ring-red-100`;
    return base;
  };

  const errorBox = (name: string): string | null => {
    const err = errors[name];
    if (!err) return null;
    return err;
  };

  return { errors, validate, clearError, inputCls, errorBox };
}
