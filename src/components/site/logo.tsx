import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The real Arvexa mark (logo/arvexa-mark-black.png, supplied 2026-09-21 —
 * see docs/decisions.md). A single black-glyph PNG. Since 2026-09-27's
 * sand/rust refactor the site is single-themed (light), so the mark reads
 * correctly as-is everywhere except the two reserved dark surfaces
 * (footer, closing CTA) — pass `invert` there to flip it to the
 * off-white/cream wordmark color instead, rather than shipping a second
 * PNG export. Wordmark text is real text (not baked into the image) so it
 * stays selectable/accessible.
 */
function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/logo/arvexa-mark-black.png"
        alt=""
        width={214}
        height={127}
        priority
        className="block h-6 md:h-7 w-auto"
        style={invert ? { filter: "invert(1)" } : undefined}
      />
      <span
        className={cn(
          "font-mono text-[15px] md:text-[17px] font-semibold tracking-[0.02em]",
          invert ? "text-ink-inverse" : "text-ink",
        )}
      >
        ARVEXA
      </span>
    </span>
  );
}

export { Logo };
