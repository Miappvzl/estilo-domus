import Image from "next/image";
import HeroUi, { HeroLine } from "./HeroUi";
import Magnetic from "@/components/ui/Magnetic";
import heroBg from "@/assets/images/hero-bg.webp";

export default function Hero() {
  return (
    <section 
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-carbon"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)" }} // Estilo editorial sutil
    >
      {/* IMAGEN DE FONDO: LCP OPTIMIZED */}
      <Image
        src={heroBg} // Reemplazar con una imagen de mansión minimalista
        alt="Arquitectura de ultra-lujo EstiloDomus"
        fill
        priority // Crítico para LCP
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* OVERLAY DE CONTRASTE */}
      <div 
        className="absolute inset-0 bg-linear-to-b from-carbon/40 via-carbon/20 to-carbon/60 z-10" 
        aria-hidden="true" 
      />

      {/* CONTENIDO INTERACTIVO */}
      <HeroUi 
        preTitle="EstiloDomus Exclusive"
        cta={
          <Magnetic strength={0.3}>
            <button className="bg-crema text-carbon px-10 py-5 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-bronze hover:text-crema transition-colors duration-500">
              Explorar Propiedades
            </button>
          </Magnetic>
        }
      >
        <HeroLine text="Arquitectura que" delay={0.4} />
        <HeroLine text="Define tu Legado" delay={0.6} />
      </HeroUi>

      {/* INDICADOR DE SCROLL (Opcional) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="w-[1px] h-12 bg-linear-to-b from-crema/50 to-transparent" />
      </div>
    </section>
  );
}