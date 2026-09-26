# Project Inventory — Raw Data

Source: 7 case-study artifacts supplied 2026-09-20. This is raw extracted fact, not final case-study copy (that's a Checkpoint 3/8 task). Flags below need your confirmation before anything goes public.

---

## 1. AI Content Publisher — ⭐ flagship AI SaaS candidate

- **Category**: AI Product Engineering / SaaS
- **One-line**: Multi-sided SaaS that turns book publishing into a guided, AI-assisted product — idea → manuscript → cover → distribution package.
- **Role**: Solo full-stack engineer. Timeline: May–Sep 2026 (~4 months).
- **Problem/brief**: Turn a static marketing site into a full publishing platform (modeled on premium ghostwriting services) with an AI co-writer at the center, serving 3 audiences from one codebase — independent authors, agency clients managing a slate of titles, and internal admins reviewing every manuscript.
- **Starting point**: Idea / existing static marketing site → built into full production SaaS.
- **What shipped (10 systems)**: AI writing engine (Claude, SSE streaming, token metering/limits), manuscript editor (TipTap, AI line/paragraph edits, whole-book AI rewrite, Flesch-Kincaid scoring, version history, autosave), cover design studio (AI via Ideogram v2 + templates + upload, client-side typography overlay so AI never renders text), layout/publishing pipeline (PDF/EPUB via isolated Vercel Sandbox, hardcover/audiobook support), manuscript import (DOCX/PDF with auto chapter-splitting), admin review workflow (approve/request-changes/reject with real-time notification), client/agency dashboards (multi-tenant on shared data model), billing (PayPal Subscriptions + Google Pay, webhook-verified, never trusted client-side), realtime notifications (Supabase Realtime + Resend email).
- **AI contribution**: Claude for writing generation/review (streamed), Ideogram for cover concepts. AI usage metered and rate-limited by plan.
- **Engineering contribution**: RLS on every table, server-side ownership checks, Zod validation on all external input, AI/payment calls server-only, spec-first workflow (30 written specs, one branch per feature, PR-reviewed, nothing merged direct to main), model routing by risk (plan-first for irreversible decisions like schema/auth/payments vs. faster mode for implementation), typecheck+lint+unit+build required pre-merge.
- **Evaluation/hardening evidence** ("Hard problems, real fixes" — genuinely strong AI→Production framework material):
  - Retired AI model ID pinned to a dated snapshot 404'd in prod → moved to durable alias + standing rule to check model catalog before pinning dated IDs.
  - Silent token-ledger gap: usage rows inserted via session client silently rejected by RLS (no insert policy) — ledger looked fine, enforced nothing. Fixed by routing all usage writes through service-role client.
  - Cross-chapter autosave race: stale closure over active chapter ID caused one chapter's autosave to overwrite another's. Fixed by scoping save to a captured snapshot.
  - PDF rendering isolated to Vercel Sandbox (heavy, untrusted-input-adjacent) rather than main app process.
- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui, Framer Motion, TipTap · Supabase (Postgres, Auth, Storage, Realtime, RLS) · Claude (Anthropic), Ideogram v2, SSE · PayPal Subscriptions, Google Pay · Vercel + Vercel Sandbox, Sentry, Resend, Jest, Playwright.
- **Results/metrics**: 124 commits, 50 merged PRs, 478 TypeScript source files, 21 DB migrations, 53 unit/E2E test files. (Engineering-effort metrics, not yet business/usage metrics — flag if you want to add real usage numbers once live.)
- **Screenshots/video**: none yet — this exists as a written case-study canvas, not screenshots. **Needed before Checkpoint 8.**
- **Client/permission**: appears to be your own product (not client work) — confirm whether it's public, still in development, or has a live URL to link.

---

## 2. College Compliance Portal / SMGSC Portal — ⚠️ likely the same project described twice

Two artifacts (`QZtYQ2PrznA2xHrGrLup45` titled "College Compliance Portal" and `NVauaRU4rjuKZqhuz1tZot` titled "SMGSC Portal") both link the same live URL (`university-web-app-xi.vercel.app`), same stack, same numbers in different framing (50 Prisma models/28 modules/100 tests vs. 672 unit + 250 e2e tests, 8 roles, 20 circular items). **Treat as one project with two draft write-ups — confirm which numbers are current/accurate before using either.**

- **Category**: Web & SaaS Engineering (Gov/Compliance CMS) — no AI component.
- **One-line**: Public college website + back-office CMS built to satisfy a real government transparency circular (Shah Abdul Latif University, Office of the Inspector of Colleges), where every published fact must trace to an approved, audited, human-verified source.
- **Client**: Sindh Muslim Government Science College, Karachi (per SMGSC draft) / an unnamed "affiliated government college" (per the other draft) — **confirm real client name and public/anonymized/private permission level.**
- **Starting point**: Regulatory mandate → built from scratch.
- **Solution**: Single content lifecycle (Draft → Submitted → Under Review → Approved → Published, plus Update-Required/Archive branches) shared across 28 CMS modules; compliance dashboard mapping 20 regulatory requirements to live, DB-computed completeness scores with human-only verification (no self-certification); confidential grievance system (rate-limited, honeypot, AES-256-GCM encrypted PII); immutable audit log enforced by a Postgres trigger (UPDATE/DELETE physically rejected); role-based admin (8 role types), never trusting client-side role claims; content freshness tracking with computed next-review-due dates.
- **Notable design decision**: `content:manage` (author) and `content:publish` (reviewer) permissions structurally never granted to the same role except one break-glass SUPER_ADMIN — self-approval is architecturally impossible, not just a review rule.
- **Hardening evidence**: dedicated accessibility audit (axe-core caught site-wide contrast failure across ~90 files, missing landmarks) and security audit (per-IP login rate limiting, magic-byte upload verification, full CSP/security-header set) — both run as deliberate passes, not side effects. One known gap flagged, not hidden: admin queries aren't yet tenant-scoped (real IDOR risk only if multi-tenant).
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, PostgreSQL (Neon), Prisma 7, Zod, bcrypt + server sessions, Vitest, Playwright + axe-core, GitHub Actions, Vercel, Cloudflare R2.
- **Results**: $0/month hosting (free-tier infra), 100 or 672+250 automated tests (reconcile), ~30,000 lines TypeScript (per one draft).
- **Screenshots/video**: none provided.
- **Fit note**: no AI involved — strongest as a Rescue/Hardening or Web & SaaS Engineering proof point (the accessibility/security "audit and fix" narrative maps directly onto the RESCUE offer), not as an "AI product" slot.

---

## 3. Manza — e-commerce storefront

- **Category**: Web & SaaS Engineering (E-commerce) — no AI, no backend.
- **One-line**: Luxury editorial abaya storefront, Next.js 16 + TypeScript, full catalog/cart/wishlist and a real WhatsApp/COD checkout, hardened for production.
- **Live**: manza-modesty.vercel.app · Source: github.com/osamaikhlas/manza (public repo)
- **Starting point**: Built solo from scratch.
- **Solution**: Catalog, cart, wishlist, live search all client-side (no commerce backend/CMS/payment gateway) — checkout hands a validated order to WhatsApp as a pre-filled message for Cash on Delivery.
- **Engineering/hardening**: removed 77MB of unused scraped assets from repo (took ESLint from 42,914 problems to 0), added sitemap/robots/per-route metadata, branded error/404 boundaries, shared scroll-lock+Escape-close hook unifying 3 previously-inconsistent overlays (cart drawer, mobile menu, search), respects `prefers-reduced-motion`, SSR-safe cart/wishlist hydration, static generation per product page.
- **Stack**: Next.js 16, TypeScript (strict, zero `any`), React 19, Tailwind CSS v4, Radix UI (shadcn-style layer), Framer Motion (used sparingly — hero built in hand-written CSS instead).
- **Screenshots**: 4 real screenshots embedded (home, shop, product detail, about) — usable directly.
- **Permission**: public GitHub repo + live site — appears freely showable.

---

## 4. Shakeel Pakwan Catering — bilingual small-business website

- **Category**: Web & SaaS Engineering (small business) — no AI.
- **One-line**: Bilingual (EN/UR) catering & events website for a Karachi caterer, built to turn a menu scroll into a WhatsApp quote message — zero backend.
- **Live**: shakeelpakwaan.vercel.app
- **Client**: Shakeel Pakwan, Malir, Karachi — real named local business.
- **Solution**: 7 pages, 80+ menu items across 6 sections with proper RTL Urdu (`dir="rtl" lang="ur"` per row, not transliteration or mirrored layout), WhatsApp lead capture via `wa.me` pre-filled message, native `<dialog>`-based lightbox gallery, `FoodEstablishment`/`Menu` JSON-LD structured data, full keyboard/screen-reader support, zero framework/build step (plain HTML/CSS/JS on Vercel).
- **Performance hardening (real before/after numbers)**: site photos 5.7MB → 3.3MB (−45%, JPEG→WebP); event videos 8.2MB → 3.1MB (−62%, resized to actual display width instead of shipping ~5× the needed pixels); homepage images 2.59MB → 1.59MB (−38%).
- **Brand system**: color palette sampled directly from the client's own logo mark (gold #D3AF37/#8A6D1D), not a generic AI palette.
- **Stack**: Plain HTML/CSS/JS, no framework, Vercel deploy.
- **Permission**: real named client, live public site — confirm OK to feature by name (likely yes, it's their public marketing site, but confirm).

---

## 5. Adz Lab — agency marketing site with real client metrics

- **Category**: Web & SaaS Engineering (marketing site + lead funnel) — no AI in the deliverable itself (client's own product is AI-generated ad creative, but the *site* has none).
- **One-line**: Five-page marketing site + lead funnel for a performance-creative agency (video ads/UGC/AI motion for ecommerce brands), built to convert like the direct-response ads the client sells.
- **Live**: adzlab.co
- **Client**: Adz Lab — real named agency client, markets UK/USA/UAE.
- **Solution**: Single-file React app (`App.tsx`, ~30-line custom router on `pushState`/`popstate` — deliberately no router library for a 5-route site), lazy-mounted ad-reel videos via `IntersectionObserver` (400px lookahead, play-on-hover) so 20+ reels don't fire 20+ video requests on load, animated count-up stats (`requestAnimationFrame`, 1.6s ease) for credibility, validating contact form (blur-time validation + domain normalization) feeding Formspree.
- **Deliberate non-choices** (good "why we didn't" content): no Tailwind despite it being installed — hand-rolled CSS for exact bespoke type/spacing; no router library — not needed at this scale.
- **Stack**: React 18, TypeScript, Vite, hand-rolled CSS, lucide-react, Formspree, Vercel.
- **Results (client's own numbers, not Arvexa's)**: "$200,000 revenue generated from clients since 2024," "$1,613,608.18 revenue impact of their ad creative," "3,000+ creatives produced since 2024" — **these are the CLIENT's business metrics displayed on their own site, not metrics about the website project itself. Do not present as Arvexa's outcome metric without rephrasing — the honest framing is "built the site that presents these client-reported numbers," not "we generated $1.6M."**
- **Screenshots**: 3 real screenshots referenced (services, work, contact) — files not yet in this repo, need to be pulled from the artifact's asset store if used.
- **Permission**: real named client — **confirm publishing permission before using in a public case study**, since it names a real agency and cites their specific revenue figures.

---

## 6. Mobile Automation Rig — QA framework (supporting evidence, not a client project)

- **Category**: QA/Test Engineering tool, not a delivered product.
- **One-line**: Cross-platform Appium + TestNG framework driving the same e-commerce checkout on Android emulator and iOS simulator, with Applitools visual regression and self-documenting HTML reports (screenshots auto-attached on failure).
- **Source**: github.com/osamaikhlas/AppiumFrameWorkWithTestNg (public)
- **Solution**: Page Object Model per platform, shared base-test contract across Android (UiAutomator2)/iOS (XCUITest), 3 Applitools visual checkpoints per checkout flow, business-logic assertions (re-sums cart total against app's displayed total, not just click-throughs), data-driven via JSON + Jackson, TestNG listener auto-attaches screenshots on failure via reflection.
- **Stack**: Java, Appium java-client 9.3.0, Selenium 4.16.1, TestNG 7.8.0, Applitools Eyes, ExtentReports, Jackson, Maven (Smoke/Regression profiles).
- **Fit note**: doesn't map to a BUILD/RESCUE/SCALE client engagement — it's a personal technical-capability artifact. Best used as **Insights/content material** (evidence of evaluation/QA rigor backing the "Evaluate" stage of the AI→Production framework) rather than a Work/portfolio slot, unless you want a "Capabilities" section elsewhere on the site.

---

## Cross-Project Notes for Checkpoint 3/8

- **Portfolio mix check against source doc's recommended slots** (AI app ×2, AI agent, AI automation, SaaS, website): AI Content Publisher covers AI app #1 strongly. No AI agent or AI automation project yet — you said more are coming. College Compliance/SMGSC covers SaaS. Manza, Shakeel Pakwan, and Adz Lab all compete for the "website" slot — likely feature the strongest 1, keep others as secondary/insights content rather than diluting the 5–6 project portfolio.
- **Duplicate to resolve**: College Compliance Portal vs. SMGSC Portal — same live URL, same stack, different stat framing. Pick one canonical write-up and one client-name/permission-level answer before Checkpoint 8.
- **Permission levels needed** (per the source doc's rule: never invent, never publish without permission):
  - Shakeel Pakwan — real named local client, public site → likely fine, confirm.
  - Adz Lab — real named client with specific revenue figures on their own site → confirm before publishing, and reframe as "the client's reported numbers," never as Arvexa's own outcome.
  - SMGSC/College Compliance — confirm real client name and whether it can be named or must be anonymized (public-sector client, may have its own comms policy).
  - Manza, AI Content Publisher, Mobile Automation Rig — appear to be your own/personal projects, no third-party permission needed, but confirm.
- **Screenshots/video status**: only Manza has real screenshots ready to use. Everything else needs screenshots/video captured or exported before Checkpoint 8.
