"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const CHAPTERS = [
  {
    roman: "I",
    title: "LA VISIÓN",
    text: "Arquitectura que desafía el paso del tiempo.",
    desc: "Diseñamos espacios que no solo habitan el paisaje, sino que lo trascienden, convirtiéndose en monumentos de vida."
  },
  {
    roman: "II",
    title: "LA MATERIA",
    text: "Honestidad en cada poro de la piedra.",
    desc: "Creemos en la verdad de los materiales. Piedra volcánica, maderas centenarias y luz que esculpe cada rincón."
  },
  {
    roman: "III",
    title: "EL LEGADO",
    text: "Refugios para almas en busca de paz.",
    desc: "No construimos para el ahora, sino para las generaciones que entenderán el verdadero valor del silencio."
  }
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  return (
    <section 
      ref={containerRef} 
      className="relative bg-carbon min-h-[400vh] overflow-visible"
      style={{
        // TRUCO DE PRESTIGIO: Desvanecemos la sección al inicio y al final 
        // para que se funda con el fondo líquido crema del resto de la web.
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* LADO IZQUIERDO: Imagen Monolítica con Parallax */}
            <div className="hidden lg:block relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-xs group">
              <ParallaxImage progress={smoothProgress} />
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
            </div>

            {/* LADO DERECHO: Texto Cinético (Foco Único) */}
            <div className="relative h-[60vh] flex flex-col justify-center">
              {CHAPTERS.map((chapter, index) => (
                <ChapterText 
                  key={index} 
                  chapter={chapter} 
                  index={index} 
                  progress={smoothProgress} 
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterText({ chapter, index, progress }: { chapter: any, index: number, progress: any }) {
  // Cada capítulo vive en un rango del scroll (0.2 a 0.4, 0.4 a 0.6, etc.)
  const start = 0.2 + index * 0.25;
  const end = start + 0.2;

  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [40, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center space-y-8 pointer-events-none"
    >
      <div className="flex items-center gap-6">
        <span className="font-serif italic text-oro text-4xl">{chapter.roman}</span>
        <div className="h-px w-12 bg-oro/40" />
        <span className="font-sans text-[10px] uppercase tracking-[0.6em] text-crema/40">{chapter.title}</span>
      </div>

      <h3 className="font-serif text-5xl md:text-7xl text-crema leading-[0.9] tracking-tighter uppercase">
        {chapter.text}
      </h3>

      <p className="font-sans text-xs md:text-sm text-crema/40 uppercase tracking-[0.2em] leading-relaxed max-w-sm pt-8 border-t border-white/5">
        {chapter.desc}
      </p>
    </motion.div>
  );
}

function ParallaxImage({ progress }: { progress: any }) {
  // La imagen se mueve verticalmente dentro de su contenedor fijo
  const y = useTransform(progress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(progress, [0, 1], [1.2, 1]);

  return (
    <motion.div style={{ y, scale }} className="absolute -inset-y-20 w-full h-[140%]">
      <Image 
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
        alt="Interior de Lujo EstiloDomus"
        fill
        className="object-cover brightness-75 grayscale contrast-125"
      />
    </motion.div>
  );
}