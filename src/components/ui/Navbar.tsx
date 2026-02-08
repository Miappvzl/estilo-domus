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
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [navTheme, setNavTheme] = useState<"light" | "dark">("dark");
  
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      setTime(new Intl.DateTimeFormat("es-VE", {
        timeZone: "America/Caracas", hour: "2-digit", minute: "2-digit", hour12: false,
      }).format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);

    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    // LÓGICA DE DETECCIÓN DE TEMA
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute("data-nav-theme") as "light" | "dark";
          if (theme) setNavTheme(theme);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "0px 0px -95% 0px",
      threshold: 0
    });

    const sections = document.querySelectorAll("[data-nav-theme]");
    sections.forEach((section) => observer.observe(section));
    
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", checkDesktop);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  if (!mounted) return null;

  const isLight = navTheme === "light";
  // Cuando el menú está abierto, forzamos texto Carbon (oscuro) porque el fondo del menú es Crema (claro)
  const dynamicTextColor = isOpen ? "text-carbon" : (isLight ? "text-carbon" : "text-crema");
  const dynamicBorderColor = isOpen ? "border-carbon/10" : (isLight ? "border-carbon/10" : "border-crema/20");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100001] transition-all duration-700 ease-[0.76, 0, 0.24, 1] ${
        isScrolled && !isOpen ? "py-4" : "py-8"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between relative z-[100002]">
        
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/" onClick={() => setIsOpen(false)} className="relative group">
            <span className={`text-2xl font-serif tracking-tighter transition-colors duration-500 ${dynamicTextColor}`}>
              Estilo<span className="italic font-light">Domus</span>
            </span>
          </Link>

          {/* STATUS INDICATOR */}
          <div className={`hidden lg:flex items-center gap-3 border-l pl-8 transition-all duration-500 ${dynamicBorderColor}`}>
            <div className="w-1 h-1 bg-oro rounded-full animate-pulse" />
            <span className={`text-[9px] uppercase tracking-[0.3em] font-sans ${dynamicTextColor}`}>
              Caracas, VE • {time} VET
            </span>
          </div>
        </div>

        {/* MENU DESKTOP */}
        <div className={`hidden lg:flex items-center px-8 py-3 rounded-full transition-all duration-700 border ${
          isScrolled 
            ? (isLight ? "bg-carbon/5 backdrop-blur-xl border-carbon/5 shadow-sm" : "bg-crema/10 backdrop-blur-xl border-crema/10 shadow-sm")
            : "bg-transparent border-transparent"
        }`}>
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link href={link.href} className={`text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-500 ${dynamicTextColor}`}>
                  {link.name}
                </Link>
                <motion.span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-500 group-hover:w-full ${isLight ? "bg-carbon" : "bg-oro"}`} />
              </li>
            ))}
          </ul>
        </div>

        {/* CTA & TRIGGER */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Magnetic strength={0.2}>
              <button className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-700 relative overflow-hidden group border ${
                 isOpen || isLight ? "border-carbon text-carbon" : "border-crema text-crema"
              }`}>
                <span className="relative z-10 group-hover:text-crema transition-colors duration-500">Concierge</span>
                <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out ${
                  isOpen || isLight ? "bg-carbon" : "bg-crema"
                }`} />
              </button>
            </Magnetic>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-4 transition-colors lg:hidden relative z-[100003] ${dynamicTextColor}`}
          >
            {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY REINSTALADO */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#F9F9F7] flex flex-col z-[100000] p-8"
          >
            <div className="mt-24 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-bronze ml-1 font-bold">Menú Principal</span>
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
                  <Link href="https://www.instagram.com/iamgabocode?igsh=MWV4c3ViMGE0aTF0OA==">Instagram</Link>
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