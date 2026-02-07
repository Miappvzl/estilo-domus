"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const PHILOSOPHY_DATA = [
  {
    id: "01",
    tag: "VISIÓN",
    line1: "ARQUITECTURA QUE",
    line2: "DESAFÍA EL TIEMPO",
    desc: "Diseñamos espacios que trascienden la tendencia para convertirse en legados habitables.",
  },
  {
    id: "02",
    tag: "MATERIA",
    line1: "HONESTIDAD EN",
    line2: "CADA ELEMENTO",
    desc: "Piedra, madera y luz: la triada que define nuestra pureza constructiva.",
  },
  {
    id: "03",
    tag: "LEGADO",
    line1: "EL VERDADERO",
    line2: "LUJO ES PAZ",
    desc: "Refugios diseñados para el silencio, la introspección y la excelencia absoluta.",
  }
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Rango de scroll extendido para profundidad
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 25, mass: 0.5 });

  return (
    <section ref={containerRef} className="relative bg-transparent min-h-[400vh] py-20">
      
      {/* 1. INDICADOR DE PROGRESO VERTICAL (Elite Detail) */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 h-32 w-px bg-carbon/5 z-20 hidden md:block">
        <motion.div 
          style={{ scaleY: smoothProgress, originY: 0 }}
          className="absolute inset-0 bg-oro w-full shadow-[0_0_15px_#C5B358]"
        />
      </div>

      <div className="container mx-auto px-6 relative">
        {PHILOSOPHY_DATA.map((item, index) => (
          <PhilosophySection 
            key={item.id} 
            item={item} 
            index={index} 
            globalProgress={smoothProgress} 
          />
        ))}
      </div>

      {/* 2. IMAGEN FLOTANTE (Elemento Escultórico que cruza la pantalla) */}
      <FloatingSculpture progress={smoothProgress} />
    </section>
  );
}

function PhilosophySection({ item, index, globalProgress }: { item: any, index: number, globalProgress: any }) {
  const sectionRef = useRef(null);
  
  // Cálculo de aparición individual basado en el scroll global
  const start = index * 0.25;
  const end = start + 0.3;

  const opacity = useTransform(globalProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const xOffset = useTransform(globalProgress, [start, end], [index % 2 === 0 ? -50 : 50, index % 2 === 0 ? 50 : -50]);
  
  // Efecto cinético de las letras (tracking)
  const letterSpacing = useTransform(globalProgress, [start, end], ["0.05em", "0.2em"]);

  return (
    <motion.div 
      ref={sectionRef}
      style={{ opacity }}
      className="h-screen flex flex-col justify-center relative z-10 pointer-events-none"
    >
      <div className={`flex flex-col ${index % 2 !== 0 ? 'items-end text-right' : 'items-start text-left'}`}>
        
        {/* TAG EDITORIAL */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-serif italic text-oro text-2xl">0{index + 1}</span>
          <div className="h-px w-8 bg-oro/40" />
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-carbon/40">{item.tag}</span>
        </div>

        {/* LÍNEAS CINÉTICAS (Parallax Desfasado) */}
        <motion.h3 
          style={{ x: xOffset, letterSpacing }}
          className="font-serif text-4xl md:text-7xl lg:text-9xl text-carbon leading-[0.85] tracking-tighter uppercase font-medium"
        >
          {item.line1}
        </motion.h3>
        
        <motion.h3 
          style={{ x: useTransform(xOffset, (v) => -v * 1.2) }}
          className="font-serif text-4xl md:text-8xl lg:text-9xl text-carbon leading-[0.85] tracking-tighter uppercase italic font-light ml-8 md:ml-20"
        >
          {item.line2}
        </motion.h3>

        {/* DESCRIPCIÓN REVELADA */}
        <div className="mt-12 max-w-sm border-t border-carbon/10 pt-8">
          <p className="font-sans text-xs md:text-sm text-carbon/60 uppercase tracking-widest leading-relaxed">
            {item.desc}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

function FloatingSculpture({ progress }: { progress: any }) {
  // La imagen se mueve de forma independiente, como si flotara en el fondo
  const y = useTransform(progress, [0, 1], ["20%", "-20%"]);
  const rotate = useTransform(progress, [0, 1], [0, 15]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div 
      style={{ y, rotate, scale }}
      className="fixed top-1/2 right-[10%] -translate-y-1/2 w-64 h-96 md:w-80 md:h-[500px] z-0 pointer-events-none hidden lg:block"
    >
      <div className="relative w-full h-full overflow-hidden rounded-full border border-carbon/5 shadow-2xl">
        <Image 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
          alt="Architectural Element"
          fill
          className="object-cover grayscale contrast-125 brightness-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-oro/10" />
      </div>
      
      {/* Floating coordinates */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="font-sans text-[8px] uppercase tracking-[0.6em] text-carbon/20 italic">
          10.4806° N, 66.9036° W • CARACAS
        </span>
      </div>
    </motion.div>
  );
}