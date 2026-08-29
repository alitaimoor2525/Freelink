import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/landing/PageHero";
import { Comparison } from "@/components/Comparison";
import { Steps } from "@/components/Steps";
import { Industries } from "@/components/Industries";
import { BusinessForm } from "@/components/forms/BusinessForm";

export const metadata: Metadata = { title: "For Business" };

const steps = [
  { n: "01", label: "Tell us the role", body: "A short brief — the title, the team, what success looks like in the first 90 days." },
  { n: "02", label: "We find the fit", body: "We vet talent against your exact brief and bring you a considered shortlist." },
  { n: "03", label: "You meet them", body: "A focused introduction, with context. No feed to dig through." },
  { n: "04", label: "Hire, or pay nothing", body: "You only pay after the hire starts. If it isn't right, we go again until it is." },
];

const compareRows = [
  { old: "Post a job into a crowd of noise", fre: "We bring you a vetted shortlist" },
  { old: "Spend weeks interviewing strangers", fre: "Meet people already checked out" },
  { old: "Pay per hire or per posting", fre: "Pay only after the person starts" },
  { old: "You do all the vetting", fre: "A human owns your whole search" },
];

const partnerBenefits = [
  "Featured as a verified partner on our site",
  "Priority access to vetted talent",
  "Social and community promotion",
  "No fees, ever",
  "A direct line to a real human",
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        kicker="For business"
        title="Hire people who can actually deliver."
        intro="Tell us what you need once. We bring you a short, considered introduction — vetted by hand and matched to your brief. You only pay when they start."
      />

      <Comparison
        tone="light"
        headline="Traditional platforms vs. a matching service that does the work."
        rows={compareRows}
        footerNote="We're your extra pair of hands in hiring — not another job board to check."
      />

      <Steps tone="dark" title="From brief to hire, in four honest steps." steps={steps} />

      <Industries />

      <section id="brief" className="bg-cream py-24 text-[color:var(--color-ink)]">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="microlabel mb-4 text-gold-cta">Get started</p>
            <h2 className="text-3xl leading-tight md:text-4xl">Tell us what you&apos;re hiring for.</h2>
            <p className="mt-4 max-w-md text-forest-mid/80">
              A short brief is all it takes. We&apos;ll confirm we can help and get a considered match to you quickly.
            </p>
          </div>
          <BusinessForm />
        </div>
      </section>

      <section className="bg-deep-forest py-24 text-cream">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="microlabel mb-4 text-gold-cta">Become a partner</p>
            <h2 className="text-3xl leading-tight md:text-4xl">
              More than hiring. Become part of the network.
            </h2>
            <p className="mt-4 max-w-md text-cream/70">
              Agencies, communities, co-working spaces — the deeper the network, the better the matches for everyone on it.
            </p>
            <Link href="/partner#apply" className="mt-8 inline-block btn-gold">
              Become a partner business
            </Link>
          </div>
          <ul className="space-y-4">
            {partnerBenefits.map((b) => (
              <li key={b} className="flex items-start gap-3 border-b border-white/10 pb-4 text-cream/80">
                <span className="mt-0.5 text-gold-cta">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}