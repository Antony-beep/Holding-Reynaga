"use client";

import { useEffect, useRef } from "react";

/**
 * Time-trap anti-bot: registra el momento en que el formulario se montó.
 * Los bots rellenan y envían formularios en milisegundos; los humanos
 * tardan al menos unos segundos. Si el submit llega antes del mínimo,
 * la API lo descarta silenciosamente (éxito falso, sin insertar).
 *
 * Uso:
 *   const mountTime = useFormMountTime();
 *   // En el submit: mountTime.elapsedMs() < 2000 → es bot
 *   // En el body: formTime: mountTime.elapsedMs() (se valida server-side)
 */

const MIN_MS = 2000;

export function useFormMountTime() {
  const mountAt = useRef(Date.now());

  useEffect(() => {
    mountAt.current = Date.now();
  }, []);

  return {
    /** Milisegundos transcurridos desde el montaje del formulario. */
    elapsedMs: () => Date.now() - mountAt.current,
    /** Valor para enviar en el body de la API. */
    formTime: () => Date.now() - mountAt.current,
    /** True si pasó menos tiempo del mínimo humano. */
    isBot: () => Date.now() - mountAt.current < MIN_MS,
    MIN_MS,
  };
}
