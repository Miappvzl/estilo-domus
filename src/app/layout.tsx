import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import FluidBackground from "@/components/visuals/FluidBackground";
import "./globals.css";

// Configuración de fuentes optimizada
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "EstiloDomus | Real Estate de Ultra-Lujo",
  description: "Curaduría exclusiva de propiedades arquitectónicas y residencias de alto nivel en Venezuela.",
  keywords: ["luxury real estate", "Caracas", "diseño arquitectónico", "inversión premium"],
  openGraph: {
    title: "EstiloDomus | Exclusividad Inmobiliaria",
    description: "Arquitectura que define tu legado.",
    type: "website",
    locale: "es_VE",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F5F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Inyectamos las variables de fuente aquí para que Tailwind las reconozca
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased overflow-x-hidden bg-transparent selection:bg-oro selection:text-crema"> 
        
        {/* 1. Fondo 3D (Z-Index: -10) */}
        <FluidBackground /> 
        
        {/* 2. Cursor (Z-Index: 100000) */}
        <CustomCursor />
        
        {/* 3. Textura de Grano (Z-Index: 99999) */}
        <div className="noise-overlay" aria-hidden="true" />
        
        <SmoothScroll>
          <Navbar />
          {/* El contenido es transparente para dejar ver el fondo */}
          <main className="relative z-10 bg-transparent min-h-screen">
            {children}
          </main>
        </SmoothScroll>

      </body>
    </html>
  );
}