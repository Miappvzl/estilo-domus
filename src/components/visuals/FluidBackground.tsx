"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, GradientTexture, Sphere } from "@react-three/drei";
import * as THREE from "three";

function LiquidShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotación asimétrica para un movimiento más natural y orgánico
      meshRef.current.rotation.x = t * 0.04;
      meshRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        speed={2}
        distort={0.4}
        radius={1}
        // PROPIEDADES DE NIVEL ARCHITECT:
        roughness={0.1}    // Dispersión de luz suave, efecto nácar
        metalness={0.05}   // Brillo cerámico sutil
        transparent
        opacity={0.9}      // Mezcla con el fondo crema del contenedor
      >
        {/* PALETA OPCIÓN 1: Champagne & Stone */}
        <GradientTexture
          stops={[0, 0.4, 1]} 
          colors={["#F5F5F0", "#EAEAEA", "#B4C3F0"]} 
          size={1024}
        />
      </MeshDistortMaterial>
    </Sphere>
  );
}

export default function FluidBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] -z-10 bg-[#F5F5F0] overflow-hidden pointer-events-none">
      <Suspense fallback={<div className="w-full h-full bg-[#F5F5F0]" />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Luz ambiental para no perder detalle en las zonas de sombra */}
          <ambientLight intensity={0.6} />
          
          {/* LUZ ORO MATE: Genera el contraste de lujo sobre la textura de piedra */}
          <pointLight 
            position={[-10, 10, 10]} 
            intensity={70} 
            decay={0} 
            color="#F0E1B8" 
          />
          
          {/* Segunda luz de relleno para suavizar el lado opuesto */}
          <pointLight 
            position={[10, -10, -5]} 
            intensity={20} 
            decay={0} 
            color="#FFFFFF" 
          />

          <LiquidShape />
        </Canvas>
      </Suspense>

      {/* 
          CAPA ATMOSFÉRICA: 
          El difuminado convierte la geometría en una bruma de seda líquida.
      */}
      <div className="absolute inset-0 bg-[#F5F5F0]/20 backdrop-blur-[50px] md:backdrop-blur-[20px]" />
    </div>
  );
}