"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Mouse-tracked 3D perspective tilt, used only on real product screenshots
 * (never decorative/generic objects) — see docs/brand-system.md's "hover
 * confirming interactivity: yes" motion rule. No-ops under
 * prefers-reduced-motion.
 */
export function useTilt(strength = 7) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [strength, -strength]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-strength, strength]), {
    stiffness: 260,
    damping: 22,
  });

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function onMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return {
    ref,
    rotateX: reduced ? 0 : rotateX,
    rotateY: reduced ? 0 : rotateY,
    onMouseMove,
    onMouseLeave,
  };
}
