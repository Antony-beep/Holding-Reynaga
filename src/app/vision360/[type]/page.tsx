import PannellumViewer from "@/components/vision360/PannellumViewer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { type: 'a' },
    { type: 'b' },
    { type: 'g' },
  ];
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
