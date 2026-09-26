import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface tone — "raised" alternates panel background per the homepage rhythm (see docs/homepage-design.md). */
  tone?: "default" | "raised" | "inverse";
  bordered?: boolean;
  /** Scopes this section (and everything inside it) to the light theme via
   * `[data-theme="light"]` (globals.css) while the rest of the dark-forced
   * site is unaffected — how the homepage's alternating black/white section
   * rhythm is built (docs/decisions.md, 2026-09-21). Forces a plain white
   * background; `tone`'s background is ignored when this is set (its
   * dark-theme-tuned raised/inverse shades don't apply to a light panel). */
  theme?: "light";
}

/** Vertical-rhythm wrapper for a top-level homepage/page section. Owns the section's
 * top/bottom padding (space-24 desktop / space-12 mobile) and background tone —
 * individual sections never hand-roll their own outer padding. */
function Section({ className, tone = "default", bordered = false, theme, children, ...props }: SectionProps) {
  return (
    <section
      data-theme={theme}
      className={cn(
        "py-12 md:py-24",
        theme === "light" ? "bg-surface-100" : tone === "raised" && "bg-surface-200",
        theme !== "light" && tone === "inverse" && "bg-surface-inverse",
        bordered && "border-y border-line",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

function SectionEyebrow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent", className)}
      {...props}
    />
  );
}

function SectionHeading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mt-3.5 font-display text-[25px] md:text-[34px] font-semibold leading-tight tracking-[-0.01em] text-ink",
        className,
      )}
      {...props}
    />
  );
}

export { Section, SectionEyebrow, SectionHeading };
