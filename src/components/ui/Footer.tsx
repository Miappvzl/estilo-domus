"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";
import ContactPortal from "./ContactPortal";

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const letters = "HABLEMOS".split("");

  return (
    <footer className="relative bg-carbon text-crema pt-32 pb-12 overflow-hidden">
      
      {/* 1. CURVATURA SUPERIOR (Separador de Estilo) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 rotate-180">
        <svg 
          className="relative block w-[calc(100%+1.3px)] h-[80px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#F9F9F7" // Debe coincidir con el fondo de la sección anterior
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6">
        
        {/* 2. BIG TYPE CTA - DISPARADOR DEL PORTAL */}
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer"
            onClick={() => setIsContactOpen(true)}
          >
            <div className="flex items-center justify-center overflow-hidden px-4">
              <div className="flex">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ y: -20, rotate: i % 2 === 0 ? 5 : -5 }}
                    className="inline-block text-[15vw] font-serif leading-none tracking-tighter transition-all duration-300 group-hover:text-oro select-none"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <ArrowUpRight 
                className="w-[8vw] h-[8vw] text-oro opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-10 group-hover:translate-x-4 shrink-0" 
                strokeWidth={1}
              />
            </div>
            
            {/* Indicador visual de clic */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-px bg-oro group-hover:w-full transition-all duration-1000" />
          </motion.div>
          
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-crema/40 mt-12 animate-pulse">
            Haga clic para iniciar un nuevo legado
          </p>
        </div>

        {/* 3. MIDDLE BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 py-24 border-t border-crema/10">
          <div className="space-y-6">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] text-oro font-bold">Residencias Oficiales</h4>
            <p className="font-serif text-xl opacity-80 leading-relaxed max-w-250px">
              Av. Principal de Las Mercedes,<br />Edificio Domus, Caracas.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start gap-8">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] text-oro font-bold">Digital Presence</h4>
            <div className="flex gap-10">
              <Magnetic strength={0.2}>
                <Link href="https://www.instagram.com/iamgabocode?igsh=MWV4c3ViMGE0aTF0OA==" className="text-sm font-serif italic hover:text-oro transition-colors">Instagram</Link>
              </Magnetic>
             
            </div>
          </div>

          <div className="text-right flex flex-col items-end justify-between">
            <Magnetic strength={0.4}>
              <button 
                onClick={scrollToTop}
                className="w-20 h-20 rounded-full border border-crema/10 flex items-center justify-center group hover:bg-crema hover:text-carbon transition-all duration-700 shadow-2xl"
              >
                <ArrowUp className="group-hover:-translate-y-2 transition-transform" strokeWidth={1.5} />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* 4. BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-crema/5 opacity-40">
          <div className="font-sans text-[9px] tracking-[0.3em] uppercase mb-6 md:mb-0">
            © {currentYear} | Diseñado y desarrollado por Angel Ojeda
          </div>
          <div className="font-sans text-[9px] tracking-[0.3em] uppercase flex gap-10">
            <span className="hidden sm:inline">VET • {new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
            <Link href="https://github.com/Miappvzl/estilo-domus" target="_blank" className="hover:text-crema transition-colors underline decoration-oro/40 underline-offset-4">
              Ver Codigo en GitHub
            </Link>
          </div>
        </div>
      </div>

      {/* Marca de Agua Editorial */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.015]">
        <span className="text-[28vw] font-serif italic text-crema leading-none">
          Domus
        </span>
      </div>

      {/* PORTAL DE CONTACTO INMERSIVO */}
      <ContactPortal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </footer>
  );
}