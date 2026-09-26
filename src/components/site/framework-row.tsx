import { DiagramStage } from "@/components/ui/diagram";

export const FRAMEWORK_STAGES = [
  { index: "01", label: "Discover", description: "Define what and why." },
  { index: "02", label: "Generate", description: "Move fast with AI." },
  { index: "03", label: "Engineer", description: "Make it a real system." },
  { index: "04", label: "Evaluate", description: "Test it actually works." },
  { index: "05", label: "Harden", description: "Fix edge cases, risk." },
  { index: "06", label: "Deploy", description: "Ship to real users." },
  { index: "07", label: "Evolve", description: "Monitor and improve.", emphasis: true },
] as const;

/** The AI → Production framework, all 7 stages. Row on desktop, stack on
 * mobile — same data, per docs/homepage-design.md. Stage 07 is visually
 * emphasized since it's the tie-in to the recurring-engineering offer.
 * 3D hover treatment (2026-09-26) is applied here via className rather than
 * on DiagramStage itself, since that component is also reused for real
 * per-case-study architecture diagrams — those stay flat/unanimated,
 * consistent with the "real evidence vs. decorative" motion distinction
 * from the rest of the site's 3D pass. */
function FrameworkRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
      {FRAMEWORK_STAGES.map((s) => (
        <DiagramStage
          key={s.index}
          {...s}
          className="[transform-style:preserve-3d] transition-[transform,box-shadow] duration-200 ease-out shadow-[0_1px_4px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_28px_rgba(0,0,0,0.32)] hover:[transform:perspective(500px)_translateY(-4px)_rotateX(10deg)_scale(1.04)]"
        />
      ))}
    </div>
  );
}

export { FrameworkRow };
