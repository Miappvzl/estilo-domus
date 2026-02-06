"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "Global Citizenship",
    description: "Gestión integral de Golden Visa y estructuras fiscales internacionales para su movilidad global.",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Asset Management",
    description: "Maximización de ROI y mantenimiento preventivo de activos mediante análisis predictivo.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Art & Curating",
    description: "Interiorismo y adquisición estratégica de obras de arte para elevar el valor de su patrimonio.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Private Concierge",
    description: "Relocation, aviación privada y acceso preferencial a los clubes más exclusivos del mundo.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function BespokeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const container = useRef(null);

  return (
    <section ref={container} className="relative w-full bg-transparent py-24 md:py-48">
      <div className="container mx-auto px-6 mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-sans text-[10px] uppercase tracking-[0.5em] text-bronze block mb-4"
        >
          Hospitalidad 7 Estrellas
        </motion.span>
        <h2 className="font-serif text-4xl md:text-7xl text-carbon leading-none tracking-tighter">
          Bespoke <br /> <span className="italic">Services</span>
        </h2>
      </div>

      {/* --- DESKTOP: THE CINEMATIC SHUTTER --- */}
      <div className="hidden lg:flex w-full h-[70vh] border-y border-carbon/10 bg-transparent">
        {SERVICES.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={service.id}
              layout
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative h-full border-r border-carbon/10 flex flex-col justify-end p-12 overflow-hidden transition-all duration-700 cursor-none group ${
                isHovered ? "flex-[3]" : "flex-1"
              }`}
            >
              <motion.div layout className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-all duration-1000 ${
                    isHovered ? "scale-110 grayscale-0 brightness-75" : "scale-100 grayscale brightness-50"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
              </motion.div>

              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans text-xs tracking-widest text-oro font-bold">{service.id}</span>
                  <ArrowUpRight className={`text-crema transition-all duration-500 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} />
                </div>
                <h3 className={`font-serif text-crema leading-none mb-6 transition-all duration-500 ${isHovered ? "text-5xl" : "text-2xl whitespace-nowrap"}`}>
                  {service.title}
                </h3>
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="font-sans text-sm text-crema/70 max-w-sm leading-relaxed"
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- MOBILE: STICKY CARD STACKING (REDISEÑADO) --- */}
      <div className="lg:hidden flex flex-col px-6 space-y-[30vh] pb-[20vh]">
        {SERVICES.map((service, index) => (
          <MobileCard 
            key={service.id} 
            service={service} 
            index={index} 
            total={SERVICES.length}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * COMPONENTE HIJO: MobileCard
 * Maneja el efecto Sticky y la transformación de escala/opacidad al ser solapada.
 */
function MobileCard({ service, index, total }: { service: any; index: number; total: number }) {
  const cardRef = useRef(null);
  
  // Trackeamos el progreso de esta tarjeta individualmente
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // A medida que la tarjeta sale del viewport (es tapada por la siguiente), se encoge
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <div ref={cardRef} className="h-[550px] flex flex-col items-center sticky top-[15vh]">
      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full h-full bg-carbon rounded-xl overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col border border-crema/10"
      >
        {/* Header de la tarjeta con Imagen */}
        <div className="relative h-2/5 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute top-6 left-6 bg-oro text-carbon text-[10px] font-bold px-3 py-1 rounded-full">
            {service.id}
          </div>
        </div>
        
        {/* Cuerpo de la tarjeta */}
        <div className="p-8 flex flex-col justify-between flex-1">
          <div className="space-y-4">
            <h3 className="font-serif text-4xl text-crema leading-none">
              {service.title.split(' ')[0]} <br />
              <span className="italic font-light">{service.title.split(' ')[1] || ""}</span>
            </h3>
            <p className="font-sans text-sm text-crema/50 leading-relaxed">
              {service.description}
            </p>
          </div>

          <button className="flex items-center justify-between w-full border-t border-crema/10 pt-6 group">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-oro font-bold">Solicitar Acceso</span>
            <div className="w-10 h-10 rounded-full border border-oro/20 flex items-center justify-center group-active:bg-oro group-active:text-carbon transition-colors">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}