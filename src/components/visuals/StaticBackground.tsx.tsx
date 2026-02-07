"use client";

export default function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-20 w-full h-full bg-[#FFFFFF] overflow-hidden pointer-events-none">
      {/* 1. Capa de Profundidad "Cold Stone" */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(135deg, #FFFFFF 0%, #F0F0F2 50%, #E5E5E7 100%)`
        }}
      />

      {/* 2. Brillo de "Seda" (Un haz de luz sutil que cruza la pantalla) */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(45deg, transparent 40%, #FFFFFF 50%, transparent 60%)`,
          filter: 'blur(100px)'
        }}
      />

      {/* 3. Viñeta Moderna (Limpia, sin tonos sucios) */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `radial-gradient(circle at center, transparent 30%, rgba(229, 229, 231, 0.2) 100%)`
        }}
      />
    </div>
  );
}