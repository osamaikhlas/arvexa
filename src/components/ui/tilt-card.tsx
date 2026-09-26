"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTilt } from "@/lib/use-tilt";
import { cn } from "@/lib/utils";

const MotionDiv = motion.create("div");

/**
 * Generic mouse-tracked 3D tilt wrapper (useTilt) for any card that isn't
 * already one of the site's specific card components — added 2026-09-26 for
 * the Services index cards as part of the site-wide "full 3D" pass. Same
 * lift/shadow/tilt treatment as ServiceCard/ProjectCard/WhyArvexaCard, just
 * generic enough to wrap arbitrary children instead of a fixed shape.
 */
function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5);

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: 1000 }}>
      <MotionDiv
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(0,0,0,0.35)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn("shadow-[0_2px_8px_rgba(0,0,0,0.12)]", className)}
      >
        {children}
      </MotionDiv>
    </div>
  );
}

export { TiltCard };
