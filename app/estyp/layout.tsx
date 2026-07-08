import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, DM_Mono } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "neona.tech · Tu punto de partida en tecnología",
  description:
    "Directorio curado de herramientas IA con rutas guiadas. Deja de sentirte perdido: te decimos por dónde empezar y qué ignorar.",
};

export default function EstypLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${jakarta.variable} ${dmSans.variable} ${dmMono.variable}`}>
      {children}
    </div>
  );
}
