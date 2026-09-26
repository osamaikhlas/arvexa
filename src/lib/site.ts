import type { Metadata } from "next";

/**
 * Site-wide constants for metadata. `SITE_URL` drives Next.js's
 * `metadataBase`, canonical URLs, sitemap.xml, robots.txt, and the OG
 * image's absolute URL — every one of those needs a real domain to be
 * correct in production.
 *
 * No domain has been confirmed yet (docs/open-questions.md item 3), so
 * this falls back to Vercel's own auto-provided deployment URL when set,
 * and a clearly-fake placeholder otherwise — never a guessed real-looking
 * domain. Set NEXT_PUBLIC_SITE_URL to the real domain before launch
 * (tracked in docs/launch-checklist.md once that exists).
 *
 * Uses `||`, not `??`, deliberately: a real Vercel deployment crashed the
 * build with `new URL("")` because the project had `NEXT_PUBLIC_SITE_URL`
 * set to an empty string (auto-scaffolded from .env.example, never given a
 * real value) rather than left unset — `??` only falls through on
 * null/undefined, not "". An empty string is never a meaningful URL, so
 * treating it the same as unset here is correct, not just defensive.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://arvexa.example");

export const SITE_NAME = "Arvexa";
export const SITE_TAGLINE = "AI-Native Product Engineering";
export const SITE_EMAIL = "support-arvexa@arvexa.com";
export const SITE_DESCRIPTION =
  "Arvexa is an AI-native product engineering studio. We build, repair, and scale AI products, agents, automations, and SaaS platforms, taking every project from prototype to production.";

/**
 * Builds a page's `Metadata` (canonical URL + matching OpenGraph/Twitter)
 * from just a title/description/path, so every page gets accurate social
 * previews without hand-duplicating the same three blocks — see
 * docs/decisions.md for why this exists (Checkpoint 11).
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}
