import * as React from "react";
import { Label } from "@/components/ui/typography";

export interface CaseStudySectionProps {
  index: string;
  title: string;
  children: React.ReactNode;
}

/** One block of the 8-part case-study template (docs/case-study-framework.md):
 * Problem, Starting Point, Solution, Architecture, Engineering Work, AI
 * Contribution, Results, Final Product. Reused as-is on every /work/[slug]
 * page built in Checkpoint 8 — not one-off markup per case study. */
function CaseStudySection({ index, title, children }: CaseStudySectionProps) {
  return (
    <div className="py-10 border-t border-line first:border-t-0 first:pt-0">
      <Label className="text-accent">{index}</Label>
      <h2 className="mt-2 font-display text-xl md:text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 max-w-[68ch] text-[15px] leading-[1.65] text-ink-soft [&>p+p]:mt-4">
        {children}
      </div>
    </div>
  );
}

export { CaseStudySection };
