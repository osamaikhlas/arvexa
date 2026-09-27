import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface tone. "raised" alternates panel background per the homepage
   * rhythm (docs/homepage-design.md) — bg-base vs. bg-surface, both light.
   * "inverse" is the site's reserved-dark treatment (bg-dark) — restricted
   * to exactly two sections site-wide (the homepage's closing CTA, and
   * wherever a page mirrors it) since 2026-09-27's sand/rust refactor; see
   * docs/decisions.md. Every child of an "inverse" section must set its own
   * inverse-tier text/border color explicitly (ink-inverse, line-inverse,
   * …) since the site no longer theme-swaps automatically. */
  tone?: "default" | "raised" | "inverse";
  bordered?: boolean;
  /** Forces the plain bg-base background regardless of `tone` — used to
   * break up two adjacent "raised" sections, or override a "raised"
   * default. A holdover name from the old dark/light theme-pair system
   * (docs/decisions.md, 2026-09-21); "light" is the only value because the
   * whole site is light-first now, so there's nothing to opt out of. */
  theme?: "light";
}

/** Vertical-rhythm wrapper for a top-level homepage/page section. Owns the section's
 * top/bottom padding (space-24 desktop / space-12 mobile) and background tone —
 * individual sections never hand-roll their own outer padding. */
function Section({ className, tone = "default", bordered = false, theme, children, ...props }: SectionProps) {
  return (
    <section
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
