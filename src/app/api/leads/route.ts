import { after, type NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas/lead";
import { getLeadById, insertLead, markLeadSynced } from "@/lib/db";
import { appendLeadToSheet } from "@/lib/sheets";

export const runtime = "nodejs";

// Rate limit simple en memoria: 5 requests por IP cada 60 segundos.
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > MAX_REQUESTS) return true;
  return false;
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados intentos. Intente nuevamente en un minuto." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Datos inválidos.";
    return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
  }

  // Honeypot: si el campo oculto tiene contenido, es un bot.
  // Devolvemos éxito falso para no dar pistas, sin guardar nada.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const leadId = insertLead({
    source: parsed.data.source,
    name: parsed.data.name,
    document: parsed.data.document,
    phone: parsed.data.phone,
    email: parsed.data.email,
    interest: parsed.data.interest,
    message: parsed.data.message,
    ip,
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? "",
  });

  // El lead ya está a salvo en SQLite. El envío a Google Sheets
  // ocurre después de responder; si falla queda marcado para reintento
  // vía scripts/sync-sheets.js (cron en el VPS).
  after(async () => {
    try {
      const lead = getLeadById(leadId);
      if (!lead) return;
      await appendLeadToSheet(lead);
      markLeadSynced(leadId);
    } catch (err) {
      console.error(`[leads] Fallo sync a Google Sheets (lead ${leadId}):`, err);
    }
  });

  return NextResponse.json({ ok: true, id: leadId });
}
