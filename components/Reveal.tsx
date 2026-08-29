"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  depth = 10,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y, rotateX: depth },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        transformPerspective: 1000,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, depth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}