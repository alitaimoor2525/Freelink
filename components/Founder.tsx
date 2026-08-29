"use client";

import { motion } from "framer-motion";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function Founder() {
  return (
    <section className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: premiumEase }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 md:px-6 max-w-5xl"
      >
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* LEFT COLUMN: Founder info */}
          <div className="sticky top-24 md:top-24 w-full md:w-auto z-10">
            {/* "MEET THE FOUNDER" label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-xs text-gray-500 uppercase tracking-widest mb-2"
            >
              MEET THE FOUNDER
            </motion.p>

            {/* "Taiba Qadri" large bold serif heading */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2"
            >
              Taiba Qadri
            </motion.h3>

            {/* "FOUNDER, FREELINK" smaller subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg text-gray-600"
            >
              FOUNDER, FREELINK
            </motion.p>

            {/* Small square logo box with infinity logo icon */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-3 rounded-sm border border-[var(--gold)] bg-transparent p-2"
            >
              <img
                src="/eternity-logo.png"
                alt="Freelink logo"
                className="h-10 w-10 object-contain"
              />
            </motion.div>

            {/* Three pill-shaped tags: HUMAN, OPPORTUNITY, TRUST */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-4 grid grid-cols-3 gap-2"
            >
              <span
                className="rounded-full border border-[var(--warm-gold)] bg-transparent text-xs font-medium text-[#1b4332] px-2 py-1"
              >
                HUMAN
              </span>
              <span
                className="rounded-full border border-[var(--warm-gold)] bg-transparent text-xs font-medium text-[#1b4332] px-2 py-1"
              >
                OPPORTUNITY
              </span>
              <span
                className="rounded-full border border-[var(--warm-gold)] bg-transparent text-xs font-medium text-[#1b4332] px-2 py-1"
              >
                TRUST
              </span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Founder story text */}
          <div className="space-y-4 text-gray-800 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Behind Freelink is someone who knows both sides of the gap.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Taiba Qadri is a content writer, communicator, and founder who has
              spent years working in the world of freelancing and digital content.
              Before building Freelink, she spent over five years as a freelance
              content writer, working independently, managing clients, meeting
              deadlines, and navigating the realities of finding work online. Her
              professional background also spans documentation, international
              media, content development, and cross-cultural communication.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.66 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              It was through that experience that she began to notice a problem
              that felt bigger than freelancing itself.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.74 }}
              viewport={{ once: true, amount: 0.3 }}
              className="border-l-4 border-[var(--gold)] pl-4"
            >
              Later, when she stepped into the business side, she saw the other
              half of the same problem.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.82 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Businesses weren&apos;t necessarily lacking access to skilled people.
              They were lacking connection. Finding the right person could take
              hours of searching, filtering, comparing, and guessing.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              That&apos;s where the idea for Freelink came from.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.98 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Taiba wanted to build something that connected the two sides more
              intentionally, a space where businesses could find the talent they
              actually need, and where talented professionals could connect with
              opportunities without getting lost in an overcrowded marketplace.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 1.06 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              But Freelink is also a reflection of the kind of work environment
              Taiba believes in.
            </motion.p>

            {/* Pull-quote: italic serif, larger, dark green-black */}
            <motion.p
              initial={{ opacity: 0, y: 10, fontSize: "1rem", color: "rgb(30 30 30)" }}
              animate={{ opacity: 1, y: 0, fontSize: "1.25rem", color: "rgb(15 36 25)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.14 }}
              viewport={{ once: true, amount: 0.3 }}
              className="font-serif fontitalic text-gray-900 text-lg"
            >
              For Taiba, Freelink isn&apos;t simply about matching businesses with
              talent. It&apos;s about making the distance between the two a little
              smaller, and making the process of finding the right connection a
              lot more human.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
  );
}