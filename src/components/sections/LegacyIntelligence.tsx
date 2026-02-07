"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const INSIGHTS = [
  { id: "01", category: "MARKET ALPHA", title: "MÁRMOL DE CARRARA: EL REFUGIO DE VALOR", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" },
  { id: "02", category: "ARCHITECTURE", title: "BRUTALISMO: LA ESTÉTICA DEL PODER", image: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?w=1200" },
  { id: "03", category: "INVESTMENT", title: "OFF-MARKET: PROTOCOLO DE INVISIBILIDAD", image: "https://images.unsplash.com/photo-1717715308932-2ba727611550?w=1200" },
  { id: "04", category: "LEGACY", title: "PATRIMONIO LÍQUIDO EN EL EJE DE CARACAS", image: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?w=1200" },
];

export default function LegacyIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Aumentamos a 800vh: 200vh de "pista" por noticia para máxima legibilidad
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Física de inercia pesada: stiffness bajo y mass alto para que el scroll sea "majestuoso"
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 30, 
    damping: 20, 
    mass: 1.2 
  });

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* GUI DE ESCÁNER (Detalle Visual Elite) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-1/2 left-0 w-full h-px bg-oro/20" />
          <div className="absolute top-[45%] left-12 h-[10%] w-px bg-oro/40" />
          <div className="absolute top-[45%] right-12 h-[10%] w-px bg-oro/40" />
        </div>

        {/* CONTENEDOR DE PORTALES */}
        <div className="relative w-full h-full">
          {INSIGHTS.map((item, index) => (
            <InsightPortal 
              key={item.id} 
              item={item} 
              index={index} 
              total={INSIGHTS.length} 
              progress={smoothProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightPortal({ item, index, total, progress }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Meseta de Foco: la noticia se queda quieta y nítida en el centro (0.45 a 0.55 de su tiempo)
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [start, (start + end) / 2, end],
    [0.8, 1, 0.8]
  );

  // Clip-path cinematográfico: se abre de arriba a abajo
  const clipPath = useTransform(
    progress,
    [start + 0.02, (start + end) / 2, end - 0.02],
    ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)", "inset(50% 0% 50% 0%)"]
  );

  // Movimiento horizontal sutil: ya no "cruza" toda la pantalla, solo se desliza suavemente
  const xTranslate = useTransform(
    progress,
    [start, end],
    ["15%", "-15%"]
  );

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* IMAGEN DE FONDO (Portal) */}
      <motion.div 
        style={{ clipPath }}
        className="absolute inset-0 z-0 w-full h-full overflow-hidden"
      >
        <Image 
          src={item.image} 
          alt={item.title} 
          fill 
          className="object-cover grayscale brightness-[0.3] scale-110"
          sizes="100vw"
        />
        {/* Tintura de lujo */}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon via-transparent to-carbon opacity-80" />
      </motion.div>

      {/* CONTENIDO TEXTUAL RESPONSIVE */}
      <motion.div 
        style={{ x: xTranslate, scale }}
        className="relative z-10 w-full px-6 md:px-24 flex flex-col items-center text-center"
      >
        {/* Info Tag */}
        <div className="flex items-center gap-4 mb-6 md:mb-10">
          <span className="font-serif italic text-oro text-xl md:text-3xl">0{index + 1}</span>
          <div className="w-8 md:w-16 h-px bg-oro/30" />
          <span className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-crema/60">{item.category}</span>
        </div>

        {/* Título con Clamp: Evita que se corte en cualquier dispositivo */}
        <h3 className="font-serif text-crema leading-[0.9] tracking-tighter uppercase 
                       text-3xl sm:text-5xl md:text-7xl lg:text-8xl 
                       max-w-[95vw] md:max-w-[80vw] lg:max-w-6xl 
                       whitespace-normal break-words drop-shadow-2xl">
          {item.title}
        </h3>

        {/* CTA Interactivo */}
        <div className="mt-10 md:mt-16 flex items-center gap-4">
           <div className="w-10 md:w-20 h-px bg-oro/20" />
           <button className="group flex items-center gap-3 pointer-events-auto">
             <span className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-oro font-bold">Explorar Insight</span>
             <div className="w-8 h-8 rounded-full border border-oro/20 flex items-center justify-center group-hover:bg-oro group-hover:text-carbon transition-all duration-500">
               <ArrowUpRight size={14} />
             </div>
           </button>
           <div className="w-10 md:w-20 h-px bg-oro/20" />
        </div>
      </motion.div>

      {/* MARCADOR DE SEGURIDAD (Background) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-[8px] text-crema/10 tracking-[1em] uppercase hidden sm:block">
        EstiloDomus Intelligence // Secure Line // 2026
      </div>
    </motion.div>
  );
}