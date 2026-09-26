"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTilt } from "@/lib/use-tilt";

/** Real product screenshots given a 3D tilt on hover — hover-driven, on
 * real evidence only, per docs/brand-system.md's motion rule ("hover
 * confirming interactivity: yes"). No decorative/generic motion. */
function GalleryTile({
  src,
  alt,
  priority,
  aspect = "aspect-[16/11]",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: string;
}) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1000 }}
      className={`overflow-hidden rounded-md border border-line ${aspect}`}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={825}
          className="h-full w-full object-cover"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

function CaseStudyHeroImage({ src, alt }: { src: string; alt: string }) {
  return <GalleryTile src={src} alt={alt} priority aspect="aspect-[16/9]" />;
}

function CaseStudyGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((src) => (
        <GalleryTile key={src} src={src} alt={`${title} screenshot`} />
      ))}
    </div>
  );
}

export { CaseStudyHeroImage, CaseStudyGallery };
