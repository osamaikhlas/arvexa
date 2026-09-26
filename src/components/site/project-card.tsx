"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/typography";
import { useTilt } from "@/lib/use-tilt";
import { cn } from "@/lib/utils";

const MotionCard = motion.create(Card);

export interface ProjectCardProps {
  slug: string;
  category: string;
  title: string;
  summary: string;
  /** Real screenshot path, or omit to show the honest placeholder —
   * see docs/project-data-needed.md for what's still missing per project. */
  image?: string;
}

/** Projects with a real screenshot get the large, horizontal "spotlight"
 * treatment. The whole card tilts in 3D toward the cursor (useTilt,
 * strength 5, extended 2026-09-26 from the image-only tilt to the full card
 * as part of the site-wide "full 3D" pass), with the image itself tilting a
 * touch further (strength 6) plus a hover zoom, so the image reads as
 * "closer" than the card around it — real evidence only, per
 * docs/brand-system.md's motion rule. Projects still pending screenshots
 * render smaller, with an honest placeholder and a flatter (card-only) tilt
 * since there's no image to give extra depth to. */
function ProjectCard({ slug, category, title, summary, image }: ProjectCardProps) {
  const hasImage = Boolean(image);
  const {
    ref: cardRef,
    rotateX: cardRotateX,
    rotateY: cardRotateY,
    onMouseMove: onCardMouseMove,
    onMouseLeave: onCardMouseLeave,
  } = useTilt(4);
  const {
    ref: imgRef,
    rotateX: imgRotateX,
    rotateY: imgRotateY,
    onMouseMove: onImgMouseMove,
    onMouseLeave: onImgMouseLeave,
  } = useTilt(6);

  return (
    <div
      ref={cardRef}
      onMouseMove={onCardMouseMove}
      onMouseLeave={onCardMouseLeave}
      style={{ perspective: 1200 }}
      className={cn(hasImage && "md:col-span-2")}
    >
      <MotionCard
        style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        whileHover={{ y: -6, boxShadow: "0 28px 56px -14px rgba(0,0,0,0.4)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Link href={`/work/${slug}`} className={cn("block", hasImage && "md:flex md:items-stretch")}>
          <div
            ref={hasImage ? imgRef : undefined}
            onMouseMove={hasImage ? onImgMouseMove : undefined}
            onMouseLeave={hasImage ? onImgMouseLeave : undefined}
            style={{ perspective: 1000 }}
            className={cn("overflow-hidden bg-surface-300", hasImage ? "h-56 md:h-auto md:w-[58%]" : "h-44")}
          >
            {hasImage ? (
              <motion.div
                style={{ rotateX: imgRotateX, rotateY: imgRotateY }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full w-full"
              >
                <Image
                  src={image as string}
                  alt={`${title} screenshot`}
                  width={800}
                  height={560}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ) : (
              <PlaceholderArt />
            )}
          </div>
          <div className={cn("p-[22px]", hasImage && "md:flex md:w-[42%] md:flex-col md:justify-center")}>
            <Label className="text-accent">{category}</Label>
            <div className={cn("mt-2 font-semibold text-ink", hasImage ? "text-[21px]" : "text-[17px]")}>
              {title}
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.5] text-ink-soft">{summary}</p>
            <span className="mt-3 inline-block text-[13.5px] font-semibold text-accent">
              View case study →
            </span>
          </div>
        </Link>
      </MotionCard>
    </div>
  );
}

function PlaceholderArt() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-surface-300"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--line) 0, var(--line) 1px, transparent 1px, transparent 14px)",
      }}
    >
      <span className="rounded-sm border border-line bg-surface-200 px-3 py-1.5 font-mono text-[11px] text-ink-faint">
        Screenshots pending
      </span>
    </div>
  );
}

export { ProjectCard };
