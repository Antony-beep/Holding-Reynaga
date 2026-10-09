import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_COOKIE_OPTIONS, endSession, getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = getSession(request.headers.get("cookie"));
  if (session) endSession(session.token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
  return res;
}
