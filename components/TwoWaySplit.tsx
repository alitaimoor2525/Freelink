"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";

function SplitCard({
  href,
  kicker,
  title,
  body,
  cta,
  delay,
}: {
  href: string;
  kicker: string;
  title: React.ReactNode;
  body: string;
  cta: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href={href}
        className="group relative block h-full overflow-hidden rounded-lg border border-gold-cta/25 bg-forest-mid p-8 transition-colors hover:border-gold-cta"
      >
        <span className="font-mono text-xs uppercase tracking-microlabel text-gold-cta">
          {kicker}
        </span>
        <h3 className="mt-6 text-3xl leading-tight">{title}</h3>
        <p className="mt-4 max-w-sm text-cream/70">{body}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-microlabel text-gold-cta">
          {cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </Reveal>
  );
}

export function TwoWaySplit() {
  return (
    <section id="two-way" className="bg-deep-forest py-24 text-cream">
      <div className="container">
        <Reveal>
          <p className="microlabel mb-4 text-gold-cta">Two sides, one match</p>
          <h2 className="max-w-2xl text-5xl leading-tight md:text-6xl">
            Built for both sides of the deal.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <SplitCard
            href="/business#brief"
            kicker="For business"
            title={<>Hire people who can actually deliver.</>}
            body="We do the vetting and bring a short, considered introduction. You only pay once they start."
            cta="Start hiring"
            delay={0.1}
          />
          <SplitCard
            href="/talent#apply"
            kicker="For talent"
            title={<>Let your skills do the talking.</>}
            body="Share your work once. We advocate for you and connect you to roles that genuinely fit."
            cta="Find your work"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}