"use client";

import { motion } from "framer-motion";
import { ArrowUp, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    // Si usas Lenis (Smooth Scroll), esto funcionará perfectamente
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const letters = "HABLEMOS".split("");

  return (
    <footer className="relative bg-carbon text-crema pt-32 pb-12 overflow-hidden">
      
      {/* 1. CURVATURA SUPERIOR (SVG Divider para look orgánico) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 rotate-180">
        <svg 
          className="-scale-x-100 relative block w-[calc(100%+1.3px)] h-80px" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          
        </svg>
      </div>

      <div className="container mx-auto px-6">
        
        {/* 2. BIG TYPE CTA (HABLEMOS) */}
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="group relative"
          >
            <a 
              href="mailto:concierge@estilodomus.com" 
              className="flex items-center justify-center overflow-hidden"
            >
              <div className="flex">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ y: -20, rotate: i % 2 === 0 ? 5 : -5 }}
                    className="inline-block text-[15vw] font-serif leading-none tracking-tighter transition-all duration-300 group-hover:text-oro"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <ArrowUpRight 
                className="w-[8vw] h-[8vw] text-oro opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-10 group-hover:translate-x-4" 
                strokeWidth={1}
              />
            </a>
          </motion.div>
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-crema/40 mt-8">
            Disponibilidad exclusiva para nuevos proyectos
          </p>
        </div>

        {/* 3. MIDDLE BAR: Enlaces y Dirección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t border-crema/10">
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-oro font-bold">Oficina Central</h4>
            <p className="font-serif text-lg opacity-70">Av. Principal de Las Mercedes,<br />Caracas 1060, Venezuela.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-oro font-bold">Conectar</h4>
            <div className="flex gap-6">
              <Magnetic strength={0.2}>
                <Link href="#" className="hover:text-oro transition-colors">Instagram</Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link href="#" className="hover:text-oro transition-colors">LinkedIn</Link>
              </Magnetic>
            </div>
          </div>

          <div className="text-right flex flex-col items-end justify-between">
            <Magnetic strength={0.4}>
              <button 
                onClick={scrollToTop}
                className="w-16 h-16 rounded-full border border-crema/20 flex items-center justify-center group hover:bg-crema hover:text-carbon transition-all duration-500"
              >
                <ArrowUp className="group-hover:-translate-y-1 transition-transform" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* 4. BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-crema/5 opacity-40">
          <div className="font-sans text-[10px] tracking-widest uppercase mb-4 md:mb-0">
            © {currentYear} EstiloDomus — Propiedades Inmobiliarias de Lujo
          </div>
          <div className="font-sans text-[10px] tracking-widest uppercase flex gap-8">
            <span>Caracas, VE • {new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: false })} VET</span>
            <Link href="/privacy" className="hover:text-crema transition-colors">Aviso Legal</Link>
          </div>
        </div>

      </div>

      {/* Marca de Agua Editorial */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.02]">
        <span className="text-[25vw] font-serif italic text-crema leading-none">
          Domus
        </span>
      </div>
    </footer>
  );
}