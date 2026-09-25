import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "leads.db");

declare global {
  // eslint-disable-next-line no-var
  var __leadsDb: Database.Database | undefined;
}

export function getDb(): Database.Database {
  if (global.__leadsDb) return global.__leadsDb;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      source TEXT NOT NULL,
      name TEXT NOT NULL,
      document TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      interest TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      ip TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT '',
      sheets_synced INTEGER NOT NULL DEFAULT 0,
      sheets_synced_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_leads_sheets_synced ON leads (sheets_synced);

    CREATE TABLE IF NOT EXISTS social_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      network TEXT NOT NULL CHECK (network IN ('facebook','instagram','tiktok')),
      post_url TEXT NOT NULL UNIQUE,
      caption TEXT NOT NULL DEFAULT '',
      thumb_path TEXT NOT NULL DEFAULT '',
      posted_at TEXT,
      source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('auto','manual')),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_social_posts_network ON social_posts (network, id);

    CREATE TABLE IF NOT EXISTS social_sync (
      network TEXT PRIMARY KEY,
      last_run TEXT,
      last_ok TEXT,
      last_error TEXT NOT NULL DEFAULT '',
      posts_found INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS reclamos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      tipo TEXT NOT NULL CHECK (tipo IN ('reclamo','queja')),
      bien_contratado TEXT NOT NULL,
      bien_detalle TEXT NOT NULL DEFAULT '',
      monto TEXT NOT NULL DEFAULT '',
      detalle TEXT NOT NULL,
      pedido TEXT NOT NULL,
      nombre TEXT NOT NULL,
      documento TEXT NOT NULL,
      domicilio TEXT NOT NULL,
      telefono TEXT NOT NULL,
      email TEXT NOT NULL,
      representante TEXT NOT NULL DEFAULT '',
      ip TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT '',
      estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','atendido','anulado')),
      respuesta TEXT NOT NULL DEFAULT '',
      respuesta_enviada_en TEXT,
      respondido_por TEXT NOT NULL DEFAULT '',
      anulado_motivo TEXT NOT NULL DEFAULT '',
      email_cliente_enviado INTEGER NOT NULL DEFAULT 0,
      email_ventas_enviado INTEGER NOT NULL DEFAULT 0,
      sheets_synced INTEGER NOT NULL DEFAULT 0,
      sheets_synced_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_reclamos_estado ON reclamos (estado, created_at);

    CREATE TABLE IF NOT EXISTS reclamos_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS holidays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fecha TEXT NOT NULL UNIQUE
    );
  `);

  global.__leadsDb = db;
  return db;
}

export interface LeadRow {
  id: number;
  created_at: string;
  source: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  ip: string;
  user_agent: string;
  sheets_synced: number;
  sheets_synced_at: string | null;
}

export function insertLead(lead: {
  source: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  ip: string;
  userAgent: string;
}): number {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO leads (source, name, document, phone, email, interest, message, ip, user_agent)
    VALUES (@source, @name, @document, @phone, @email, @interest, @message, @ip, @userAgent)
  `);
  const info = stmt.run({
    source: lead.source,
    name: lead.name,
    document: lead.document,
    phone: lead.phone,
    email: lead.email,
    interest: lead.interest,
    message: lead.message,
    ip: lead.ip,
    userAgent: lead.userAgent,
  });
  return Number(info.lastInsertRowid);
}

export function getLeadById(id: number): LeadRow | undefined {
  return getDb()
    .prepare("SELECT * FROM leads WHERE id = ?")
    .get(id) as LeadRow | undefined;
}

export function getUnsyncedLeads(limit = 100): LeadRow[] {
  return getDb()
    .prepare(
      "SELECT * FROM leads WHERE sheets_synced = 0 ORDER BY id ASC LIMIT ?",
    )
    .all(limit) as LeadRow[];
}

export function markLeadSynced(id: number): void {
  getDb()
    .prepare(
      "UPDATE leads SET sheets_synced = 1, sheets_synced_at = datetime('now') WHERE id = ?",
    )
    .run(id);
}

// ---- Consultas para el panel /admin ----

/** Leads de los últimos `days` días (o todos si days es null), los más recientes primero. */
export function getLeadsRange(days: number | null, limit = 1000): LeadRow[] {
  const db = getDb();
  if (days === null) {
    return db
      .prepare("SELECT * FROM leads ORDER BY created_at DESC, id DESC LIMIT ?")
      .all(limit) as LeadRow[];
  }
  return db
    .prepare(
      `SELECT * FROM leads
       WHERE created_at >= datetime('now', ?)
       ORDER BY created_at DESC, id DESC
       LIMIT ?`,
    )
    .all(`-${days} days`, limit) as LeadRow[];
}

export function countLeads(): number {
  const row = getDb().prepare("SELECT COUNT(*) AS c FROM leads").get() as {
    c: number;
  };
  return row.c;
}

/** Cuántos leads son más antiguos que X días (para el modo de limpieza). */
export function countLeadsOlderThan(days: number): number {
  const row = getDb()
    .prepare(
      "SELECT COUNT(*) AS c FROM leads WHERE created_at < datetime('now', ?)",
    )
    .get(`-${days} days`) as { c: number };
  return row.c;
}

/** Elimina leads anteriores a X días. Devuelve la cantidad eliminada. */
export function deleteLeadsOlderThan(days: number): number {
  const info = getDb()
    .prepare("DELETE FROM leads WHERE created_at < datetime('now', ?)")
    .run(`-${days} days`);
  return info.changes;
}

/** Elimina leads concretos por id (lote). Devuelve la cantidad eliminada. */
export function deleteLeadsByIds(ids: number[]): number {
  if (ids.length === 0) return 0;
  const db = getDb();
  const placeholders = ids.map(() => "?").join(",");
  const info = db
    .prepare(`DELETE FROM leads WHERE id IN (${placeholders})`)
    .run(...ids);
  return info.changes;
}

// ---- Redes sociales (sección "Síguenos") ----

export interface SocialPostRow {
  id: number;
  network: "facebook" | "instagram" | "tiktok";
  post_url: string;
  caption: string;
  thumb_path: string;
  posted_at: string | null;
  source: "auto" | "manual";
  created_at: string;
}

export interface SocialSyncRow {
  network: string;
  last_run: string | null;
  last_ok: string | null;
  last_error: string;
  posts_found: number;
}

export function upsertSocialPost(post: {
  network: string;
  post_url: string;
  caption: string;
  thumb_path: string;
  posted_at: string | null;
  source: "auto" | "manual";
}): void {
  getDb()
    .prepare(
      `INSERT INTO social_posts (network, post_url, caption, thumb_path, posted_at, source)
       VALUES (@network, @post_url, @caption, @thumb_path, @posted_at, @source)
       ON CONFLICT(post_url) DO UPDATE SET
         caption = excluded.caption,
         thumb_path = excluded.thumb_path,
         posted_at = excluded.posted_at,
         source = excluded.source`,
    )
    .run(post);
}

export function getSocialPosts(): SocialPostRow[] {
  return getDb()
    .prepare(
      "SELECT * FROM social_posts ORDER BY COALESCE(posted_at, created_at) DESC, id DESC",
    )
    .all() as SocialPostRow[];
}

/**
 * Elige el post destacado del día: aleatorio entre los más recientes
 * (pool de hasta 12: los últimos de cada red). Se decide una vez por
 * regeneración ISR, así todos los visitantes del día ven el mismo.
 */
export function pickFeaturedSocialPost(): SocialPostRow | null {
  const pool = getDb()
    .prepare(
      "SELECT * FROM social_posts ORDER BY COALESCE(posted_at, created_at) DESC, id DESC LIMIT 12",
    )
    .all() as SocialPostRow[];
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Mini-feed de la sección de videos: publicaciones ENTRELAZADAS por red
 * (TikTok → IG → FB → TikTok → IG → …) para que se note que ambas cuentas
 * están activas. Dentro de cada red se respeta el orden de recencia real.
 */
export function getSocialFeed(limit = 5): SocialPostRow[] {
  const posts = getDb()
    .prepare(
      "SELECT * FROM social_posts ORDER BY COALESCE(posted_at, created_at) DESC, id DESC",
    )
    .all() as SocialPostRow[];

  const byNetwork: Record<string, SocialPostRow[]> = {};
  for (const post of posts) {
    (byNetwork[post.network] ??= []).push(post);
  }

  const networkOrder = ["tiktok", "instagram", "facebook"];
  const feed: SocialPostRow[] = [];
  let depth = 0;

  while (feed.length < limit) {
    let added = false;
    for (const network of networkOrder) {
      if (feed.length >= limit) break;
      const item = byNetwork[network]?.[depth];
      if (item) {
        feed.push(item);
        added = true;
      }
    }
    if (!added) break;
    depth++;
  }

  return feed;
}

export function deleteSocialPostsByIds(ids: number[]): number {
  if (ids.length === 0) return 0;
  const db = getDb();
  const placeholders = ids.map(() => "?").join(",");
  const info = db
    .prepare(`DELETE FROM social_posts WHERE id IN (${placeholders})`)
    .run(...ids);
  return info.changes;
}

export function upsertSocialSync(row: {
  network: string;
  last_ok: boolean;
  error?: string;
  posts_found: number;
}): void {
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  getDb()
    .prepare(
      `INSERT INTO social_sync (network, last_run, last_ok, last_error, posts_found)
       VALUES (@network, @now, @last_ok, @last_error, @posts_found)
       ON CONFLICT(network) DO UPDATE SET
         last_run = excluded.last_run,
         last_ok = CASE WHEN excluded.last_ok IS NOT NULL THEN excluded.last_ok ELSE social_sync.last_ok END,
         last_error = excluded.last_error,
         posts_found = excluded.posts_found`,
    )
    .run({
      network: row.network,
      now,
      last_ok: row.last_ok ? now : null,
      last_error: row.error ?? "",
      posts_found: row.posts_found,
    });
}

export function getSocialSync(): SocialSyncRow[] {
  return getDb().prepare("SELECT * FROM social_sync").all() as SocialSyncRow[];
}

// ---- Libro de Reclamaciones (D.S. 011-2011-PCM / Ley 29571) ----

export interface ReclamoRow {
  id: number;
  codigo: string;
  created_at: string;
  tipo: "reclamo" | "queja";
  bien_contratado: string;
  bien_detalle: string;
  monto: string;
  detalle: string;
  pedido: string;
  nombre: string;
  documento: string;
  domicilio: string;
  telefono: string;
  email: string;
  representante: string;
  ip: string;
  user_agent: string;
  estado: "pendiente" | "atendido" | "anulado";
  respuesta: string;
  respuesta_enviada_en: string | null;
  respondido_por: string;
  anulado_motivo: string;
  email_cliente_enviado: number;
  email_ventas_enviado: number;
  sheets_synced: number;
  sheets_synced_at: string | null;
}

/**
 * Genera el código correlativo LR-<año>-<NNNNNN>. better-sqlite3 es síncrono
 * (un solo hilo) y los reclamos jamás se eliminan, por lo que COUNT por año
 * es un correlativo seguro y sin huecos.
 */
export function nextReclamoCodigo(): string {
  const year = new Date().getFullYear();
  const row = getDb()
    .prepare("SELECT COUNT(*) AS c FROM reclamos WHERE codigo LIKE ?")
    .get(`LR-${year}-%`) as { c: number };
  return `LR-${year}-${String(row.c + 1).padStart(6, "0")}`;
}

export function insertReclamo(data: {
  codigo: string;
  tipo: string;
  bien_contratado: string;
  bien_detalle: string;
  monto: string;
  detalle: string;
  pedido: string;
  nombre: string;
  documento: string;
  domicilio: string;
  telefono: string;
  email: string;
  representante: string;
  ip: string;
  userAgent: string;
}): number {
  const info = getDb()
    .prepare(
      `INSERT INTO reclamos (codigo, tipo, bien_contratado, bien_detalle, monto, detalle, pedido,
         nombre, documento, domicilio, telefono, email, representante, ip, user_agent)
       VALUES (@codigo, @tipo, @bien_contratado, @bien_detalle, @monto, @detalle, @pedido,
         @nombre, @documento, @domicilio, @telefono, @email, @representante, @ip, @userAgent)`,
    )
    .run({
      ...data,
      bien_detalle: data.bien_detalle ?? "",
      representante: data.representante ?? "",
    });
  return Number(info.lastInsertRowid);
}

export function getReclamoById(id: number): ReclamoRow | undefined {
  return getDb()
    .prepare("SELECT * FROM reclamos WHERE id = ?")
    .get(id) as ReclamoRow | undefined;
}

export function getReclamos(): ReclamoRow[] {
  return getDb()
    .prepare("SELECT * FROM reclamos ORDER BY created_at DESC, id DESC")
    .all() as ReclamoRow[];
}

export function getUnsyncedReclamos(limit = 100): ReclamoRow[] {
  return getDb()
    .prepare(
      "SELECT * FROM reclamos WHERE sheets_synced = 0 ORDER BY id ASC LIMIT ?",
    )
    .all(limit) as ReclamoRow[];
}

export function markReclamoSynced(id: number): void {
  getDb()
    .prepare(
      "UPDATE reclamos SET sheets_synced = 1, sheets_synced_at = datetime('now') WHERE id = ?",
    )
    .run(id);
}

export function updateReclamo(
  id: number,
  fields: Partial<{
    estado: "pendiente" | "atendido" | "anulado";
    respuesta: string;
    respuesta_enviada_en: string;
    respondido_por: string;
    anulado_motivo: string;
    email_cliente_enviado: number;
    email_ventas_enviado: number;
  }>,
): void {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;
  const sets = keys.map((k) => `${k} = @${k}`).join(", ");
  getDb()
    .prepare(`UPDATE reclamos SET ${sets} WHERE id = @id`)
    .run({ ...fields, id });
}

// Config del libro de reclamaciones (correo de notificación editable)

export function getReclamosConfig(key: string): string | null {
  const row = getDb()
    .prepare("SELECT value FROM reclamos_config WHERE key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setReclamosConfig(key: string, value: string): void {
  getDb()
    .prepare(
      "INSERT INTO reclamos_config (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
    )
    .run(key, value);
}

// Feriados (para el cálculo de los 15 días hábiles)

/** Feriados nacionales del Perú — precargados al crear la tabla. */
const SEED_HOLIDAYS_2026 = [
  "2026-01-01", // Año Nuevo
  "2026-04-02", // Jueves Santo
  "2026-04-03", // Viernes Santo
  "2026-05-01", // Día del Trabajo
  "2026-06-29", // San Pedro y San Pablo
  "2026-07-28", // Fiestas Patrias
  "2026-07-29", // Fiestas Patrias
  "2026-08-30", // Santa Rosa de Lima
  "2026-10-08", // Combate de Angamos
  "2026-11-01", // Todos los Santos
  "2026-12-08", // Inmaculada Concepción
  "2026-12-25", // Navidad
];

export function getHolidays(): string[] {
  const db = getDb();
  const seed = db.prepare(
    "SELECT COUNT(*) AS c FROM holidays WHERE fecha LIKE '2026%'",
  ).get() as { c: number };
  if (seed.c === 0) {
    const ins = db.prepare("INSERT OR IGNORE INTO holidays (fecha) VALUES (?)");
    for (const f of SEED_HOLIDAYS_2026) ins.run(f);
  }
  return (
    db.prepare("SELECT fecha FROM holidays ORDER BY fecha ASC").all() as {
      fecha: string;
    }[]
  ).map((r) => r.fecha);
}

export function addHoliday(fecha: string): boolean {
  const info = getDb()
    .prepare("INSERT OR IGNORE INTO holidays (fecha) VALUES (?)")
    .run(fecha);
  return info.changes > 0;
}

export function deleteHoliday(id: number): void {
  getDb().prepare("DELETE FROM holidays WHERE id = ?").run(id);
}

export function getHolidayRows(): { id: number; fecha: string }[] {
  return getDb()
    .prepare("SELECT id, fecha FROM holidays ORDER BY fecha ASC")
    .all() as { id: number; fecha: string }[];
}
