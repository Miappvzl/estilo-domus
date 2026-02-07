"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Shield } from "lucide-react";

const POSTS = [
  { id: "01", cat: "ESTRATEGIA", title: "EL VALOR DEL MÁRMOL", snippet: "Activos minerales vs capital líquido en 2026.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" },
  { id: "02", cat: "ARQUITECTURA", title: "PODER BRUTALISTA", snippet: "Psicología del concreto expuesto en residencias.", img: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?q=80&w=1200" },
  { id: "03", cat: "INVERSIÓN", title: "MERCADO OFF-PLAN", snippet: "Protocolos de adquisición privada y discreta.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" },
  { id: "04", cat: "PATRIMONIO", title: "LEGADO LÍQUIDO", snippet: "Arquitectura cinética en el eje de Caracas.", img: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?q=80&w=1200" },
];

export default function LegacyIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reducimos el scroll a 500vh para que el Alcatel no tenga que calcular rangos tan largos
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Marcadores de interfaz estáticos (0 costo de CPU) */}
        <div className="absolute inset-0 pointer-events-none z-40 border-x border-carbon/5 opacity-20" />

        <div className="relative w-full h-full">
          {POSTS.map((post, index) => (
            <IntelligenceDossier 
              key={post.id} 
              post={post} 
              index={index} 
              total={POSTS.length} 
              progress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function IntelligenceDossier({ post, index, total, progress }: any) {
  const start = index / total;
  const end = (index + 1) / total;

  // Lógica de "Slide & Reveal" (Más barata que el vuelo lateral)
  // La tarjeta entra desde abajo (Y) en lugar de laterales (X) para evitar el "tearing" de pantalla en móviles
  const y = useTransform(progress, [start, end], ["100vh", "0vh"]);
  
  // Descarte de renderizado: si la tarjeta ya pasó, se queda arriba y se oscurece
  const nextStart = (index + 1) / total;
  const opacity = useTransform(progress, [nextStart, nextStart + 0.05], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity, zIndex: index + 10 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center bg-carbon force-gpu"
    >
      <div className="relative w-[92vw] h-[80vh] md:w-[85vw] md:h-[75vh] flex flex-col md:flex-row overflow-hidden shadow-2xl border border-white/5 bg-carbon">
        
        {/* IMAGEN (Optimizada con sizes) */}
        <div className="relative w-full h-2/5 md:h-full md:w-1/2 overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          <Image 
            src={post.img} 
            alt={post.title} 
            fill 
            className="object-cover brightness-50 grayscale"
            sizes="(max-width: 768px) 90vw, 40vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-linear-to-t from-carbon via-transparent to-transparent opacity-80" />
        </div>

        {/* CONTENIDO (Estático dentro de la capa móvil) */}
        <div className="relative w-full h-3/5 md:h-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif italic text-oro text-xl">0{index + 1}</span>
              <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-oro/60">{post.cat}</span>
            </div>

            <h3 className="font-serif text-crema leading-none tracking-tighter uppercase text-3xl md:text-5xl lg:text-6xl">
              {post.title}
            </h3>

            <p className="font-sans text-[10px] text-crema/40 leading-relaxed uppercase tracking-widest max-w-[280px]">
              {post.snippet}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 opacity-30">
               <Shield size={10} className="text-oro" />
               <span className="font-sans text-[7px] text-crema tracking-widest uppercase font-bold">Encrypted Archive</span>
            </div>
            
            <button className="w-10 h-10 rounded-full border border-oro/20 flex items-center justify-center bg-oro/5 active:bg-oro transition-colors">
               <ArrowUpRight size={16} className="text-oro" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}