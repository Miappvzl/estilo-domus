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
      options={{
        // 1. Duración del scroll (en segundos). 1.5 genera un movimiento pausado.
        duration: 1.5, 
        
        // 2. Inercia (Lerp): 0.05 es el "punto dulce" del lujo. 
        // Hace que la página se sienta pesada y cara.
        lerp: 0.05, 
        
        // 3. Sensibilidad del ratón: Bajamos un poco para evitar saltos bruscos.
        wheelMultiplier: 0.9, 
        
        // 4. Sensibilidad táctil: 1.2 es perfecto para que el dedo tenga 
        // control total sin que la web "salga volando".
        touchMultiplier: 1.2, 
        
        // 5. Suavizado activo
        smoothWheel: true,

        // Nota: 'normalizeWheel' ya no es necesario ni existe en esta versión.
        // Lenis ahora lo gestiona internamente para evitar el lag de hardware.
      }}
    >
      {children}
    </ReactLenis>
  );
}