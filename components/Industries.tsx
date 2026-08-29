"use client";

import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";

const industries = [
  "Marketing",
  "Graphic Design",
  "Web Development",
  "Video Editing",
  "Customer Support",
  "Virtual Assistance",
  "Accounting",
  "Sales",
  "Writing",
  "HR",
  "AI Automation",
  "Data Entry",
];

export function Industries({ id = "industries" }: { id?: string }) {
  return (
    <section id={id} className="py-24 bg-white text-[color:var(--color-ink)]">
      <div className="container">
        <Reveal>
          <p className="microlabel mb-4 text-gold-cta">Industries</p>
          <h2 className="max-w-2xl text-5xl leading-tight md:text-6xl">
            One network, every kind of work.
          </h2>
          <p className="mt-4 max-w-lg text-forest-mid/80">
            If it can be done well and done remotely, we likely cover it. And if
            it&apos;s not listed, ask — the answer is often yes.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-3">
            {industries.map((ind) => (
              <Tilt key={ind} max={6}>
                <span className="block rounded-full border border-forest-mid/20 bg-white/60 px-5 py-2.5 font-mono text-xs uppercase tracking-microlabel text-forest-mid transition-colors hover:border-gold-cta hover:text-gold-cta">
                  {ind}
                </span>
              </Tilt>
            ))}
            <span className="rounded-full border border-gold-cta px-5 py-2.5 font-mono text-xs uppercase tracking-microlabel text-gold-cta">
              + more
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}