"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const messages: Record<string, { heading: string; body: string }> = {
  talent: {
    heading: "Your work is on its way up.",
    body: "A real person will review it. If there's a fit, expect to hear from us soon — and only about relevant opportunities.",
  },
  business: {
    heading: "Your search is in hand.",
    body: "We'll take a look at your brief and come back with a short, considered introduction. You only pay once they start.",
  },
  partner: {
    heading: "Welcome to the network.",
    body: "Thanks for reaching out. We'll be in touch shortly to explore what building together could look like.",
  },
};

function ThankYouInner() {
  const params = useSearchParams();
  const type = params.get("type") ?? "talent";
  const msg = messages[type] ?? messages.talent;

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-deep-forest px-6 text-center text-cream">
      <motion.svg
        viewBox="0 0 200 100"
        className="w-40 text-gold-cta md:w-52"
        initial="hidden"
        animate="visible"
        aria-hidden
      >
        <motion.path
          d="M25 50 C 10 10, 30 10, 50 50 S 90 90, 100 50 S 120 10, 150 50 S 195 90, 175 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        />
      </motion.svg>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="microlabel mt-8 text-gold-cta"
      >
        Received
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-4 max-w-2xl text-4xl leading-tight md:text-5xl"
      >
        {msg.heading}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="mt-6 max-w-md leading-relaxed text-cream/70"
      >
        {msg.body}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-10"
      >
        <Link href="/" className="btn-gold">
          Back to home
        </Link>
      </motion.div>
    </section>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-deep-forest text-cream">
          <span className="animate-float text-6xl font-bold text-gold-cta">∞</span>
        </section>
      }
    >
      <ThankYouInner />
    </Suspense>
  );
}