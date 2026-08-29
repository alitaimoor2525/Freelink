"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Industries", href: "/#industries" },
  { label: "Become a partner", href: "/partner" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Admin has its own single header bar — the site nav must not overlap it.
  if (pathname.startsWith("/admin")) return null;

  const isScrolled = scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        // Always solid cream background, subtle scroll effect: blur + shadow after 50px
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out"
          : "bg-cream/95 backdrop-blur-sm transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out"
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Freelink home">
          <span className="text-2xl font-bold leading-none text-gold-cta">
            ∞
          </span>
          <span className="font-mono text-sm font-bold uppercase tracking-microlabel text-forest-mid">
            Freelink
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-[11px] uppercase tracking-microlabel transition-colors hover:text-gold-cta",
                "text-forest-mid"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/business#brief"
            className="btn-gold !px-5 !py-2.5"
          >
            I&apos;m Hiring
          </Link>
          <Link
            href="/talent#apply"
            className={cn(iconGhost, "!border-forest-mid/40 !text-forest-mid hover:!border-forest-mid")}
          >
            I&apos;m Looking for Work
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn("lg:hidden text-forest-mid")}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="flex h-6 w-7 flex-col justify-center gap-1.5">
            <span className={cn("block h-0.5 w-7 bg-current transition-transform", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-7 bg-current transition-transform", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-cream lg:hidden"
          >
            <div className="container flex flex-col gap-5 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 font-mono text-xs uppercase tracking-microlabel text-forest-mid"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3">
                <Link href="/business#brief" className="btn-gold w-full">
                  I&apos;m Hiring
                </Link>
                <Link href="/talent#apply" className={cn(iconGhost, "!border-forest-mid/40 !text-forest-mid")}>
                  I&apos;m Looking for Work
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const iconGhost = "btn border border-gold-cta/40 px-5 py-2.5 text-sm !text-gold-cta hover:bg-gold-cta/10";