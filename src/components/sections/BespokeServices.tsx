"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import p1 from "@assets/images/p1.webp";
import p2 from "@assets/images/p2.webp";
import p3 from "@assets/images/p3.webp";
import p4 from "@assets/images/p4.webp";

const SERVICES = [
  {
    id: "01",
    roman: "I",
    title: "Global Citizenship",
    tag: "RESIDENCIA & ESTRUCTURA",
    description: "Gestión integral de Golden Visa y estructuras fiscales internacionales para su movilidad global.",
    image: p1,
  },
  {
    id: "02",
    roman: "II",
    title: "Asset Management",
    tag: "INVERSIÓN ESTRATÉGICA",
    description: "Maximización de ROI y mantenimiento preventivo de activos mediante análisis predictivo.",
    image: p2,
  },
  {
    id: "03",
    roman: "III",
    title: "Art & Curating",
    tag: "PATRIMONIO CULTURAL",
    description: "Interiorismo y adquisición estratégica de obras de arte para elevar el valor de su patrimonio.",
    image: p3,
  },
  {
    id: "04",
    roman: "IV",
    title: "Private Concierge",
    tag: "LIFESTYLE MANAGEMENT",
    description: "Relocation, aviación privada y acceso preferencial a los clubes más exclusivos del mundo.",
    image: p4,
  },
];

const SPRING_CONFIG = { stiffness: 150, damping: 25, mass: 0.8 };
const LUXURY_SPRING = { 
  stiffness: 40,   // Movimiento más lento al inicio
  damping: 20,    // Se detiene sin rebotar como un juguete
  mass: 1.2       // Le da sensación de peso físico
};


export default function BespokeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-transparent py-32 md:py-64 overflow-hidden">
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-oro" />
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-sans text-[10px] uppercase tracking-[0.5em] text-bronze"
            >
              Exclusividad 360°
            </motion.span>
          </div>
          <h2 className="font-serif text-6xl md:text-8xl text-carbon leading-[0.85] tracking-tighter">
            Bespoke <br /> <span className="italic font-light">Services</span>
          </h2>
        </div>
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-carbon/40 max-w-[280px] leading-relaxed border-l border-carbon/10 pl-8">
          Hospitalidad de siete estrellas diseñada para el individuo global que no acepta compromisos.
        </p>
      </div>

      {/* --- DESKTOP: THE SHUTTER REVEAL --- */}
      <div className="hidden lg:flex w-full h-[75vh] border-y border-carbon/10 bg-transparent overflow-hidden">
        {SERVICES.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={service.id}
              layout
              transition={LUXURY_SPRING}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative h-full border-r border-carbon/10 flex flex-col justify-end p-12 overflow-hidden cursor-none group ${
                isHovered ? "flex-[3.5]" : "flex-1"
              }`}
            >
              <motion.div layout className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1200px) 25vw, 40vw"
                  className={`object-cover transition-all duration-1000 ease-[0.76, 0, 0.24, 1] ${
                    isHovered ? "scale-105 grayscale-0 brightness-[0.6]" : "scale-110 grayscale brightness-[0.3]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/10 to-transparent opacity-80" />
              </motion.div>

              <div className="relative z-10 w-full space-y-6">
                <div className="flex items-center justify-between">
                  <span className={`font-serif italic text-3xl transition-colors duration-500 ${isHovered ? "text-oro" : "text-crema/20"}`}>
                    {service.roman}
                  </span>
                  <div className={`w-10 h-10 rounded-full border border-crema/20 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                    <ArrowUpRight className="text-oro" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`font-sans text-[9px] uppercase tracking-[0.4em] block transition-all duration-500 ${isHovered ? "text-oro opacity-100" : "text-crema/40 opacity-0"}`}>
                    {service.tag}
                  </span>
                  <h3 className={`font-serif text-crema leading-none transition-all duration-700 ${isHovered ? "text-6xl" : "text-2xl -rotate-90 origin-left translate-x-4 translate-y-[-100px]"}`}>
                    {service.title}
                  </h3>
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                      exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      className="space-y-6"
                    >
                      <p className="font-sans text-xs text-crema/60 max-w-sm leading-relaxed tracking-wide">
                        {service.description}
                      </p>
                      <div className="flex gap-4">
                        <div className="h-[1px] w-12 bg-oro self-center" />
                        <span className="text-[9px] text-oro tracking-[0.3em] uppercase font-bold">Solicitar Dossier</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- MOBILE: THE VAULT STACK --- */}
      <div className="lg:hidden flex flex-col px-6 space-y-[60vh] pb-[40vh]">
  {SERVICES.map((service, index) => (
    <MobileCard key={service.id} service={service} index={index} />
  ))}
</div>
    </section>
  );
}

/**
 * OPTIMIZACIÓN MÓVIL (60 FPS)
 * 1. Quitamos Blur (Costoso para GPU).
 * 2. Sombras optimizadas.
 * 3. transform-gpu forzado.
 */
function MobileCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Transformaciones suaves y ligeras para el procesador móvil
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  // Reemplazamos blur por una capa de sombra/oscuridad progresiva
  const tint = useTransform(scrollYProgress, [0, 1], [0, 0.4]);

  const springScale = useSpring(scale, LUXURY_SPRING);

  return (
    <div ref={cardRef} className="h-[580px] flex flex-col sticky top-[12vh]">
      <motion.div 
        style={{ scale: springScale, opacity }}
        className="will-change-transform transform-gpu relative w-full h-full bg-carbon rounded-sm overflow-hidden shadow-2xl flex flex-col border border-crema/5"
      >
        {/* Capa de oscurecimiento progresiva (más fluida que un blur) */}
        <motion.div 
          style={{ opacity: tint }}
          className="absolute inset-0 bg-black z-20 pointer-events-none"
        />

        <div className="relative h-[45%] w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
            className="object-cover brightness-75 scale-110"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon to-transparent opacity-60" />
          <span className="absolute top-8 left-8 font-serif italic text-oro text-2xl z-30">{service.roman}</span>
        </div>
        
        <div className="p-8 flex flex-col justify-between flex-1 relative bg-carbon z-10">
          <div className="space-y-6">
            <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-oro/60">{service.tag}</span>
            <h3 className="font-serif text-4xl text-crema leading-[0.9] tracking-tighter italic">
              {service.title.split(' ')[0]} <br />
              <span className="not-italic font-light">{service.title.split(' ')[1] || ""}</span>
            </h3>
            <p className="font-sans text-[11px] text-crema/40 leading-relaxed tracking-wide">
              {service.description}
            </p>
          </div>

          <button className="flex items-center justify-between w-full pt-6 border-t border-crema/10 group active:scale-95 transition-transform">
            <div className="flex flex-col items-start">
              <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-crema/30">Consultoría Privada</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-oro font-bold">Contactar Concierge</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-oro/20 flex items-center justify-center bg-oro/5">
              <ArrowUpRight size={20} className="text-oro" />
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}