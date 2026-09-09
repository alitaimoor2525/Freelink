"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, type UseFormReturn, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z, ZodTypeAny } from "zod";

export interface WizardStep {
  title: string;
  subtitle?: string;
  /** Field names that must validate before this step can advance. */
  fields: string[];
  content: (form: UseFormReturn<FieldValues>) => React.ReactNode;
}

export function Wizard({
  schema,
  steps,
  submitLabel,
  thankYouHref,
  onSubmit,
}: {
  schema: ZodTypeAny;
  steps: WizardStep[];
  submitLabel: string;
  thankYouHref: string;
  onSubmit: (data: unknown) => Promise<{ ok: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const stepValid = async () => {
    const valid = await form.trigger();
    return valid;
  };

  const next = async () => {
    const ok = await form.trigger(steps[step].fields as string[]);
    if (!ok) return;
    setSubmitError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finish = async () => {
    const ok = await stepValid();
    if (!ok) {
      // Find the first step with errors and navigate back to it
      const erroneousStepIndex = steps.findIndex((s) =>
        s.fields.some((f) => f in form.formState.errors)
      );
      if (erroneousStepIndex >= 0 && erroneousStepIndex < step) {
        setStep(erroneousStepIndex);
      }
      setSubmitError("Please fill in all required fields before submitting.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const values = form.getValues();
      const res = await onSubmit(values);
      if (res.ok) {
        router.push(thankYouHref);
      } else {
        setSubmitError(res.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const isLast = step === steps.length - 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-4">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center gap-3">
            <span
              className={
                i <= step
                  ? "font-mono text-xs tracking-microlabel text-gold-cta"
                  : "font-mono text-xs tracking-microlabel text-forest-mid/40"
              }
            >
              0{i + 1}
            </span>
            {i < steps.length - 1 && (
              <span
                className={
                  i < step ? "h-px w-10 bg-gold-cta" : "h-px w-10 bg-forest-mid/20"
                }
              />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-forest-mid/15 bg-white shadow-[0_4px_16px_rgba(15,36,25,0.06)] p-4 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="microlabel mb-3 text-gold-cta">
              Step {step + 1} of {steps.length}
            </p>
            <h2 className="text-2xl md:text-3xl text-forest-mid">{steps[step].title}</h2>
            {steps[step].subtitle && (
              <p className="mt-2 text-sm text-forest-mid/70">
                {steps[step].subtitle}
              </p>
            )}
            <div className="mt-8 space-y-5">{steps[step].content(form)}</div>
          </motion.div>
        </AnimatePresence>
        {submitError && (
          <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}
        <div className="mt-8 flex items-center justify-between border-t border-forest-mid/10 pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || submitting}
            className="btn !px-4 !py-2.5 !text-[color:var(--color-ink)] disabled:opacity-40"
          >
            Back
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={finish}
              disabled={submitting}
              className="btn-gold disabled:opacity-60"
            >
              {submitting ? "Sending…" : submitLabel}
            </button>
          ) : (
            <button type="button" onClick={next} className="btn-gold">
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}