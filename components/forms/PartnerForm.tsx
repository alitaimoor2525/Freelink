"use client";

import { Wizard, type WizardStep } from "@/components/forms/Wizard";
import {
  Field,
  TextInput,
  TextArea,
  SelectField,
  ChoiceGroup,
  CheckboxField,
  HoneypotField,
} from "@/components/ui/primitives";
import {
  partnerSchema,
  INDUSTRIES,
  COMPANY_SIZES,
  HIRING_TYPES,
  WORK_MODES,
  type PartnerValues,
} from "@/lib/validation/schemas";
import { submitApplication } from "@/lib/submit";

export function PartnerForm() {
  const steps: WizardStep[] = [
    {
      title: "Who you are",
      subtitle: "A little context on your business.",
      fields: ["businessName", "contactName", "email", "phone", "hp"],
      content: (form) => (
        <>
<Field label="Company name" error={form.formState.errors.businessName?.message} required id="businessName">
              <TextInput placeholder="Bright Futures Collective" {...form.register("businessName")} />
            </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Contact person name" error={form.formState.errors.contactName?.message} required id="contactName">
              <TextInput placeholder="Mei Chen" {...form.register("contactName")} />
            </Field>
            <Field label="Business email" error={form.formState.errors.email?.message} required id="email">
              <TextInput type="email" placeholder="mei@collective.org" {...form.register("email")} />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone number" error={form.formState.errors.phone?.message} required id="phone">
              <TextInput type="tel" placeholder="+92 300 0000000" {...form.register("phone")} />
            </Field>
            <Field label="Designation (optional)">
              <TextInput placeholder="e.g. Partnerships Lead" {...form.register("designation")} />
            </Field>
          </div>
          <HoneypotField register={form.register} />
        </>
      ),
    },
    {
      title: "Your business",
      subtitle: "So we know what kind of work you bring.",
      fields: ["industry", "companySize", "hiringType", "workMode", "whyPartner", "agree"],
      content: (form) => (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Industry" error={form.formState.errors.industry?.message} required>
              <SelectField {...form.register("industry")}>
                <option value="" disabled>Select…</option>
                {INDUSTRIES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </SelectField>
            </Field>
            <Field label="Company size" error={form.formState.errors.companySize?.message} required>
              <SelectField {...form.register("companySize")}>
                <option value="" disabled>Select…</option>
                {COMPANY_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </SelectField>
            </Field>
          </div>
          <Field label="Company website (optional)">
            <TextInput type="url" placeholder="https://…" {...form.register("websiteUrl")} />
          </Field>
          <Field label="Preferred work mode" error={form.formState.errors.workMode?.message} required>
            <ChoiceGroup control={form.control} name="workMode" options={WORK_MODES} />
          </Field>
          <Field label="What type of hiring do you usually make?" error={form.formState.errors.hiringType?.message} required>
            <ChoiceGroup control={form.control} name="hiringType" options={HIRING_TYPES} />
          </Field>
          <Field label="What roles do you usually hire for? (optional)">
            <TextArea
              placeholder="Designers, developers, writers, VAs…"
              {...form.register("rolesHired")}
            />
          </Field>
          <Field label="Additional information" hint="Any comments or hiring requirements?" error={form.formState.errors.whyPartner?.message} required>
            <TextArea
              placeholder="A program you run, a community you support, an idea you want to try…"
              {...form.register("whyPartner")}
            />
          </Field>
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
      schema={partnerSchema}
      steps={steps}
      submitLabel="Submit partnership request"
      thankYouHref="/thank-you?type=partner"
      onSubmit={(data) => submitApplication("partner", data as PartnerValues)}
    />
  );
}