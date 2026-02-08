"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ArtisticImage from "@/components/ui/ArtisticImage";
import g1 from "@/assets/images/services/g1.webp";
import g2 from "@/assets/images/services/g2.webp";
import g3 from "@/assets/images/services/g3.webp";
import g4 from "@/assets/images/services/g4.webp";
import g5 from "@/assets/images/services/g5.webp";
import g6 from "@/assets/images/services/g6.webp";


const ART_GALLERY = [
  { id: "", title: "Luz Cenital", note: "Acabados en Alabastro", speed: 0.1, size: "large", img: g3, coord: "" },
  { id: "", title: "Veta Imperial", note: "Mármol Negro Marquina", speed: 0.25, size: "small", img: g6, coord: "" },
  { id: "", title: "Piedra Volcánica Pulida", note: "Borde de Piedra Volcánica", speed: 0.15, size: "medium", img: g1, coord: "" },
  { id: "", title: "Concreto Obra Limpia", note: "Concreto de Autor", speed: 0.2, size: "large", img: g2, coord: "" },
  { id: "", title: "Seda Solar", note: "Lino de Edición Limitada", speed: 0.1, size: "medium", img: g5, coord: "" },
  { id: "", title: "Vértice de Luz", note: "Corte Geométrico 90°", speed: 0.3, size: "small", img: g4, coord: "" },
];

export default function LivingCanvas() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative py-32 md:py-64 px-6 overflow-visible bg-transparent">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Cinético */}
        <div className="flex flex-col items-center text-center mb-32 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-sans text-[10px] uppercase tracking-[0.5em] text-oro font-bold"
          >
            Materia & Atmosfera
          </motion.span>
          <h2 className="font-serif text-5xl md:text-8xl text-carbon uppercase tracking-tighter leading-none">
            Espacios <br /> <span className="italic font-light">Vivos</span>
          </h2>
        </div>

        {/* Galería: Adaptativa y con Offsets para Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
          
          {/* Columna 1: Mobile Center */}
          <div className="flex flex-col gap-24 md:gap-32">
            <ArtisticImage item={ART_GALLERY[0]} index={0} />
            <ArtisticImage item={ART_GALLERY[1]} index={1} />
          </div>

          {/* Columna 2: Mobile Offset Down */}
          <div className="flex flex-col gap-24 md:gap-32 md:pt-48">
            <ArtisticImage item={ART_GALLERY[2]} index={2} />
            <ArtisticImage item={ART_GALLERY[3]} index={3} />
          </div>

          {/* Columna 3: Mobile Offset Up */}
          <div className="flex flex-col gap-24 md:gap-32 lg:pt-24">
            <ArtisticImage item={ART_GALLERY[4]} index={4} />
            <ArtisticImage item={ART_GALLERY[5]} index={5} />
          </div>

        </div>
      </div>
    </section>
  );
}