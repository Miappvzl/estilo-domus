import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import BespokeServices from "@/components/sections/BespokeServices";
import LegacyIntelligence from "@/components/sections/LegacyIntelligence";
import PrivateVault from "@/components/sections/PrivateVault";
import Footer from "@/components/ui/Footer";
import Milestones from "@/components/sections/Milestones";
import LivingCanvas from "@/components/sections/LivingCanvas";

export default function Home() {
  return (
    <main className="relative w-full bg-transparent">
      
      {/* SECCIÓN OSCURA: Hero (Background con imagen oscura) */}
      <div data-nav-theme="dark">
        <Hero />
      </div>

      {/* SECCIÓN CLARA: Philosophy (Texto sobre fondo claro) */}
      <div data-nav-theme="light">
        <Philosophy />
      </div>

      {/* SECCIÓN OSCURA: Servicios (Si tus paneles son oscuros) */}
      <div data-nav-theme="light">
        <BespokeServices />
      </div>

      {/* SECCIÓN OSCURA: Legacy Intelligence */}
      <div data-nav-theme="light">
        <LegacyIntelligence />
      </div>


       <div data-nav-theme="light">
          <LivingCanvas/>
       </div>


     <div data-nav-theme="light">
       <Milestones/> 
     </div>

      {/* SECCIÓN OSCURA: Private Vault */}
      <div data-nav-theme="dark">
        <PrivateVault />
      </div>

      {/* FOOTER suele ser oscuro */}
      <div data-nav-theme="dark">
        <Footer />
      </div>

    </main>
  );
}