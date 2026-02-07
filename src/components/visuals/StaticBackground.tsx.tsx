"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function StaticBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const springX = useSpring(mouse.x, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouse.y, { stiffness: 50, damping: 20 });

  return (
    <div className="fixed inset-0 -z-20 w-full h-full bg-[#E5E5E3] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#F5F5F3]" />

      {/* REJILLA DE INGENIERÍA (Líneas horizontales y verticales de precisión) */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, #000 1px, transparent 1px),
            linear-gradient(to right, #000 1px, transparent 1px)
          `,
          backgroundSize: '100% 10vh, 10vw 100%'
        }}
      />

      {/* CURSOR TÉCNICO (Las líneas que siguen al mouse como una regla) */}
      <motion.div 
        style={{ y: springY }}
        className="absolute left-0 w-full h-px bg-oro/30 z-10"
      />
      <motion.div 
        style={{ x: springX }}
        className="absolute top-0 w-px h-full bg-oro/30 z-10"
      />

      {/* ILUMINACIÓN VOLUMÉTRICA */}
      <div className="absolute top-[-10%] left-[-10%] w-[100vw] h-[80vh] rounded-full opacity-60 mix-blend-screen bg-white blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vh] rounded-full opacity-30 mix-blend-multiply bg-[#C5B358] blur-[140px]" />

      {/* TEXTURA DE PAPEL TÉCNICO */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-soft-light noise-overlay" />
    </div>
  );
}