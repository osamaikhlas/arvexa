import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The real Arvexa mark (logo/arvexa-mark-black.png, supplied 2026-09-21 —
 * see docs/decisions.md). A single black-glyph PNG, inverted to white via
 * `--logo-filter` (globals.css) wherever the active theme's surfaces are
 * dark, rather than shipping separate light/dark PNG exports. Wordmark
 * text is real text (not baked into the image) so it inherits the
 * monochrome `--ink` token and the site's own mono type, and stays
 * selectable/accessible.
 */
function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/logo/arvexa-mark-black.png"
        alt=""
        width={214}
        height={127}
        priority
        className="block h-6 md:h-7 w-auto"
        style={{ filter: "var(--logo-filter)" }}
      />
      <span className="font-mono text-[15px] md:text-[17px] font-semibold tracking-[0.02em] text-ink">
        ARVEXA
      </span>
    </span>
  );
}

export { Logo };
