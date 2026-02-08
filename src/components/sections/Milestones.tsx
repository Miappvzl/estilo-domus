"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Target, Cpu, HardHat, Activity, Zap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import breeam from "@assets/images/services/breeam.webp";

const MILESTONES = [
  { id: "M.01", title: "CERTIFICACION LEED (CONCEPTO)", cat: "SUSTENTABILIDAD", desc: "Acabados 100% sostenibles y reciclables.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200", tech: ["STRESS: 120%", "MASS: 4.2k", "SENSORS: ON"] },
  { id: "M.02", title: "EFICIENCIA ENERGETICA", cat: "SUSTENTABILIDAD", desc: "Protocolo de sostenibilidad pasiva con huella de carbono negativa.", img: breeam.src, tech: ["THRM: -40%", "HVAC: AI", "CO2: ZERO"] },
  { id: "M.03", title: "ESTRUCTURA ANTISISMICA", cat: "SEGURIDAD", desc: "Estructura diseñada para soportar sismos de hasta 8.5 grados de magnitud.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200", tech: ["LUX: 99.8%", "ANGLE: OPT", "GLASS: SMART"] }
];

export default function Milestones() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [logId, setLogId] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setLogId(Math.random().toString(16).slice(2, 8).toUpperCase());
  }, [active]);

  // Mouse Tracking (Solo Desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-20 md:py-48 px-4 md:px-6 overflow-visible bg-transparent perspective-[2000px]"
      data-nav-theme="light"
    >
      <div className="container mx-auto max-w-7xl relative">
        
        {/* HEADER TÉCNICO */}
        <div className="flex flex-col gap-4 mb-12 md:mb-24">
          <div className="flex items-center gap-3 text-oro">
            <Activity size={14} className="animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.8em] uppercase">Estándares de Calidad</span>
          </div>
          <h2 className="font-serif text-5xl md:text-8xl text-carbon uppercase leading-none tracking-tighter">
            Hitos de <br /> <span className="italic font-light text-oro">Ingeniería</span>
          </h2>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* VISOR 3D (STICKY EN MOBILE Y DESKTOP) */}
          <div className="w-full lg:col-span-7 sticky top-[100px] lg:top-[150px] z-30 lg:order-2">
            <motion.div 
              style={{ rotateX, rotateY }}
              className="relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] w-full transform-style-3d"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.05, rotateY: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full transform-style-3d"
                >
                  <div className="absolute inset-0 bg-carbon rounded-xs overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
                    <Image 
                      src={MILESTONES[active].img} 
                      alt={MILESTONES[active].title} 
                      fill 
                      className="object-cover brightness-[0.4] contrast-125 transform-gpu"
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    
                    {/* HUD OVERLAY (Optimizado para legibilidad en móvil) */}
                    <div className="absolute inset-0 p-5 md:p-10 flex flex-col justify-between z-10">
                      <div className="flex justify-between items-start">
                         <div className="flex flex-col gap-1">
                          
                           <span className="font-mono text-[7px] md:text-[8px] text-crema/40 ml-1 uppercase">
                             ID: {mounted ? logId : "..."}
                           </span>
                         </div>
                         <HardHat className="text-crema opacity-20" size={20} />
                      </div>
                      
                      <div className="space-y-4 md:space-y-6">
                        <p className="font-serif text-crema text-lg md:text-3xl leading-tight italic">
                          "{MILESTONES[active].desc}"
                        </p>
                        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                          {MILESTONES[active].tech.map((t, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="font-mono text-[6px] md:text-[7px] text-oro uppercase">{t.split(':')[0]}</span>
                              <span className="font-mono text-[8px] md:text-[10px] text-crema font-bold">{t.split(':')[1]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* PANEL DE BOTONES (SCROLLABLE) */}
          <div className="w-full lg:col-span-5 flex flex-col gap-4 relative z-10 lg:order-1">
            {MILESTONES.map((m, i) => (
              <button
                key={m.id}
                onClick={() => {
                  setActive(i);
                  // Opcional: Auto-scroll suave hacia el visor al tocar en móvil
                  if(window.innerWidth < 1024) {
                    window.scrollTo({ top: containerRef.current?.offsetTop ? containerRef.current.offsetTop + 100 : 0, behavior: 'smooth' });
                  }
                }}
                className={`group relative p-6 md:p-8 flex flex-col text-left transition-all duration-500 rounded-xs border border-white/5 overflow-hidden ${
                  active === i 
                  ? "bg-carbon shadow-2xl ring-1 ring-oro/20" 
                  : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={`font-mono text-[10px] ${active === i ? "text-oro" : "text-carbon/40"}`}>{m.id}</span>
                  <Zap size={14} className={`${active === i ? "text-oro opacity-100" : "text-carbon opacity-20"}`} />
                </div>
                <h4 className={`font-serif text-lg md:text-3xl uppercase transition-all ${active === i ? "text-crema" : "text-carbon/30"}`}>
                  {m.title}
                </h4>
                {active === i && (
                  <motion.div 
                    layoutId="activeBar"
                    className="mt-4 h-px w-full bg-oro"
                  />
                )}
              </button>
            ))}
            
            {/* Espaciador final en móvil para que el último botón pueda subir lo suficiente */}
            <div className="h-[20vh] lg:hidden" />
          </div>

        </div>
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[25vw] font-serif font-black uppercase tracking-tighter text-carbon">STRUCT</span>
      </div>
    </section>
  );
}