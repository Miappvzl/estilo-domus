"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // Intensidad del imán
}

const LUXURY_SPRING = { 
  stiffness: 40,   // Movimiento más lento al inicio
  damping: 20,    // Se detiene sin rebotar como un juguete
  mass: 1.2       // Le da sensación de peso físico
};


export default function Magnetic({ children, strength = 0.5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Valores de movimiento con Spring Physics para suavidad extrema
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, LUXURY_SPRING);
  const springY = useSpring(y, LUXURY_SPRING);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calcular el centro del elemento
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calcular la distancia y aplicar la fuerza (strength)
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}