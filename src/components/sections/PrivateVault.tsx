"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Lock, ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import privateVaultImage from "@assets/images/services/private.webp";

export default function PrivateVault() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Rastreo de Mouse con Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suavizado del movimiento
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 2. Transformación de la Máscara
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(circle 350px at ${x}px ${y}px, black 0%, transparent 100%)`
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Inicializar mouse en el centro del contenedor
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      // Calculamos coordenadas RELATIVAS al contenedor
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-carbon cursor-none"
    >
      {/* CAPA 1: FONDO MISTERIOSO */}
      <div className="absolute inset-0 z-0">
        <Image
          src={privateVaultImage}
          alt="Vault Preview Blurred"
          fill
          className="object-cover filter blur-[4.9px] brightness-[.5] grayscale-4 contrast-125 scale-105"
        />
      </div>

      {/* CAPA 2: REVELACIÓN (Máscara) */}
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ 
            WebkitMaskImage: maskImage,
            maskImage: maskImage
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=2000"
            alt="Vault Preview Sharp"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-carbon/10" />
        </motion.div>
      )}

      {/* CAPA 3: UI */}
      <div className="relative z-20 container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center space-y-12">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full border border-crema/20 flex items-center justify-center bg-carbon/40 backdrop-blur-md">
              <Lock className="text-bronze w-6 h-6 stroke-[1.5px]" />
            </div>
            
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-6xl text-crema leading-tight">
                Off-Market <br />
                <span className="italic">Collection</span>
              </h2>
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-crema/60 max-w-xs mx-auto">
                El verdadero lujo no se lista públicamente.
              </p>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
             {/* ... Inputs del formulario ... */}
             <div className="relative group max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="EMAIL PROFESIONAL"
                className="w-full bg-transparent border-b border-crema/20 py-4 font-sans text-xs tracking-widest text-crema outline-none focus:border-bronze transition-colors placeholder:text-crema/20"
              />
              <div className="absolute bottom-0 left-0 h-px bg-bronze w-0 group-focus-within:w-full transition-all duration-700" />
            </div>

            <div className="flex justify-center">
              <Magnetic strength={0.2}>
                <button className="flex items-center gap-4 bg-crema text-carbon px-10 py-5 rounded-full group overflow-hidden relative">
                  <span className="relative z-10 font-sans text-[10px] uppercase tracking-[0.2em] font-bold transition-colors group-hover:text-crema">
                    Solicitar Acceso VIP
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:text-crema" />
                  <div className="absolute inset-0 bg-carbon translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.76, 0, 0.24, 1]" />
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </div>
      </div>

      {/* CUSTOM CURSOR LOCAL (Corregido) */}
      {!isMobile && (
        <motion.div 
          // CAMBIO 1: 'absolute' en lugar de 'fixed' para respetar coordenadas relativas
          className="absolute top-0 left-0 w-8 h-8 border border-bronze rounded-full pointer-events-none z-100 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{ 
            // CAMBIO 2: Usar 'left/top' para mover, evitando conflicto con translate
            left: smoothX, 
            top: smoothY 
          }}
        >
          <div className="w-1 h-1 bg-bronze rounded-full" />
        </motion.div>
      )}
    </section>
  );
}