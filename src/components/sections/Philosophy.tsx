"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const PHILOSOPHY_CARDS = [
  {
    id: "01",
    tag: "VISIÓN",
    title: "Arquitectura que desafía el tiempo.",
    desc: "Diseñamos espacios que no solo habitan el paisaje, sino que lo trascienden, convirtiéndose en monumentos de vida que perduran generaciones.",
    detail: "ESTRUCTURA ATEMPORAL"
  },
  {
    id: "02",
    tag: "MATERIA",
    title: "Honestidad en cada poro de la piedra.",
    desc: "Piedra volcánica, maderas centenarias y luz que esculpe cada rincón. Creemos en la verdad de los materiales nobles.",
    detail: "ORIGEN ORGÁNICO"
  },
  {
    id: "03",
    tag: "LEGADO",
    title: "Refugios para almas en busca de paz.",
    desc: "No construimos para el ahora, sino para las mentes que entienden el verdadero valor del silencio y la introspección.",
    detail: "SILENCIO VISUAL"
  }
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={containerRef} className="relative bg-transparent min-h-[400vh] py-32 md:py-64">
      {/* 1. ANCLA VISUAL: Ahora con bordes suavizados para integración total */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">
        <motion.div 
          style={{ scale: imageScale }}
          className="relative w-[95vw] h-[80vh] md:w-[70vw] md:h-[85vh] overflow-hidden rounded-xs shadow-2xl transform-gpu"
        >
          <Image 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
            alt="Philosophy Anchor"
            fill
            priority
            className="object-cover grayscale-15 brightness-40 md:brightness-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-carbon/60 via-transparent to-carbon/80" />
        </motion.div>
      </div>

      {/* 2. CAPAS DE INFORMACIÓN: Cartas Estéticas */}
      <div className="relative z-10 -mt-[100vh]">
        {PHILOSOPHY_CARDS.map((card, index) => (
          <PhilosophyCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}

function PhilosophyCard({ card, index }: { card: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  // Animaciones fluidas por carta
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <div ref={ref} className="h-screen flex items-center justify-center px-6">
      <motion.div
        style={{ opacity, y, scale }}
        className={`relative w-full max-w-xl p-8 md:p-12 
                    bg-[#0000005c] backdrop-blur-xl border border-white/10 rounded-sm
                    shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                    ${index % 2 !== 0 ? 'md:ml-auto' : 'md:mr-auto'}
        `}
      >
        {/* Decoración de Esquina */}
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <span className="font-serif italic text-4xl text-oro">{card.id}</span>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-oro" />
            <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-oro font-bold">
              {card.tag}
            </span>
          </div>

          <h3 className="font-serif text-3xl md:text-5xl text-crema leading-[1.1] tracking-tight uppercase">
            {card.title}
          </h3>

          <p className="font-sans text-xs md:text-sm text-[rgb(241,241,241)] leading-relaxed tracking-widest uppercase border-l border-oro/30 pl-6">
            {card.desc}
          </p>

          <div className="pt-6 flex justify-between items-center border-t border-white/5">
            <span className="font-sans text-[8px] tracking-[0.4em] text-crema/20">
              {card.detail}
            </span>
            <div className="flex gap-1">
              {[1, 2, 3].map((dot) => (
                <div key={dot} className={`w-1 h-1 rounded-full ${index + 1 >= dot ? 'bg-oro' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}