"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{
      duration: 1.2, 
      lerp: 0.1,         // Más alto = más responsivo al dedo
      touchMultiplier: 1.0, // Velocidad natural 1:1
      smoothWheel: true,
    }}>
      {children}
    </ReactLenis>
  );
}