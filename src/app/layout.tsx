import type { Metadata } from "next";
import { property } from "@/data/property";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${property.title} · Experiencia inmobiliaria`,
  description: "Una experiencia visual inmersiva para presentar una vivienda extraordinaria. Proyecto demostrativo con fotografías generadas con IA.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: property.title,
    description: "Un recorrido cinematográfico por un ático de diseño. Proyecto demostrativo.",
    images: [{ url: "/images/hero.webp", width: 1672, height: 941, alt: "Salón panorámico de ejemplo" }],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
