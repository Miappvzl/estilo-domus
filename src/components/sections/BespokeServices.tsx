"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Zap, Globe, Compass } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    roman: "I",
    title: "Global Citizenship",
    tag: "RESIDENCIA & ESTRUCTURA",
    description: "Gestión integral de Golden Visa y estructuras fiscales internacionales para su movilidad global.",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000",
  },
  {
    id: "02",
    roman: "II",
    title: "Asset Management",
    tag: "INVERSIÓN ESTRATÉGICA",
    description: "Maximización de ROI y mantenimiento preventivo de activos mediante análisis predictivo.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
  },
  {
    id: "03",
    roman: "III",
    title: "Art & Curating",
    tag: "PATRIMONIO CULTURAL",
    description: "Interiorismo y adquisición estratégica de obras de arte para elevar el valor de su patrimonio.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000",
  },
  {
    id: "04",
    roman: "IV",
    title: "Private Concierge",
    tag: "LIFESTYLE MANAGEMENT",
    description: "Relocation, aviación privada y acceso preferencial a los clubes más exclusivos del mundo.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000",
  },
];

const SPRING_CONFIG = { stiffness: 150, damping: 25, mass: 0.8 };

export default function BespokeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-transparent py-32 md:py-64 overflow-hidden">
      <div className="container mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-oro" />
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-sans text-[10px] uppercase tracking-[0.5em] text-bronze"
            >
              Exclusividad 360°
            </motion.span>
          </div>
          <h2 className="font-serif text-6xl md:text-8xl text-carbon leading-[0.85] tracking-tighter">
            Bespoke <br /> <span className="italic font-light">Services</span>
          </h2>
        </div>
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-carbon/40 max-w-[280px] leading-relaxed border-l border-carbon/10 pl-8">
          Hospitalidad de siete estrellas diseñada para el individuo global que no acepta compromisos.
        </p>
      </div>

      {/* --- DESKTOP: THE SHUTTER REVEAL --- */}
      <div className="hidden lg:flex w-full h-[75vh] border-y border-carbon/10 bg-transparent overflow-hidden">
        {SERVICES.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={service.id}
              layout
              transition={SPRING_CONFIG}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative h-full border-r border-carbon/10 flex flex-col justify-end p-12 overflow-hidden cursor-none group ${
                isHovered ? "flex-[3.5]" : "flex-1"
              }`}
            >
              <motion.div layout className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-all duration-1000 ease-[0.76, 0, 0.24, 1] ${
                    isHovered ? "scale-105 grayscale-0 brightness-[0.6]" : "scale-110 grayscale brightness-[0.3]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/10 to-transparent opacity-80" />
              </motion.div>

              <div className="relative z-10 w-full space-y-6">
                <div className="flex items-center justify-between">
                  <span className={`font-serif italic text-3xl transition-colors duration-500 ${isHovered ? "text-oro" : "text-crema/20"}`}>
                    {service.roman}
                  </span>
                  <div className={`w-10 h-10 rounded-full border border-crema/20 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                    <ArrowUpRight className="text-oro" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className={`font-sans text-[9px] uppercase tracking-[0.4em] block transition-all duration-500 ${isHovered ? "text-oro opacity-100" : "text-crema/40 opacity-0"}`}>
                    {service.tag}
                  </span>
                  <h3 className={`font-serif text-crema leading-none transition-all duration-700 ${isHovered ? "text-6xl" : "text-2xl -rotate-90 origin-left translate-x-4 translate-y-[-100px]"}`}>
                    {service.title}
                  </h3>
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                      exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      className="space-y-6"
                    >
                      <p className="font-sans text-xs text-crema/60 max-w-sm leading-relaxed tracking-wide">
                        {service.description}
                      </p>
                      <div className="flex gap-4">
                        <div className="h-[1px] w-12 bg-oro self-center" />
                        <span className="text-[9px] text-oro tracking-[0.3em] uppercase font-bold">Solicitar Dossier</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- MOBILE: THE VAULT STACK --- */}
      <div className="lg:hidden flex flex-col px-6 space-y-[40vh] pb-[30vh]">
        {SERVICES.map((service, index) => (
          <MobileCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

function MobileCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Animaciones de profundidad (Wallet Stacking)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const springScale = useSpring(scale, { stiffness: 80, damping: 20 });

  return (
    <div ref={cardRef} className="h-[600px] flex flex-col sticky top-[12vh]">
      <motion.div 
        style={{ scale: springScale, opacity, filter: `blur(${blur}px)` }}
        className="will-change-transform transform-gpu relative w-full h-full bg-carbon rounded-sm overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.6)] flex flex-col border border-crema/5"
      >
        <div className="relative h-[45%] w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover brightness-75 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon to-transparent opacity-60" />
          <span className="absolute top-8 left-8 font-serif italic text-oro text-2xl">{service.roman}</span>
        </div>
        
        <div className="p-10 flex flex-col justify-between flex-1 relative bg-carbon">
          <div className="space-y-6">
            <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-oro/60">{service.tag}</span>
            <h3 className="font-serif text-4xl text-crema leading-[0.9] tracking-tighter italic">
              {service.title.split(' ')[0]} <br />
              <span className="not-italic font-light">{service.title.split(' ')[1] || ""}</span>
            </h3>
            <p className="font-sans text-xs text-crema/40 leading-relaxed tracking-wide">
              {service.description}
            </p>
          </div>

          <button className="flex items-center justify-between w-full pt-8 border-t border-crema/10 group">
            <div className="flex flex-col items-start">
              <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-crema/30">Consultoría Privada</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-oro font-bold">Contactar Concierge</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-oro/20 flex items-center justify-center bg-oro/5">
              <ArrowUpRight size={20} className="text-oro" />
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}