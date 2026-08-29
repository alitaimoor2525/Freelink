import { z } from "zod";

const email = z.string().trim().email("Enter a valid email address.");
const phone = z
  .string()
  .trim()
  .min(1, "We need a way to reach you by phone or WhatsApp.");
const agree = z.literal(true, {
  errorMap: () => ({ message: "We need your OK to reach out." }),
});

// Honeypot spam trap — kept out of view by the form's hidden field. Bots
// tend to autofill it; humans leave it empty. Not part of stored data.
const honeypot = z.string().max(0, "").optional().or(z.literal(""));

export const SKILL_CATEGORIES = [
  "Marketing",
  "Graphic Design",
  "Web Development",
  "Video Editing",
  "Customer Support",
  "Virtual Assistance",
  "Accounting",
  "Sales",
  "Writing",
  "HR",
  "AI Automation",
  "Data Entry",
  "Other",
] as const;

export const TALENT_SKILLS = [
  "Graphic Design",
  "Digital Marketing",
  "Content Writing",
  "Web Development",
  "Social Media Management",
  "Video Editing",
  "Virtual Assistance",
  "Other",
] as const;

export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Experienced", "Professional"] as const;

export const AVAILABILITY_OPTIONS = ["Full-time", "Part-time", "Flexible"] as const;

export const SERVICES_OPTIONS = [
  "Graphic design",
  "Logo Design",
  "Video editing",
  "Content Writing",
  "Copywriting",
  "Digital Marketing",
  "Web development",
  "Social media management",
  "Data Entry",
  "UI/UX Designing",
  "Virtual Assistant",
  "SEO",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "$1k – $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
  "We'll discuss this",
] as const;

export const BUDGET_OPTIONS_PKR = [
  "₨50k – ₨100k",
  "₨100k – ₨250k",
  "₨250k – ₨500k",
  "₨500k – ₨1M",
  "₨1M+",
  "We'll discuss this",
] as const;

export const CURRENCIES = ["USD ($)", "PKR (₨)"] as const;

export const HIRING_TYPES = ["Full-time", "Contract-based", "Project-based", "Part-time"] as const;

export const WORK_MODES = ["Remote", "On-site", "Hybrid"] as const;

export const HEAR_SOURCES = ["Instagram", "LinkedIn", "Referral", "Other"] as const;

export const COMPANY_SIZES = ["1-10", "11-50", "50+"] as const;

export const INDUSTRIES = [
  "Community",
  "School / program",
  "Agency",
  "Co-working space",
  "Small business",
  "Other",
] as const;

const requiredEnum = (values: readonly [string, ...string[]], message: string) =>
  z.enum(values, { errorMap: () => ({ message }) });

export const talentSchema = z
  .object({
    fullName: z.string().trim().min(1, "Your full name, please."),
    email,
    phone,
    city: z.string().trim().min(1, "Where are you based?"),
    country: z.string().trim().min(1, "Which country are you in?"),
    primarySkills: z.array(z.string()).min(1, "Choose at least one skill."),
    primarySkillsOther: z.string().trim().optional().or(z.literal("")),
    experienceLevel: requiredEnum(EXPERIENCE_LEVELS, "Select your level."),
    availability: requiredEnum(AVAILABILITY_OPTIONS, "Select your availability."),
    portfolioUrl: z
      .string()
      .trim()
      .url("Paste a full link (https://…)")
      .optional()
      .or(z.literal("")),
    tools: z.string().trim().optional().or(z.literal("")),
    experienceDetails: z.string().trim().optional().or(z.literal("")),
    expectedRate: z.string().trim().optional().or(z.literal("")),
    referralSource: z.enum(HEAR_SOURCES).optional().or(z.literal("")),
    hp: honeypot,
    agree,
  })
  .superRefine((v, ctx) => {
    if (v.primarySkills.includes("Other") && !v.primarySkillsOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["primarySkillsOther"],
        message: "Tell us what 'Other' skills are.",
      });
    }
  });

export const hiringSchema = z
  .object({
    companyName: z.string().trim().min(1, "Your company's name."),
    contactName: z.string().trim().min(1, "Who are we talking to?"),
    email,
    phone,
    services: z
      .array(z.string())
      .min(1, "Pick at least one service you need."),
    otherService: z.string().trim().optional().or(z.literal("")),
    projectDescription: z
      .string()
      .trim()
      .min(1, "Tell us what needs to get done."),
    budget: requiredEnum([...BUDGET_OPTIONS, ...BUDGET_OPTIONS_PKR] as [string, ...string[]], "Choose a rough budget."),
    budgetCurrency: requiredEnum(CURRENCIES, "Choose a currency."),
    deadline: z.string().min(1, "When do you need this done?"),
    additionalNotes: z.string().trim().optional().or(z.literal("")),
    hp: honeypot,
    agree,
  })
  .superRefine((v, ctx) => {
    if (v.services.includes("Other") && !v.otherService?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherService"],
        message: "Tell us what 'Other' is.",
      });
    }
  });

export const partnerSchema = z.object({
  businessName: z.string().trim().min(1, "Your business's name."),
  contactName: z.string().trim().min(1, "Who are we talking to?"),
  email,
  phone,
  industry: requiredEnum(INDUSTRIES, "Choose a business type."),
  websiteUrl: z
    .string()
    .trim()
    .url("Paste a full link (https://…)")
    .optional()
    .or(z.literal("")),
  companySize: requiredEnum(COMPANY_SIZES, "Choose a company size."),
  designation: z.string().trim().optional().or(z.literal("")),
  rolesHired: z.string().trim().optional().or(z.literal("")),
  hiringType: requiredEnum(HIRING_TYPES, "Choose a hiring type."),
  workMode: requiredEnum(WORK_MODES, "Choose a preferred work mode."),
  hp: honeypot,
  whyPartner: z
    .string()
    .trim()
    .min(1, "Tell us anything that helps us scope the partnership."),
  agree,
});

export type TalentValues = z.infer<typeof talentSchema>;
export type HiringValues = z.infer<typeof hiringSchema>;
export type PartnerValues = z.infer<typeof partnerSchema>;
