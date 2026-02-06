"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// SHADER EVOLUCIONADO: Colores más frescos y frecuencia adaptativa
const FluidShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    // Paleta "Ageless Luxury": Tonos pálidos, nada de amarillos saturados
    uColorBase: { value: new THREE.Color("#F9F9F7") }, // Alabastro (Blanco roto)
    uColorAccent1: { value: new THREE.Color("#E8E5Ergba(110, 195, 255, 0.72)0") }, // Piedra Cálida (Grisáceo)
    uColorAccent2: { value: new THREE.Color("#D1Crgba(73, 176, 255, 0.5)9BC") }, // Cava Pálido (Oro frío)
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColorBase;
    uniform vec3 uColorAccent1;
    uniform vec3 uColorAccent2;
    varying vec2 vUv;

    // Ruido Simplex para fluidez orgánica
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ; m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Ajuste para móvil: Si la pantalla es estrecha, aumentamos la escala del ruido
      float ratio = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      
      // Multiplicador de frecuencia: Más alto en móvil para ver más movimiento
      float freq = mix(3.5, 2.0, clamp(ratio, 0.0, 1.0));
      
      // Capas de movimiento líquido
      float n1 = snoise(uv * freq + uTime * 0.15);
      float n2 = snoise(uv * (freq * 1.5) - uTime * 0.2 + n1);
      
      // Mezcla de colores (Ageless Palette)
      vec3 color = mix(uColorBase, uColorAccent1, n1 * 0.5 + 0.5);
      color = mix(color, uColorAccent2, n2 * 0.4);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function LiquidPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        args={[FluidShader]}
        transparent
      />
    </mesh>
  );
}

export default function FluidBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] -z-20 bg-[#F9F9F7] overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]} // Optimización para móviles
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <LiquidPlane />
      </Canvas>

      {/* 
          OVERLAY EDITORIAL: 
          Blur inteligente. Menos desenfoque en móvil para no lavar los colores.
      */}
      <div className="absolute inset-0 bg-[#F9F9F7]/10 backdrop-blur-[5px] md:backdrop-blur-[5px]" />
      
      {/* Viñeta sutil para dar ese look de "revista de diseño" */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#1A1A1A]/5 opacity-0" />
    </div>
  );
}