"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; // <--- ESTA LÍNEA FALTABA
import Image from "next/image";

const INSIGHTS = [
  { category: "Análisis de Activos", title: "El índice Alpha: Por qué el mármol de Carrara retiene valor.", date: "Marzo 2026", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { category: "Tendencias", title: "Arquitectura Brutalista: La nueva tendencia en activos refugio.", date: "Febrero 2026", image: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?w=600&auto=format&fit=crop" },
  { category: "Inversión", title: "Off-Plan vs. Heritage: Dónde está el ROI en 2026.", date: "Enero 2026", image: "https://images.unsplash.com/photo-1717715308932-2ba727611550?w=600&auto=format&fit=crop" },
  { category: "Psicología", title: "La psicología del comprador anónimo en Venezuela.", date: "Enero 2026", image: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?w=600&auto=format&fit=crop" },
];

export default function LegacyIntelligence() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 25, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // EFECTO ELITE: La imagen se inclina según la dirección del mouse
  const rotate = useTransform(smoothX, (v) => (v - mouseX.get()) * 0.1);
  const skewX = useTransform(smoothX, (v) => (v - mouseX.get()) * 0.05);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative py-32 md:py-64 bg-transparent overflow-hidden cursor-default">
      <div className="absolute inset-0 z-0 flex items-center pointer-events-none select-none overflow-hidden">
        <motion.div animate={{ x: [0, -1200] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap">
          <span className="text-[15vw] font-serif text-carbon opacity-[0.02] uppercase tracking-tighter italic">MARKET INSIGHTS • VALUATION • LEGACY • DISCRETION •&nbsp;</span>
          <span className="text-[15vw] font-serif text-carbon opacity-[0.02] uppercase tracking-tighter italic">MARKET INSIGHTS • VALUATION • LEGACY • DISCRETION •&nbsp;</span>
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-32 space-y-6">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-oro" />
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-bronze font-bold">Intelligence Reports</span>
          </div>
          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl text-carbon leading-none tracking-tighter">Legacy <br /> <span className="italic font-light text-oro">Insights</span></h2>
        </div>

        <div className="border-t border-carbon/10">
          {INSIGHTS.map((item, index) => (
            <motion.div key={index} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)} className={`relative border-b border-carbon/10 py-12 md:py-20 transition-all duration-700 cursor-none flex flex-col md:flex-row md:items-center gap-8 ${activeIndex !== null && activeIndex !== index ? "opacity-10 blur-[2px]" : "opacity-100 blur-0"}`}>
              <span className="md:w-1/4 font-sans text-[9px] uppercase tracking-[0.4em] text-carbon/40 font-bold">{item.category}</span>
              <h3 className="md:flex-1 font-serif text-3xl md:text-5xl lg:text-6xl text-carbon leading-tight tracking-tighter italic group-hover:text-oro transition-colors duration-500">
                {item.title}
              </h3>
              <div className="md:w-1/6 flex flex-col items-end">
                <span className="text-[9px] font-sans tracking-[0.3em] text-carbon/30 uppercase font-bold">{item.date}</span>
                <ArrowUpRight size={20} className={`text-oro mt-2 transition-all duration-500 ${activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} />
              </div>
              <div className="lg:hidden mt-8 relative aspect-video w-full overflow-hidden rounded-sm shadow-xl">
                <Image src={item.image} alt={item.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} exit={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ position: "fixed", top: smoothY, left: smoothX, translateX: "-50%", translateY: "-50%", rotate, skewX, pointerEvents: "none", zIndex: 50 }} className="hidden lg:block w-100 aspect-4/3 overflow-hidden rounded-sm shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/10">
            <motion.div key={activeIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="relative w-full h-full bg-carbon">
              <Image src={INSIGHTS[activeIndex].image} alt="Floating Insight" fill className="object-cover scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-carbon/50 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}