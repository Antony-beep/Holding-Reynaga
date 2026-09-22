import crypto from "node:crypto";

/**
 * Autenticación simple del panel /admin:
 *  - Contraseña única en la variable de entorno ADMIN_PASSWORD
 *  - Sesión: cookie HttpOnly con token firmado (HMAC-SHA256 + expiración)
 *  - Sin dependencias externas ni base de datos de sesiones
 */

export const ADMIN_COOKIE = "hr_admin";
const SESSION_HOURS = 8;
const SALT = "hr-admin-session-v1";

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function deriveKey(): Buffer {
  // Clave derivada de la propia contraseña: no requiere otra variable de entorno.
  return crypto
    .createHash("sha256")
    .update(`${SALT}:${process.env.ADMIN_PASSWORD ?? ""}`)
    .digest();
}

function hmac(value: string): string {
  return crypto.createHmac("sha256", deriveKey()).update(value).digest("hex");
}

/** Compara dos strings en tiempo constante (evita ataques de timing). */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function checkPassword(password: string): boolean {
  const real = process.env.ADMIN_PASSWORD ?? "";
  if (!real) return false;
  return safeEqual(password, real);
}

/** Crea el token de sesión: "<expiración-ms>.<firma>". */
export function createSessionToken(): string {
  const exp = String(Date.now() + SESSION_HOURS * 60 * 60 * 1000);
  return `${exp}.${hmac(exp)}`;
}

/** Verifica firma y vigencia del token. */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expMs = Number(exp);
  if (!Number.isFinite(expMs) || expMs < Date.now()) return false;
  return safeEqual(sig, hmac(exp));
}

/** Lee y valida la cookie de admin desde un objeto Headers con cookie header. */
export function isAuthorized(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const adminCookie = cookies.find((c) => c.startsWith(`${ADMIN_COOKIE}=`));
  if (!adminCookie) return false;
  const token = decodeURIComponent(adminCookie.slice(ADMIN_COOKIE.length + 1));
  return verifySessionToken(token);
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_HOURS * 60 * 60,
};

// ---- Rate limit del login (en memoria, por IP) ----
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60_000;
const LOGIN_MAX_FAILS = 5;

export function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) return false;
  return entry.count >= LOGIN_MAX_FAILS;
}

export function registerLoginFail(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function clearLoginFails(ip: string): void {
  loginAttempts.delete(ip);
}
