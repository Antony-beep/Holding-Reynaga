import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

import Preloader from "@/components/global/Preloader";
import StructuredData from "@/components/global/StructuredData";
import ClientOnlyComponents from "@/components/global/ClientOnlyComponents";
import MetaPixel from "@/components/global/MetaPixel";
import GoogleAnalytics from "@/components/global/GoogleAnalytics";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inmobiliariaholdingreynaga.com"),
  title: {
    default: "Torres Titanium | Holding Reynaga",
    template: "%s | Holding Reynaga",
  },
  description:
    "Una obra maestra arquitectónica en Huancayo. Departamentos de 1, 2 y 3 dormitorios con acabados premium. Vive con elegancia y exclusividad.",
  keywords: [
    "Torres Titanium",
    "Holding Reynaga",
    "departamentos Huancayo",
    "departamentos en San Carlos",
    "departamentos en venta Huancayo",
    "preventa inmobiliaria",
    "real estate Peru",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://inmobiliariaholdingreynaga.com/",
    siteName: "Inmobiliaria Holding Reynaga",
    title: "Torres Titanium | Elegancia urbana en San Carlos, Huancayo",
    description:
      "Una obra maestra arquitectónica en el corazón de Huancayo. Departamentos de 1 a 3 dormitorios con bonos de preventa de S/ 24,900 a S/ 47,850.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Torres Titanium - Departamentos en venta en Huancayo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Torres Titanium | Elegancia urbana en San Carlos, Huancayo",
    description:
      "Departamentos de 1 a 3 dormitorios en preventa. Rooftop, seguridad 24/7 y diseño de altura. Bonos de hasta S/ 47,850.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col font-body bg-background text-foreground overflow-x-hidden text-lg">
        <GoogleAnalytics />
        <MetaPixel />
        <Preloader />
        {children}
        <ClientOnlyComponents />
      </body>
    </html>
  );
}
