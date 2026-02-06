"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const CHAPTERS = [
  {
    tag: "01 / LA VISIÓN",
    title: "Arquitectura Cinética",
    description: "Diseñamos espacios que no solo habitan el paisaje, sino que lo desafían. Cada ángulo es una respuesta a la luz natural y al movimiento del sol.",
  },
  {
    tag: "02 / LA MATERIA",
    title: "Honestidad Táctil",
    description: "Piedra volcánica, maderas recuperadas y lino puro. Creemos en la belleza de lo imperfecto y en materiales que envejecen con dignidad.",
  },
  {
    tag: "03 / EL LEGADO",
    title: "Refugios Eternos",
    description: "No construimos para el presente, sino para las generaciones que vendrán. Una propiedad de EstiloDomus es un testamento de éxito y paz.",
  }
];

const BACKGROUND_TEXT = [
  "TIMELESS ARCHITECTURE •",
  "LEGACY • INTEGRITY • VISION •",
  "THE ART OF SILENCE •"
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Aumentamos el rango de scroll para que dure más (400vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Movimiento horizontal de los textos de fondo
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Animaciones de la imagen escultórica
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  const smoothImgScale = useSpring(imgScale, { stiffness: 50, damping: 20 });

  return (
    <section 
      ref={containerRef} 
      className="relative bg-transparent min-h-[450vh]" // Mucho más espacio de scroll
    >
      {/* ESPACIADOR: Separación del Hero (Despegue visual) */}
      <div className="h-[30vh] md:h-[50vh] w-full" />

      {/* 1. KINETIC TEXT BACKGROUND (Sticky) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.div style={{ x: xLeft }} className="whitespace-nowrap flex opacity-[0.04] md:opacity-[0.03]">
          {Array(3).fill(BACKGROUND_TEXT[0]).map((t, i) => (
            <span key={i} className="text-[28vw] md:text-[18vw] font-serif font-black leading-none uppercase tracking-tighter">{t}&nbsp;</span>
          ))}
        </motion.div>
        <motion.div style={{ x: xRight }} className="whitespace-nowrap flex opacity-[0.06] md:opacity-[0.05] -mt-[8vw]">
          {Array(3).fill(BACKGROUND_TEXT[1]).map((t, i) => (
            <span key={i} className="text-[28vw] md:text-[18vw] font-serif italic font-light leading-none text-oro tracking-tighter">{t}&nbsp;</span>
          ))}
        </motion.div>
        <motion.div style={{ x: xLeft }} className="whitespace-nowrap flex opacity-[0.04] md:opacity-[0.03] -mt-[8vw]">
          {Array(3).fill(BACKGROUND_TEXT[2]).map((t, i) => (
            <span key={i} className="text-[28vw] md:text-[18vw] font-serif font-black leading-none uppercase tracking-tighter">{t}&nbsp;</span>
          ))}
        </motion.div>
      </div>

      {/* 2. NARRATIVA EDITORIAL (Staggered Content) */}
      <div className="relative z-10 -mt-[100vh] container mx-auto px-6">
        
        {/* CHAPTER 1 */}
        <div className="min-h-screen flex items-center py-32">
          <div className="max-w-4xl">
            <ContentBlock chapter={CHAPTERS[0]} index={1} />
          </div>
        </div>

        {/* CHAPTER 2: Con Imagen Escultórica */}
        <div className="min-h-[150vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-32">
          <div className="lg:col-span-6">
            <ContentBlock chapter={CHAPTERS[1]} index={2} />
          </div>
          <div className="lg:col-span-6">
            <motion.div 
              style={{ scale: smoothImgScale, y: imgY }}
              className="relative aspect-3/4 w-full max-w-md mx-auto overflow-hidden rounded-sm shadow-2xl transform-gpu"
            >
              <Image 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                alt="Filosofía Material EstiloDomus"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-linear-to-t from-carbon/60 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* CHAPTER 3 */}
        <div className="min-h-screen flex items-center justify-end py-32 text-right">
          <div className="max-w-2xl">
            <ContentBlock chapter={CHAPTERS[2]} index={3} isRight />
          </div>
        </div>

      </div>

      {/* CIERRE DE SECCIÓN: Despegue hacia la siguiente sección */}
      <div className="h-[20vh] w-full" />
    </section>
  );
}

function ContentBlock({ chapter, index, isRight = false }: { chapter: any, index: number, isRight?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`space-y-8 ${isRight ? 'flex flex-col items-end' : ''}`}
    >
      <div className="flex items-center gap-4">
        <span className="text-oro font-serif italic text-2xl">0{index}</span>
        <div className="h-px w-12 bg-oro/30" />
        <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-carbon/40">{chapter.tag}</span>
      </div>
      
      <h3 className="font-serif text-5xl md:text-8xl text-carbon leading-[0.85] tracking-tighter max-w-lg">
        {chapter.title.split(' ')[0]} <br />
        <span className="italic font-light">{chapter.title.split(' ')[1]}</span>
      </h3>
      
      <p className="font-sans text-sm md:text-base uppercase tracking-widest text-carbon/60 leading-relaxed max-w-sm">
        {chapter.description}
      </p>
    </motion.div>
  );
}