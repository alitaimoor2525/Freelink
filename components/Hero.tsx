"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { Magnetic } from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const HeroLogo = dynamic(
  () => import("@/components/three/HeroLogo").then((m) => m.HeroLogo),
  { ssr: false, loading: () => <InfinityLoading /> }
);

function InfinityLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="animate-float text-[120px] font-bold text-gold-cta/70">
        ∞
      </span>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-line]",
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.2,
        }
      );
      gsap.fromTo(
        "[data-hero-cta]",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.9,
          ease: "power3.out",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-forest-mid text-white"
    >
      {/* Watermarked infinity motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #D4A017 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container relative z-10 grid items-center gap-12 py-28 md:grid-cols-2">
        <div>
          <p
            data-hero-line
            className="microlabel mb-6 inline-block border border-gold-cta/50 px-3 py-1.5 text-gold-cta bg-white/10 backdrop-blur-sm"
          >
            Curated hiring, by hand
          </p>

          <h1
            data-hero-line
            className="text-6xl leading-[1.05] md:text-7xl lg:text-8xl"
          >
            <span className="text-white">No profiles.</span>
            <br />
            <span className="text-gold-cta">Just people.</span>
          </h1>

          <p
            data-hero-line
            className="mt-8 max-w-md text-lg leading-relaxed text-white/80"
          >
            Freelink connects real talent with real businesses, without the noise of
            endless profiles, algorithms, or empty promises. We find the right person
            for the right work, and we make sure both sides actually get what they came
            for.
          </p>

          <div data-hero-cta className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <Link href="/business#brief" className="btn-gold">
                I&apos;m hiring
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/talent#apply" className="btn-gold">
                I&apos;m looking for work
              </Link>
            </Magnetic>
          </div>

          <p data-hero-cta className="mt-8 font-mono text-xs uppercase tracking-microlabel text-gold-cta/70">
            Pay only after you hire. That&apos;s the deal.
          </p>
        </div>

        <div className="relative h-[380px] md:h-[520px]">
          <HeroLogo className="absolute inset-0" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="microlabel text-white/40">Scroll</span>
      </div>
    </section>
  );
}