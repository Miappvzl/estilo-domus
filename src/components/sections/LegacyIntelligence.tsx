"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const INSIGHTS = [
  { category: "Análisis de Activos", title: "El índice Alpha: Por qué el mármol de Carrara retiene valor.", date: "Marzo 2026", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { category: "Tendencias", title: "Arquitectura Brutalista: La nueva tendencia en activos refugio.", date: "Febrero 2026", image: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?w=600&auto=format&fit=crop" },
  { category: "Inversión", title: "Off-Plan vs. Heritage: Dónde está el ROI en 2026.", date: "Enero 2026", image: "https://images.unsplash.com/photo-1717715308932-2ba727611550?w=600&auto=format&fit=crop" },
  { category: "Psicología", title: "La psicología del comprador anónimo en Venezuela.", date: "Enero 2026", image: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?w=600&auto=format&fit=crop" },
];

export default function LegacyIntelligence() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // COORDENADAS GLOBALES
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 25, stiffness: 80, mass: 0.5 };
  const smoothX = useSpring(mouse.x, smoothOptions);
  const smoothY = useSpring(mouse.y, smoothOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Usamos clientX/Y para posicionamiento relativo a la pantalla (viewport)
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotación dinámica basada en la velocidad del mouse
  const rotate = useTransform(smoothX, (v) => (v - mouse.x.get()) * 0.1);

  return (
    <section className="relative py-32 md:py-64 bg-transparent overflow-hidden cursor-default">
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-24 space-y-6">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-oro" />
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-carbon/40 font-bold italic">Intelligence Reports</span>
          </div>
          <h2 className="font-serif text-7xl md:text-9xl text-carbon leading-none tracking-tighter uppercase">Legacy <br /> <span className="italic font-light text-oro">Insights</span></h2>
        </div>

        <div className="border-t border-carbon/10">
          {INSIGHTS.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`relative border-b border-carbon/10 py-12 md:py-20 transition-all duration-700 flex flex-col md:flex-row md:items-center gap-8 ${activeIndex !== null && activeIndex !== index ? "opacity-20 blur-[1px]" : "opacity-100"}`}
            >
              <span className="md:w-1/4 font-sans text-[9px] uppercase tracking-[0.4em] text-carbon/40 font-bold">{item.category}</span>
              <h3 className="md:flex-1 font-serif text-3xl md:text-5xl lg:text-7xl text-carbon leading-tight tracking-tighter uppercase transition-all duration-700">
                {activeIndex === index ? <span className="italic text-oro">{item.title}</span> : item.title}
              </h3>
              <div className="md:w-1/6 flex flex-col items-end">
                <span className="text-[10px] font-sans tracking-[0.3em] text-carbon/30 uppercase">{item.date}</span>
                <ArrowUpRight size={24} className={`text-oro mt-4 transition-all duration-700 ${activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              position: "fixed", 
              top: 0, 
              left: 0, 
              x: smoothX, 
              y: smoothY, 
              translateX: "-50%", 
              translateY: "-50%",
              rotate,
              pointerEvents: "none", 
              zIndex: 100005 
            }}
            className="hidden lg:block w-120 aspect-video overflow-hidden rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <motion.div key={activeIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full bg-carbon">
              <Image src={INSIGHTS[activeIndex].image} alt="Floating Insight" fill className="object-cover scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}