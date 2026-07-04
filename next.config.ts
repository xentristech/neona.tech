import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: genera HTML en out/ para hosting compartido (Hostinger).
  output: "export",
  // Sin optimización de imágenes on-demand (no hay servidor Node en el hosting).
  images: { unoptimized: true },
  // Genera carpeta/index.html -> URLs limpias en Apache/Hostinger.
  trailingSlash: true,
};

export default nextConfig;
