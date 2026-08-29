"use client";

import { useState } from "react";
import { Wizard, type WizardStep } from "@/components/forms/Wizard";
import {
  Field,
  TextInput,
  TextArea,
  SelectField,
  ChoiceGroup,
  CheckboxField,
  FileInput,
  HoneypotField,
} from "@/components/ui/primitives";
import {
  talentSchema,
  TALENT_SKILLS,
  EXPERIENCE_LEVELS,
  AVAILABILITY_OPTIONS,
  HEAR_SOURCES,
  type TalentValues,
} from "@/lib/validation/schemas";
import { submitApplication } from "@/lib/submit";

export function TalentForm() {
  const [resume, setResume] = useState<File | null>(null);

  const steps: WizardStep[] = [
    {
      title: "The basics",
      subtitle: "So we know who we're talking to.",
      fields: ["fullName", "email", "phone", "city", "country", "hp"],
      content: (form) => (
        <>
<Field label="Full name" error={form.formState.errors.fullName?.message} required id="fullName">
              <TextInput placeholder="Priya Kumar" {...form.register("fullName")} autoComplete="name" />
            </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email address" error={form.formState.errors.email?.message} required id="email">
              <TextInput type="email" placeholder="you@email.com" {...form.register("email")} autoComplete="email" />
            </Field>
            <Field label="WhatsApp number" error={form.formState.errors.phone?.message} required id="phone">
              <TextInput type="tel" placeholder="+92 300 0000000" {...form.register("phone")} autoComplete="tel" />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" error={form.formState.errors.city?.message} required id="city">
              <TextInput placeholder="e.g. Lahore" {...form.register("city")} />
            </Field>
            <Field label="Country" error={form.formState.errors.country?.message} required id="country">
              <TextInput placeholder="e.g. Pakistan" {...form.register("country")} />
            </Field>
          </div>
          <HoneypotField register={form.register} />
        </>
      ),
    },
    {
      title: "Your work",
      subtitle: "What you do, your experience, and when you're free.",
      fields: ["primarySkills", "primarySkillsOther", "experienceLevel", "availability"],
      content: (form) => {
        const skills = (form.watch("primarySkills") as string[]) || [];
        const hasOther = skills.includes("Other");
        return (
          <>
            <Field label="Primary skills" error={form.formState.errors.primarySkills?.message} required>
              <ChoiceGroup
                control={form.control}
                name="primarySkills"
                options={TALENT_SKILLS}
                multi
              />
            </Field>
            {hasOther && (
              <Field label="If other, please specify" error={form.formState.errors.primarySkillsOther?.message}>
                <TextInput placeholder="Your skill or field…" {...form.register("primarySkillsOther")} />
              </Field>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Experience level" error={form.formState.errors.experienceLevel?.message} required>
                <SelectField {...form.register("experienceLevel")}>
                  <option value="" disabled>Select your level…</option>
                  {EXPERIENCE_LEVELS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </SelectField>
              </Field>
              <Field label="Availability" error={form.formState.errors.availability?.message} required>
                <SelectField {...form.register("availability")}>
                  <option value="" disabled>Select availability…</option>
                  {AVAILABILITY_OPTIONS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </SelectField>
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Portfolio / work samples link (optional)">
                <TextInput type="url" placeholder="https://…" {...form.register("portfolioUrl")} />
              </Field>
              <Field label="Software / tools you use (optional)">
                <TextInput placeholder="e.g. Figma, Illustrator, Notion" {...form.register("tools")} />
              </Field>
            </div>
            <Field label="Resume / portfolio file (optional)" hint="PDF or DOC, 5 MB max.">
              <FileInput onSelect={setResume} />
            </Field>
          </>
        );
      },
    },
    {
      title: "A little more",
      subtitle: "The details that help us match you well.",
      fields: ["experienceDetails", "agree"],
      content: (form) => (
        <>
          <Field
            label="Experience details"
            hint="Anything that shows how you work — projects, clients, outcomes."
            error={form.formState.errors.experienceDetails?.message}
            required
          >
            <TextArea
              maxLength={1200}
              placeholder="How long have you been working? What are you proud of?"
              {...form.register("experienceDetails")}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Expected minimum rate (optional)" hint="e.g. $15/hr or PKR 40k/mo">
              <TextInput placeholder="e.g. PKR 40k/mo" {...form.register("expectedRate")} />
            </Field>
            <Field label="How did you hear about us? (optional)">
              <SelectField {...form.register("referralSource")}>
                <option value="">Select…</option>
                {HEAR_SOURCES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </SelectField>
            </Field>
          </div>
          <Field label="Consent" error={form.formState.errors.agree?.message} required>
            <CheckboxField control={form.control} name="agree">
              I agree to be contacted and to Freelink storing this information.
            </CheckboxField>
          </Field>
        </>
      ),
    },
  ];

  return (
    <Wizard
      schema={talentSchema}
      steps={steps}
      submitLabel="Submit as talent"
      thankYouHref="/thank-you?type=talent"
      onSubmit={(data) => submitApplication("talent", data as TalentValues, resume)}
    />
  );
}