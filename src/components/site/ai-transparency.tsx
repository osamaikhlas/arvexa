import { SectionEyebrow } from "@/components/ui/section";
import { Heading, Label } from "@/components/ui/typography";

const AI_ASSISTS = ["Coding", "Prototyping", "Research", "Debugging", "Testing", "Documentation"];
const HUMAN_HANDLES = [
  "Architecture",
  "Product decisions",
  "System design",
  "Security",
  "QA & validation",
  "Production readiness",
];

/** The AI-transparency split — "AI assists with" vs. "Human engineering
 * handles" — used on Home and About. Extracted at Checkpoint 9 to avoid a
 * second hand-copied version; both pages now read from the same two lists.
 * Renders on a light (`tone="raised"`) section like the rest of the site
 * since 2026-09-27's sand/rust refactor — dark is reserved for the footer
 * and closing CTA only now, so this no longer needs its own inverse
 * color set (see docs/decisions.md). "Human engineering handles" reuses
 * the same accent-soft/accent-strong pairing as the "active" tag/process-
 * step treatment elsewhere, for the same AA-contrast reason. */
function AiTransparency({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading && (
        <>
          <SectionEyebrow>How We Use AI</SectionEyebrow>
          <Heading level="md" as="h2" className="mt-3.5 max-w-[760px]">
            We don&apos;t replace engineering with AI. We augment engineering with AI.
          </Heading>
        </>
      )}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Label className="text-ink-faint">AI assists with</Label>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {AI_ASSISTS.map((c) => (
              <span
                key={c}
                className="rounded-sm border border-line bg-surface-200 px-3 py-1.5 font-mono text-xs text-ink-soft [transform-style:preserve-3d] transition-[transform,box-shadow] duration-200 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.28)] hover:[transform:perspective(400px)_translateY(-3px)_rotateX(12deg)_scale(1.06)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-accent">Human engineering handles</Label>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {HUMAN_HANDLES.map((c) => (
              <span
                key={c}
                className="rounded-sm border border-accent bg-accent-soft px-3 py-1.5 font-mono text-xs text-accent-strong [transform-style:preserve-3d] transition-[transform,box-shadow] duration-200 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.28)] hover:[transform:perspective(400px)_translateY(-3px)_rotateX(12deg)_scale(1.06)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AiTransparency };
