import crypto from "node:crypto";
import {
  getAdminSession,
  getAdminUserByUsername,
  verifyPasswordHash,
  createAdminSession,
  deleteAdminSession,
  purgeExpiredAdminSessions,
  touchAdminUserLogin,
  logAdminAudit,
  type AdminRole,
  type AdminUserRow,
} from "./db";

/**
 * Autenticación del panel /admin con usuarios y roles:
 *  - Usuarios en la tabla admin_users (scrypt nativo, sin dependencias)
 *  - El usuario "admin" siembra desde ADMIN_PASSWORD y siempre la acepta
 *    (break-glass: cambiarla en el VPS cambia su contraseña)
 *  - Sesiones en tabla con identidad → revocación instantánea por usuario
 *  - Roles: admin > operador > lectura
 */

export const ADMIN_COOKIE = "hr_admin";
const SESSION_HOURS = 8;

export const ROLE_LEVELS: Record<AdminRole, number> = {
  lectura: 0,
  operador: 1,
  admin: 2,
};

export interface AdminSession {
  userId: number;
  username: string;
  displayName: string;
  role: AdminRole;
  token: string;
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_HOURS * 60 * 60,
};

/** Verifica usuario+contraseña. Devuelve el usuario si es válido.
 *  Regla break-glass: "admin" también acepta la contraseña del entorno
 *  y, si aplica, re-sincroniza su hash en la base. */
export function authenticate(
  username: string,
  password: string,
): AdminUserRow | undefined {
  const user = getAdminUserByUsername(username);
  if (!user) return undefined;
  if (user.active !== 1) return undefined;

  if (verifyPasswordHash(password, user.password_hash)) return user;

  // Break-glass: solo el usuario "admin" con rol admin acepta el env.
  if (user.username === "admin" && user.role === "admin") {
    const envPass = process.env.ADMIN_PASSWORD ?? "";
    if (envPass && password === envPass) return user;
  }
  return undefined;
}

/** Crea sesión (token aleatorio en tabla) y devuelve el token para la cookie. */
export function startSession(input: {
  userId: number;
  ip: string;
  userAgent: string;
}): string {
  purgeExpiredAdminSessions();
  return createAdminSession({ ...input, hours: SESSION_HOURS });
}

export function endSession(token: string): void {
  deleteAdminSession(token);
}

/** Lee la cookie, valida la sesión y devuelve la identidad del usuario. */
export function getSession(cookieHeader: string | null): AdminSession | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const adminCookie = cookies.find((c) => c.startsWith(`${ADMIN_COOKIE}=`));
  if (!adminCookie) return null;
  const token = decodeURIComponent(adminCookie.slice(ADMIN_COOKIE.length + 1));
  const found = getAdminSession(token);
  if (!found) return null;
  return {
    userId: found.user.id,
    username: found.user.username,
    displayName: found.user.display_name || found.user.username,
    role: found.user.role,
    token,
  };
}

export function registerSuccessfulLogin(userId: number): void {
  touchAdminUserLogin(userId);
}

export function auditLogin(
  userId: number | null,
  username: string,
  ok: boolean,
  ip: string,
): void {
  logAdminAudit({
    userId,
    username,
    action: ok ? "login_ok" : "login_fallido",
    entity: "sesion",
    ip,
  });
}

// ---- Rate limit del login (en memoria, por IP y por usuario) ----
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60_000;
const LOGIN_MAX_FAILS = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || entry.resetAt < now) return false;
  return entry.count >= LOGIN_MAX_FAILS;
}

function registerFail(key: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function isLoginRateLimited(ip: string, username?: string): boolean {
  if (isRateLimited(`ip:${ip}`)) return true;
  if (username && isRateLimited(`user:${username.toLowerCase()}`)) return true;
  return false;
}

export function registerLoginFail(ip: string, username?: string): void {
  registerFail(`ip:${ip}`);
  if (username) registerFail(`user:${username.toLowerCase()}`);
}

export function clearLoginFails(ip: string, username?: string): void {
  loginAttempts.delete(`ip:${ip}`);
  if (username) loginAttempts.delete(`user:${username.toLowerCase()}`);
}
