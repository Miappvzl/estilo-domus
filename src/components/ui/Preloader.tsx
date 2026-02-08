"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Palabras clave que definen la marca durante la carga
  const words = ["VISIÓN", "MATERIA", "LEGADO", "ESTILODOMUS"];

  useEffect(() => {
    // 1. Lógica del contador (0 a 100)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500); // Delay tras llegar a 100
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Velocidad de la carga

    // 2. Ciclo de palabras
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ 
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
          className="fixed inset-0 z-[200000] flex flex-col items-center justify-center bg-carbon"
        >
          {/* Grano localizado en el preloader para consistencia */}
          <div className="noise-overlay opacity-10" />

          <div className="relative flex flex-col items-center">
            {/* Palabra cambiante */}
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <span className="font-serif italic text-crema/40 text-sm tracking-[0.5em] uppercase">
                {words[index]}
              </span>
            </motion.div>

            {/* Contador Masivo */}
            <div className="overflow-hidden">
              <motion.span 
                className="block font-serif text-7xl md:text-9xl text-crema tracking-tighter"
              >
                {progress}%
              </motion.span>
            </div>

            {/* Barra de progreso minimalista */}
            <div className="mt-12 h-px w-40 bg-crema/10 relative overflow-hidden">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                className="absolute inset-0 bg-oro origin-left"
              />
            </div>
          </div>

          {/* Metadata inferior */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2">
         
            <span className="font-sans text-[8px] tracking-[0.6em] text-crema/20 uppercase">
              EstiloDomus | Concepto de Diseño Web
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}