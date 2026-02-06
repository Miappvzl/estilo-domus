"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import p1 from "@assets/images/p1.webp";
import p2 from "@assets/images/p2.webp";
import p3 from "@assets/images/p3.webp";
import p4 from "@assets/images/p4.webp";

const SERVICES = [
  { id: "01", roman: "I", title: "Global Citizenship", tag: "RESIDENCIA & ESTRUCTURA", description: "Gestión integral de Golden Visa y estructuras fiscales internacionales.", image: p1 },
  { id: "02", roman: "II", title: "Asset Management", tag: "INVERSIÓN ESTRATÉGICA", description: "Maximización de ROI mediante análisis predictivo y mantenimiento premium.", image: p2 },
  { id: "03", roman: "III", title: "Art & Curating", tag: "PATRIMONIO CULTURAL", description: "Interiorismo y adquisición estratégica de obras de arte de alto valor.", image: p3 },
  { id: "04", roman: "IV", title: "Private Concierge", tag: "LIFESTYLE MANAGEMENT", description: "Relocation, aviación privada y acceso preferencial a clubes exclusivos.", image: p4 },
];

// SOLUCIÓN AL ERROR TS: Añadimos 'as const' para que el tipo sea 'spring' literal
const LUXURY_SPRING = { 
  type: "spring" as const, 
  stiffness: 40, 
  damping: 24, 
  mass: 1.5 
};

export default function BespokeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-transparent py-32 md:py-64 overflow-hidden">
      <div className="container mx-auto px-6 mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-oro" />
            <span className="font-sans text-[10px] uppercase tracking-[0.6em] text-carbon/40 font-bold italic">Bespoke Suite</span>
          </div>
          <h2 className="font-serif text-7xl md:text-9xl text-carbon leading-[0.8] tracking-tighter uppercase font-medium">
            Servicios <br /> <span className="italic font-light text-oro">Privados</span>
          </h2>
        </div>
      </div>

      {/* --- DESKTOP ACORDEÓN ELITE --- */}
      <div className="hidden lg:flex w-full h-[85vh] border-y border-carbon/10 bg-transparent overflow-hidden">
        {SERVICES.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={service.id}
              layout
              transition={LUXURY_SPRING}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative h-full border-r border-carbon/10 flex flex-col justify-end p-16 overflow-hidden cursor-none group ${
                isHovered ? "flex-5" : "flex-1"
              }`}
            >
              <motion.div layout className="absolute inset-0 z-0">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  // SOLUCIÓN TAILWIND: duration-2000 en lugar de duration-[2000ms]
                  className={`object-cover transition-all duration-2000 ease-out ${
                    isHovered ? "scale-100 grayscale-0 brightness-[0.4]" : "scale-125 grayscale brightness-[0.2]"
                  }`} 
                />
                <div className="absolute inset-0 bg-linear-to-t from-carbon via-transparent to-transparent opacity-80" />
              </motion.div>

              <div className="relative z-10 w-full space-y-8">
                <div className="flex items-center justify-between">
                  <span className={`font-serif italic text-4xl transition-colors duration-1000 ${isHovered ? "text-oro" : "text-crema/10"}`}>
                    {service.roman}
                  </span>
                  <motion.div 
                    animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }} 
                    transition={{ duration: 0.8 }} 
                    className="w-14 h-14 rounded-full border border-oro/30 flex items-center justify-center"
                  >
                    <ArrowUpRight className="text-oro" size={24} />
                  </motion.div>
                </div>

                <div className="space-y-3">
                   {/* SOLUCIÓN TAILWIND: duration-1200 y -translate-y-48 */}
                   <h3 className={`font-serif text-crema leading-none transition-all duration-1200 ${
                     isHovered ? "text-7xl opacity-100" : "text-3xl -rotate-90 origin-left -translate-y-48 translate-x-6 opacity-20"
                    }`}>
                    {service.title}
                  </h3>
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 20 }} 
                      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
                      className="space-y-8"
                    >
                      <p className="font-sans text-xs text-crema/50 max-w-sm leading-relaxed tracking-widest uppercase">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 group/btn cursor-pointer">
                        <div className="h-px w-20 bg-oro" />
                        <span className="text-[9px] text-oro tracking-[0.5em] uppercase font-bold">Solicitar Dossier</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Aquí podrías incluir tu componente MobileCardStack si lo usas en el mismo archivo */}
    </section>
  );
}