"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const POSTS = [
  { id: "01", cat: "ESTRATEGIA", title: "MÁRMOL DE CARRARA: REFUGIO DE VALOR", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" },
  { id: "02", cat: "ARQUITECTURA", title: "BRUTALISMO: LA ESTÉTICA DEL PODER", img: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?q=80&w=2000" },
  { id: "03", cat: "INVERSIÓN", title: "OFF-PLAN: EL PROTOCOLO PRIVADO", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" },
  { id: "04", cat: "LEGADO", title: "PATRIMONIO LÍQUIDO EN VENEZUELA", img: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?q=80&w=2000" },
];

export default function LegacyIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Aumentamos el rango de scroll y ajustamos el offset para el buffer final
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 25, damping: 22, mass: 1 });

  // Animación de entrada
  const sectionOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  return (
    // h-[1000vh] da un 20% de espacio extra al final (buffer) para que la última carta no salte
    <section ref={containerRef} className="relative h-[1000vh] bg-transparent">
      <div className="h-[100vh]" />

      <motion.div style={{ opacity: sectionOpacity }} className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {POSTS.map((post, index) => (
            <IntelligenceCard 
              key={post.id} 
              post={post} 
              index={index} 
              total={POSTS.length} 
              progress={smoothProgress} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function IntelligenceCard({ post, index, total, progress }: any) {
  // Ajustamos el rango: el scroll va de 0 a 1. 
  // Repartimos el 0 a 0.8 para las cartas, dejando el 0.8 a 1.0 como buffer de salida.
  const step = 0.8 / total;
  const start = index * step;
  const end = (index + 1) * step;

  const isEven = index % 2 === 0;
  const x = useTransform(progress, [start, end], [isEven ? "120vw" : "-120vw", "0%"]);
  const rotate = useTransform(progress, [start, end], [isEven ? 10 : -10, 0]);
  
  // La carta actual se encoge cuando empieza la SIGUIENTE carta
  const nextStart = (index + 1) * step;
  const nextEnd = (index + 2) * step;
  const scale = useTransform(progress, [nextStart, nextStart + 0.05], [1, 0.94]);
  const darken = useTransform(progress, [nextStart, nextStart + 0.05], [0, 0.6]);

  return (
    <motion.div
      style={{ x, rotate, scale, zIndex: index + 10 }}
      className="absolute w-[92vw] h-[75vh] md:w-[75vw] md:h-[80vh] will-change-transform transform-gpu"
    >
      <div className="relative w-full h-full bg-carbon rounded-xs overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src={post.img} 
            alt={post.title} 
            fill 
            className="object-cover brightness-50 grayscale-[0.2]"
            sizes="80vw"
          />
          <motion.div style={{ opacity: darken }} className="absolute inset-0 bg-black z-20" />
          <div className="absolute inset-0 bg-linear-to-b from-carbon/40 via-transparent to-carbon/90 z-10" />
        </div>

        <div className="relative z-30 container mx-auto px-8 text-center flex flex-col items-center">
          <span className="font-serif italic text-oro text-3xl md:text-5xl mb-6">0{index + 1}</span>
          <h3 className="font-serif text-crema leading-[0.85] tracking-tighter uppercase text-4xl md:text-7xl lg:text-8xl max-w-4xl drop-shadow-2xl mb-12">
            {post.title}
          </h3>
          <button className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full text-crema text-[10px] uppercase tracking-widest hover:bg-oro hover:text-carbon transition-all duration-500">
            Dossier Privado
          </button>
        </div>
      </div>
    </motion.div>
  );
}