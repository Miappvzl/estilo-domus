"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const INSIGHTS = [
  { id: "01", category: "MARKET ALPHA", title: "MÁRMOL DE CARRARA: EL REFUGIO DE VALOR", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" },
  { id: "02", category: "ARCHITECTURE", title: "BRUTALISMO: LA ESTÉTICA DEL PODER", image: "https://images.unsplash.com/photo-1446771326090-d910bfaf00f6?w=1200" },
  { id: "03", category: "INVESTMENT", title: "OFF-MARKET: PROTOCOLO DE INVISIBILIDAD", image: "https://images.unsplash.com/photo-1717715308932-2ba727611550?w=1200" },
  { id: "04", category: "LEGACY", title: "PATRIMONIO LÍQUIDO EN EL EJE DE CARACAS", image: "https://images.unsplash.com/photo-1543893794-d5badd72f7c2?w=1200" },
];

export default function LegacyIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Aumentamos a 800vh: 200vh de "pista" por noticia para máxima legibilidad
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Física de inercia pesada: stiffness bajo y mass alto para que el scroll sea "majestuoso"
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 30, 
    damping: 20, 
    mass: 1.2 
  });

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* GUI DE ESCÁNER (Detalle Visual Elite) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-1/2 left-0 w-full h-px bg-oro/20" />
          <div className="absolute top-[45%] left-12 h-[10%] w-px bg-oro/40" />
          <div className="absolute top-[45%] right-12 h-[10%] w-px bg-oro/40" />
        </div>

        {/* CONTENEDOR DE PORTALES */}
        <div className="relative w-full h-full">
          {INSIGHTS.map((item, index) => (
            <InsightPortal 
              key={item.id} 
              item={item} 
              index={index} 
              total={INSIGHTS.length} 
              progress={smoothProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}


function InsightPortal({ item, index, total, progress }: any) {
  // Rango mucho más amplio para que la noticia se quede quieta más tiempo
  const start = index / total;
  const end = (index + 1) / total;
  
  // Meseta de lectura extendida (de 0.3 a 0.7 del rango de la noticia)
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, (start + end) / 2, end], [0.9, 1, 0.9]);
  
  // Simplificamos el movimiento horizontal para que no maree
  const xTranslate = useTransform(progress, [start, end], ["5%", "-5%"]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center">
      {/* IMAGEN: Usamos opacidad en lugar de clip-path en móviles si el lag persiste */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill 
          className="object-cover brightness-[0.3] scale-105 transform-gpu" // transform-gpu es vital
          sizes="100vw"
          priority={index === 0} 
        />
      </motion.div>

      <motion.div style={{ x: xTranslate, scale }} className="relative z-10 w-full px-6 text-center">
        <h3 className="font-serif text-crema leading-[0.9] tracking-tighter uppercase text-4xl sm:text-7xl lg:text-9xl max-w-[90vw] mx-auto">
          {item.title}
        </h3>
        {/* Eliminamos elementos decorativos pequeños en móvil para limpiar el renderizado */}
      </motion.div>
    </motion.div>
  );
}