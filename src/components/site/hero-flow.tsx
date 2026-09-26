"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const MIDDLE_CHIPS = ["Architecture", "Integrations", "Evaluation", "Hardening", "Deployment"];

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay, ease: "easeOut" },
  }),
};

/** A connector line with a small dot that pulses down it on a loop — motion
 * that represents work flowing through the pipeline stage by stage, per the
 * "motion explains a process" principle in docs/brand-system.md. Disabled
 * entirely under prefers-reduced-motion. */
function FlowLine({ loopDelay, reduced }: { loopDelay: number; reduced: boolean }) {
  return (
    <div className="relative mx-auto h-4 w-px overflow-hidden bg-line" aria-hidden="true">
      {!reduced && (
        <motion.div
          className="absolute left-1/2 top-0 h-2 w-1 -translate-x-1/2 rounded-full bg-accent"
          animate={{ y: [-4, 16], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, delay: loopDelay, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

/** The hero's "Prototype → Production" visual — animated on mount (each
 * stage arrives in sequence) plus a continuous, subtle flow detail on the
 * connector lines. Tells Arvexa's actual pipeline story rather than a
 * generic decorative animation — see docs/decisions.md for why a
 * pasted-in generic 3D/gamified component was declined in favor of this. */
function HeroFlow() {
  const reduced = useReducedMotion();

  return (
    <Card className="p-7">
      <Label className="text-ink-faint">Prototype → Production</Label>
      <div className="mt-3 flex flex-col items-stretch gap-2">
        <motion.div
          custom={0}
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          variants={blockVariants}
          className="rounded-md border border-accent bg-accent-soft px-4 py-3 text-sm text-ink"
        >
          AI-Generated Prototype
        </motion.div>

        <FlowLine loopDelay={1} reduced={!!reduced} />

        <motion.div
          custom={0.25}
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          variants={blockVariants}
          className="flex flex-wrap gap-2 rounded-md bg-surface-300 px-4 py-3"
        >
          {MIDDLE_CHIPS.map((c, i) => (
            <motion.span
              key={c}
              custom={0.4 + i * 0.08}
              initial={reduced ? undefined : "hidden"}
              animate="visible"
              variants={chipVariants}
            >
              <Badge variant="neutral">{c}</Badge>
            </motion.span>
          ))}
        </motion.div>

        <FlowLine loopDelay={2.4} reduced={!!reduced} />

        <motion.div
          custom={0.9}
          initial={reduced ? undefined : "hidden"}
          animate="visible"
          variants={blockVariants}
          className={cn("rounded-md bg-surface-inverse px-4 py-3 text-sm text-ink-inverse")}
        >
          Production
        </motion.div>
      </div>
    </Card>
  );
}

export { HeroFlow };
