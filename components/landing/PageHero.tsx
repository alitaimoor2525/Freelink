"use client";

import { motion } from "framer-motion";

const tones = {
  light: "bg-cream text-[color:var(--color-ink)]",
  dark: "bg-forest-mid text-cream",
};

export function PageHero({
  kicker,
  title,
  intro,
  tone = "light",
}: {
  kicker: string;
  title: React.ReactNode;
  intro: string;
  tone?: "light" | "dark";
}) {
  return (
    <section className={`relative overflow-hidden ${tones[tone]}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#F5E6C8_1px,transparent_0)] bg-[length:30px_30px] opacity-40"
      />
      <div className="container relative z-10 py-32 md:py-40">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="microlabel mb-5 inline-block border border-gold-cta/40 px-3 py-1.5 text-gold-cta"
        >
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-5xl leading-[1.05] md:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className={`mt-6 max-w-xl text-lg leading-relaxed ${tone === "dark" ? "text-cream/75" : "text-forest-mid/80"}`}
        >
          {intro}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 font-mono text-xs uppercase tracking-microlabel text-gold-cta"
        >
          ∞ A real person responds to every enquiry
        </motion.div>
      </div>
    </section>
  );
}