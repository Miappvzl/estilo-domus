"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// Importa el icono si lo tienes, si no, puedes quitar esta línea o usar otro
import { ArrowUpRight } from "lucide-react"; 

const POSTS = [
  { id: "01", date: "MAR 2026", cat: "MERCADO", title: "Mármol de Carrara: El refugio de valor.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { id: "02", date: "FEB 2026", cat: "ESTILO", title: "Brutalismo orgánico: El estándar del lujo.", img: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?q=80&w=800" },
  { id: "03", date: "ENE 2026", cat: "INVERSIÓN", title: "Off-Plan: El protocolo de invisibilidad.", img: "https://images.unsplash.com/photo-1717715308932-2ba727611550?q=80&w=800" },
  { id: "04", date: "DIC 2025", cat: "LEGADO", title: "Arquitectura Cinética en Venezuela.", img: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?q=80&w=800" }
];

const COLORS = {
  carbon: "#050505",
  gold: "#C5B358",
  cream: "#F5F5F0",
};

export default function LegacyIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // FÍSICA AJUSTADA: Más fricción (damping) y menos rigidez (stiffness)
  // Esto hace que el scroll se sienta "pesado" y elegante, eliminando saltos bruscos.
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 40,  // Antes 50 (Menos rígido = más suave)
    damping: 40,    // Antes 25 (Más fricción = frena más suave)
    mass: 0.8       // Un poco más de peso para estabilidad
  });

  return (
    // CAMBIO CLAVE: h-[700vh] (Antes 400vh)
    // Al aumentar la altura, "estiramos" el tiempo de la animación.
    // Ahora tienes que hacer más scroll para mover lo mismo, desacelerando todo.
    <section ref={containerRef} className="relative h-[700vh]" style={{ backgroundColor: COLORS.carbon }}>
      
      {/* 1. ESCENARIO FIJO */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Fondo Negro Puro */}
        <div className="absolute inset-0 bg-[#080808] z-0" />

        {/* 2. EL PORTAL FÍSICO */}
        <div className="absolute w-full h-[40vh] z-30 pointer-events-none flex flex-col justify-between">
            <div className="w-full h-[1px] bg-[#C5B358] opacity-60" />
            <div className="w-full h-[1px] bg-[#C5B358] opacity-60" />
        </div>

        {/* MÁSCARAS SIMPLES */}
        <div className="absolute top-0 w-full h-[30vh] bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />

        {/* 3. CARRUSEL DE ALTO RENDIMIENTO */}
        <div className="relative w-full h-full z-10 will-change-transform"> 
          {POSTS.map((post, index) => (
            <OptimizedPortalItem 
              key={post.id} 
              post={post} 
              index={index} 
              total={POSTS.length} 
              progress={smoothProgress} 
            />
          ))}
        </div>

        {/* UI ESTÁTICA */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none z-40">
            <span style={{ color: COLORS.gold }} className="font-sans text-[9px] tracking-[0.3em] font-bold">TERMINAL ACCESS</span>
            <span style={{ color: COLORS.cream }} className="opacity-20 font-sans text-[9px] tracking-[0.3em] self-end">ENCRYPTED</span>
        </div>
      </div>
    </section>
  );
}

function OptimizedPortalItem({ post, index, total, progress }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  const center = (start + end) / 2;
  
  // Ajusté el rango de activación ligeramente para que dure un poco más en pantalla
  const activationStart = center - 0.12; 
  const activationEnd = center + 0.12;

  // 1. TRANSFORMACIONES DE GPU
  const translateY = useTransform(progress, [start, end], ["100vh", "-100vh"]);
  const opacity = useTransform(progress, [activationStart, center, activationEnd], [0, 1, 0]);
  const scale = useTransform(progress, [activationStart, activationEnd], [1.15, 1]);

  // Color Swapping
  const textOpacity = useTransform(progress, [activationStart + 0.05, center, activationEnd - 0.05], [0.3, 1, 0.3]);
  const goldOpacity = useTransform(progress, [center - 0.02, center, center + 0.02], [0, 1, 0]);

  return (
    <motion.div 
      style={{ y: translateY }}
      className="absolute inset-0 flex items-center justify-center w-full will-change-transform"
    >
      {/* CAPA IMAGEN */}
      <motion.div 
        style={{ opacity, scale }}
        className="absolute w-full h-[50vh] z-0"
      >
        <Image 
          src={post.img} 
          alt="luxury" 
          fill 
          className="object-cover brightness-[0.6]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
          loading={index > 0 ? "lazy" : "eager"}
        />
      </motion.div>

      {/* CAPA TEXTO */}
      <div className="relative z-10 px-4 text-center max-w-lg mx-auto">
        <motion.div className="flex flex-col items-center">
          
          <div className="relative">
            {/* Capa Base */}
            <motion.h2 
              style={{ opacity: textOpacity }}
              className="font-serif text-5xl md:text-7xl text-[#F5F5F0] leading-[0.9] uppercase tracking-tighter"
            >
              {post.title}
            </motion.h2>

            {/* Capa Dorada */}
            <motion.h2 
              style={{ opacity: goldOpacity }}
              className="absolute inset-0 font-serif text-5xl md:text-7xl text-[#C5B358] leading-[0.9] uppercase tracking-tighter"
              aria-hidden="true"
            >
              {post.title}
            </motion.h2>
          </div>

          <motion.div style={{ opacity: textOpacity }} className="mt-6 flex items-center gap-3 opacity-60">
             <span className="text-[10px] tracking-[0.2em] text-[#F5F5F0]">{post.cat}</span>
             <div className="w-8 h-px bg-[#C5B358]" />
             <span className="text-[10px] tracking-[0.2em] text-[#F5F5F0]">{post.date}</span>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}