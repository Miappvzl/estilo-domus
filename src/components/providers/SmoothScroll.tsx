"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * LENIS CONFIGURATION:
 * lerp: 0.08 - 0.1 (Balance perfecto entre peso y responsividad)
 * duration: 1.5 (Sensación de inercia de lujo)
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
   <ReactLenis
  root
  options={{
    duration: 1.0,  // Reducimos duración (de 1.2 a 1.0)
    lerp: 0.12,     // Aumentamos el lerp para que sea más responsivo
    smoothWheel: true,
    syncTouch: true, // Esto es vital para que las animaciones de Framer Motion se sincronicen con el dedo
    touchMultiplier: 1.8, // Hace que el scroll se sienta más rápido en móviles
  }}
>
      {children}
    </ReactLenis>
  );
}