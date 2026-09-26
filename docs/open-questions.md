# Open Questions, Assumptions & Decisions Needed

Status as of Checkpoint 2 (approved). Update this file as items are resolved — don't re-litigate closed items.

## Missing Information (materially affects downstream checkpoints)

1. ~~**Real project inventory**~~ — RESOLVED 2026-09-20. 7 real projects received and logged in `docs/project-inventory-raw.md`: AI Content Publisher (flagship AI SaaS), College Compliance Portal/SMGSC Portal (likely duplicate — needs reconciling), Manza, Shakeel Pakwan Catering, Adz Lab, Mobile Automation Rig. More AI Agent / AI Automation projects to come per your note. Remaining sub-items: reconcile the College Compliance/SMGSC duplicate, confirm client-naming permission for Adz Lab and SMGSC, gather screenshots (only Manza has them).
2. ~~**Company name confirmation**~~ — RESOLVED 2026-09-20. Confirmed: **Arvexa**.
3. **Domain name & hosting target** — no domain given. Assuming Vercel deployment (Next.js-native, and Vercel-specific skills are available in this environment) unless told otherwise. As of Checkpoint 11, everything that needs the real domain (canonical URLs, sitemap, robots, OG/JSON-LD) reads from `NEXT_PUBLIC_SITE_URL` (see `.env.example`) and falls back to a clearly-fake placeholder until set — setting this one env var before launch is the only remaining step, not a code change.
4. ~~**Brand assets**~~ — RESOLVED. Real logo supplied and integrated (Nav/Footer/favicon); site accent repainted to match it. See `docs/decisions.md`. OG image still outstanding — tracked under Checkpoint 11 (SEO).
5. **Legal/company details** — no registered entity name, business address, or jurisdiction for Privacy Policy / Terms pages. Will use `[PLACEHOLDER]` there until supplied.
6. **Analytics & form backend** — FURTHER RESOLVED at Checkpoint 11: `trackEvent()` (`src/lib/analytics.ts`) now fires from every conversion point site-wide — all 11 primary CTAs (`site/cta-button.tsx`) plus form submit success/error (Checkpoint 10) — verified firing live in-browser. Still no real analytics provider (GA4/Plausible/PostHog) or real lead destination (email/CRM) wired up — `deliverLead()` in `src/app/start-a-project/actions.ts` and the one spot inside `trackEvent()` itself are the two places to add a real provider; nothing else needs to change. Needed before real launch, not blocking now.
7. **Content ownership** — is there a non-technical person who needs to edit `/insights` posts without touching code? Determines MDX-in-repo vs. headless CMS (§25 of your prompt says "choose the simplest appropriate option" — default assumption: **MDX in-repo**, since there's currently a team of one).
8. **Testimonials/logo permissions** — none confirmed yet. Portfolio proof section will stay empty/placeholder until permission levels (public / anonymized / private) are set per project.
9. **Budget/timeline ranges for the lead form** — RESOLVED (shipped) at Checkpoint 10, but treat as provisional pending your review. Timeline: ASAP/1 month, 1–3 months, 3–6 months, 6+ months. Budget: Under $5,000, $5,000–$15,000, $15,000–$40,000, $40,000+, Not sure yet. Defined in `src/app/start-a-project/schema.ts` — easy to change, just flagging these were my proposed defaults, not confirmed market research.
10. ~~**AI Agent / AI Automation case study still missing**~~ — RESOLVED 2026-09-22: OPD Reimbursement Workflow (n8n webhook → OCR → AI/LLM extraction → validation → policy calculation → database → PDF/notifications, with a confidence-gated manual-review branch) added and confirmed with the user as actually built/shipped before writing it up — live at `/work/opd-reimbursement-workflow`, category `AI Automation`. RAG-Based AI Chatbot (multi-tenant RAG platform with a confirmed `search_web` tool-calling capability) recategorized to `AI Agents` the same day. Service 2 and journey #4 now have real proof, and **all 4 `ProjectCategory` tabs have at least one real project** — the taxonomy gap is fully closed. See `docs/decisions.md`.
11. ~~**College Compliance Portal / SMGSC Portal duplicate**~~ — RESOLVED at Checkpoint 8 (anonymized version used as canonical), then RE-RESOLVED 2026-09-21: permission came through (real live URL + screenshot + named artifact supplied) — switched to the named "SMGSC Portal" version, now live at `/work/smgsc-portal`. See `docs/decisions.md`.
12. ~~**Adz Lab publishing permission**~~ — RESOLVED 2026-09-21: permission came through (real live URL + artifact supplied, including the specific revenue figures) — added to the portfolio, live at `/work/adz-lab`. See `docs/decisions.md`.

## Assumptions Being Made (flag now, will proceed unless corrected)

- Company name: **Arvexa** (from your prompt).
- Tech stack: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui, deployed on Vercel — per your prompt's §25 baseline and matching the tools available in this environment.
- Content: MDX/local structured content, not a headless CMS, until told otherwise.
- Single-language (English) site, no i18n requirement.
- Team of one (you) — About page will describe a founder-led practice unless you indicate otherwise.
- No existing brand guidelines to conform to (greenfield brand system in Checkpoint 4).

## Decisions Needed From You (before they become blocking)

- Confirm/adjust the domain before Checkpoint 4 (brand) locks it into visual assets. (Company name itself is resolved: Arvexa.)
- Reconcile the College Compliance/SMGSC duplicate and confirm Adz Lab publishing permission before Checkpoint 3 turns raw project data into public case-study copy.
- Confirm analytics + form-handling preference before Checkpoint 10/11.

## Potential Contradictions / Tensions to Watch

- Your operating prompt's IA (§14) lists `/services/ai-rescue` and optionally `/ai-production-audit` as a *separate* page, while the source doc treats "AI Rescue" as both a service page *and* the dedicated audit landing page (§10 of the source doc). Resolution: treat `/services/ai-rescue` as that signature landing page itself, and only add a separate `/ai-production-audit` route later if conversion data suggests splitting it — avoids a redundant near-duplicate page at launch.
- Source doc's Phase-based roadmap (7 phases) and your prompt's 14-checkpoint structure cover the same ground at different granularity. Using the **14 checkpoints as the operating sequence** (per your explicit instructions) and treating the source doc's phases as a cross-reference only, not a second parallel tracker.
- "Web & SaaS Engineering must not overpower the AI positioning" (source doc) vs. a natural pull toward web-heavy portfolio pieces if the strongest available real projects turn out to be more web/SaaS than AI-native — worth watching once the real project inventory (item 1 above) comes in.

## Content Required Before Launch (superseded by `docs/content-needed.md` starting Checkpoint 3 — kept here only as a pre-Checkpoint-3 snapshot)

- Real project data (screenshots, architecture notes, metrics, testimonial permissions).
- Founder bio/photo for About page.
- Legal entity details for Privacy/Terms.
- Final domain + any existing social handles for Open Graph / footer links.
