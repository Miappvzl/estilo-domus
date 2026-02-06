"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Image from "next/image";

const MANIFESTO = [
  {
    id: "01",
    roman: "I",
    tag: "TEMPORALIDAD",
    text: "Creemos que la arquitectura es la forma más pura de capturar el tiempo. No construimos espacios, sino refugios para el legado.",
  },
  {
    id: "02",
    roman: "II",
    tag: "HONESTIDAD",
    text: "Nuestra selección es una oda a la honestidad material. Piedra volcánica, maderas centenarias y luz natural que esculpe cada rincón.",
  },
  {
    id: "03",
    roman: "III",
    tag: "ESENCIA",
    text: "La verdadera exclusividad es la paz. Es la capacidad de desconectar del ruido para conectar con la esencia de uno mismo.",
  },
];

export default function Philosophy() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent py-32 md:py-64 px-6 lg:px-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40 space-y-12">
              <div className="flex items-center gap-6">
                <div className="h-15 w-px bg-carbon/10 relative overflow-hidden">
                  <motion.div
                    style={{ scaleY, originY: 0 }}
                    className="absolute inset-0 bg-oro w-full shadow-[0_0_10px_#C5B358]"
                  />
                </div>
                <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-carbon/40 leading-relaxed">
                  EstiloDomus <br />{" "}
                  <span className="text-oro font-bold">Manifesto 2026</span>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <h2 className="font-serif text-7xl md:text-8xl lg:text-9xl text-carbon leading-[0.8] tracking-tighter">
                  El Arte de <br />{" "}
                  <span className="italic font-light">Vivir</span> <br />{" "}
                  <span className="italic text-oro pl-12 md:pl-20">
                    Sin Prisa
                  </span>
                </h2>
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-carbon/50 max-w-xs leading-relaxed border-l border-oro/20 pl-6">
                  Una curaduría de principios que rigen cada propiedad en
                  nuestra colección privada.
                </p>
              </motion.div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-48 md:space-y-96">
            <ManifestoItem data={MANIFESTO[0]} />
            <div className="space-y-48 md:space-y-64">
              <ManifestoItem data={MANIFESTO[1]} />
              <div className="relative w-full aspect-4/5 md:w-100% md:-ml-[3%] overflow-hidden transform-gpu shadow-2xl rounded-sm">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
                  alt="Interiorismo EstiloDomus"
                />
                <div className="absolute bottom-8 left-9 text-crema z-10 font-sans text-[9px] uppercase tracking-[0.4em] opacity-80 backdrop-blur-sm bg-black/10 px-4 py-2 border border-white/10">
                  Residencia Alabastro • Caracas, VE
                </div>
              </div>
            </div>
            <ManifestoItem data={MANIFESTO[2]} />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-24 border-t border-carbon/10 flex justify-between items-end grayscale hover:grayscale-0 transition-all duration-1000"
            >
              <div className="font-serif italic text-4xl text-carbon/20 tracking-tighter">
                Domus Essence
              </div>
              <div className="text-[9px] font-sans tracking-[0.3em] text-carbon/40 uppercase font-bold">
                © Caracas MMXXVI
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
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const springY = useSpring(y, { damping: 30, stiffness: 70 });

  return (
    <motion.div
      ref={container}
      style={{ opacity, y: springY }}
      className="relative pl-12 md:pl-24 will-change-transform transform-gpu"
    >
      <motion.span
        animate={{ opacity: isInView ? 0.3 : 0.05, x: isInView ? 0 : -20 }}
        className="absolute left-0 top-0 font-serif italic text-oro text-4xl md:text-6xl select-none"
      >
        {data.roman}
      </motion.span>
      <div className="space-y-8">
        <motion.span
          animate={{
            letterSpacing: isInView ? "0.6em" : "0.3em",
            color: isInView ? "#A67C52" : "#1A1A1A",
          }}
          className="font-sans text-[10px] uppercase text-carbon block transition-all duration-1000"
        >
          {data.tag}
        </motion.span>
        <p className="font-serif text-4xl md:text-6xl lg:text-7xl text-carbon leading-[1.05] tracking-tight max-w-2xl">
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
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const smoothY = useSpring(y, { stiffness: 30, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 30, damping: 20 });

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden transform-gpu"
    >
      <motion.div
        style={{ y: smoothY, scale: smoothScale }}
        className="absolute -inset-y-32 w-full h-[160%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-oro/5 mix-blend-overlay" />
      </motion.div>
    </div>
  );
}
