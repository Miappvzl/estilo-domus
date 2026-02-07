"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Target, Cpu, HardHat } from "lucide-react";
import Image from "next/image";
import breeam from "@assets/images/services/breeam.webp";

const MILESTONES = [
  { id: "M.01", title: "PREMIO ALPHA 2025", cat: "ESTRUCTURA", desc: "Integración de concreto brutalista en ecosistemas vírgenes de El Hatillo.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200", tech: "LOAD_BEARING: 450kN" },
  { id: "M.02", title: "CERTIFICADO BREEAM", cat: "EFICIENCIA", desc: "Protocolo de sostenibilidad pasiva con huella de carbono negativa.", img: breeam.src, tech: "ENERGY_GAIN: +12%" },
  { id: "M.03", title: "INGENIERÍA DORADA", cat: "PRECISIÓN", desc: "Métricas de aprovechamiento lumínico mediante algoritmos solares.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200", tech: "LUX_ACCURACY: 99.8%" }
];

export default function Milestones() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-32 md:py-64 px-6 overflow-hidden transform-style-3d">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* ENCABEZADO DE SISTEMA */}
        <div className="flex flex-col gap-2 mb-24">
          <div className="flex items-center gap-4 text-oro">
            <Target size={14} className="animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.8em] uppercase">Structural_Achievements_Log</span>
          </div>
          <h2 className="font-serif text-6xl md:text-8xl text-carbon uppercase leading-none tracking-tighter">
            Hitos de <span className="italic font-light">Ingeniería</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* BOTONES TIPO "DASHBOARD" */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {MILESTONES.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className={`group relative p-8 flex flex-col text-left transition-all duration-700 rounded-sm border ${
                  active === i 
                    ? "bg-carbon border-carbon shadow-[0_30px_60px_rgba(0,0,0,0.3)] translate-x-6" 
                    : "bg-white/5 border-carbon/10 hover:border-oro/40"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                   <span className={`font-mono text-[10px] ${active === i ? "text-oro" : "text-carbon/20"}`}>{m.id}</span>
                   <div className={`${active === i ? "opacity-100" : "opacity-0"} transition-opacity`}>
                      <Cpu size={14} className="text-oro" />
                   </div>
                </div>
                <h4 className={`font-serif text-2xl md:text-4xl transition-all duration-500 uppercase ${active === i ? "text-crema" : "text-carbon/30"}`}>
                  {m.title}
                </h4>
                <div className={`mt-4 h-px bg-oro/20 transition-all duration-700 ${active === i ? "w-full" : "w-0"}`} />
              </button>
            ))}
          </div>

          {/* EL "CHAMBER" 3D (Optimizado para Alcatel/MediaTek) */}
          <div className="lg:col-span-7 relative h-[500px] flex items-center justify-center perspective-[1500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, rotateY: 25, x: 100, translateZ: -200 }}
                animate={{ opacity: 1, rotateY: 0, x: 0, translateZ: 0 }}
                exit={{ opacity: 0, rotateY: -25, x: -100, translateZ: -200 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full transform-style-3d"
              >
                {/* Marco de la Imagen (Como una placa de metal) */}
                <div className="absolute inset-0 bg-carbon rounded-xs overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
                  <Image 
                    src={MILESTONES[active].img} 
                    alt={MILESTONES[active].title} 
                    fill 
                    className="object-cover brightness-[0.4] scale-110"
                    priority
                  />
                  
                  {/* Escáner Visual (Línea que recorre la imagen) */}
                  <motion.div 
                    initial={{ left: "-100%" }}
                    animate={{ left: "200%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 w-px h-full bg-oro/40 shadow-[0_0_15px_#C5B358] z-20"
                  />

                  {/* Overlay de Datos Técnicos */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                       <span className="font-mono text-[9px] text-oro tracking-[0.4em] bg-carbon/80 px-3 py-1 border border-oro/20 uppercase">
                         Status: Verified
                       </span>
                       <HardHat className="text-crema opacity-20" size={24} />
                    </div>
                    
                    <div className="space-y-6">
                      <p className="font-serif text-crema text-2xl md:text-3xl leading-snug tracking-tight">
                         "{MILESTONES[active].desc}"
                      </p>
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-[10px] text-oro/60 tracking-widest">{MILESTONES[active].tech}</span>
                        <ArrowUpRight className="text-oro animate-bounce" size={28} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Elementos flotantes 3D (Background decor) */}
                <div className="absolute -inset-10 border border-carbon/5 -z-10 rounded-sm" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* MARCA DE AGUA INDUSTRIAL GIGANTE */}
      <div className="absolute -bottom-20 -left-10 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[30vw] font-serif font-black uppercase tracking-tighter">STRUCT</span>
      </div>
    </section>
  );
}