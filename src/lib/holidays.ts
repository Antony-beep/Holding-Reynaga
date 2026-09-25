import { getHolidays } from "./db";

/**
 * Cálculo de plazos en DÍAS HÁBILES (Ley 29571 / D.S. 011-2011-PCM:
 * el proveedor responde reclamos y quejas en 15 días hábiles improrrogables).
 * Feriados: tabla `holidays` editable desde el panel admin.
 * Zona horaria: Perú (UTC-5, sin horario de verano).
 */

const LIMA_OFFSET_MS = -5 * 60 * 60 * 1000;

/** Fecha actual en Lima como "YYYY-MM-DD". */
export function limaToday(): string {
  return new Date(Date.now() + LIMA_OFFSET_MS).toISOString().slice(0, 10);
}

/** Convierte "YYYY-MM-DD HH:MM:SS" (UTC de la DB) a Date con hora Lima aplicada. */
function parseDbDate(utc: string): Date {
  return new Date(`${utc.replace(" ", "T")}Z`);
}

function toLimaYMD(date: Date): string {
  return new Date(date.getTime() + LIMA_OFFSET_MS).toISOString().slice(0, 10);
}

function isBusinessDay(ymd: string, holidays: Set<string>): boolean {
  const day = new Date(`${ymd}T12:00:00Z`).getUTCDay(); // 0=dom, 6=sáb
  if (day === 0 || day === 6) return false;
  return !holidays.has(ymd);
}

function addOneDay(ymd: string): string {
  return new Date(new Date(`${ymd}T00:00:00Z`).getTime() + 86_400_000)
    .toISOString()
    .slice(0, 10);
}

/**
 * Suma N días hábiles a la fecha de registro (UTC en DB).
 * Devuelve la fecha límite legal como "YYYY-MM-DD" (Lima).
 */
export function deadlineHabil(createdAtUtc: string, dias: number): string {
  const holidays = new Set(getHolidays());
  const start = parseDbDate(createdAtUtc);
  let ymd = toLimaYMD(start);
  let added = 0;
  while (added < dias) {
    ymd = addOneDay(ymd);
    if (isBusinessDay(ymd, holidays)) added += 1;
  }
  return ymd;
}

/** Días hábiles restantes entre hoy (Lima) y la fecha límite. */
export function businessDaysLeft(deadline: string): number {
  const holidays = new Set(getHolidays());
  const today = limaToday();
  if (today >= deadline) return 0;
  let count = 0;
  let cursor = today;
  while (cursor < deadline) {
    cursor = addOneDay(cursor);
    if (isBusinessDay(cursor, holidays)) count += 1;
  }
  return count;
}
