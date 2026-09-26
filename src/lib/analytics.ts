"use client";

/**
 * Provider-agnostic analytics dispatcher. No provider is configured yet —
 * see docs/open-questions.md item 6 — so this currently only logs in dev
 * and no-ops in production. Wiring a real provider (GA4, Plausible,
 * PostHog) later is a one-line change here, not a hunt through every page
 * that calls trackEvent().
 */
export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", name, props ?? {});
  }
  // TODO: once an analytics provider is chosen (docs/open-questions.md #6),
  // forward the event here — e.g. window.plausible?.(name, { props }) or
  // window.gtag?.("event", name, props).
}
