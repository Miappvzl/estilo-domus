"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";

const MANIFESTO = [
  { 
    id: "01", 
    roman: "I",
    tag: "TEMPORALIDAD",
    text: "Creemos que la arquitectura es la forma más pura de capturar el tiempo. No construimos espacios, sino refugios para el legado." 
  },
  { 
    id: "02", 
    roman: "II",
    tag: "HONESTIDAD",
    text: "Nuestra selección es una oda a la honestidad material. Piedra volcánica, maderas centenarias y luz natural que esculpe cada rincón." 
  },
  { 
    id: "03", 
    roman: "III",
    tag: "ESENCIA",
    text: "La verdadera exclusividad es la paz. Es la capacidad de desconectar del ruido para conectar con la esencia de uno mismo." 
  },
];

export default function Philosophy() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Línea de progreso lateral que crece con el scroll
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="relative bg-transparent py-32 md:py-64 px-6 lg:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* COLUMNA IZQUIERDA: Sticky Editorial */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40 space-y-12">
              
              {/* Progress Tracker */}
              <div className="flex items-center gap-6">
                <div className="h-[60px] w-[1px] bg-carbon/10 relative overflow-hidden">
                  <motion.div 
                    style={{ scaleY, originY: 0 }}
                    className="absolute inset-0 bg-oro w-full"
                  />
                </div>
                <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-carbon/40">
                  EstiloDomus <br /> <span className="text-oro">Manifesto 2026</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h2 className="font-serif text-6xl md:text-8xl text-carbon leading-[0.85] tracking-tighter">
                  El Arte de <br />
                  <span className="italic font-light">Vivir</span> <br />
                  <span className="italic text-oro pl-12">Sin Prisa</span>
                </h2>
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-carbon/50 max-w-xs leading-relaxed">
                  Una curaduría de principios que rigen cada propiedad en nuestra colección privada.
                </p>
              </motion.div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Contenido con Revelación Cinética */}
          <div className="lg:col-span-7 space-y-48 md:space-y-96">
            
            <ManifestoItem data={MANIFESTO[0]} />

            <div className="space-y-48 md:space-y-64">
              <ManifestoItem data={MANIFESTO[1]} />
              
              {/* Marco de Imagen de Prestigio */}
              <div className="relative w-full aspect-[4/5] md:w-[110%] md:-ml-[10%] overflow-hidden transform-gpu shadow-2xl">
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                  alt="Interiorismo EstiloDomus"
                />
                {/* Caption Editorial */}
                <div className="absolute bottom-8 left-8 text-crema z-10 font-sans text-[9px] uppercase tracking-[0.3em] opacity-60">
                  Residencia Alabastro • Caracas, VE
                </div>
              </div>
            </div>

            <ManifestoItem data={MANIFESTO[2]} />

            {/* Cierre de sección */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-24 border-t border-carbon/10 flex justify-between items-end"
            >
              <div className="font-serif italic text-3xl text-carbon/20 underline decoration-oro/20">
                Domus Essence
              </div>
              <div className="text-[10px] font-sans tracking-widest text-carbon/40 uppercase">
                © Todos los derechos reservados
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoItem({ data }: { data: any }) {
  const container = useRef(null);
  const isInView = useInView(container, { margin: "-20% 0px -20% 0px" });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const springY = useSpring(y, { damping: 25, stiffness: 80 });

  return (
    <motion.div
      ref={container}
      style={{ opacity, y: springY }}
      className="relative pl-12 md:pl-20 will-change-transform"
    >
      {/* Floating Marker (Roman Numeral) */}
      <span className="absolute left-0 top-0 font-serif italic text-oro/40 text-2xl md:text-3xl">
        {data.roman}
      </span>

      <div className="space-y-6">
        <motion.span 
          animate={{ letterSpacing: isInView ? "0.6em" : "0.3em" }}
          className="font-sans text-[10px] uppercase text-bronze block transition-all duration-1000"
        >
          {data.tag}
        </motion.span>
        
        <p className="font-serif text-3xl md:text-5xl lg:text-7xl text-carbon leading-[1.1] tracking-tight">
          {data.text}
        </p>
      </div>
    </motion.div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax de posición + Ken Burns (zoom)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  
  const smoothY = useSpring(y, { stiffness: 40, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 40, damping: 20 });

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden transform-gpu">
      <motion.div 
        style={{ y: smoothY, scale: smoothScale }} 
        className="absolute -inset-y-20 w-full h-[140%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Filtro de Oro sutil sobre la imagen */}
        <div className="absolute inset-0 bg-oro/5 mix-blend-overlay" />
      </motion.div>
    </div>
  );
}