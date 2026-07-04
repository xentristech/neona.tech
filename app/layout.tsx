import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neona.tech"),
  title: "neona.tech · Muy pronto",
  description:
    "Productos con IA, datos que deciden y SEO para la nueva era de la búsqueda. Un nuevo estudio de inteligencia artificial. Muy pronto.",
  openGraph: {
    title: "neona.tech · Muy pronto",
    description:
      "Productos con IA, datos que deciden y SEO para la nueva era de la búsqueda.",
    url: "https://neona.tech",
    siteName: "neona.tech",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
