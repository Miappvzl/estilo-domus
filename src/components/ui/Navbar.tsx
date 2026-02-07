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
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false); // <--- CRÍTICO PARA EL ERROR DE HIDRATACIÓN
  const [time, setTime] = useState("");
  const { scrollY } = useScroll();

  // 1. Manejo de Montaje y Reloj
  useEffect(() => {
    setMounted(true); // Marcamos que el componente ya está en el cliente

    const updateTime = () => {
      const vetime = new Intl.DateTimeFormat("es-VE", {
        timeZone: "America/Caracas",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(vetime);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  // 2. Detección de Scroll (Optimizada)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  // Si no está montado, devolvemos una versión simplificada o nula para evitar el error
  // El servidor renderizará esto vacío y el cliente lo "inflará" al llegar.
  if (!mounted) return (
    <header className="fixed top-0 left-0 w-full z-100001 py-8 bg-transparent">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <span className="text-2xl font-serif text-crema">Estilo<span className="italic">Domus</span></span>
        <div className="w-8 h-8" /> 
      </div>
    </header>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-100001 transition-all duration-700 ease-[0.76, 0, 0.24, 1] ${
        isScrolled && !isOpen ? "py-4" : "py-8"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between relative z-100002">
        
        {/* LADO IZQUIERDO: LOGO & STATUS */}
        <div className="flex items-center gap-8">
          <Link href="/" className="relative group">
            <motion.span 
              className={`text-2xl font-serif tracking-tighter transition-colors duration-500 ${
                isOpen ? "text-carbon" : (isScrolled ? "text-carbon" : "text-crema")
              }`}
            >
              Estilo<span className="italic font-light">Domus</span>
            </motion.span>
          </Link>

          {/* INDICADOR DE STATUS (Hora de Caracas) */}
          <div className={`hidden lg:flex items-center gap-3 border-l pl-8 transition-all duration-500 ${
            isOpen ? "border-carbon/10 opacity-40 text-carbon" : (isScrolled ? "border-carbon/10 opacity-40 text-carbon" : "border-crema/20 opacity-60 text-crema")
          }`}>
            <div className="w-1 h-1 bg-oro rounded-full animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.3em] font-sans">
              Caracas, VE • {time} VET
            </span>
          </div>
        </div>

        {/* CENTRO: DESKTOP MENU (Capsule Style) */}
        <div className={`hidden lg:flex items-center px-8 py-3 rounded-full transition-all duration-700 border ${
          isScrolled 
            ? "bg-crema/40 backdrop-blur-xl border-carbon/5 shadow-sm" 
            : "bg-transparent border-transparent"
        }`}>
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-500 ${
                    isScrolled ? "text-carbon" : "text-crema"
                  }`}
                >
                  {link.name}
                </Link>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-px bg-oro transition-all duration-500 group-hover:w-full"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* LADO DERECHO: CTA & TRIGGER */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isDesktop ? (
              <Magnetic strength={0.2}>
                <button className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-700 relative overflow-hidden group border ${
                  isScrolled 
                    ? "border-carbon text-carbon" 
                    : "border-crema text-crema"
                }`}>
                  <span className="relative z-10 group-hover:text-crema transition-colors duration-500">Concierge</span>
                  <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out ${
                    isScrolled ? "bg-carbon" : "bg-crema"
                  }`} />
                </button>
              </Magnetic>
            ) : (
              <button className={`px-8 py-3 border rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors ${
                isScrolled ? "border-carbon text-carbon" : "border-crema text-crema"
              }`}>
                Concierge
              </button>
            )}
          </div>

          {/* Icono Menu Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-4 transition-colors duration-500 lg:hidden ${
              isOpen ? "text-carbon" : (isScrolled ? "text-carbon" : "text-crema")
            }`}
          >
            {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* OVERLAY DE MENÚ MÓVIL (Editorial Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#F9F9F7] flex flex-col z-100000 p-8"
          >
            <div className="mt-24 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-bronze ml-1">Menú Principal</span>
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-6xl font-serif text-carbon py-2 block hover:italic transition-all leading-tight tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-auto grid grid-cols-2 border-t border-carbon/10 pt-8 pb-12 gap-8">
              <div className="space-y-4">
                <span className="text-[9px] uppercase tracking-widest text-carbon/40 block font-bold">Ubicación</span>
                <p className="font-serif text-sm text-carbon uppercase tracking-tighter">Las Mercedes, Caracas</p>
              </div>
              <div className="space-y-4">
                <span className="text-[9px] uppercase tracking-widest text-carbon/40 block font-bold">Social</span>
                <div className="flex flex-col gap-2 font-serif text-sm text-carbon uppercase tracking-tighter">
                  <Link href="#">Instagram</Link>
                  <Link href="#">LinkedIn</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}