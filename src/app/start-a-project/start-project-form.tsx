"use client";

import * as React from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea, Select } from "@/components/ui/input";
import { Heading, Text } from "@/components/ui/typography";
import { trackEvent } from "@/lib/analytics";
import { submitStartAProject, type ActionState } from "./actions";
import { PROJECT_TYPES, STAGES, EXISTING_STATUSES, TIMELINES, BUDGETS } from "./schema";

const initialState: ActionState = { status: "idle" };

function StartProjectForm() {
  const [state, formAction, isPending] = useActionState(submitStartAProject, initialState);
  const trackedStatus = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (state.status === "idle" || trackedStatus.current === state.status) return;
    trackedStatus.current = state.status;
    if (state.status === "success") {
      trackEvent("start_project_submitted");
    } else if (state.status === "error" && state.errors) {
      trackEvent("start_project_validation_error", { fieldCount: Object.keys(state.errors).length });
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-md border border-accent bg-accent-soft p-8 text-center">
        <Heading level="md" as="h2">
          Thanks, we&apos;ve got it.
        </Heading>
        <Text className="mt-3 max-w-[52ch] mx-auto text-ink">
          We read every submission ourselves. Expect a reply within a couple of business days to set
          up a discovery call.
        </Text>
      </div>
    );
  }

  const v = state.values ?? {};
  const errors = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {state.message && (
        <div role="alert" className="rounded-sm border border-bad bg-bad/10 px-4 py-3 text-sm text-bad">
          {state.message}
        </div>
      )}

      {/* Honeypot — visually hidden (not display:none) from real visitors,
          catches simple bots. sr-only rather than off-screen positioning,
          since a position:absolute push with no positioned ancestor here
          would widen the page's scrollable area. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field id="name" label="Name" required error={errors.name}>
          <Input id="name" name="name" required defaultValue={v.name} autoComplete="name" />
        </Field>
        <Field id="company" label="Company" hint="Optional">
          <Input id="company" name="company" defaultValue={v.company} autoComplete="organization" />
        </Field>
      </div>

      <Field id="email" label="Email" required error={errors.email}>
        <Input id="email" name="email" type="email" required defaultValue={v.email} autoComplete="email" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field id="projectType" label="What are you looking to build?" required error={errors.projectType}>
          <Select id="projectType" name="projectType" required defaultValue={v.projectType ?? ""}>
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="stage" label="What stage are you at?" required error={errors.stage}>
          <Select id="stage" name="stage" required defaultValue={v.stage ?? ""}>
            <option value="" disabled>
              Choose one
            </option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id="existingStatus"
        label="Do you already have something built?"
        required
        error={errors.existingStatus}
      >
        <Select id="existingStatus" name="existingStatus" required defaultValue={v.existingStatus ?? ""}>
          <option value="" disabled>
            Choose one
          </option>
          {EXISTING_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field id="challenge" label="What's the biggest challenge?" required error={errors.challenge}>
        <Textarea
          id="challenge"
          name="challenge"
          required
          defaultValue={v.challenge}
          placeholder="Our AI agent gives inconsistent outputs and we're not sure why..."
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field id="timeline" label="Desired timeline" required error={errors.timeline}>
          <Select id="timeline" name="timeline" required defaultValue={v.timeline ?? ""}>
            <option value="" disabled>
              Choose one
            </option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="budget" label="Expected project range" required error={errors.budget}>
          <Select id="budget" name="budget" required defaultValue={v.budget ?? ""}>
            <option value="" disabled>
              Choose one
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Button type="submit" variant="primary" size="full" disabled={isPending}>
        {isPending ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}

export { StartProjectForm };
