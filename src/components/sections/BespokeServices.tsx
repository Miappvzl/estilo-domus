"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import p1 from "@assets/images/p1.webp";
import p2 from "@assets/images/p2.webp";
import p3 from "@assets/images/p3.webp";
import p4 from "@assets/images/p4.webp";

const SERVICES = [
  { id: "01", roman: "I", title: "Global Citizenship", tag: "RESIDENCIA & ESTRUCTURA", description: "Gestión integral de Golden Visa y estructuras fiscales internacionales.", image: p1 },
  { id: "02", roman: "II", title: "Asset Management", tag: "INVERSIÓN ESTRATÉGICA", description: "Maximización de ROI mediante análisis predictivo y mantenimiento premium.", image: p2 },
  { id: "03", roman: "III", title: "Art & Curating", tag: "PATRIMONIO CULTURAL", description: "Interiorismo y adquisición estratégica de obras de arte de alto valor.", image: p3 },
  { id: "04", roman: "IV", title: "Private Concierge", tag: "LIFESTYLE MANAGEMENT", description: "Relocation, aviación privada y acceso preferencial a clubes exclusivos.", image: p4 },
];

export default function BespokeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-transparent py-32 md:py-64 overflow-hidden">
      <div className="container mx-auto px-6 mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-oro" />
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-sans text-[10px] uppercase tracking-[0.6em] text-bronze font-bold">Exclusividad 360°</motion.span>
          </div>
          <h2 className="font-serif text-7xl md:text-9xl text-carbon leading-[0.8] tracking-tighter">Bespoke <br /> <span className="italic font-light">Services</span></h2>
        </div>
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-carbon/40 max-w-70 leading-relaxed border-l border-carbon/10 pl-8 italic">
          Hospitalidad de siete estrellas para el individuo global.
        </p>
      </div>

      <div className="hidden lg:flex w-full h-[80vh] border-y border-carbon/10 bg-transparent overflow-hidden">
        {SERVICES.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div key={service.id} layout transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className={`relative h-full border-r border-carbon/10 flex flex-col justify-end p-16 overflow-hidden cursor-none group ${isHovered ? "flex-4" : "flex-1"}`}>
              <motion.div layout className="absolute inset-0 z-0">
                <Image src={service.image} alt={service.title} fill sizes="(max-width: 1200px) 25vw, 40vw" className={`object-cover transition-all duration-1000 ease-out ${isHovered ? "scale-105 grayscale-0 brightness-[0.5]" : "scale-125 grayscale brightness-[0.2]"}`} />
                <div className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/20 to-transparent opacity-90" />
              </motion.div>
              <div className="relative z-10 w-full space-y-8">
                <div className="flex items-center justify-between">
                  <span className={`font-serif italic text-4xl transition-colors duration-700 ${isHovered ? "text-oro" : "text-crema/20"}`}>{service.roman}</span>
                  <motion.div animate={{ scale: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0 }} className="w-14 h-14 rounded-full border border-oro/30 flex items-center justify-center bg-oro/5"><ArrowUpRight className="text-oro" size={24} /></motion.div>
                </div>
                <div className="space-y-3">
                  <span className={`font-sans text-[9px] uppercase tracking-[0.5em] block transition-all duration-700 ${isHovered ? "text-oro opacity-100 translate-y-0" : "text-crema/0 opacity-0 translate-y-4"}`}>{service.tag}</span>
                  <h3 className={`font-serif text-crema leading-none transition-all duration-1000 ${isHovered ? "text-7xl" : "text-3xl -rotate-90 origin-left -translate-y-40 translate-x-6 whitespace-nowrap opacity-40"}`}>{service.title}</h3>
                </div>
                <AnimatePresence>
                  {isHovered && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.6 }} className="space-y-6">
                      <p className="font-sans text-sm text-crema/60 max-w-md leading-relaxed tracking-wide">{service.description}</p>
                      <div className="flex items-center gap-4 group/btn cursor-pointer">
                        <div className="h-px w-16 bg-oro transition-all duration-500 group-hover/btn:w-24" />
                        <span className="text-[10px] text-oro tracking-[0.4em] uppercase font-bold">Solicitar Privacidad</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="lg:hidden flex flex-col px-6 space-y-[70vh] pb-[50vh]">
        {SERVICES.map((service, index) => <MobileCard key={service.id} service={service} index={index} />)}
      </div>
    </section>
  );
}

function MobileCard({ service, index }: { service: any; index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const tint = useTransform(scrollYProgress, [0, 1], [0, 0.6]);
  const springScale = useSpring(scale, { stiffness: 40, damping: 25, mass: 1.5 });

  return (
    <div ref={cardRef} className="h-145 flex flex-col sticky top-[15vh]">
      <motion.div style={{ scale: springScale, opacity }} className="will-change-transform transform-gpu relative w-full h-full bg-carbon rounded-sm overflow-hidden shadow-2xl flex flex-col border border-crema/5">
        <motion.div style={{ opacity: tint }} className="absolute inset-0 bg-black z-20 pointer-events-none" />
        <div className="relative h-[45%] w-full overflow-hidden">
          <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 95vw, 50vw" className="object-cover brightness-75 scale-110" priority={false} />
          <div className="absolute inset-0 bg-linear-to-t from-carbon to-transparent opacity-80" />
          <span className="absolute top-8 left-8 font-serif italic text-oro text-3xl z-30">{service.roman}</span>
        </div>
        <div className="p-10 flex flex-col justify-between flex-1 relative bg-carbon z-10">
          <div className="space-y-8">
            <span className="font-sans text-[9px] uppercase tracking-[0.5em] text-oro/70 font-bold">{service.tag}</span>
            <h3 className="font-serif text-5xl text-crema leading-[0.9] tracking-tighter italic">{service.title.split(' ')[0]} <br /> <span className="not-italic font-light">{service.title.split(' ')[1] || ""}</span></h3>
            <p className="font-sans text-xs text-crema/40 leading-relaxed tracking-widest">{service.description}</p>
          </div>
          <button className="flex items-center justify-between w-full pt-8 border-t border-crema/10 active:scale-95 transition-transform">
            <div className="flex flex-col items-start"><span className="font-sans text-[10px] uppercase tracking-[0.4em] text-oro font-bold italic">Concierge VIP</span></div>
            <div className="w-14 h-14 rounded-full border border-oro/20 flex items-center justify-center bg-oro/5"><ArrowUpRight size={24} className="text-oro" /></div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}