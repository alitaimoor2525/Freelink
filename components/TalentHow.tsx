"use client";

import { Reveal } from "@/components/Reveal";

const timeline = [
  {
    n: "01",
    label: "We read your application",
    body: "A person — not a filter — reads your full story and checks the work behind it.",
  },
  {
    n: "02",
    label: "We match you only when it fits",
    body: "No mass blasts. You only hear from us when a role genuinely matches your skills, pace, and goals.",
  },
  {
    n: "03",
    label: "We put you in front of the right team",
    body: "A focused introduction with context, so you're never just a name in a spreadsheet.",
  },
  {
    n: "04",
    label: "You get paid in full",
    body: "Fees never touch your rate. The money you earn is yours — all of it.",
  },
];

const benefits = [
  "No fees on you, ever. You earn fully.",
  "A human advocate, not an algorithm.",
  "Represented in every conversation.",
  "We only reach out when there's a genuine fit.",
  "Clear terms before you say yes.",
];

export function TalentHow() {
  return (
    <>
      <section className="bg-cream py-24 text-[color:var(--color-ink)]">
        <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="microlabel mb-4 text-gold-cta">How it works</p>
              <h2 className="text-4xl leading-tight md:text-5xl">
                From application to offer, in four honest steps.
              </h2>
              <p className="mt-4 max-w-sm text-forest-mid/70">
                No profile to fill out forever, no feed to disappear into. One
                application, then a human handles the rest.
              </p>
            </Reveal>
          </div>

          <ol className="relative space-y-10 border-l border-gold-cta/30 pl-8">
            {timeline.map((s, i) => (
              <li key={s.n} className="relative">
                <Reveal delay={i * 0.08} y={30}>
                  <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-gold-cta bg-deep-forest font-mono text-[10px] text-gold-cta">
                    {s.n}
                  </span>
                  <h3 className="text-xl">{s.label}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-forest-mid/70">
                    {s.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream py-24 text-[color:var(--color-ink)]">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="microlabel mb-4 text-gold-cta">What you get</p>
              <h2 className="text-4xl leading-tight md:text-5xl">
                Working with Freelink is different on purpose.
              </h2>
            </Reveal>
          </div>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.06} y={20}>
                <li className="flex items-start gap-3 border-b border-forest-mid/10 pb-4">
                  <span className="mt-0.5 text-gold-cta">✓</span>
                  <span className="text-forest-mid/90">{b}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}