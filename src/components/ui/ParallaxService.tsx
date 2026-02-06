'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxServiceProps {
  image: string;
  alt: string;
}

export default function ParallaxService({ image, alt }: ParallaxServiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Movement: Desplazamiento sutil de -10% a 10% para evitar cortes visuales
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[60dvh] md:h-full min-h-[500px] overflow-hidden rounded-sm"
    >
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
        />
        {/* Overlay sutil para textura */}
        <div className="absolute inset-0 bg-carbon/5 mix-blend-multiply" />
      </motion.div>
      
      {/* Decorative Border (Old Money Detail) */}
      <div className="absolute inset-4 border border-crema/20 pointer-events-none" />
    </div>
  );
}