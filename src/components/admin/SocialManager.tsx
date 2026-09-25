"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Loader2,
  Plus,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface SocialPost {
  id: number;
  network: "facebook" | "instagram" | "tiktok";
  post_url: string;
  caption: string;
  thumb_path: string;
  posted_at: string | null;
  source: "auto" | "manual";
  created_at: string;
}

interface SocialSync {
  network: string;
  last_run: string | null;
  last_ok: string | null;
  last_error: string;
  posts_found: number;
}

const NETWORKS = [
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
] as const;

function timeAgoEs(dateStr: string | null): string {
  if (!dateStr) return "nunca";
  const ms = Date.parse(dateStr.replace(" ", "T") + (dateStr.includes("Z") ? "" : "Z"));
  if (Number.isNaN(ms)) return "nunca";
  const hours = Math.floor((Date.now() - ms) / 3_600_000);
  if (hours < 1) return "hace minutos";
  if (hours < 24) return `hace ${hours}h`;
  return `hace ${Math.floor(hours / 24)} días`;
}

export default function SocialManager() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [sync, setSync] = useState<Record<string, SocialSync>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const [network, setNetwork] = useState<string>("tiktok");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/social-posts", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (res.status === 401) {
          window.location.reload();
          return;
        }
        throw new Error(data.error || "No se pudo cargar.");
      }
      setPosts(data.posts ?? []);
      const syncMap: Record<string, SocialSync> = {};
      for (const row of data.sync ?? []) syncMap[row.network] = row;
      setSync(syncMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/social-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ network, url, caption, imageUrl }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo guardar.");
      setNotice("Publicación agregada. La home ya la muestra.");
      setUrl("");
      setCaption("");
      setImageUrl("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setBusy(false);
    }
  };

  const removePost = async (id: number) => {
    if (!window.confirm("¿Eliminar esta publicación de la web?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/social-posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo eliminar.");
      setNotice("Publicación eliminada.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Salud de los conectores del scraper */}
      <div className="flex flex-wrap gap-3">
        {NETWORKS.map(({ value, label }) => {
          const info = sync[value];
          const healthy = info?.last_ok;
          return (
            <div
              key={value}
              className={`rounded-xl px-4 py-2.5 text-sm border ${
                healthy
                  ? "bg-green-500/10 border-green-400/30 text-green-200"
                  : "bg-white/5 border-white/10 text-white/60"
              }`}
            >
              <span className="font-bold">{label}:</span>{" "}
              {healthy ? (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OK {timeAgoEs(info.last_ok)}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="w-3.5 h-3.5" /> sin scraping exitoso aún
                  {info?.last_run ? ` (últ. intento ${timeAgoEs(info.last_run)})` : ""}
                </span>
              )}
              {info?.last_error && (
                <span className="block text-[11px] opacity-70 max-w-[240px] truncate" title={info.last_error}>
                  ⚠ {info.last_error}
                </span>
              )}
            </div>
          );
        })}
        <button
          onClick={load}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-400/30 text-red-200 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      {notice && (
        <div className="bg-green-500/10 border border-green-400/30 text-green-200 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          {notice}
        </div>
      )}

      {/* Alta manual / emergencia */}
      <form
        onSubmit={addPost}
        className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 text-white/80 font-display font-bold text-sm uppercase tracking-wider">
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          Agregar publicación (fallback manual)
        </div>
        <p className="text-xs text-white/40 -mt-2">
          En TikTok basta con pegar el enlace del video: título e imagen se
          completan solos. En Instagram/Facebook pega el enlace, una descripción
          corta y el URL de una imagen de portada (opcional).
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]/60"
          >
            {NETWORKS.map((n) => (
              <option key={n.value} value={n.value} className="text-black">
                {n.label}
              </option>
            ))}
          </select>
          <input
            type="url"
            required
            placeholder="https://www.tiktok.com/@usuario/video/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Descripción corta (opcional en TikTok)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={300}
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
          />
          <input
            type="url"
            placeholder="URL de imagen de portada (opcional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/60"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="bg-gradient-to-r from-[#BF953F] via-[#D4AF37] to-[#B38728] text-deep-navy font-display font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl w-fit transition-all hover:brightness-110 disabled:opacity-60 flex items-center gap-2"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Guardar publicación
        </button>
      </form>

      {/* Listado de posts */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="text-left text-white/50 border-b border-white/10 bg-white/5">
              <th className="px-4 py-3">Miniatura</th>
              <th className="px-4 py-3">Red</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Fecha post</th>
              <th className="px-4 py-3">Origen</th>
              <th className="px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Cargando publicaciones...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                  Aún no hay publicaciones. El scraper las traerá solo; también
                  puedes agregar una manualmente arriba.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    {post.thumb_path ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.thumb_path}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/30 text-[10px]">
                        sin img
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#D4AF37] hover:underline capitalize"
                    >
                      {post.network}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-white/70 max-w-[280px]">
                    <span className="block truncate" title={post.caption}>
                      {post.caption || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/60 whitespace-nowrap">
                    {post.posted_at ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        post.source === "auto"
                          ? "bg-green-500/15 text-green-300"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {post.source === "auto" ? "Scraper" : "Manual"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => removePost(post.id)}
                      disabled={busy}
                      aria-label={`Eliminar publicación ${post.id}`}
                      className="text-white/40 hover:text-red-300 transition-colors disabled:opacity-40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
