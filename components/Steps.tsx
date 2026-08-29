"use client";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function Steps({
  tone,
  title,
  steps,
}: {
  tone: "light" | "dark";
  title: string;
  steps: { n: string; label: string; body: string }[];
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "py-24",
        dark ? "bg-forest-mid text-cream" : "bg-cream text-[color:var(--color-ink)]"
      )}
    >
      <div className="container">
        <Reveal>
          <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">{title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div
                className={cn(
                  "h-full rounded-lg border p-6",
                  dark ? "border-gold-cta/25 bg-deep-forest/50" : "border-forest-mid/15 bg-white/60"
                )}
              >
                <span className="font-mono text-sm tracking-microlabel text-gold-cta">
                  {s.n}
                </span>
                <h3 className="mt-3 text-xl">{s.label}</h3>
                <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-cream/70" : "text-forest-mid/75")}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}