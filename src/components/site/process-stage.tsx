"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Heading, Text, Label } from "@/components/ui/typography";
import { useTilt } from "@/lib/use-tilt";
import type { ProcessStage as ProcessStageData } from "@/data/process";

export interface ProcessStageContentProps {
  stage: ProcessStageData;
  /** A rendered icon element (e.g. `<Search size={22} />`), not a component
   * reference — a component function can't cross the Server→Client
   * boundary as a prop, only an already-rendered element can (same gotcha
   * documented on ServiceCardProps.icon). Render it at the call site. */
  icon: ReactNode;
}

/** Per-stage content for the /process page (2026-09-26 "animation and
 * pictures for each section" pass). "Pictures" here means a real Lucide
 * icon per stage, not a stock/AI-generated photo — process stages are
 * abstract framework steps, not tied to one client project, so there's no
 * real screenshot to show; an icon is honest decoration the same way
 * ServiceCard's icons are (see docs/brand-system.md's content policy).
 * Scroll-reveal fade/rise (framer-motion `whileInView`) plus a mouse-tracked
 * 3D tilt on the icon (`useTilt`, same pattern as every other card this
 * session's "full 3D" pass touched). */
function ProcessStageContent({ stage, icon }: ProcessStageContentProps) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col md:flex-row gap-8 md:gap-16"
    >
      <div className="md:w-64 flex-shrink-0">
        <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: 800 }}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex h-12 w-12 items-center justify-center rounded-md bg-accent-soft text-accent shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          >
            {icon}
          </motion.div>
        </div>
        <span className="mt-4 block font-mono text-sm text-accent">{stage.index}</span>
        <Heading level="md" as="h2" className="mt-2">
          {stage.label}
        </Heading>
        <Text size="sm" className="mt-2">
          {stage.purpose}
        </Text>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <Label className="text-ink-faint">Activities</Label>
          <ul className="mt-3 flex flex-col gap-2">
            {stage.activities.map((a) => (
              <li key={a} className="text-[14px] text-ink-soft">
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label className="text-ink-faint">Outputs</Label>
          <ul className="mt-3 flex flex-col gap-2">
            {stage.outputs.map((o) => (
              <li key={o} className="text-[14px] text-ink-soft">
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label className="text-ink-faint">Client involvement</Label>
          <p className="mt-3 text-[14px] text-ink-soft">{stage.clientInvolvement}</p>
        </div>
      </div>
    </motion.div>
  );
}

export { ProcessStageContent };
