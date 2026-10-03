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
    default: "Proyectos inmobiliarios | Holding Reynaga",
    template: "%s | Holding Reynaga",
  },
  description:
    "Conoce los proyectos inmobiliarios de Holding Reynaga, sus características, ubicación y canales de atención.",
  keywords: [
    "Torres Titanium",
    "Holding Reynaga",
    "departamentos Huancayo",
    "departamentos en San Carlos",
    "departamentos en venta Huancayo",
    "departamentos en preventa Huancayo",
    "departamentos San Carlos Huancayo",
    "proyecto inmobiliario Junín",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://inmobiliariaholdingreynaga.com/",
    siteName: "Holding Reynaga | Torres Titanium",
    title: "Proyectos inmobiliarios | Holding Reynaga",
    description:
      "Conoce los proyectos inmobiliarios de Holding Reynaga, sus características, ubicación y canales de atención.",
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
    title: "Departamentos en venta en Huancayo | Torres Titanium",
    description:
      "Preventa en San Carlos, Huancayo: departamentos de 1 a 3 dormitorios, bonos de S/ 24,900 a S/ 47,850. Separa con S/ 1,000. Entrega 2027.",
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
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  where: {
                    and: [
                      { href_matches: "/departamentos/*" },
                      { not: { selector_matches: "[rel~=nofollow]" } },
                      { not: { selector_matches: "[data-no-prerender]" } },
                    ],
                  },
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
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
