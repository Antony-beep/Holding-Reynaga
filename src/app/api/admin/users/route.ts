import { NextResponse, type NextRequest } from "next/server";
import { checkBodySize, MAX_BODY_BYTES } from "@/lib/body-guard";
import { getSession, ROLE_LEVELS } from "@/lib/auth";
import {
  ADMIN_ROLES,
  createAdminUser,
  getAdminAuditTail,
  getAdminUserById,
  getAdminUserByUsername,
  listAdminUsers,
  logAdminAudit,
  revokeAdminUserSessions,
  setAdminUserActive,
  setAdminUserPassword,
  type AdminRole,
} from "@/lib/db";

export const runtime = "nodejs";

function forbidden() {
  return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 403 });
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

const USERNAME_RE = /^[a-z0-9._-]{3,24}$/;

export async function GET(request: NextRequest) {
  const session = getSession(request.headers.get("cookie"));
  if (!session) return forbidden();
  if (ROLE_LEVELS[session.role] < ROLE_LEVELS.admin) return forbidden();

  return NextResponse.json({
    ok: true,
    users: listAdminUsers(),
    audit: getAdminAuditTail(60),
  });
}

export async function POST(request: NextRequest) {
  const session = getSession(request.headers.get("cookie"));
  if (!session) return forbidden();
  if (ROLE_LEVELS[session.role] < ROLE_LEVELS.admin) return forbidden();

  const sizeError = checkBodySize(request, MAX_BODY_BYTES.revalidate);
  if (sizeError) return sizeError;

  const ip = getClientIp(request);
  const audit = (action: string, entityId: string | number, detail: string) =>
    logAdminAudit({
      userId: session.userId,
      username: session.username,
      action,
      entity: "usuario",
      entityId,
      detail,
      ip,
    });

  let body: { action?: string; username?: string; displayName?: string; password?: string; role?: string; id?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  try {
    switch (body.action) {
      case "crear": {
        const username = String(body.username ?? "").trim().toLowerCase();
        const displayName = String(body.displayName ?? "").trim().slice(0, 60);
        const password = String(body.password ?? "");
        const role = String(body.role ?? "") as AdminRole;

        if (!USERNAME_RE.test(username)) {
          return NextResponse.json(
            { ok: false, error: "Usuario inválido: 3-24 caracteres (letras, números, . _ -)." },
            { status: 400 },
          );
        }
        if (password.length < 8) {
          return NextResponse.json(
            { ok: false, error: "La contraseña debe tener al menos 8 caracteres." },
            { status: 400 },
          );
        }
        if (!ADMIN_ROLES.includes(role)) {
          return NextResponse.json(
            { ok: false, error: "Rol inválido." },
            { status: 400 },
          );
        }
        if (getAdminUserByUsername(username)) {
          return NextResponse.json(
            { ok: false, error: "Ese usuario ya existe." },
            { status: 400 },
          );
        }
        const id = createAdminUser({
          username,
          displayName,
          password,
          role,
          createdBy: session.username,
        });
        audit("usuario_creado", id, `${username} (${role})`);
        return NextResponse.json({
          ok: true,
          message: `Usuario ${username} creado con rol ${role}.`,
        });
      }
      case "restablecer_contrasena": {
        const id = Number(body.id);
        const password = String(body.password ?? "");
        const user = getAdminUserById(id);
        if (!user) {
          return NextResponse.json({ ok: false, error: "Usuario no encontrado." }, { status: 404 });
        }
        if (password.length < 8) {
          return NextResponse.json(
            { ok: false, error: "La contraseña debe tener al menos 8 caracteres." },
            { status: 400 },
          );
        }
        setAdminUserPassword(id, password);
        revokeAdminUserSessions(id);
        audit("contrasena_restablecida", id, user.username);
        return NextResponse.json({
          ok: true,
          message: `Contraseña de ${user.username} restablecida; sus sesiones fueron cerradas.`,
        });
      }
      case "desactivar":
      case "activar": {
        const id = Number(body.id);
        const user = getAdminUserById(id);
        if (!user) {
          return NextResponse.json({ ok: false, error: "Usuario no encontrado." }, { status: 404 });
        }
        if (body.action === "desactivar") {
          if (user.username === "admin") {
            return NextResponse.json(
              { ok: false, error: "El usuario admin principal no puede desactivarse (protección anti-bloqueo)." },
              { status: 400 },
            );
          }
          if (id === session.userId) {
            return NextResponse.json(
              { ok: false, error: "No puede desactivar su propio usuario." },
              { status: 400 },
            );
          }
          setAdminUserActive(id, false);
          revokeAdminUserSessions(id);
          audit("usuario_desactivado", id, user.username);
          return NextResponse.json({
            ok: true,
            message: `Usuario ${user.username} desactivado; sus sesiones fueron cerradas.`,
          });
        }
        setAdminUserActive(id, true);
        audit("usuario_activado", id, user.username);
        return NextResponse.json({ ok: true, message: `Usuario ${user.username} activado.` });
      }
      default:
        return NextResponse.json({ ok: false, error: "Acción desconocida." }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Error inesperado." },
      { status: 400 },
    );
  }
}
