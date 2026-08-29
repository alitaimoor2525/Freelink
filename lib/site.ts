export const siteConfig = {
  name: "Freelink",
  tagline: "No Profiles, Just People",
  description:
    "Freelink is a curated hiring platform that manually matches vetted talent with businesses. No profiles, just people.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://freelink.app",
  email: "connect.freelink@gmail.com",
  phone: "+92 326 5871348",
  adminEmails: (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

export const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "For Talent", href: "/#for-talent" },
  { label: "For Hiring", href: "/#for-hiring" },
  { label: "For Partners", href: "/#for-partners" },
] as const;