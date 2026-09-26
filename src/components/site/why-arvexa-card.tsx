"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { useTilt } from "@/lib/use-tilt";

const MotionCard = motion.create(Card);

export interface WhyArvexaCardProps {
  title: string;
  body: string;
}

/** Mouse-tracked 3D tilt (useTilt, 2026-09-26), same treatment as
 * ServiceCard/ProjectCard — part of the site-wide "full 3D" pass. */
function WhyArvexaCard({ title, body }: WhyArvexaCardProps) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5);

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: 1000 }}>
      <MotionCard
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.35)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
      >
        <CardContent>
          <div className="text-[16px] font-semibold text-ink">{title}</div>
          <Text size="sm" className="mt-2.5">
            {body}
          </Text>
        </CardContent>
      </MotionCard>
    </div>
  );
}

export { WhyArvexaCard };
