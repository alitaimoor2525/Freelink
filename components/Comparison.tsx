"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Comparison({
  tone,
  headline,
  rows,
  footerNote,
}: {
  tone: "light" | "dark";
  headline: string;
  rows: { old: string; fre: string }[];
  footerNote: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-cmp-row]", ref.current!);
    const tweens = els.map((el) =>
      gsap.fromTo(
        el,
        { autoAlpha: 0, x: -24 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      )
    );
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <section className={cn("py-24", tone === "light" ? "bg-cream text-[color:var(--color-ink)]" : "bg-deep-forest text-cream")}>
      <div className="container">
        <h2 className="max-w-2xl text-4xl leading-tight md:text-5xl">{headline}</h2>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="text-left font-mono text-[11px] uppercase tracking-microlabel opacity-60">
                <th className="py-3 pr-6 font-normal">The old way</th>
                <th className="py-3 pr-6 font-normal text-gold-cta">With Freelink</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  data-cmp-row
                  className="border-t border-gold-cta/15"
                >
                  <td className="py-5 pr-6 opacity-70 line-through decoration-[1.5px]">
                    {r.old}
                  </td>
                  <td className="py-5 pr-6 font-medium text-gold-cta">
                    {r.fre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-md text-sm italic opacity-70">{footerNote}</p>
      </div>
    </section>
  );
}