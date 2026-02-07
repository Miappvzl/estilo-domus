"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Shield, Globe, Gem, Briefcase } from "lucide-react";
import p1 from "@assets/images/p1.webp";
import p2 from "@assets/images/p2.webp";
import p3 from "@assets/images/p3.webp";
import p4 from "@assets/images/p4.webp";

const SERVICES = [
  { id: "01", title: "Global Citizenship", tag: "RESIDENCIA", desc: "Gestión de Golden Visa y estructuras fiscales internacionales.", img: p1 },
  { id: "02", title: "Asset Management", tag: "INVERSIÓN", desc: "Maximización de ROI y mantenimiento preventivo de activos.", img: p2 },
  { id: "03", title: "Art Curating", tag: "PATRIMONIO", desc: "Adquisición estratégica de obras de arte para su colección.", img: p3 },
  { id: "04", title: "Private Concierge", tag: "LIFESTYLE", desc: "Relocation, jets privados y acceso a clubes exclusivos.", img: p4 },
];

export default function BespokeServices() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-32 md:py-64 px-6 overflow-hidden">
      <div className="container mx-auto mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-carbon/5 pb-12">
          <div className="space-y-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.6em] text-oro font-bold">Protocolos Elite</span>
            <h2 className="font-serif text-6xl md:text-9xl text-carbon leading-[0.8] tracking-tighter uppercase">
              Bespoke <br /> <span className="italic font-light text-oro">Concierge</span>
            </h2>
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-carbon/40 max-w-70 leading-relaxed italic">
            Servicios diseñados para la gestión impecable de su tiempo y patrimonio.
          </p>
        </div>
      </div>

      {/* DESKTOP: GLASS SHUTTERS */}
      <div className="hidden lg:flex w-full h-[70vh] gap-4 container mx-auto">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`relative h-full overflow-hidden rounded-xs transition-all duration-700 border border-carbon/5 ${
              hovered === i ? "flex-4" : "flex-1"
            }`}
          >
            <Image src={s.img} alt={s.title} fill className={`object-cover grayscale brightness-50 ${hovered === i ? "grayscale-0 brightness-75" : ""}`} />
            
            
            <div className={`absolute inset-0 transition-opacity duration-700 ${hovered === i ? "bg-carbon/40" : "bg-carbon/20"} `} />

            <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="font-serif italic text-oro text-4xl">{s.id}</span>
                <motion.div animate={{ opacity: hovered === i ? 1 : 0 }} className="w-12 h-12 rounded-full border border-oro/30 flex items-center justify-center  bg-oro/5">
                  <ArrowUpRight className="text-oro" size={20} />
                </motion.div>
              </div>

              <div className="space-y-6">
                <h3 className={`font-serif text-crema leading-none transition-all duration-700 ${hovered === i ? "text-6xl" : "text-2xl -rotate-90 origin-left translate-x-4 -translate-y-20"}`}>
                  {s.title}
                </h3>
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 max-w-sm shadow-2xl">
                      <p className="font-sans text-xs text-crema/70 uppercase tracking-widest leading-relaxed">{s.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE: SCROLL-DRIVEN GLASS DOSSIER */}
      <div className="lg:hidden flex flex-col gap-12">
        {SERVICES.map((s) => (
          <div key={s.id} className="relative aspect-4/5 w-full rounded-sm overflow-hidden group border border-carbon/5 shadow-xl">
            <Image src={s.img} alt={s.title} fill className="object-cover brightness-50" />
            <div className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="p-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl">
                 <span className="text-oro font-serif italic text-xl mb-2 block">{s.id}</span>
                 <h3 className="text-crema font-serif text-3xl mb-4 uppercase tracking-tighter">{s.title}</h3>
                 <p className="text-crema/60 font-sans text-[10px] uppercase tracking-widest leading-relaxed mb-6">{s.desc}</p>
                 <button className="w-full py-4 border border-oro/20 text-oro text-[10px] uppercase font-bold tracking-[0.3em]">
                   Solicitar Privacidad
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}