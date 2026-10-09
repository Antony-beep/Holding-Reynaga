"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, UserPlus, KeyRound, ShieldCheck, History, Ban, CheckCircle2 } from "lucide-react";

interface AdminUser {
  id: number;
  username: string;
  display_name: string;
  role: "admin" | "operador" | "lectura";
  active: number;
  created_at: string;
  created_by: string;
  last_login_at: string | null;
}

interface AuditRow {
  at: string;
  username: string;
  action: string;
  entity: string;
  entity_id: string;
  detail: string;
  ip: string;
}

const ROLE_LABELS: Record<AdminUser["role"], string> = {
  admin: "Admin",
  operador: "Operador",
  lectura: "Lectura",
};

const ROLE_COLORS: Record<AdminUser["role"], string> = {
  admin: "bg-[#D4AF37]/15 text-[#D4AF37]",
  operador: "bg-blue-500/20 text-blue-300",
  lectura: "bg-white/10 text-white/60",
};

function randomPassword(): string {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 12; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export default function UsersManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", displayName: "", password: "", role: "lectura" as AdminUser["role"] });

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (res.status === 401) window.location.reload();
        throw new Error(data.error || "No se pudieron cargar los usuarios.");
      }
      setUsers(data.users ?? []);
      setAudit(data.audit ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const action = async (body: Record<string, unknown>) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await res.json();
      if (!d.ok) throw new Error(d.error);
      setNotice(d.message || "Hecho.");
      await load();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const crearUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await action({ action: "crear", ...newUser });
    if (ok) {
      setShowForm(false);
      setNewUser({ username: "", displayName: "", password: "", role: "lectura" });
    }
  };

  const restablecer = async (u: AdminUser) => {
    const pass = window.prompt(`Nueva contraseña para ${u.username} (mínimo 8 caracteres):\n\nSugerencia: ${randomPassword()}`);
    if (!pass) return;
    await action({ action: "restablecer_contrasena", id: u.id, password: pass });
  };

  const toggleActive = async (u: AdminUser) => {
    if (u.active === 1) {
      if (!window.confirm(`¿Desactivar a ${u.username}?\n\nSus sesiones activas se cerrarán de inmediato.`)) return;
      await action({ action: "desactivar", id: u.id });
    } else {
      await action({ action: "activar", id: u.id });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Barra */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <span className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Usuarios activos: <strong className="text-white">{users.filter((u) => u.active === 1).length}</strong>
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Actualizar
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Nuevo usuario
          </button>
        </div>
      </div>

      {/* Formulario crear */}
      {showForm && (
        <form onSubmit={crearUsuario} className="bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="font-display font-bold text-white">Crear usuario del equipo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              placeholder="Usuario (letras, números, . _ -)"
              required
              autoCapitalize="none"
              className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
            />
            <input
              type="text"
              value={newUser.displayName}
              onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
              placeholder="Nombre visible (ej: María Venta)"
              className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Contraseña (mín. 8)"
                required
                minLength={8}
                className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
              />
              <button
                type="button"
                onClick={() => setNewUser({ ...newUser, password: randomPassword() })}
                className="bg-white/10 border border-white/15 text-white/70 rounded-xl px-3 text-xs uppercase font-bold"
                title="Generar contraseña segura"
              >
                Gen
              </button>
            </div>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminUser["role"] })}
              className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/60"
            >
              <option value="lectura" className="text-black">Lectura — solo ver</option>
              <option value="operador" className="text-black">Operador — trabaja, sin borrar</option>
              <option value="admin" className="text-black">Admin — control total</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="bg-[#D4AF37] text-deep-navy font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl w-fit disabled:opacity-40"
          >
            Crear usuario
          </button>
        </form>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-400/30 text-red-200 text-sm rounded-xl px-4 py-3">{error}</div>
      )}
      {notice && (
        <div className="bg-green-500/10 border border-green-400/30 text-green-200 text-sm rounded-xl px-4 py-3">{notice}</div>
      )}

      {/* Tabla usuarios */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="text-left text-white/50 border-b border-white/10 bg-white/5">
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Último acceso</th>
              <th className="px-4 py-3">Creado por</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-white/50">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Cargando usuarios...
              </td></tr>
            ) : users.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-white">{u.username}</td>
                <td className="px-4 py-3 text-white/70">{u.display_name || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${ROLE_COLORS[u.role]}`}>
                    {ROLE_LABELS[u.role]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {u.active === 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : (
                    <Ban className="w-4 h-4 text-red-400" />
                  )}
                </td>
                <td className="px-4 py-3 text-white/50 text-xs">{u.last_login_at ?? "nunca"}</td>
                <td className="px-4 py-3 text-white/50 text-xs">{u.created_by || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => restablecer(u)}
                      disabled={busy}
                      title="Restablecer contraseña (cierra sus sesiones)"
                      className="text-white/50 hover:text-[#D4AF37] transition-colors disabled:opacity-40"
                    >
                      <KeyRound className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleActive(u)}
                      disabled={busy || u.username === "admin"}
                      title={u.active === 1 ? "Desactivar (cierra sus sesiones)" : "Activar"}
                      className={`${u.username === "admin" ? "opacity-20 cursor-not-allowed" : u.active === 1 ? "text-white/50 hover:text-red-400" : "text-white/50 hover:text-green-400"} transition-colors disabled:opacity-40`}
                    >
                      {u.active === 1 ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auditoría */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-white/80 font-display font-bold text-sm uppercase tracking-wider mb-4">
          <History className="w-4 h-4 text-[#D4AF37]" />
          Auditoría reciente
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[700px]">
            <thead>
              <tr className="text-left text-white/40 border-b border-white/10">
                <th className="px-2 py-2">Fecha</th>
                <th className="px-2 py-2">Usuario</th>
                <th className="px-2 py-2">Acción</th>
                <th className="px-2 py-2">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {audit.map((a, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="px-2 py-1.5 text-white/50 whitespace-nowrap">{a.at}</td>
                  <td className="px-2 py-1.5 text-white/70">{a.username}</td>
                  <td className="px-2 py-1.5 text-[#D4AF37]/80 font-medium">{a.action}</td>
                  <td className="px-2 py-1.5 text-white/50 truncate max-w-[300px]">{a.detail || a.entity_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
