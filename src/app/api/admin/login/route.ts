import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_COOKIE_OPTIONS,
  checkPassword,
  clearLoginFails,
  createSessionToken,
  isAdminConfigured,
  isLoginRateLimited,
  registerLoginFail,
} from "@/lib/auth";

export const runtime = "nodejs";

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Panel de administración no configurado (falta ADMIN_PASSWORD)." },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  if (isLoginRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos fallidos. Espere 15 minutos." },
      { status: 429 },
    );
  }

  let password: unknown;
  try {
    ({ password } = await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || !checkPassword(password)) {
    registerLoginFail(ip);
    return NextResponse.json(
      { ok: false, error: "Contraseña incorrecta." },
      { status: 401 },
    );
  }

  clearLoginFails(ip);

  const token = createSessionToken();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, SESSION_COOKIE_OPTIONS);
  return res;
}
