"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * CONFIGURACIÓN DE SCROLL "HEAVY STONE"
 * Objetivo: Máximo control, cero nerviosismo.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      // Dentro de las opciones de Lenis:
options={{
  duration: 1.8,      // Aumentamos a 1.8 para un movimiento más señorial
  lerp: 0.04,          // Bajamos a 0.04 (más inercia, se siente más "pesado")
  touchMultiplier: 0.7, // CRÍTICO: Menos de 1.0 para que el dedo no dispare la web
  wheelMultiplier: 0.8,
  infinite: false,
  smoothWheel: true,
  syncTouch: true,    // Sincroniza el scroll con la frecuencia de refresco del móvil
}}
    >
      {children}
    </ReactLenis>
  );
}