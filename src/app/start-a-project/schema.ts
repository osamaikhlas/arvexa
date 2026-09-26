import { z } from "zod";

/**
 * Field list matches docs/strategy-summary.md's Lead Qualification section
 * exactly. `timeline` and `budget` ranges are proposed defaults (that
 * section left them for us to set) — flagged in docs/open-questions.md
 * item 9 and docs/decisions.md, not silently invented.
 */
export const PROJECT_TYPES = [
  "AI Product",
  "AI Agent",
  "AI Automation",
  "SaaS",
  "Website / Web App",
  "Existing Product Improvement",
  "Other",
] as const;

export const STAGES = ["Idea", "Prototype", "MVP", "Existing Product", "Production"] as const;

export const EXISTING_STATUSES = [
  "Nothing yet",
  "AI-generated prototype",
  "MVP",
  "Production application",
] as const;

export const TIMELINES = [
  "ASAP (within 1 month)",
  "1–3 months",
  "3–6 months",
  "6+ months / not sure yet",
] as const;

export const BUDGETS = [
  "Under $5,000",
  "$5,000–$15,000",
  "$15,000–$40,000",
  "$40,000+",
  "Not sure yet / let's discuss",
] as const;

export const startProjectSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  projectType: z.enum(PROJECT_TYPES, { message: "Choose what you're looking to build" }),
  stage: z.enum(STAGES, { message: "Choose your current stage" }),
  existingStatus: z.enum(EXISTING_STATUSES, { message: "Choose what you already have" }),
  challenge: z.string().trim().min(1, "Tell us the biggest challenge").max(2000),
  timeline: z.enum(TIMELINES, { message: "Choose a timeline" }),
  budget: z.enum(BUDGETS, { message: "Choose a project range" }),
  // Honeypot — real users never see or fill this field. Any value here
  // means the submission is spam; see actions.ts.
  website: z.string().max(0, "").optional().or(z.literal("")),
});

export type StartProjectInput = z.infer<typeof startProjectSchema>;
export type FieldErrors = Partial<Record<keyof StartProjectInput, string>>;
