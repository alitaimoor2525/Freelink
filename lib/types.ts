export type ApplicationType = "talent" | "hiring" | "partner";

export const SUBMISSION_COLLECTIONS: Record<ApplicationType, string> = {
  talent: "talentSubmissions",
  hiring: "businessSubmissions",
  partner: "partnerSubmissions",
};

export type SubmissionStatus =
  | "new"
  | "reviewed"
  | "shortlisted"
  | "matched"
  | "closed";

export interface BaseSubmission {
  id: string;
  type: ApplicationType;
  status: SubmissionStatus;
  createdAt: number;
  updatedAt?: number;
  internalNotes?: string;
}

export interface TalentSubmission extends BaseSubmission {
  type: "talent";
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  primarySkills: string[];
  primarySkillsOther?: string;
  experienceLevel: string;
  availability: string;
  portfolioUrl?: string;
  tools?: string;
  experienceDetails?: string;
  resumeFileUrl?: string;
  expectedRate?: string;
  referralSource?: string;
}

export interface HiringSubmission extends BaseSubmission {
  type: "hiring";
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  services: string[];
  otherService?: string;
  projectDescription: string;
  budget: string;
  budgetCurrency?: string;
  deadline: string;
  referenceFileUrl?: string;
  additionalNotes?: string;
}

export interface PartnerSubmission extends BaseSubmission {
  type: "partner";
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  websiteUrl?: string;
  companySize: string;
  designation?: string;
  rolesHired?: string;
  hiringType: string;
  workMode: string;
  whyPartner: string;
}

export type Submission = TalentSubmission | HiringSubmission | PartnerSubmission;

export type SubmissionRow<T extends ApplicationType = ApplicationType> = T extends "talent"
  ? TalentSubmission
  : T extends "hiring"
    ? HiringSubmission
    : PartnerSubmission;

export const STATUS_PIPELINE: SubmissionStatus[] = [
  "new",
  "reviewed",
  "shortlisted",
  "matched",
  "closed",
];

export const statusLabelsByType: Record<ApplicationType, string[]> = {
  talent: STATUS_PIPELINE,
  hiring: STATUS_PIPELINE,
  partner: STATUS_PIPELINE,
};

export const SUBMISSION_TYPE_LABELS: Record<ApplicationType, string> = {
  talent: "Talent",
  hiring: "Business",
  partner: "Partner",
};
