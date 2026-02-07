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
  { id: "01", title: "Global Citizenship", tag: "RESIDENCIA", desc: "Gestión de Golden Visa y estructuras fiscales internacionales.", img: p1 },
  { id: "02", title: "Asset Management", tag: "INVERSIÓN", desc: "Maximización de ROI y mantenimiento preventivo de activos.", img: p2 },
  { id: "03", title: "Art Curating", tag: "PATRIMONIO", desc: "Adquisición estratégica de obras de arte para su colección.", img: p3 },
  { id: "04", title: "Private Concierge", tag: "LIFESTYLE", desc: "Relocation, jets privados y acceso a clubes exclusivos.", img: p4 },
];

const SPRING_CONFIG = { stiffness: 40, damping: 22, mass: 1.2 };

export default function BespokeServices() {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef(null);

  // Control de scroll para el efecto circular en Mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative py-32 md:py-64 px-6 overflow-hidden">
      {/* HEADER: Con entrada sutil de letras */}
      <div className="container mx-auto mb-24 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-carbon/5 pb-12">
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-sans text-[10px] uppercase tracking-[0.6em] text-oro font-bold block"
            >
              Protocolos Elite
            </motion.span>
            <h2 className="font-serif text-6xl md:text-9xl text-carbon leading-[0.8] tracking-tighter uppercase">
              { "Bespoke".split("").map((l, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  {l}
                </motion.span>
              ))} 
              <br /> 
              <span className="italic font-light text-oro">Concierge</span>
            </h2>
          </div>
        </div>
      </div>

      {/* --- DESKTOP: GLASS SHUTTERS (Sin cambios, ya es God-Tier) --- */}
      <div className="hidden lg:flex w-full h-[70vh] gap-4 container mx-auto">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.id}
            layout
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`relative h-full overflow-hidden rounded-xs transition-all duration-700 border border-carbon/5 ${
              hovered === i ? "flex-4" : "flex-1"
            }`}
          >
            <Image src={s.img} alt={s.title} fill className={`object-cover grayscale brightness-50 transition-all duration-1000 ${hovered === i ? "grayscale-0 brightness-75 scale-110" : ""}`} />
            <div className={`absolute inset-0 transition-opacity duration-700 ${hovered === i ? "bg-carbon/40" : "bg-carbon/20"} `} />
            <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
              <span className="font-serif italic text-oro text-4xl">{s.id}</span>
              <div className="space-y-6">
                <h3 className={`font-serif text-crema leading-none transition-all duration-700 ${hovered === i ? "text-6xl" : "text-2xl -rotate-90 origin-left translate-x-4 -translate-y-20"}`}>
                  {s.title}
                </h3>
                {hovered === i && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-carbon/60 backdrop-blur-md border border-white/10 max-w-sm">
                    <p className="font-sans text-xs text-crema/70 uppercase tracking-widest leading-relaxed">{s.desc}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MOBILE: CIRCULAR KINETIC FAN --- 
          Optimizado para Alcatel 1V: No Blurs, No heavy shadows durante movimiento.
      */}
      <div className="lg:hidden flex flex-col gap-[30vh] py-[20vh]">
        {SERVICES.map((s, i) => (
          <MobileCircularCard 
            key={s.id} 
            service={s} 
            index={i} 
            total={SERVICES.length}
          />
        ))}
      </div>
    </section>
  );
}

function MobileCircularCard({ service, index, total }: { service: any, index: number, total: number }) {
  const cardRef = useRef(null);
  
  // Rango de activación individual
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  // TRANSFORMACIONES PURAS DE GPU (Scale, Rotate, Y)
  // Creamos el efecto de "entrar en el circulo"
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  // Texto sutil entrando de lado
  const textX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <div ref={cardRef} className="relative w-full h-[450px] flex items-center justify-center">
      <motion.div
        style={{ 
          rotate, 
          x, 
          scale, 
          opacity,
          transformOrigin: "bottom center"
        }}
        className="relative w-full h-full rounded-sm overflow-hidden bg-carbon will-change-transform transform-gpu border border-white/5 shadow-2xl"
      >
        <Image 
          src={service.img} 
          alt={service.title} 
          fill 
          className="object-cover brightness-50"
          sizes="90vw"
        />
        
        {/* Capa de color sólida en lugar de blur para Alcatel 1V */}
        <div className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/40 to-transparent" />

        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
             <motion.span 
              style={{ x: textX }}
              className="text-oro font-serif italic text-4xl"
             >
              {service.id}
             </motion.span>
             <span className="text-oro/40 font-sans text-[8px] tracking-[0.4em] uppercase mt-2">
               Access Mode: Alpha
             </span>
          </div>

          <div className="space-y-4">
            <motion.h3 
              style={{ x: textX }}
              className="text-crema font-serif text-4xl leading-none uppercase tracking-tighter"
            >
              {service.title.split(" ")[0]} <br />
              <span className="italic font-light text-oro/80">{service.title.split(" ")[1] || ""}</span>
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-crema/50 font-sans text-[10px] uppercase tracking-widest leading-relaxed max-w-[80%]"
            >
              {service.desc}
            </motion.p>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="mt-4 flex items-center gap-2 text-oro text-[10px] font-bold uppercase tracking-widest"
            >
              Inquirir <ArrowUpRight size={14} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}