"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const INSIGHTS = [
  {
    category: "Análisis de Activos",
    title: "El índice Alpha: Por qué el mármol de Carrara retiene valor.",
    date: "Marzo 2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
  },
  {
    category: "Tendencias",
    title: "Arquitectura Brutalista: La nueva tendencia en activos refugio.",
    date: "Febrero 2026",
    image: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJxdWl0ZWN0dXJhJTIwYnJ1dGFsaXN0YXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    category: "Inversión",
    title: "Off-Plan vs. Heritage: Dónde está el ROI en 2026.",
    date: "Enero 2026",
    image: "https://images.unsplash.com/photo-1717715308932-2ba727611550?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8T2xkJTIwbWVldHMlMjBuZXclMjBhcmNoaXRlY3R1cmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    category: "Psicología",
    title: "La psicología del comprador anónimo en Venezuela.",
    date: "Enero 2026",
    image: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3RyZWV0JTIwVmVuZG9yJTIwaW4lMjBMYXRpbiUyMEFtZXJpY2F8ZW58MHx8MHx8fDA%3D",
  },
];

export default function LegacyIntelligence() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // 1. Mouse Tracking con Física de Inercia
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuración de Spring para ese "retraso" lujoso
  const springConfig = { stiffness: 150, damping: 20, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotación dinámica basada en la velocidad X
  const rotate = useTransform(smoothX, (v) => {
    const diff = v - mouseX.get();
    return diff * 0.05; // Ajustar sensibilidad de rotación
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculamos posición relativa al viewport para el fixed overlay
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-48 bg-transparent overflow-hidden cursor-default"
    >
      {/* 1. INFINITE TICKER (Background Marquee) */}
      <div className="absolute inset-0 z-0 flex items-center pointer-events-none select-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[12vw] font-serif text-carbon opacity-[0.03] uppercase tracking-tighter">
            MARKET INSIGHTS • VALUATION • LEGACY • DISCRETION •&nbsp;
          </span>
          <span className="text-[12vw] font-serif text-carbon opacity-[0.03] uppercase tracking-tighter">
            MARKET INSIGHTS • VALUATION • LEGACY • DISCRETION •&nbsp;
          </span>
        </motion.div>
      </div>

      {/* 2. EDITORIAL LIST */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-20">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-bronze mb-4 block">
            Intelligence Reports
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-carbon">Legacy Insights</h2>
        </div>

        <div className="border-t border-carbon/10">
          {INSIGHTS.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`relative border-b border-carbon/10 py-10 md:py-16 transition-opacity duration-500 cursor-pointer flex flex-col md:flex-row md:items-center gap-4 ${
                activeIndex !== null && activeIndex !== index ? "opacity-20" : "opacity-100"
              }`}
            >
              <span className="md:w-1/4 font-sans text-[10px] uppercase tracking-[0.2em] text-carbon/40">
                {item.category}
              </span>
              <h3 className="md:flex-1 font-serif text-2xl md:text-4xl lg:text-5xl text-carbon leading-tight tracking-tight">
                {item.title}
              </h3>
              <span className="md:w-1/6 text-right font-sans text-[10px] uppercase tracking-[0.2em] text-carbon/40">
                {item.date}
              </span>

              {/* Mobile Image (Inline) */}
              <div className="lg:hidden mt-6 relative aspect-video w-full overflow-hidden rounded-xs">
                <Image src={item.image} alt={item.title} fill className="object-cover grayscale" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FLOATING IMAGE REVEAL (Desktop Only) */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              position: "fixed",
              top: smoothY,
              left: smoothX,
              translateX: "-50%",
              translateY: "-50%",
              rotate,
              pointerEvents: "none",
              zIndex: 50
            }}
            className="hidden lg:block w-100 aspect-4/3 overflow-hidden rounded-sm shadow-2xl"
          >
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full bg-carbon"
            >
              <Image 
                src={INSIGHTS[activeIndex].image} 
                alt="Floating Insight" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}