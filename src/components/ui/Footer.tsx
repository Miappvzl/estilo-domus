"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// 1. IMPORTANTE: Asegúrate de que Instagram esté importado aquí
import { ArrowUp, ArrowUpRight, Github, Instagram } from "lucide-react";
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
      
      {/* 1. CURVATURA SUPERIOR */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 rotate-180">
        <svg 
          className="relative block w-[calc(100%+1.3px)] h-[80px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
        </svg>
      </div>

      <div className="container mx-auto px-6">
        
        {/* 2. BIG TYPE CTA */}
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
              
              {/* --- INICIO DEL NUEVO BOTÓN DE INSTAGRAM --- */}
              <Magnetic strength={0.3}>
                <Link 
                  href="https://www.instagram.com/iamgabocode?igsh=MWV4c3ViMGE0aTF0OA==" 
                  target="_blank"
                  className="group flex items-center gap-3 transition-all duration-300"
                >
                  {/* Contenedor del icono circular */}
                  <div className="p-3 border border-crema/20 rounded-full group-hover:border-oro group-hover:bg-oro/10 transition-all duration-500">
                    <Instagram className="w-5 h-5 text-crema group-hover:text-oro transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  
                  {/* Texto */}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-sans uppercase tracking-widest opacity-50 group-hover:text-oro transition-colors">Follow Us</span>
                    <span className="text-sm font-serif italic text-crema group-hover:text-oro transition-colors">@iamgabocode</span>
                  </div>
                </Link>
              </Magnetic>
               {/* --- FIN DEL NUEVO BOTÓN DE INSTAGRAM --- */}

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
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-crema/10">
          <div className="font-sans text-[9px] tracking-[0.3em] uppercase mb-6 md:mb-0 opacity-60">
            © {currentYear} EstiloDomus | Engineering by Angel Ojeda
          </div>
          
          <div className="flex items-center gap-8">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase opacity-40 hidden sm:inline">
              VET • {new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
            
            <Link 
              href="https://github.com/Miappvzl/estilo-domus" 
              target="_blank" 
              className="flex items-center gap-2 border border-crema/20 px-4 py-2 rounded-full hover:bg-crema hover:text-carbon transition-all duration-300 group"
            >
              <Github className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span className="font-sans text-[9px] font-bold tracking-[0.2em]">GITHUB REPO</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Marca de Agua */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.015]">
        <span className="text-[28vw] font-serif italic text-crema leading-none">
          Domus
        </span>
      </div>

      <ContactPortal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </footer>
  );
}