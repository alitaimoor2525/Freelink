import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ValueCards } from "@/components/ValueCards";
import { About } from "@/components/About";
import { TwoWaySplit } from "@/components/TwoWaySplit";
import { HowItWorks } from "@/components/HowItWorks";
import { Industries } from "@/components/Industries";
import { Founder } from "@/components/Founder";
import { HomeCta } from "@/components/HomeCta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "No Profiles, Just People",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.tagline,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  knowsAbout: [
    "talent marketplace",
    "freelance hiring",
    "vetted talent",
    "business hiring",
    "content writing",
  ],
  founder: {
    "@type": "Person",
    name: "Taiba Qadri",
    jobTitle: "Founder, Freelink",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <ValueCards />
      <div
        aria-hidden
        className="h-24 w-full bg-gradient-to-b from-white to-cream"
      />
      <About />
      <TwoWaySplit />
      <HowItWorks />
      <Industries />
      <Founder />
      <HomeCta />
    </>
  );
}