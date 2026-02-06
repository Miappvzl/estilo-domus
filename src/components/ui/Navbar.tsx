"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import Link from "next/link";

const navLinks = [
  { name: "Propiedades", href: "#" },
  { name: "Filosofía", href: "#" },
  { name: "Servicios", href: "#" },
  { name: "Contacto", href: "#" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  // Detectar si es mobile para deshabilitar Magnetic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  // Renderizamos el botón de Toggle por separado para asegurar su Z-INDEX
  const NavTrigger = (
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className={`relative p-4 transition-colors duration-500 rounded-full ${
        // Si está abierto, forzamos color Carbon para que resalte sobre el fondo Crema del menú
        isOpen ? "text-carbon" : (isScrolled ? "text-carbon" : "text-crema")
      }`}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {isOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
    </button>
  );

  return (
    // SUBIMOS EL Z-INDEX DEL HEADER A 100001 (Por encima del Noise y el Cursor)
    <header
      className={`fixed top-0 left-0 w-full z-[100001] transition-all duration-500 ease-in-out ${
        isScrolled && !isOpen
          ? "py-4 bg-crema/80 backdrop-blur-md border-b border-carbon/5 shadow-sm" 
          : "py-8 bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between relative z-[100002]">
        
        {/* LOGO */}
        <Link href="/" className="relative">
          <span className={`text-2xl font-serif tracking-tight transition-colors duration-500 ${
            isOpen ? "text-carbon" : (isScrolled ? "text-carbon" : "text-crema")
          }`}>
            Estilo<span className="italic">Domus</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${
                    isScrolled ? "text-carbon" : "text-crema"
                  }`}
                >
                  {link.name}
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bronze transition-all duration-500 group-hover:w-full" />
              </li>
            ))}
          </ul>

          <Magnetic strength={0.2}>
            <button className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 border ${
              isScrolled 
                ? "border-carbon text-carbon hover:bg-carbon hover:text-crema" 
                : "border-crema text-crema hover:bg-crema hover:text-carbon"
            }`}>
              Agendar
            </button>
          </Magnetic>
        </div>

        {/* MOBILE TRIGGER: Solo aplicamos Magnetic si NO es mobile */}
        <div className="md:hidden">
          {!isMobile ? (
            <Magnetic strength={0.4}>{NavTrigger}</Magnetic>
          ) : (
            NavTrigger
          )}
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-crema flex flex-col justify-center items-center z-[100000]"
          >
            <ul className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-serif text-carbon hover:italic transition-all tracking-tighter"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Redes Sociales en el menú móvil */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex gap-8 text-[10px] uppercase tracking-widest text-carbon/40"
            >
              <span>Instagram</span>
              <span>LinkedIn</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}