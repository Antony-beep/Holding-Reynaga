"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo iniciar sesión.");
      }
      // Recarga para que el server component vea la cookie nueva
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-[#D4AF37]" />
        </div>
        <h2 className="font-display font-bold text-xl text-white text-center mb-2">
          Acceso restringido
        </h2>
        <p className="text-center text-white/50 text-sm mb-8">
          Ingrese la contraseña de administrador para ver los leads.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            autoFocus
            className="bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
          />
          {error && (
            <div className="bg-red-500/10 border border-red-400/30 text-red-200 text-xs rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] text-deep-navy font-display font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all hover:brightness-110 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
