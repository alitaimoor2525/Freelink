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
  hiringSchema,
  SERVICES_OPTIONS,
  BUDGET_OPTIONS,
  BUDGET_OPTIONS_PKR,
  CURRENCIES,
  type HiringValues,
} from "@/lib/validation/schemas";
import { submitApplication } from "@/lib/submit";

export function BusinessForm() {
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  const steps: WizardStep[] = [
    {
      title: "About your company",
      subtitle: "Just enough to know who we're talking to.",
      fields: ["companyName", "contactName", "email", "phone", "hp"],
      content: (form) => (
        <>
<Field label="Company / business name" error={form.formState.errors.companyName?.message} required id="companyName">
              <TextInput placeholder="Acme Studio" {...form.register("companyName")} autoComplete="name" />
            </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Contact person name" error={form.formState.errors.contactName?.message} required id="contactName">
              <TextInput placeholder="Jordan Lee" {...form.register("contactName")} />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message} required id="email">
              <TextInput type="email" placeholder="jordan@acme.co" {...form.register("email")} autoComplete="email" />
            </Field>
          </div>
<Field label="Phone / WhatsApp" error={form.formState.errors.phone?.message} required id="phone">
              <TextInput type="tel" placeholder="+92 300 0000000" {...form.register("phone")} autoComplete="tel" />
            </Field>
          <HoneypotField register={form.register} />
        </>
      ),
    },
    {
      title: "The services",
      subtitle: "What do you actually need done?",
      fields: ["services", "otherService", "projectDescription"],
      content: (form) => {
        const services = (form.watch("services") as string[]) || [];
        const hasOther = services.includes("Other");
        return (
          <>
            <Field label="Services required" error={form.formState.errors.services?.message} required>
              <ChoiceGroup
                control={form.control}
                name="services"
                options={SERVICES_OPTIONS}
                multi
              />
            </Field>
            {hasOther && (
              <Field label="If other, please specify" error={form.formState.errors.otherService?.message}>
                <TextInput placeholder="The service you have in mind…" {...form.register("otherService")} />
              </Field>
            )}
            <Field
              label="Project description"
              hint="What needs to get done?"
              error={form.formState.errors.projectDescription?.message}
              required
            >
              <TextArea
                placeholder="The responsibilities, the scope, what success looks like…"
                {...form.register("projectDescription")}
              />
            </Field>
          </>
        );
      },
    },
    {
      title: "The finer details",
      subtitle: "Budget, timing and anything we should know.",
      fields: ["budgetCurrency", "budget", "deadline", "agree"],
      content: (form) => {
        const currency = form.watch("budgetCurrency") as string | undefined;
        const budgetOptions = currency === "PKR (₨)" ? BUDGET_OPTIONS_PKR : BUDGET_OPTIONS;
        return (
          <>
            <Field label="Budget currency" error={form.formState.errors.budgetCurrency?.message} required>
              <ChoiceGroup
                control={form.control}
                name="budgetCurrency"
                options={CURRENCIES}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Budget" error={form.formState.errors.budget?.message} required>
                <SelectField {...form.register("budget")}>
                  <option value="" disabled>Select a range…</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </SelectField>
              </Field>
              <Field
                label="Deadline"
                hint="Pick a date from the calendar"
                error={form.formState.errors.deadline?.message}
                required
              >
                <TextInput type="date" min="2026-08-14" {...form.register("deadline")} />
              </Field>
            </div>
            <Field label="Reference file (optional)" hint="A brief, spec or example link to work from — PDF, DOC, 5 MB max.">
              <FileInput onSelect={setReferenceFile} />
            </Field>
            <Field label="Additional notes (optional)">
              <TextArea
                placeholder="Anything else we should know…"
                {...form.register("additionalNotes")}
              />
            </Field>
            <Field label="Consent" error={form.formState.errors.agree?.message} required>
              <CheckboxField control={form.control} name="agree">
                I agree to be contacted and to Freelink storing this information.
              </CheckboxField>
            </Field>
          </>
        );
      },
    },
  ];

  return (
    <Wizard
      schema={hiringSchema}
      steps={steps}
      submitLabel="Submit hiring request"
      thankYouHref="/thank-you?type=business"
      onSubmit={(data) => submitApplication("hiring", data as HiringValues, referenceFile)}
    />
  );
}