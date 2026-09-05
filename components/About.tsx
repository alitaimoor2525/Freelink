"use client";

import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="bg-cream py-28 text-[color:var(--color-ink)]">
      <div className="container grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="microlabel mb-4 text-gold-cta">What is Freelink</p>
          <h2 className="text-5xl leading-tight md:text-6xl">
            Hiring, done by people who read people.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-forest-mid/85">
            <p>
              Most hiring platforms make you do all the work. You scroll, you guess, you
              message ten people hoping one gets back to you. Freelink works differently.
              We sit in the middle and actually pay attention, learning what a business
              needs and what a person can really do, then bringing the two together
              ourselves.
            </p>
            <p className="font-serif text-2xl italic text-forest-mid">
              No profiles. Just people.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}