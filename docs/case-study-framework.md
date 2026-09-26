# Case Study Framework

Status: DRAFT for Checkpoint 3 approval. Defines the reusable *system* (template + data schema) for case studies. Writing full, final case-study copy for each selected project happens at Checkpoint 8 (Portfolio & Case Studies) — this file includes one worked example only, to prove the system against real data.

## Template (8 sections, every case study uses this structure)

1. **The Problem** — business/product problem in 2–4 sentences.
2. **The Starting Point** — idea / AI-generated prototype / MVP / broken agent / manual workflow / production system.
3. **The Solution** — what was changed or built, outcome-oriented.
4. **Architecture** — simple diagram: frontend, backend, AI layer, tools, data, integrations, evaluation, monitoring as applicable.
5. **Engineering Work** — the actual engineering: auth, database, APIs, integrations, retries, error handling, testing, deployment, security, performance, monitoring.
6. **AI Contribution** — where AI was used in development vs. where it exists in the shipped product. Transparent, not vague.
7. **Results** — real metrics where available; otherwise the real operational change, described in plain language. Never invented (see Content Policy below).
8. **Final Product** — screenshots, video, demo, or approved product links.

Generic architecture pattern to adapt per project: `User → Application → AI Gateway → Agent/Model → Tools/APIs → Database → Evaluation/Monitoring → Response` (source doc §5) — only include the stages a given project actually has; don't pad a non-AI project with an AI Gateway stage it doesn't have.

## Content Policy (hard rule, repeated here because it governs every case study)

Never fabricate clients, metrics, testimonials, or outcomes. Use `[PLACEHOLDER — REPLACE WITH REAL DATA]` for anything not yet confirmed. If a project has no quantitative result, describe the real operational improvement in plain language instead of inventing a number.

## Project Data Schema

Matches the schema your operating prompt already specifies (§31) — used as-is, not modified:

```
Project
├── title
├── slug
├── category
├── summary
├── client
├── problem
├── startingPoint
├── solution
├── aiContribution
├── engineeringContribution
├── architecture
├── technology
├── results
├── images
├── videos
├── testimonial
├── liveUrl
└── featured
```

Permission level (public / anonymized / private, per source doc §3) is tracked as an added field, since the schema above doesn't explicitly carry it: `permissionLevel`. A project can't be marked `featured` (shown on Home/Work index) until `permissionLevel` is confirmed.

## Worked Example — AI Content Publisher

This is the only project with enough real detail already gathered to fully populate the schema. It demonstrates the system works; it is not final marketing copy (tone/length will be edited at Checkpoint 8).

```
title: AI Content Publisher
slug: ai-content-publisher
category: AI Product Engineering / SaaS
summary: A multi-sided SaaS platform that turns book publishing into a guided,
  AI-assisted product — from a first idea to a finished manuscript, cover, and
  distribution package.
client: [PLACEHOLDER — confirm whether this is Arvexa's own product or a client's,
  and whether it can be named]
problem: Turn a static marketing site into a full publishing platform with an AI
  co-writer at the center, serving three audiences — independent authors, agency
  clients managing a slate of titles, and internal admins reviewing every
  manuscript — from one codebase.
startingPoint: Idea / existing static marketing site, rebuilt into a full
  production SaaS.
solution: Ten interlocking systems shipped as separate specs and pull requests —
  AI writing engine, manuscript editor, cover design studio, layout/publishing
  pipeline, manuscript import, admin review workflow, client/agency dashboards,
  billing, realtime notifications.
aiContribution: Claude (Anthropic) powers the writing engine — streamed chapter
  drafts over SSE with live token accounting and plan-based limits enforced
  before every call. Ideogram v2 generates cover concepts; title typography is
  overlaid client-side afterward so the AI is never asked to render text
  directly. AI usage is metered, rate-limited, and logged — not open-ended.
engineeringContribution: Row-Level Security on every table, server-side
  ownership checks, Zod validation on all external input, AI and payment calls
  kept server-only. Spec-first process (30 written specs, one branch per
  feature, PR-reviewed, nothing merged straight to main). Typecheck, lint, unit
  tests, and a production build required before every merge (53 test files).
  Three real production incidents found and fixed post-launch: a retired AI
  model ID that started 404-ing in prod (moved to a durable alias), a silent
  token-ledger gap where usage rows were being rejected by a missing RLS
  insert policy (routed through the service-role client instead), and a
  cross-chapter autosave race condition from a stale closure (fixed by
  scoping the save to a captured snapshot). Print-quality PDF rendering is
  isolated in a Vercel Sandbox rather than the main app process.
architecture: |
  Author/Admin/Agency UI → Next.js App Router → Supabase (Postgres + RLS,
  Auth, Storage, Realtime) → Claude (writing, streamed via SSE) /
  Ideogram v2 (cover concepts) → Vercel Sandbox (isolated PDF/EPUB rendering)
  → PayPal/Google Pay (billing, webhook-verified) → Resend (email) +
  Supabase Realtime (in-app notifications)
technology: [Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion,
  TipTap, Supabase Postgres, Supabase Auth, Supabase Storage, Supabase
  Realtime, Claude (Anthropic), Ideogram v2, PayPal Subscriptions, Google Pay,
  Vercel, Vercel Sandbox, Sentry, Resend, Jest, Playwright]
results: 124 commits, 50 merged pull requests, 478 TypeScript source files,
  21 database migrations, 53 unit/E2E test files across a ~4-month solo build.
  [PLACEHOLDER — add real usage/business metrics once available; the above
  are engineering-effort metrics, not outcome metrics]
images: [PLACEHOLDER — no screenshots captured yet]
videos: [PLACEHOLDER — none yet]
testimonial: [PLACEHOLDER — none; likely N/A if this is your own product]
liveUrl: [PLACEHOLDER — confirm if/when public]
featured: true (recommended — this is the flagship AI-native proof point)
permissionLevel: [PLACEHOLDER — confirm public/private; if it's your own
  product this is likely straightforward, but confirm before it's marked
  featured and published]
```

## What This Proves

The schema and template hold up against a real, fairly complex project without needing to stretch or invent anything — the gaps that show up (`images`, `liveUrl`, `client`, `permissionLevel`) are exactly the kind of thing `docs/project-data-needed.md` now tracks per project, rather than getting silently glossed over in copy later.
