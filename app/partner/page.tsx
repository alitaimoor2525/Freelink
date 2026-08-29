import type { Metadata } from "next";
import { PageHero } from "@/components/landing/PageHero";
import { PartnerForm } from "@/components/forms/PartnerForm";

export const metadata: Metadata = { title: "Become a Partner" };

const benefits = [
  { title: "Featured partner", body: "Your organization shown on the site and in our outreach to clients and talent." },
  { title: "Social promotion", body: "We introduce our community to you — and you to ours." },
  { title: "Community access", body: "Get in front of a growing, vetted talent pool and peer businesses." },
  { title: "Priority talent", body: "First look at the strongest, hand-checked matches in the network." },
  { title: "No fees", body: "Partnering with us doesn't cost you a thing. Good matchmaking pays for itself." },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        kicker="Become a partner"
        title="More than hiring. Become part of the network."
        intro="Communities, schools, agencies, co-working spaces — if you work around great people, we want to know you. Let's build a better working world together."
        tone="dark"
      />

      <section className="bg-deep-forest py-24 text-cream">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="rounded-md border border-gold-cta/20 bg-white/[0.03] p-6"
            >
              <span className="font-mono text-xs tracking-microlabel text-gold-cta">
                0{i + 1}
              </span>
              <h2 className="mt-3 text-xl text-cream">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="bg-deep-forest py-24 text-cream">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="microlabel mb-4 text-gold-cta">Get started</p>
            <h2 className="text-3xl leading-tight md:text-4xl">
              Let&apos;s explore how we can work together.
            </h2>
            <p className="mt-4 max-w-md text-cream/70">
              Tell us about your organization and what you have in mind. We&apos;ll take it from there.
            </p>
          </div>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}