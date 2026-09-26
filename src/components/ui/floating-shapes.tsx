import { cn } from "@/lib/utils";

/**
 * Two blurred, slowly-drifting/rotating decorative shapes behind a section's
 * content — pure CSS (globals.css `float-drift-a/b`), no JS, respects
 * prefers-reduced-motion automatically. Purely decorative: aria-hidden,
 * absolutely positioned, low opacity, never covers or competes with real
 * content. Added 2026-09-26 as part of the site-wide "full 3D, perspective,
 * rotation, floating elements" pass (see docs/decisions.md) — the hero
 * already has real 3D via WovenCanvas (three.js); this brings a lightweight
 * version of that same "something is quietly alive back there" quality to
 * sections that don't have their own canvas.
 */
function FloatingShapes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="floating-shape-a absolute -right-16 top-8 h-48 w-48 rounded-full border border-line opacity-[0.12] blur-[1px]"
        style={{ transformStyle: "preserve-3d" }}
      />
      <div
        className="floating-shape-b absolute -left-10 bottom-0 h-32 w-32 rotate-45 border border-line opacity-[0.1] blur-[1px]"
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
}

export { FloatingShapes };
