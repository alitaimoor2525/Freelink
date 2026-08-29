"use client";

import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "You tell us what you need",
    body: "A short conversation stands in for a thousand profiles. We listen for what actually matters — the work, the pace, the person.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "We put it to the work",
    body: "We vet and hand-match. Not a ranking, a judgment call made by someone who reads your whole story before recommending anyone.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "You meet one person",
    body: "No feed, no shortlists of strangers. We introduce you to the one person we believe is right — and we stand behind our reasoning.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-4-4h-2.5" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Hire, or pay nothing",
    body: "You only pay after the hire actually happens. If it isn't a fit, we try again until it is. That's the whole business model.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-forest-mid py-24 text-cream"
    >
      {/* Background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F5E6C8 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <div className="container relative z-10">
        <p className="microlabel mb-4 text-gold-cta">How it works</p>
        <h2 className="max-w-3xl text-5xl leading-tight md:text-6xl lg:text-7xl">
          Four honest steps, one human touch.
        </h2>
      </div>

      {/* Steps grid — responsive: 1 col mobile, 2 tablet, 4 desktop */}
      <div className="mt-14 container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.1} y={30}>
              <div className="relative flex flex-col h-full">
                {/* Step connector dot above each card */}
                <div className="hidden md:block absolute top-[-28px] left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-gold-cta bg-forest-mid flex items-center justify-center"
                    style={{ boxShadow: "0 0 0 4px #1b4332" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-cta" />
                  </div>
                </div>

                {/* Step card */}
                <div className="relative z-10 w-full flex flex-col h-full rounded-lg border border-gold-cta/20 bg-deep-forest/50 p-8 backdrop-blur-sm shadow-[0_4px_16px_rgba(15,36,25,0.15)] hover:border-gold-cta/50 hover:bg-deep-forest/70 hover:shadow-[0_8px_24px_rgba(15,36,25,0.2)] transition-all duration-300">
                  {/* Step number badge */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-gold-cta flex items-center justify-center bg-forest-mid relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold-cta/10 to-transparent" />
                      <span className="relative font-mono text-lg tracking-microlabel text-gold-cta font-bold">
                        {step.n}
                      </span>
                    </div>
                    <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-gold-cta/30 to-transparent" />
                  </div>

                  {/* Step icon */}
                  <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-lg bg-gold-cta/10 border border-gold-cta/20 text-gold-cta">
                    {step.icon}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 flex flex-col justify-between min-h-0">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed text-cream/70">{step.body}</p>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-6 flex items-center gap-2">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                          index <= 3 ? "bg-gold-cta" : "bg-gold-cta/20"
                        }`}
                        style={{ 
                          width: `${((index + 1) / steps.length) * 100}%`,
                          maxWidth: 'calc(100% - 4rem)'
                        }}
                      />
                      <span className="font-mono text-xs text-gold-cta/70 whitespace-nowrap">
                        {index + 1} / {steps.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Decorative infinity motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 text-[36vw] font-bold text-gold-cta/[0.04]"
      >
        ∞
      </div>
    </section>
  );
}