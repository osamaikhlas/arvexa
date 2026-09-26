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
 * Always rendered inside a `Section tone="inverse"` at both call sites, so
 * accent text here uses `accent-inverse` (not the default `accent`, which
 * fails WCAG AA contrast on the fixed-dark surface — see docs/decisions.md,
 * Checkpoint 11 axe-core findings). */
function AiTransparency({ heading = true }: { heading?: boolean }) {
  return (
    <div>
      {heading && (
        <>
          <SectionEyebrow className="text-accent-inverse">How We Use AI</SectionEyebrow>
          <Heading level="md" as="h2" className="mt-3.5 max-w-[760px] text-ink-inverse">
            We don&apos;t replace engineering with AI. We augment engineering with AI.
          </Heading>
        </>
      )}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Label className="text-ink-inverse/60">AI assists with</Label>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {AI_ASSISTS.map((c) => (
              <span
                key={c}
                className="rounded-sm border border-ink-inverse/15 bg-ink-inverse/5 px-3 py-1.5 font-mono text-xs text-ink-inverse [transform-style:preserve-3d] transition-[transform,box-shadow] duration-200 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)] hover:[transform:perspective(400px)_translateY(-3px)_rotateX(12deg)_scale(1.06)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-accent-inverse">Human engineering handles</Label>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {HUMAN_HANDLES.map((c) => (
              <span
                key={c}
                className="rounded-sm border border-accent-inverse bg-accent-inverse/10 px-3 py-1.5 font-mono text-xs text-accent-inverse [transform-style:preserve-3d] transition-[transform,box-shadow] duration-200 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)] hover:[transform:perspective(400px)_translateY(-3px)_rotateX(12deg)_scale(1.06)]"
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
