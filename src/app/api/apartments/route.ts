import { APARTMENTS, buildApartmentSlug } from "@/data/apartments";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PRICING_UPDATED = "2026-09-30";

export async function GET() {
  const departamentos = APARTMENTS.filter((a) => !a.isComingSoon).map((a) => {
    const slug = buildApartmentSlug(a);
    const tourId = a.type.replace("Tipo ", "").toLowerCase();
    return {
      tipo: a.type,
      slug,
      dormitorios: Number(a.bedrooms),
      banos: Number(a.baths),
      areaM2: Number(a.sqm),
      precioPreventa: a.price,
      estilo: a.area,
      caracteristicas: a.features,
      url: `${SITE_URL}/departamentos/${slug}`,
      tourVirtual360: `${SITE_URL}/vision360/${tourId}`,
    };
  });

  return Response.json(
    {
      proyecto: "Torres Titanium",
      desarrollador: "Holding Inversiones Reynaga S.A.C.",
      ubicacion: "Av. San Agustín 154, San Carlos, Huancayo, Junín, Perú",
      entrega: "2027",
      preciosActualizados: PRICING_UPDATED,
      nota:
        "Precios referenciales publicados en soles (S/). Sujetos a disponibilidad de la unidad. La reserva anunciada es de S/ 1,000 y se formaliza únicamente con ventas.",
      departamentos,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
