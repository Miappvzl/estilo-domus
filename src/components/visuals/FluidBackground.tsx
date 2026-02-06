"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// SHADER OPTIMIZADO: Colores limpios y matemáticas simplificadas
const FluidShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uColorBase: { value: new THREE.Color("#FFF8DB") },
    uColorAccent1: { value: new THREE.Color("#E8E5E0") },
    uColorAccent2: { value: new THREE.Color("#D1C9BC") },
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
      float ratio = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      float freq = mix(3.0, 1.5, clamp(ratio, 0.0, 1.0));
      
      float n1 = snoise(uv * freq + uTime * 0.1);
      float n2 = snoise(uv * (freq * 1.2) - uTime * 0.12 + n1);
      
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
      {/* Geometría mínima para máximo rendimiento */}
      <planeGeometry args={[1, 1, 8, 8]} />
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
    <div className="fixed inset-0 w-screen h-dvh -z-20 bg-[#F9F9F7] overflow-hidden pointer-events-none transform-gpu">
      <Suspense fallback={null}>
        <Canvas
          // 1. Optimización de Resolución (DPR)
          dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.2}
          camera={{ position: [0, 0, 1] }}
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            stencil: false,
            depth: false 
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <LiquidPlane />
        </Canvas>
      </Suspense>

      {/* 
          OVERLAY EDITORIAL: 
          Subimos el blur a un nivel medio (30-60) para la "sustancia",
          pero lo mantenemos optimizado con transform-gpu.
      */}
      <div className="absolute inset-0 bg-[#F9F9F7]/10 backdrop-blur-[14px] md:backdrop-blur-[30px] transform-gpu will-change-[backdrop-filter]" />
      
      {/* Viñeta sutil para profundidad */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-carbon/79 opacity-20 pointer-events-none" />
    </div>
  );
}