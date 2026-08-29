"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ApplicationType, Submission } from "@/lib/types";
import { STATUS_PIPELINE } from "@/lib/types";
import { formatTime, cn } from "@/lib/utils";

function Field({ label, value, href }: { label: string; value: string; href?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/50">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-forest-mid/90">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold-cta underline-offset-2 hover:text-gold-cta"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="rounded-md border border-forest-mid/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/70 hover:border-gold-cta hover:text-gold-cta"
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}

export function DetailDrawer({
  submission,
  type,
  onStatus,
  onNotes,
  onDelete,
  onClose,
}: {
  submission: Submission | null;
  type: ApplicationType;
  onStatus: (id: string, status: string) => void;
  onNotes: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(submission?.internalNotes ?? "");
  }, [submission?.id, submission?.internalNotes]);

  const saveNotes = () => {
    if (!submission) return;
    setSaving(true);
    onNotes(submission.id, draft);
    setTimeout(() => setSaving(false), 500);
  };

  return (
    <AnimatePresence>
      {submission && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-cream text-[color:var(--color-ink)] shadow-2xl rounded-xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-forest-mid/10 p-5">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-microlabel text-gold-cta">
                  {type} submission
                </p>
                <h2 className="mt-1 truncate text-xl text-forest-mid">
                  {nameOf(submission)}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Delete this submission? This cannot be undone."))
                      onDelete(submission.id);
                  }}
                  className="rounded-md border border-red-300 px-3 py-1.5 font-mono text-[11px] uppercase tracking-microlabel text-red-700 hover:border-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-forest-mid/20 px-3 py-1.5 font-mono text-sm text-forest-mid/70 hover:border-gold-cta hover:text-gold-cta"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto p-5">
              <div className="rounded-md border border-gold-cta/30 bg-white p-4">
                <p className="font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/50">
                  Status
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STATUS_PIPELINE.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onStatus(submission.id, s)}
                      className={cn(
                        "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-microlabel",
                        submission.status === s
                          ? "border-gold-cta bg-gold-cta text-deep-forest"
                          : "border-forest-mid/25 text-forest-mid/70 hover:border-gold-cta"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <CopyButton label="Copy email" value={submission.email} />
                <CopyButton label="Copy phone" value={submission.phone} />
                <a href={`mailto:${submission.email}`} className="btn-gold !px-4 !py-2 text-sm">
                  Email {type === "talent" ? "talent" : "contact"}
                </a>
              </div>

              <dl className="space-y-4">
                {submission.type === "talent" && (
                  <>
                    <Field label="Full name" value={submission.fullName} />
                    <Field label="Email" value={submission.email} />
                    <Field label="Phone / WhatsApp" value={submission.phone} />
                    <Field label="City" value={submission.city} />
                    <Field label="Country" value={submission.country} />
                    <Field label="Primary skills" value={(submission.primarySkills ?? []).join(", ")} />
                    {submission.primarySkillsOther && (
                      <Field label="Other skills specified" value={submission.primarySkillsOther} />
                    )}
                    <Field label="Experience level" value={submission.experienceLevel} />
                    <Field label="Availability" value={submission.availability} />
                    <Field label="Portfolio / work samples" value={submission.portfolioUrl ?? ""} href={submission.portfolioUrl} />
                    <Field label="Software / tools" value={submission.tools ?? ""} />
                    <Field label="Resume / portfolio file" value={submission.resumeFileUrl ?? ""} href={submission.resumeFileUrl} />
                    <Field label="Experience details" value={submission.experienceDetails ?? ""} />
                    <Field label="Expected minimum rate" value={submission.expectedRate ?? ""} />
                    <Field label="How did you hear" value={submission.referralSource ?? ""} />
                  </>
                )}
                {submission.type === "hiring" && (
                  <>
                    <Field label="Company / business name" value={submission.companyName} />
                    <Field label="Contact person" value={submission.contactName} />
                    <Field label="Email" value={submission.email} />
                    <Field label="Phone / WhatsApp" value={submission.phone} />
                    <Field label="Services required" value={(submission.services ?? []).join(", ")} />
                    <Field label="Other service" value={submission.otherService ?? ""} />
                    <Field label="Project description" value={submission.projectDescription} />
                    <Field label="Budget" value={submission.budget} />
                    <Field label="Currency" value={submission.budgetCurrency ?? ""} />
                    <Field label="Deadline" value={submission.deadline} />
                    <Field label="Reference file" value={submission.referenceFileUrl ?? ""} href={submission.referenceFileUrl} />
                    <Field label="Additional notes" value={submission.additionalNotes ?? ""} />
                  </>
                )}
                {submission.type === "partner" && (
                  <>
                    <Field label="Business name" value={submission.businessName} />
                    <Field label="Contact person" value={submission.contactName} />
                    <Field label="Email" value={submission.email} />
                    <Field label="Phone / WhatsApp" value={submission.phone} />
                    <Field label="Industry" value={submission.industry} />
                    <Field label="Company size" value={submission.companySize} />
                    <Field label="Designation" value={submission.designation ?? ""} />
                    <Field label="Website / social" value={submission.websiteUrl ?? ""} href={submission.websiteUrl} />
                    <Field label="Types of hiring" value={submission.hiringType} />
                    <Field label="Preferred work mode" value={submission.workMode} />
                    <Field label="Roles usually hired for" value={submission.rolesHired ?? ""} />
                    <Field label="Additional information" value={submission.whyPartner} />
                  </>
                )}
                <Field label="Received" value={formatTime(submission.createdAt)} />
              </dl>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-microlabel text-forest-mid/50">
                  Internal notes
                </label>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={saveNotes}
                  placeholder="Thoughts for the team — not shown to anyone outside the dashboard. Autosaves on blur."
                  className="mt-2 w-full rounded-md border border-forest-mid/20 bg-white px-3 py-2.5 text-sm text-[color:var(--color-ink)] placeholder:text-forest-mid/40 focus:border-gold-cta focus:outline-none"
                  rows={4}
                />
                <p className="mt-1 text-xs text-forest-mid/50">
                  {saving ? "Saving…" : "Autosaves when you leave the field."}
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function nameOf(s: Submission): string {
  if (s.type === "talent") return s.fullName;
  if (s.type === "hiring") return s.companyName;
  return s.businessName;
}
