import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminConfigured, verifySessionToken } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de Leads",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const isAuthed = isAdminConfigured() && verifySessionToken(token);

  return (
    <main className="min-h-screen bg-deep-navy text-white py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="font-display font-bold text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-1">
            Holding Reynaga
          </p>
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight">
            Panel de Leads
          </h1>
        </header>

        {!isAdminConfigured() ? (
          <div className="bg-red-500/10 border border-red-400/30 text-red-200 rounded-2xl p-6 max-w-xl">
            <h2 className="font-display font-bold text-lg mb-2">
              Panel no configurado
            </h2>
            <p className="text-sm leading-relaxed">
              Falta definir la variable de entorno <code>ADMIN_PASSWORD</code> en
              el servidor para activar el acceso.
            </p>
          </div>
        ) : isAuthed ? (
          <AdminDashboard />
        ) : (
          <AdminLogin />
        )}
      </div>
    </main>
  );
}
