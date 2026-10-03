import type { Metadata } from "next";
import PannellumViewer from "@/components/vision360/PannellumViewer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ type: "a" }, { type: "b" }, { type: "g" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const normalizedType = type.toUpperCase();

  if (!["A", "B", "G"].includes(normalizedType)) {
    return { title: "Tour virtual 360°" };
  }

  return {
    title: `Tour 360° del departamento Tipo ${normalizedType} en Huancayo`,
    description: `Recorre el departamento Tipo ${normalizedType} de Torres Titanium en San Carlos, Huancayo, con el visor virtual 360°.`,
    robots: { index: false, follow: true },
  };
}

export default async function Vision360Page({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const type = resolvedParams.type.toLowerCase();
  
  let imagePath = "";
  let title = "";

  if (type === "a") {
    imagePath = "/images/360/360 A.webp";
    title = "Departamento Tipo A - 360°";
  } else if (type === "b") {
    imagePath = "/images/360/360 B.webp";
    title = "Departamento Tipo B - 360°";
  } else if (type === "g") {
    imagePath = "/images/360/360 G.webp";
    title = "Departamento Tipo G - 360°";
  } else {
    notFound();
  }

  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      <PannellumViewer imagePath={imagePath} title={title} />
    </main>
  );
}
