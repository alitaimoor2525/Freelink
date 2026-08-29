import type { Metadata } from "next";
import { PageHero } from "@/components/landing/PageHero";
import { TalentHow } from "@/components/TalentHow";
import { TalentForm } from "@/components/forms/TalentForm";

export const metadata: Metadata = { title: "For Talent" };

const crowd = [
  "Students",
  "Freelancers",
  "Fresh Graduates",
  "Remote Workers",
  "Professionals",
  "Career Switchers",
];

export default function TalentPage() {
  return (
    <>
      <PageHero
        kicker="For talent"
        title="Let your skills do the talking."
        intro="Stop cold-pitching into a void. Tell us once, and we'll hold your work up where it belongs — in front of teams that can actually use it."
      />

      <TalentHow />

      <section className="bg-cream py-24 text-[color:var(--color-ink)]">
        <div className="container">
          <p className="microlabel mb-4 text-gold-cta">Who can join</p>
          <h2 className="max-w-xl text-3xl leading-tight md:text-4xl">
            If you can do the work, you belong here.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {crowd.map((c) => (
              <span key={c} className="rounded-full border border-forest-mid/20 bg-white/60 px-5 py-2.5 font-mono text-xs uppercase tracking-microlabel text-forest-mid">
                {c}
              </span>
            ))}
            <span className="rounded-full border border-gold-cta px-5 py-2.5 font-mono text-xs uppercase tracking-microlabel text-gold-cta">
              Honestly… everyone
            </span>
          </div>
        </div>
      </section>

      <section id="apply" className="bg-cream py-24 text-[color:var(--color-ink)]">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="microlabel mb-4 text-gold-cta">Get started</p>
            <h2 className="text-3xl leading-tight md:text-4xl">Register as talent.</h2>
            <p className="mt-4 max-w-md text-forest-mid/80">
              A few short steps and your work is in front of the right people. We only reach out when there&apos;s a genuine fit.
            </p>
          </div>
          <TalentForm />
        </div>
      </section>
    </>
  );
}