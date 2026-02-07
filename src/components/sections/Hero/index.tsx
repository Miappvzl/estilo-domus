"use client"; // Importante si usas componentes de Framer dentro

import Image from "next/image";
import HeroUi, { HeroLine } from "./HeroUi";
import Magnetic from "@/components/ui/Magnetic";
import heroBg from "@/assets/images/hero-bg.webp";
import { motion } from "framer-motion";

export default function Hero() {
  const title = "Arquitectura que Define tu Legado";

  return (
    <section 
      className="relative h-dvh w-full flex items-center justify-center overflow-hidden bg-carbon"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 96%, 0 100%)" }}
      aria-label="Presentación de EstiloDomus"
    >
      <h1 className="sr-only">{title}</h1>

      <HeroUi 
        preTitle="EstiloDomus Exclusive"
        microCopy="Colección Privada 2026 • 12 residencias disponibles"
        cta={
          <Magnetic strength={0.2}>
            <button className="relative group bg-crema text-carbon px-12 py-6 rounded-full font-sans text-[10px] uppercase tracking-[0.25em] font-black overflow-hidden transition-colors duration-500 hover:text-crema">
              <span className="relative z-10">Explorar Propiedades</span>
              <div className="absolute inset-0 bg-oro translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
            </button>
          </Magnetic>
        }
        // PASAMOS LA IMAGEN COMO PROP
        bgElement={
          <Image
            src={heroBg}
            alt="Vista aérea de mansión contemporánea EstiloDomus"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="110vw"
          />
        }
        // PASAMOS EL CONTENIDO COMO PROP
        contentElement={
          <div className="flex flex-col items-center select-none" aria-hidden="true">
            <HeroLine text="Arquitectura que" delay={0.4} />
            <HeroLine text="Define tu Legado" delay={0.6} />
          </div>
        }
      />

      {/* TEXTURA DE GRANO */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 mix-blend-soft-light bg-repeat" 
           style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)"/%3E%3C/svg%3E')` }} 
      />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-linear-to-b from-oro to-transparent" 
        />
      </div>
    </section>
  );
}