"use client";

import Image from "next/image";
import HeroUi, { HeroLine } from "./HeroUi";
import Magnetic from "@/components/ui/Magnetic";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Star } from "lucide-react";
import herobg from "@assets/images/1.webp";

// Nueva imagen: Sugiero una mansión con piscina y clima tropical (Caracas vibe)
const CARACAS_LUXURY_IMG = herobg;

export default function Hero() {
  return (
    <section className="relative h-dvh w-full flex items-center justify-center overflow-hidden bg-carbon">
      <h1 className="sr-only">EstiloDomus: Bienes Raíces de Ultra Lujo en Caracas</h1>

      <HeroUi 
        preTitle="Luxury Real Estate Portfolio" // Claridad inmediata
        microCopy="Curaduría arquitectónica en el Eje Este • 2026"
        trustBadge={
          <div className="flex items-center gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-oro" />
                <span className="text-[8px] font-sans tracking-widest text-crema uppercase font-bold">Confidencialidad Certificada</span>
             </div>
             <div className="flex items-center gap-2">
                <Award size={14} className="text-oro" />
                <span className="text-[8px] font-sans tracking-widest text-crema uppercase font-bold">Top 1% Propiedades Elite</span>
             </div>
          </div>
        }
        cta={
          <Magnetic strength={0.2}>
            <button className="relative group bg-crema text-carbon px-16 py-8 rounded-full font-sans text-[11px] uppercase tracking-[0.3em] font-black overflow-hidden shadow-2xl transition-all hover:px-20">
              <span className="relative z-10 group-hover:text-crema transition-colors duration-500">
                Agendar Visita
              </span>
              <div className="absolute inset-0 bg-oro translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.76, 0, 0.24, 1]" />
            </button>
          </Magnetic>
        }
        bgElement={
          <Image
            src={CARACAS_LUXURY_IMG}
            alt="Arquitectura Tropical Moderna en Caracas"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        }
        contentElement={
          <div className="flex flex-col items-center select-none">
            <HeroLine text="Arquitectura que" delay={0.4} />
            <HeroLine text="Define tu Legado" delay={0.6} />
          </div>
        }
      />

      {/* Capa de textura para feeling editorial */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-40 mix-blend-overlay bg-repeat" 
           style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.95"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)"/%3E%3C/svg%3E')` }} 
      />
    </section>
  );
}