"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const MANIFESTO = [
  { id: "I", text: "Creemos que la arquitectura es la forma más pura de capturar el tiempo. No construimos espacios, sino refugios para el legado." },
  { id: "II", text: "Nuestra selección es una oda a la honestidad material. Piedra volcánica, maderas centenarias y luz natural que esculpe cada rincón." },
  { id: "III", text: "La verdadera exclusividad es la paz. Es la capacidad de desconectar del ruido para conectar con la esencia de uno mismo." },
];

export default function Philosophy() {
  return (
    <section className="relative bg-transparent py-32 md:py-64 px-6 lg:px-0 overflow-hidden gpu-layer">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* COLUMNA IZQUIERDA: Optimizada con transform-gpu */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 transform-gpu">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-bronze block">Nuestra Esencia</span>
                <h2 className="font-serif text-5xl md:text-7xl text-carbon leading-[0.9] tracking-tighter">
                  El Arte de Vivir <br />
                  <span className="italic">Sin Prisa</span>
                </h2>
                <div className="h-[1px] w-20 bg-carbon/20" />
              </motion.div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Renderizado Pasivo */}
          <div className="lg:col-span-7 space-y-48 md:space-y-80">
            <ManifestoItem text={MANIFESTO[0].text} />

            <div className="space-y-48 md:space-y-64">
              <ManifestoItem text={MANIFESTO[1].text} />
              
              <div className="relative w-full aspect-[3/4] md:w-4/5 ml-auto overflow-hidden rounded-xs transform-gpu">
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                  alt="Interiorismo EstiloDomus"
                />
              </div>
            </div>

            <ManifestoItem text={MANIFESTO[2].text} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoItem({ text }: { text: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center", "end start"],
  });

  // Animaciones puras de Transformación (Baratas para la GPU)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  
  // Usamos configuraciones de Spring más "ligeras" (menos ciclos de cálculo)
  const springOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });
  const springY = useSpring(y, { damping: 30, stiffness: 100 });

  return (
    <motion.div
      ref={container}
      style={{ opacity: springOpacity, y: springY }}
      className="will-change-transform transform-gpu"
    >
      <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-carbon leading-snug md:leading-tight">
        {text}
      </p>
    </motion.div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // El Parallax es la operación más costosa. Limitamos el rango de movimiento.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden transform-gpu">
      <motion.div 
        style={{ y: smoothY }} 
        className="absolute -inset-y-10 w-full h-[120%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}