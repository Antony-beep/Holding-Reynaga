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
