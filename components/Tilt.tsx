"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

let reducedMotion = false;
if (typeof window !== "undefined") {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Subtle 3D tilt-on-mouse for cards/pills. Springs back on leave.
 * Disabled under prefers-reduced-motion.
 */
export function Tilt({
  children,
  max = 8,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [`${max}deg`, `-${max}deg`]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [`-${max}deg`, `${max}deg`]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}