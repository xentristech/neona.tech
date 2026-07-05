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
  title: "neona.tech · Herramientas IA y prompts",
  description:
    "Directorio curado de herramientas IA, prompts listos para usar y un mejorador de prompts con IA. Todo gratis.",
};

export default function BetaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${jakarta.variable} ${dmSans.variable} ${dmMono.variable}`}>
      {children}
    </div>
  );
}
