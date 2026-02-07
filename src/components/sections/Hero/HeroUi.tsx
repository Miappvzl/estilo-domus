"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface HeroUiProps {
  preTitle: string;
  cta: ReactNode;
  microCopy: string;
  bgElement: ReactNode;      // Prop explícita para la imagen
  contentElement: ReactNode; // Prop explícita para los títulos
}

export default function HeroUi({ preTitle, cta, microCopy, bgElement, contentElement }: HeroUiProps) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const backgroundScale = useTransform(scrollY, [0, 1000], [1.1, 1]);
  const textY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 30;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* CAPA 1: FONDO CON PARALLAX */}
      <motion.div 
        style={{ scale: backgroundScale, x: springX, y: springY }}
        className="absolute inset-[-5%] z-0"
      >
        <div className="relative w-full h-full">
           <div className="absolute inset-0 bg-carbon/40 z-10" />
           {bgElement}
        </div>
      </motion.div>

      {/* CAPA 2: CONTENIDO EDITORIAL */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-20 flex flex-col items-center text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="font-sans text-[10px] md:text-xs uppercase text-oro font-bold mb-8"
        >
          {preTitle}
        </motion.span>

        <div className="relative">
          {contentElement}
          
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          {cta}
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-crema/40 italic">
            {microCopy}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HeroLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="overflow-hidden py-2 px-4">
      <motion.span
        initial={{ y: "100%", skewY: 7, letterSpacing: "0.1em" }}
        animate={{ y: 0, skewY: 0, letterSpacing: "0em" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay }}
        className="block font-serif text-5xl md:text-8xl lg:text-9xl text-crema leading-none will-change-transform"
      >
        {text}
      </motion.span>
    </div>
  );
}