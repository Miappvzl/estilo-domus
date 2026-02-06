import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // En Next.js 16, reactCompiler ya no va dentro de 'experimental'
  reactCompiler: true, 

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
    ],
  },
  
  // Opcional: Si quieres mantener Turbopack activo para máxima velocidad
  experimental: {
    // Aquí puedes añadir otras opciones experimentales si las necesitas en el futuro
  },
};

export default nextConfig;