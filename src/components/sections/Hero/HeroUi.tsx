"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface HeroUiProps {
  preTitle: string;
  cta: ReactNode;
   microCopy: string;
  trustBadge: ReactNode; // Nueva prop para prueba social
  bgElement: ReactNode;
  contentElement: ReactNode;
}

export default function HeroUi({ preTitle, cta, microCopy, trustBadge, bgElement, contentElement }: HeroUiProps) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30, mass: 1 });

  const backgroundScale = useTransform(scrollY, [0, 1000], [1.1, 1]);
  const textY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-carbon"
    >
      {/* FONDO CON PARALLAX MEJORADO */}
      <motion.div 
        style={{ scale: backgroundScale, x: springX, y: springY }}
        className="absolute inset-[-10%] z-0 transform-gpu"
      >
        <div className="relative w-full h-full">
           <div className="absolute inset-0 bg-carbon/50 z-10" />
           {bgElement}
        </div>
      </motion.div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* DESCRIPTOR DE CATEGORÍA (Claridad de Marca) */}
          <motion.div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-oro/40" />
            <span className="font-sans text-[10px] md:text-[12px] uppercase text-oro font-black tracking-[0.6em]">
              {preTitle}
            </span>
            <div className="w-8 h-px bg-oro/40" />
          </motion.div>

          <motion.div style={{ y: textY }} className="relative mb-12">
            {contentElement}
          </motion.div>

          {/* CTA & PRUEBA SOCIAL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-10"
          >
            {cta}
            
            <div className="flex flex-col items-center gap-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-crema/40 italic">
                {microCopy}
              </p>
              {trustBadge}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function HeroLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="overflow-hidden py-5 px-6">
      <motion.span
        initial={{ y: "100%", skewY: 5 }}
        animate={{ y: 0, skewY: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay }}
        className="block font-serif text-5xl md:text-8xl lg:text-[9.5vw] text-crema leading-[0.85] tracking-tighter"
      >
        {text}
      </motion.span>
    </div>
  );
}