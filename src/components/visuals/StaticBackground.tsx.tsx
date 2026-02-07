"use client";

import { motion } from "framer-motion";

export default function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-20 w-full h-full bg-[#D9D9D9] overflow-hidden pointer-events-none">
      
      {/* 1. LA PARED DE PIEDRA (Base de contraste) */}
      <div className="absolute inset-0 bg-[#E5E5E3]" />

      {/* 2. EL TRAGALUZ (Cenital Primario - Luz Fría/Moderna)
          Usamos 'mix-blend-mode: screen' para que la luz sea incandescente. */}
      <div 
        className="absolute top-[-25%] left-[-15%] w-[130vw] h-[100vh] rounded-full opacity-90 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at center, #FFFFFF 0%, rgba(255,255,255,0.4) 30%, transparent 70%)',
          filter: 'blur(100px)',
          willChange: 'transform',
        }}
      />

      {/* 3. EL REBOTE CÁLIDO (Serenidad de Piso - Oro/Ámbar)
          Simula el sol golpeando un material noble en el suelo. 
          Este es el toque que da la 'calma' y el 'prestigio'. */}
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[100vw] h-[90vh] rounded-full opacity-60 mix-blend-overlay"
        style={{
          background: 'radial-gradient(circle at center, #C5B358 0%, #E8DCC4 40%, transparent 80%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />

      {/* 4. AURA CENTRAL (Luz de Relleno Platino)
          Une los dos focos extremos para que no haya un 'vacío' en el centro. */}
      <div 
        className="absolute top-[20%] left-[20%] w-[60vw] h-[60vh] opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at center, #F0F0F0 0%, transparent 70%)',
          filter: 'blur(150px)',
        }}
      />

      {/* 5. DIFUSIÓN ATMOSFÉRICA (Glow Post-Proceso)
          Este es el secreto de la serenidad: unificamos todo bajo una neblina de lujo. */}
      <div className="absolute inset-0 backdrop-blur-[40px] md:backdrop-blur-[80px] opacity-30 bg-white/5" />

      {/* 6. VIÑETA ARQUITECTÓNICA (Profundidad) */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.05) 100%)',
        }}
      />

      {/* 7. TEXTURA DE GRANO FÍSICO (Inyectada para look Editorial) */}
      <div 
        className="absolute inset-0 opacity-[0.2] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}