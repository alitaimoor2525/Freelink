"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-gold-cta py-24 text-deep-forest">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,36,25,0.15)_1px,transparent_0)] bg-[length:28px_28px]"
      />
      <div className="container relative z-10 text-center">
        <Reveal>
          <p className="microlabel mx-auto mb-5 inline-block border border-deep-forest/30 px-3 py-1.5">
            No profiles, just people
          </p>
          <h2 className="mx-auto max-w-2xl text-5xl leading-tight md:text-7xl">
            Ready to hire? <span className="font-serif italic">Let&apos;s go.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-deep-forest/75">
            Tell us what you need and we&apos;ll find the person. You only pay
            once they actually start.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/business#brief" className="btn bg-deep-forest text-gold-cta hover:bg-forest-mid">
              I&apos;m hiring
            </Link>
            <Link href="/talent#apply" className="btn border border-deep-forest/40 text-deep-forest hover:border-deep-forest">
              I&apos;m looking for work
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}