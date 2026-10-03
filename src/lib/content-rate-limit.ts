/**
 * Rate limit por contenido (DNI/email): evita que el mismo consumidor
 * envíe el formulario repetidamente en pocos minutos.
 * Distinto del rate limit por IP — este detecta duplicados del mismo
 * documento aunque venga desde IPs distintas.
 */

const contentHits = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 10 * 60_000; // 10 minutos
const MAX_PER_CONTENT = 3; // máx 3 envíos con el mismo documento

export function isContentRateLimited(
  document: string,
  email: string,
): { limited: boolean; remaining: number } {
  const key = `${document.trim().toLowerCase()}|${email.trim().toLowerCase()}`;
  const now = Date.now();
  const entry = contentHits.get(key);

  if (!entry || entry.resetAt < now) {
    contentHits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, remaining: MAX_PER_CONTENT - 1 };
  }

  entry.count += 1;
  const remaining = Math.max(0, MAX_PER_CONTENT - entry.count);

  // Limpieza periódica del Map (evita fuga de memoria)
  if (contentHits.size > 1000) {
    for (const [k, v] of contentHits) {
      if (v.resetAt < now) contentHits.delete(k);
    }
  }

  return { limited: entry.count > MAX_PER_CONTENT, remaining };
}

/** Mensaje amigable cuando el rate limit de contenido se activa. */
export const CONTENT_RATE_LIMIT_MESSAGE =
  "Ya registramos una solicitud suya hace poco. Un asesor se comunicará en breve. Si necesita agregar algo, llámenos al 981 407 634.";
