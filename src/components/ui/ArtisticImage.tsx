"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Compass } from "lucide-react";

export default function ArtisticImage({ item, index }: { item: any, index: number }) {
  const ref = useRef(null);
  
  // RASTREO DE POSICIÓN EN PANTALLA
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  // ANIMACIONES DE SCROLL (Móvil & Desktop)
  const y = useTransform(scrollYProgress, [0, 1], [0, -150 * item.speed * 5]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? 3 : -3, 0, index % 2 === 0 ? -3 : 3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  
  // REVELADO AUTOMÁTICO DE TEXTO EN MÓVIL
  // La opacidad del texto será 1 solo cuando la imagen esté en el centro (0.5 del progreso)
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.5], [15, 0]);

  // Suavizado de física
  const smoothY = useSpring(y, { stiffness: 45, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 40, damping: 25 });
  const smoothScale = useSpring(scale, { stiffness: 40, damping: 25 });

  return (
    <motion.div 
      ref={ref}
      style={{ 
        y: smoothY, 
        rotate: smoothRotate, 
        scale: smoothScale 
      }}
      className="group relative w-full will-change-transform transform-gpu"
    >
      <div className={`relative overflow-hidden rounded-sm bg-carbon shadow-2xl transition-all duration-1000 ${
        item.size === 'large' ? 'aspect-3/4' : item.size === 'medium' ? 'aspect-square' : 'aspect-4/5'
      }`}>
        {/* IMAGEN: grayscale-0 en móvil por defecto, grayscale en desktop con hover */}
        <Image 
          src={item.img} 
          alt={item.title} 
          fill 
          className="object-cover transition-all duration-1000 md:grayscale md:brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100 grayscale-0 brightness-90"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* OVERLAY EDITORIAL INTELIGENTE */}
        <motion.div 
          style={{ opacity: contentOpacity }} // Se activa solo en el centro del scroll
          className="absolute inset-0 bg-linear-to-t from-carbon/90 via-carbon/20 to-transparent flex flex-col justify-end p-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
           <motion.div style={{ y: contentY }} className="space-y-1">
              <span className="font-mono text-[8px] text-oro tracking-[0.4em] uppercase font-bold">
                {item.id}
              </span>
              <h4 className="font-serif text-crema text-2xl leading-none uppercase tracking-tighter">
                {item.title}
              </h4>
              <p className="font-sans text-[10px] text-crema/60 uppercase tracking-[0.2em] italic">
                {item.note}
              </p>
           </motion.div>
        </motion.div>
      </div>

      {/* METADATOS TÉCNICOS INFERIORES */}
      <div className="mt-4 flex justify-between items-center px-1">
        <div className="flex items-center gap-3 opacity-30">
          <Compass size={10} className="text-oro" />
          <span className="font-mono text-[8px] text-carbon tracking-[0.6em] uppercase">
            {item.coord}
          </span>
        </div>
        <div className="h-px w-8 bg-carbon/10" />
      </div>
    </motion.div>
  );
}