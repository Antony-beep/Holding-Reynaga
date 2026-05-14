import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

import Preloader from "@/components/global/Preloader";
import StructuredData from "@/components/global/StructuredData";
import ClientOnlyComponents from "@/components/global/ClientOnlyComponents";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Torres Titanium | Holding Reynaga",
  description: "Una obra maestra arquitectónica en Huancayo. Lujo, exclusividad y ubicación privilegiada.",
  icons: {
    icon: "/images/logo_cortado.webp",
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
        <Preloader />
        {children}
        <ClientOnlyComponents />
      </body>
    </html>
  );
}
