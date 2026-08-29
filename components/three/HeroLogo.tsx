"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Read once so the fallback isn't re-decided on every remount.
let reducedMotion = false;
if (typeof window !== "undefined") {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Brand mark (Warm Gold infinite-link) + "Freelink" wordmark in DM Serif
// Display. Infinity mark is the uploaded logo (transparent PNG, gold-tinted);
// the wordmark is set in DM Serif Display so both stay crisp on any backdrop.
const INK = "#132419";

/**
 * The Freelink logo with light 3D motion: cursor-linked tilt, a slow float,
 * a soft gold glow, and a draw-in entrance. Pauses off-screen and drops to a
 * static mark under prefers-reduced-motion.
 */
export function HeroLogo({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-12deg", "12deg"]);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["12deg", "-12deg"]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reducedMotion) return;
    const io = new IntersectionObserver(
      (entries) => setOnScreen(entries[0]?.isIntersecting ?? true),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reducedMotion || !onScreen || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      className={className}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.7, rotateX: 26 }}
      animate={
        onScreen
          ? { opacity: 1, scale: 1, rotateX: 0 }
          : { opacity: 0.15, scale: 0.96 }
      }
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Freelink"
    >
      <div className="relative h-full w-full">
        {/* Soft gold halo lifts the mark off the dark forest */}
        <div
          aria-hidden
          className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.5),rgba(19,36,25,0.1)_45%,transparent_70%)] blur-2xl"
        />

        <motion.div
          className="relative h-full w-full"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <motion.div
            className="relative h-full w-full"
            animate={
              reducedMotion ? {} : { y: [0, -10, 0], rotate: [0, -1.5, 1.5, 0] }
            }
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative flex h-full w-full flex-col items-center justify-center pb-[2%]"
style={{
                  filter: "drop-shadow(0 10px 20px rgba(212,160,23,0.4)) drop-shadow(0 2px 6px rgba(15,36,25,0.3))",
                }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/eternity-logo.png"
                alt=""
                aria-hidden
                className="w-[64%] max-w-[300px] object-contain"
              />
              <span
                className="mt-[2%] leading-none"
                style={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize: "clamp(44px, 9vw, 80px)",
                  color: INK,
                  textShadow: "0 4px 6px rgba(15,36,25,0.3)",
                }}
              >
                Freelink
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}