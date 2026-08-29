import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Note" };

const sections = [
  {
    title: "What we collect",
    body: "Only what you choose to give us: your name, contact details, the answers to the form you filled in, and — if you're applying as talent — your resume. We never collect more than the form asks for.",
  },
  {
    title: "Why we hold it",
    body: "To evaluate your application, respond to you, and — where there's a genuine fit — introduce you to a business. We don't sell, rent, or share your information with anyone outside of that purpose.",
  },
  {
    title: "Who can see it",
    body: "A small number of Freelink team members only. Your details are never published, never exposed through a public page or API, and are never visible to other applicants or visitors.",
  },
  {
    title: "How long we keep it",
    body: "We keep applications for as long as they're useful for matching you, and delete them when you ask. To request deletion or correction, email us and we'll act on it within 30 days.",
  },
  {
    title: "Your resume",
    body: "Resumes are stored securely with restricted access and are never publicly readable. If you'd prefer us not to keep a copy, tell us and we'll remove it.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-cream pb-24 text-forest-mid">
      <div className="container max-w-3xl">
        <p className="microlabel pt-16 text-gold-cta">Freelink</p>
        <h1 className="mt-3 text-4xl leading-tight md:text-5xl">
          Privacy note
        </h1>
        <p className="mt-4 text-forest-mid">
          A short, plain-language note on how we handle your information when you
          apply through our forms. We keep it simple because we think privacy
          should be simple.
        </p>

        <div className="mt-12 space-y-8">
          {sections.map((s) => (
            <section key={s.title} className="rounded-2xl border border-deep-forest/10 bg-white p-6">
              <h2 className="font-serif text-xl">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-forest-mid">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-forest-mid">
          Questions or requests? Email{" "}
          <a href="mailto:connect.freelink@gmail.com" className="text-gold-cta underline underline-offset-2 hover:text-gold-cta">
            connect.freelink@gmail.com
          </a>.
        </p>
      </div>
    </main>
  );
}
