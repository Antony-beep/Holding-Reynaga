import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/auth";
import {
  countLeads,
  countLeadsOlderThan,
  deleteLeadsByIds,
  deleteLeadsOlderThan,
  getLeadsRange,
  getLeadStats,
  searchLeads,
  updateLeadEstado,
  updateLeadNotes,
  LEAD_ESTADOS,
} from "@/lib/db";

export const runtime = "nodejs";

const RANGES: Record<string, number | null> = {
  week: 7,
  month: 30,
  all: null,
};

function unauthorized() {
  return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  const rangeParam = request.nextUrl.searchParams.get("range") ?? "week";
  const searchQuery = request.nextUrl.searchParams.get("q") ?? "";
  const days = RANGES[rangeParam];
  if (days === undefined) {
    return NextResponse.json(
      { ok: false, error: "Rango inválido. Use: week, month o all." },
      { status: 400 },
    );
  }

  // Si hay búsqueda, usar searchLeads
  const leads = searchQuery.trim()
    ? searchLeads(searchQuery.trim(), days)
    : getLeadsRange(days);
  const total = countLeads();
  const stats = getLeadStats();
  const pendingSync = leads.filter((l) => l.sheets_synced === 0).length;

  return NextResponse.json({
    ok: true,
    range: rangeParam,
    total,
    shown: leads.length,
    pendingSync,
    stats,
    leads,
  });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  let body: { action?: string; id?: number; estado?: string; notes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  try {
    const id = Number(body.id);
    switch (body.action) {
      case "cambiar_estado": {
        updateLeadEstado(id, String(body.estado));
        return NextResponse.json({ ok: true, message: "Estado actualizado a " + body.estado + "." });
      }
      case "guardar_notas": {
        updateLeadNotes(id, String(body.notes ?? ""));
        return NextResponse.json({ ok: true, message: "Notas guardadas." });
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

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request.headers.get("cookie"))) return unauthorized();

  let body: {
    ids?: unknown;
    olderThanDays?: unknown;
    confirm?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  // Modo 1: borrar ids concretos (selección manual en el panel)
  if (Array.isArray(body.ids)) {
    const ids = body.ids
      .map((v) => Number(v))
      .filter((n) => Number.isInteger(n) && n > 0)
      .slice(0, 500);
    if (ids.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No se indicaron leads válidos para eliminar." },
        { status: 400 },
      );
    }
    const deleted = deleteLeadsByIds(ids);
    return NextResponse.json({ ok: true, deleted });
  }

  // Modo 2: borrar por antigüedad (limpieza por lotes)
  const olderThanDays = Number(body.olderThanDays);
  if (
    !Number.isInteger(olderThanDays) ||
    olderThanDays < 1 ||
    olderThanDays > 3650
  ) {
    return NextResponse.json(
      { ok: false, error: "Indique una antigüedad válida en días (1 a 3650)." },
      { status: 400 },
    );
  }
  if (body.confirm !== true) {
    // Sin confirm no borramos: devolvemos cuántos se borrarían.
    const count = countLeadsOlderThan(olderThanDays);
    return NextResponse.json({ ok: true, wouldDelete: count });
  }

  const deleted = deleteLeadsOlderThan(olderThanDays);
  return NextResponse.json({ ok: true, deleted });
}
