import Hero from "@/components/sections/Hero";
import FeaturedResidences from "@/components/sections/Featured";
import Philosophy from "@/components/sections/Philosophy";
import LegacyIntelligence from "@/components/sections/LegacyIntelligence";
import PrivateVault from "@/components/sections/PrivateVault";
import Footer from "@/components/ui/Footer";
import BespokeServices from "@/components/sections/BespokeServices";
import Milestones from "@/components/sections/Milestones";
import { Milestone } from "lucide-react";


export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "EstiloDomus",
    "image": "https://estilodomus.com/og-image.jpg",
    "description": "Bienes raíces de ultra-lujo y arquitectura exclusiva en Venezuela.",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Caracas",
      "addressCountry": "VE"
    }
  };

  return (
    // bg-transparent es clave para ver el FluidBackground del layout
    <main className="relative w-full bg-transparent">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO: Tiene su propia imagen, tapa el fondo parcialmente (Diseño intencional) */}
      <Hero />

      {/* 2. PHILOSOPHY: Debe ser transparente para ver el 3D detrás del texto */}
      <Philosophy />

      {/* 3. FEATURED: El scroll horizontal sobre el fondo 3D se ve increíble */}
      <FeaturedResidences />

      <BespokeServices />

      {/* 4. LEGACY INTELLIGENCE: El ticker de fondo se mezclará con el 3D */}
      <LegacyIntelligence />

      {/* 5. PRIVATE VAULT: Esta sección es bg-carbon (Oscura). 
          Es bueno que sea opaca para romper el ritmo y dar contraste. */}
      <PrivateVault />

      {/* 6. FOOTER: También suele ser oscuro (bg-carbon) */}
      <Milestones/>
      <Footer />
    </main>
  );
}