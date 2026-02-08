"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";

const STEPS = [
  { id: "name", label: "¿Cómo debemos llamarle?", placeholder: "Su nombre...", type: "text" },
  { id: "email", label: "¿A qué dirección enviamos la propuesta?", placeholder: "email@dominio.com", type: "email" },
  { id: "interest", label: "¿Cuál es el proyecto de su legado?", placeholder: "Residencia, Inversión, Otros...", type: "text" }
];

export default function ContactPortal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Bloqueo de scroll nativo cuando el portal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        // Reset tras cerrar
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(0);
        }, 1000);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          // pointer-events-auto asegura que este div capture los clics
          className="fixed inset-0 z-[200000] bg-carbon flex flex-col items-center justify-center p-6 pointer-events-auto"
          // Evitamos que clics en el fondo cierren el portal si no quieres, 
          // o que disparen eventos del footer
          onClick={(e) => e.stopPropagation()}
        >
          {/* Grano Editorial (Capa inferior interna) */}
          <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none z-0" />

          {/* BOTÓN CERRAR - REFORZADO */}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-10 right-10 z-[200005] text-crema/40 hover:text-oro transition-colors flex items-center gap-4 group cursor-pointer p-4"
          >
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase pointer-events-none">Cerrar</span>
            <div className="w-12 h-12 rounded-full border border-crema/10 flex items-center justify-center group-hover:rotate-90 transition-transform pointer-events-none">
              <X size={24} strokeWidth={1} />
            </div>
          </button>

          <div className="container max-w-5xl mx-auto relative z-10">
            {!isSubmitted ? (
              <AnimatePresence mode="wait">
                <motion.form
                  key={currentStep}
                  onSubmit={handleNext}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-16"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-oro text-sm tracking-widest uppercase">Paso 0{currentStep + 1} / 03</span>
                    <div className="h-px w-24 bg-oro/20" />
                  </div>

                  <div className="space-y-6">
                    <label className="font-serif text-4xl md:text-7xl text-crema leading-tight block">
                      {STEPS[currentStep].label}
                    </label>
                    <input
                      autoFocus
                      required
                      type={STEPS[currentStep].type}
                      placeholder={STEPS[currentStep].placeholder}
                      className="w-full bg-transparent border-b border-crema/10 py-8 font-serif italic text-4xl md:text-8xl text-oro outline-none placeholder:text-white/5 focus:border-oro/40 transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="flex items-center gap-8 group cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-full border border-crema/20 flex items-center justify-center group-hover:bg-crema group-hover:text-carbon transition-all duration-700 shadow-2xl">
                      <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                       <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-crema/30">Confirmar</span>
                       <span className="font-sans text-xs uppercase tracking-[0.2em] text-crema group-hover:text-oro transition-colors">
                        {currentStep === 2 ? "Finalizar Solicitud" : "Continuar"}
                       </span>
                    </div>
                  </button>
                </motion.form>
              </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-12"
              >
                <div className="w-32 h-32 rounded-full border border-oro mx-auto flex items-center justify-center bg-oro/5 shadow-[0_0_50px_rgba(197,179,88,0.2)]">
                   <Check size={60} className="text-oro" strokeWidth={1} />
                </div>
                <div className="space-y-4">
                  <h2 className="font-serif text-6xl md:text-9xl text-crema tracking-tighter uppercase italic">Recibido.</h2>
                  <p className="font-sans text-[11px] uppercase tracking-[0.6em] text-crema/40">
                    Nuestro Concierge procesará su solicitud de inmediato.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="absolute bottom-12 left-12 opacity-10 pointer-events-none flex items-center gap-4 hidden md:flex">
             <span className="text-6xl font-serif italic text-crema">EstiloDomus</span>
             <div className="h-px w-32 bg-crema" />
             <span className="font-mono text-sm tracking-widest">PRIVATE_PORTAL_V1</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}