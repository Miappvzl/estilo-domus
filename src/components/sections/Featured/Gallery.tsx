"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";

const PROPERTIES = [
  { id: "01", title: "Vivienda Atemporal", location: "Costa Brava, España", price: "4.200.000 €", image: "https://images.unsplash.com/photo-1758448756084-c44d73014c07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE1vZGVybiUyMGxpdmluZyUyMHJvb20lMjB3b29kJTIwZmxvb3J8ZW58MHx8MHx8fDA%3D" },
  { id: "02", title: "Residencia L'Aube", location: "Provence, Francia", price: "3.850.000 €", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" },
  { id: "03", title: "Penthouse Horizon", location: "Madrid, España", price: "5.100.000 €", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070" },
  { id: "04", title: "Villa Obsidiana", location: "Sintra, Portugal", price: "6.400.000 €", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070" },
];

export default function Gallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-70%"]);

  return (
    <section className="bg-transparent">
      {/* --- DESKTOP VIEW (Horizontal Scroll) --- */}
      <div ref={targetRef} className="relative hidden lg:block h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-[5vw] will-change-transform">
            {PROPERTIES.map((prop) => (
              <DesktopCard key={prop.id} prop={prop} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- MOBILE VIEW (Immersive Vertical Carousel) --- */}
      <div className="lg:hidden relative flex flex-col px-6 gap-24 py-12">
        {PROPERTIES.map((prop, index) => (
          <MobileCard key={prop.id} prop={prop} index={index + 1} total={PROPERTIES.length} />
        ))}
      </div>
    </section>
  );
}

/**
 * MOBILE CARD COMPONENT: Scroll-Driven Physics
 */
function MobileCard({ prop, index, total }: { prop: any; index: number; total: number }) {
  const cardRef = useRef(null);
  
  // 1. Detección de Scroll local para la tarjeta
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Offset: empieza a contar cuando el top de la card entra por el bottom del screen, 
    // y termina cuando el bottom de la card sale por el top.
    offset: ["start end", "center center", "end start"]
  });

  // 2. Transformaciones de Enfoque (Escala y Opacidad)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  
  // 3. Parallax interno de la imagen (ventana)
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // 4. Suavizado de movimiento
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: springScale, opacity }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full space-y-6"
    >
      {/* Image Container with Parallax */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-carbon/5">
        <motion.div style={{ y: yImage }} className="absolute -inset-y-12 w-full h-[120%]">
          <Image
            src={prop.image}
            alt={prop.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        
        {/* Contador flotante (Awwwards Touch) */}
        <div className="absolute top-4 right-4 bg-crema/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="font-sans text-[10px] tracking-widest text-carbon font-bold">
            0{index} / 0{total}
          </span>
        </div>
      </div>

      {/* Property Info */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <h3 className="font-serif text-3xl text-carbon leading-none">{prop.title}</h3>
          <span className="font-sans text-xs italic text-bronze">{prop.price}</span>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-carbon/40 font-bold">
          {prop.location}
        </p>
      </div>

      <div className="h-[1px] w-full bg-carbon/10" />
    </motion.div>
  );
}

/**
 * DESKTOP CARD COMPONENT (Keep original logic)
 */
function DesktopCard({ prop }: { prop: any }) {
  return (
    <motion.div className="relative shrink-0 w-[600px] group cursor-none">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs">
        <Image
          src={prop.image}
          alt={prop.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="600px"
        />
        <div className="absolute inset-0 bg-carbon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      <div className="mt-8 flex justify-between items-start">
        <div>
          <h3 className="font-serif text-4xl text-carbon mb-2">{prop.title}</h3>
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-carbon/40 font-bold italic">
            {prop.location}
          </p>
        </div>
        <span className="font-sans text-lg text-bronze italic">{prop.price}</span>
      </div>
    </motion.div>
  );
}