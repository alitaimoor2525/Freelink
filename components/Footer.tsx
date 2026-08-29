"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Infinity edge: slide a dot along the progress line under the navbar.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 1.5rem)"]);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <motion.div style={{ scaleX }} className="h-full origin-left bg-gold-cta" />
      <motion.span
        aria-hidden
        style={{ x }}
        className="absolute -top-[7px] left-0 font-mono text-[14px] font-bold leading-none text-gold-cta"
      >
        ∞
      </motion.span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-deep-forest text-cream/80">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 right-0 text-[40vw] font-bold text-gold-cta/[0.04]"
      >
        ∞
      </div>

      <div className="container relative z-10 grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-gold-cta">∞</span>
            <span className="font-mono text-sm font-semibold tracking-microlabel text-cream">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
            {siteConfig.tagline}. We match vetted professionals with the right
            teams — by hand, one person at a time.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 transition-colors hover:text-gold-cta"
            >
              <span className="font-mono text-[11px] uppercase tracking-microlabel text-cream/50">Email</span>
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-gold-cta"
            >
              <span className="font-mono text-[11px] uppercase tracking-microlabel text-cream/50">Phone</span>
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <div>
          <h3 className="microlabel mb-4 text-cream/50">Work with us</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/talent#apply" className="transition-colors hover:text-gold-cta">For talent</Link></li>
            <li><Link href="/business#brief" className="transition-colors hover:text-gold-cta">For business</Link></li>
            <li><Link href="/partner#apply" className="transition-colors hover:text-gold-cta">Become a partner</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="microlabel mb-4 text-cream/50">Social</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="https://www.facebook.com/share/14tiF9oAZPo/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-cta">Facebook</a></li>
            <li><a href="https://www.linkedin.com/company/freelinkofficial/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-cta">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/freelink.official" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-cta">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-6">
        <div className="container flex flex-col items-center justify-between gap-3 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-gold-cta">
              Privacy note
            </Link>
            <span aria-hidden className="font-mono uppercase tracking-microlabel">
              No profiles, just people.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}