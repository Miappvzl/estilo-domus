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
  { id: "01", roman: "I", title: "Global Citizenship", tag: "RESIDENCIA & ESTRUCTURA", description: "Gestión integral de Golden Visa y estructuras fiscales internacionales para su movilidad global.", image: p1 },
  { id: "02", roman: "II", title: "Asset Management", tag: "INVERSIÓN ESTRATÉGICA", description: "Maximización de ROI y mantenimiento preventivo de activos mediante análisis predictivo.", image: p2 },
  { id: "03", roman: "III", title: "Art & Curating", tag: "PATRIMONIO CULTURAL", description: "Interiorismo y adquisición estratégica de obras de arte para elevar el valor de su patrimonio.", image: p3 },
  { id: "04", roman: "IV", title: "Private Concierge", tag: "LIFESTYLE MANAGEMENT", description: "Relocation, aviación privada y acceso preferencial a los clubes más exclusivos del mundo.", image: p4 },
];

/** 
 * SOLUCIÓN AL ERROR DE TIPO: 
 * Usamos 'as const' para que TS reconozca "spring" como un literal y no un string genérico.
 */
const LUXURY_SPRING = { 
  type: "spring" as const, 
  stiffness: 40, 
  damping: 22, 
  mass: 1.2 
};

export default function BespokeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-32 md:py-64 overflow-hidden">
      {/* HEADER EDITORIAL */}
      <div className="container mx-auto px-6 mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-oro/40" />
            <motion.span 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="font-sans text-[10px] uppercase tracking-[0.6em] text-carbon/40 font-bold"
            >
              The Suite
            </motion.span>
          </div>
          <h2 className="font-serif text-6xl md:text-9xl text-carbon leading-[0.8] tracking-tighter uppercase">
            Bespoke <br /> <span className="italic font-light text-oro">Concierge</span>
          </h2>
        </div>
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-carbon/40 max-w-70 leading-relaxed border-l border-oro/20 pl-8 hidden md:block">
          Hospitalidad de siete estrellas diseñada para el individuo global que exige excelencia absoluta.
        </p>
      </div>

      {/* --- DESKTOP: CINEMATIC SHUTTER (60 FPS + Mouse Parallax) --- */}
      <div className="hidden lg:flex w-full h-[85vh] border-y border-carbon/10 bg-transparent overflow-hidden">
        {SERVICES.map((service, index) => (
          <DesktopShutter 
            key={service.id} 
            service={service} 
            index={index} 
            isHovered={hoveredIndex === index} 
            setHovered={setHoveredIndex} 
          />
        ))}
      </div>

      {/* --- MOBILE: TELESCOPIC STACK (Técnica de Foco Atmosférico) --- */}
      <div className="lg:hidden flex flex-col px-4 gap-[20vh] pb-[40vh]">
        {SERVICES.map((service, index) => (
          <MobilePanel key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

function DesktopShutter({ service, index, isHovered, setHovered }: any) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panelRef.current) return;
    const { left, top, width, height } = panelRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={panelRef}
      layout
      transition={LUXURY_SPRING}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => { setHovered(null); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      className={`relative h-full border-r border-carbon/10 flex flex-col justify-end p-12 overflow-hidden cursor-none group ${isHovered ? "flex-4" : "flex-1"}`}
    >
      <motion.div 
        animate={{ x: mousePos.x * 40, y: mousePos.y * 40, scale: isHovered ? 1.05 : 1.2 }}
        transition={{ type: "spring", stiffness: 20, damping: 15 }}
        className="absolute inset-[-10%] z-0"
      >
        <Image 
          src={service.image} 
          alt={service.title} 
          fill 
          className={`object-cover transition-all duration-1000 ${isHovered ? "grayscale-0 brightness-[0.4]" : "grayscale brightness-[0.2]"}`} 
        />
        <div className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full space-y-8 pointer-events-none">
        <div className="flex items-center justify-between">
          <span className={`font-serif italic text-4xl transition-colors duration-700 ${isHovered ? "text-oro" : "text-crema/10"}`}>
            {service.roman}
          </span>
          <motion.div 
            animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }} 
            className="w-12 h-12 rounded-full border border-oro/30 flex items-center justify-center bg-oro/5"
          >
            <ArrowUpRight className="text-oro" size={20} />
          </motion.div>
        </div>

        <h3 className={`font-serif text-crema leading-none transition-all duration-1000 ${isHovered ? "text-7xl" : "text-2xl -rotate-90 origin-left -translate-y-40 translate-x-4 opacity-30"}`}>
          {service.title}
        </h3>

        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }} 
              className="space-y-6"
            >
              <p className="font-sans text-xs text-crema/50 max-w-sm leading-relaxed tracking-widest uppercase">
                {service.description}
              </p>
              <div className="h-px w-20 bg-oro/40 shadow-[0_0_10px_#C5B358]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function MobilePanel({ service }: { service: any }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  // Usamos configuraciones de resorte MUY bajas para no saturar el procesador
  const smoothScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]),
    { stiffness: 30, damping: 20 } 
  );

  return (
    <div ref={cardRef} className="h-[60vh] flex flex-col items-center sticky top-[20vh]">
      <motion.div 
        style={{ scale: smoothScale }}
        // Quitamos el cálculo de opacidad dinámico en el contenedor principal en móvil
        className="will-change-transform transform-gpu relative w-full h-full bg-carbon rounded-sm overflow-hidden shadow-xl border border-white/5"
      >
        <Image src={service.image} alt={service.title} fill className="object-cover brightness-[0.4] grayscale-[0.5]" sizes="90vw" />
        
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          <span className="font-serif italic text-oro text-2xl">{service.roman}</span>
          <h3 className="font-serif text-4xl text-crema leading-none tracking-tight">
            {service.title}
          </h3>
          <button className="text-[10px] text-oro uppercase tracking-widest border-t border-white/10 pt-4">
            Dossier Privado
          </button>
        </div>
      </motion.div>
    </div>
  );
}