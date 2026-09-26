"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/typography";
import { useTilt } from "@/lib/use-tilt";
import { cn } from "@/lib/utils";

const MotionCard = motion.create(Card);

export interface ServiceCardProps {
  title: string;
  description: string;
  /** A rendered icon element (e.g. `<Boxes size={20} />`), not a component
   * reference — a component function can't cross the Server→Client
   * boundary as a prop, only an already-rendered element can. Render it at
   * the call site, which is typically a Server Component. */
  icon: ReactNode;
  signature?: boolean;
}

/** One of the four services-section cards. `signature` renders a highlighted
 * "Signature offer" treatment when a service sets it — none currently do
 * (AI Rescue & Production Hardening had it until 2026-09-22, see
 * docs/decisions.md). Mouse-tracked 3D tilt (useTilt, 2026-09-26) plus a
 * lift and deepening shadow on hover — the "hover state confirming an
 * interactive element" motion pattern docs/brand-system.md explicitly calls
 * out as good, extended into real perspective per the user's "full 3D" pass. */
function ServiceCard({ title, description, icon, signature }: ServiceCardProps) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5);

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: 1000 }}>
      <MotionCard
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.35)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn("shadow-[0_2px_8px_rgba(0,0,0,0.12)]", signature && "border-accent border-2")}
      >
        <CardContent>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-sm",
              signature ? "bg-accent-fill text-on-fill" : "bg-accent-soft text-accent",
            )}
          >
            {icon}
          </div>
          {signature && <Label className="mt-4 block text-accent">Signature offer</Label>}
          <div className={cn("text-[17px] font-semibold text-ink", signature ? "mt-2" : "mt-4")}>{title}</div>
          <p className="mt-2.5 text-[13.5px] leading-[1.55] text-ink-soft">{description}</p>
        </CardContent>
      </MotionCard>
    </div>
  );
}

export { ServiceCard };
