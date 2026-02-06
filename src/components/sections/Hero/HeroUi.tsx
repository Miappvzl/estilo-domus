"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface HeroUiProps {
  children: ReactNode;
  preTitle: string;
  cta: ReactNode;
}

export default function HeroUi({ children, preTitle, cta }: HeroUiProps) {
  const { scrollY } = useScroll();
  
  // Efecto Parallax: El texto baja más lento que el scroll (crea profundidad)
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Curva de Bezier personalizada (Awwwards Style)
  const transition = { duration: 1.4, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <motion.div 
      style={{ y, opacity }}
      className="relative z-20 flex flex-col items-center text-center px-6"
    >
      {/* Pre-Título con Fade In */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.2 }}
        className="font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] text-bronze mb-8"
      >
        {preTitle}
      </motion.span>

      {/* H1 con Kinetic Typography (Masked Reveal) */}
      <h1 className="flex flex-col items-center">
        {children}
      </h1>

      {/* CTA con retraso para permitir que el H1 termine */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        className="mt-12"
      >
        {cta}
      </motion.div>
    </motion.div>
  );
}

/**
 * Sub-componente para animar líneas de texto individuales
 */
export function HeroLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="overflow-hidden py-2">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.76, 0, 0.24, 1],
          delay 
        }}
        className="block font-serif text-5xl md:text-8xl lg:text-9xl text-crema leading-[0.9999]"
      >
        {text}
      </motion.span>
    </div>
  );
}