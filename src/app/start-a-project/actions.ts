"use server";

import { startProjectSchema, type FieldErrors, type StartProjectInput } from "./schema";

export interface ActionState {
  status: "idle" | "success" | "error";
  errors?: FieldErrors;
  message?: string;
  /** Echoed back so the form can restore what the visitor typed after a
   * validation error, instead of clearing the form. */
  values?: Record<string, string>;
}

/**
 * Delivers a qualified lead. No email/CRM provider is configured yet
 * (docs/open-questions.md item 6) — this logs server-side for now, which
 * is at least visible in Vercel's function logs once deployed. Swap the
 * body of this one function for a real integration (Resend, a CRM
 * webhook, etc.) when a provider is chosen; nothing else needs to change.
 */
async function deliverLead(lead: StartProjectInput): Promise<void> {
  console.log("[start-a-project] New lead:", {
    name: lead.name,
    company: lead.company || undefined,
    email: lead.email,
    projectType: lead.projectType,
    stage: lead.stage,
    existingStatus: lead.existingStatus,
    challenge: lead.challenge,
    timeline: lead.timeline,
    budget: lead.budget,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitStartAProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    projectType: String(formData.get("projectType") ?? ""),
    stage: String(formData.get("stage") ?? ""),
    existingStatus: String(formData.get("existingStatus") ?? ""),
    challenge: String(formData.get("challenge") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = startProjectSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors, values: raw, message: "Check the highlighted fields below." };
  }

  // Honeypot tripped — silently report success so a bot gets no signal
  // that it was caught, but skip delivery entirely.
  if (parsed.data.website) {
    return { status: "success" };
  }

  try {
    await deliverLead(parsed.data);
    return { status: "success" };
  } catch {
    return {
      status: "error",
      values: raw,
      message: "Something went wrong sending this. Please try again, or email us directly.",
    };
  }
}
