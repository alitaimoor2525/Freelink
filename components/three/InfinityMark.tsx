"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Read once so the fallback isn't re-decided on every remount.
let reducedMotion = false;
if (typeof window !== "undefined") {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function InfinityTorus({
  radius,
  tubeRadius,
  visibleRef,
}: {
  radius: number;
  tubeRadius: number;
  visibleRef: React.MutableRefObject<boolean>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 200;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      // Lemniscate of Bernoulli — the infinity curve
      const x = (radius * Math.cos(t)) / (1 + Math.sin(t) ** 2);
      const z = (radius * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) ** 2);
      points.push(new THREE.Vector3(x, 0, z));
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
    return new THREE.TubeGeometry(curve, 256, tubeRadius, 24, true);
  }, [radius, tubeRadius]);

  useFrame((state, delta) => {
    if (!meshRef.current || !visibleRef.current) return;
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.28;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow>
      <MeshTransmissionMaterial
        thickness={0.4}
        roughness={0.18}
        transmission={0.9}
        ior={1.5}
        color="#D4A017"
        attenuationColor="#F5E6C8"
        attenuationDistance={2}
      />
    </mesh>
  );
}

function Scene({ visibleRef }: { visibleRef: React.MutableRefObject<boolean> }) {
  const group = useRef<THREE.Group>(null);

  // Subtle cursor parallax — skews the whole mark toward the pointer.
  useFrame((state, delta) => {
    const g = group.current;
    if (!g || !visibleRef.current) return;
    const targetRX = state.pointer.y * 0.18;
    const targetRY = state.pointer.x * 0.3;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRX, 2.4, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRY, 2.4, delta);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} />
      <pointLight position={[-4, -2, -4]} intensity={0.8} color="#F5E6C8" />
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <InfinityTorus radius={3.1} tubeRadius={0.16} visibleRef={visibleRef} />
      </Float>
    </group>
  );
}

function StaticMark() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <span className="animate-float text-[9rem] font-bold leading-none text-gold-cta/80 md:text-[13rem]">
        ∞
      </span>
    </div>
  );
}

export function InfinityMark({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reducedMotion) return;
    setOnScreen(true);
    const io = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? true;
        visibleRef.current = isVisible;
        setOnScreen(isVisible);
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced-motion fallback or off-screen: static gold mark, no 3D scene/canvas.
  if (reducedMotion || !onScreen) {
    return (
      <motion.div
        ref={wrapRef}
        className={className}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <StaticMark />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={wrapRef}
      className={className}
      initial={{ opacity: 0, scale: 0.72 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Canvas
        camera={{ position: [0, 3, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <group scale={1.15}>
          <Scene visibleRef={visibleRef} />
        </group>
      </Canvas>
    </motion.div>
  );
}