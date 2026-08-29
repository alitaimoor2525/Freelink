"use client";

import { Reveal } from "@/components/Reveal";

const cards = [
  {
    title: "Verified Talent",
    description: "Every professional is hand-vetted — no bots, no fake profiles.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 1.5-3.5 3-7 3s-7-1.5-7-3 3.5-3 7-3 7 1.5 7 3z" />
        <path d="M21 12c0 4.5-6 7-10 7" />
      </svg>
    ),
  },
  {
    title: "Fast Matching",
    description: "Get introduced to the right person in days, not weeks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Transparent Process",
    description: "No hidden fees. You only pay after a successful hire.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <path d="M12 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>
    ),
  },
];

export function ValueCards() {
  return (
    <section className="py-20 bg-white" aria-labelledby="value-cards-heading">
      <h2 id="value-cards-heading" className="sr-only">
        Why choose Freelink
      </h2>
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.1} y={30}>
              <article className="relative flex flex-col h-full items-center text-center p-8 rounded-lg border border-forest-mid/20 bg-white shadow-[0_4px_20px_rgba(15,36,25,0.08)] hover:border-gold-cta/40 hover:bg-gold-pale/20 hover:shadow-[0_12px_28px_rgba(15,36,25,0.12)] transition-all duration-300">
                <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-lg bg-gold-cta/10 text-gold-cta border border-gold-cta/20">
                  {card.icon}
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-forest-mid" style={{ color: "#1b4332" }}>
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-forest-mid/70 max-w-xs flex-1">
                  {card.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}