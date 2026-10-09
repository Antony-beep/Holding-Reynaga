import { NextResponse, type NextRequest } from "next/server";
import { checkBodySize, MAX_BODY_BYTES } from "@/lib/body-guard";
import {
  ADMIN_COOKIE,
  SESSION_COOKIE_OPTIONS,
  authenticate,
  auditLogin,
  clearLoginFails,
  getSession,
  isLoginRateLimited,
  registerLoginFail,
  registerSuccessfulLogin,
  startSession,
} from "@/lib/auth";

export const runtime = "nodejs";

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const sizeError = checkBodySize(request, MAX_BODY_BYTES.revalidate);
  if (sizeError) return sizeError;

  const ip = getClientIp(request);

  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const username =
    typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!username || !password) {
    return NextResponse.json(
      { ok: false, error: "Ingrese usuario y contraseña." },
      { status: 400 },
    );
  }

  if (isLoginRateLimited(ip, username)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos fallidos. Espere 15 minutos." },
      { status: 429 },
    );
  }

  const user = authenticate(username, password);
  if (!user) {
    registerLoginFail(ip, username);
    auditLogin(null, username, false, ip);
    return NextResponse.json(
      { ok: false, error: "Usuario o contraseña incorrectos." },
      { status: 401 },
    );
  }

  clearLoginFails(ip, username);
  auditLogin(user.id, user.username, true, ip);
  registerSuccessfulLogin(user.id);

  const token = startSession({
    userId: user.id,
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
  });

  const res = NextResponse.json({
    ok: true,
    user: { username: user.username, displayName: user.display_name, role: user.role },
  });
  res.cookies.set(ADMIN_COOKIE, token, SESSION_COOKIE_OPTIONS);
  return res;
}

/** GET: sesión actual (para que la UI sepa quién es y qué rol tiene). */
export async function GET(request: NextRequest) {
  const session = getSession(request.headers.get("cookie"));
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    user: {
      username: session.username,
      displayName: session.displayName,
      role: session.role,
    },
  });
}
