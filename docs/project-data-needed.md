# Project Data Needed

Per-project checklist against the schema in `docs/case-study-framework.md`. Source facts live in `docs/project-inventory-raw.md` — this file tracks only what's *missing* before each project can become a published case study. Update checkboxes as items arrive; don't re-copy the facts that are already captured elsewhere.

## Recommended Initial Portfolio (for your review, not yet final)

Given the source doc's guidance ("you don't need 20 projects, you need enough proof" + "Web & SaaS Engineering must not overpower the AI positioning" — source doc §4, §9), recommending 4 for the launch portfolio rather than all 6 candidates, to avoid the portfolio reading as web-agency-heavy:

1. **AI Content Publisher** — flagship, AI Product Engineering slot.
2. **College Compliance Portal / SMGSC Portal** (reconciled to one) — SaaS/engineering-rigor slot, strongest RESCUE-adjacent hardening story.
3. **Manza** — Web & SaaS Engineering slot; chosen over Shakeel Pakwan/Adz Lab because it already has real screenshots and no third-party permission to chase.
4. *(reserved slot)* — first AI Agent or AI Automation project once you share one; currently the biggest gap.

**Held back as secondary/Insights material rather than featured portfolio slots**: Shakeel Pakwan Catering, Adz Lab, Mobile Automation Rig. Reasoning per project below. Override any of this if you'd rather feature more projects — flagging as a recommendation, not a decision I'm locking in.

---

## 1. AI Content Publisher — live at `/work/ai-content-publisher`

- [x] `client` — set to "Solo project" (2026-09-22), matching the existing `problem`/`solution` content, which already described a solo four-month build. See `docs/decisions.md`.
- [x] `images` — 4 real screenshots (home, services, pricing, about) captured from the live site.
- [ ] `videos` — optional, still none.
- [x] `liveUrl` — `https://ai-content-publisher-six.vercel.app` (public).
- [x] `permissionLevel` — `public`.
- [ ] Real usage/outcome metrics (current `results` are engineering-effort metrics only — commits, PRs, files, tests — not business outcomes).

## 2. SMGSC Portal — live at `/work/smgsc-portal` (renamed from College Compliance Portal)

- [x] **Duplicate resolved (Checkpoint 8)** — originally went with the anonymized "College Compliance Portal" framing rather than the named "SMGSC Portal" draft, pending publishing permission.
- [x] **Switched to the named version (2026-09-21)** — permission confirmed (real live URL + screenshot + the `NVauaRU4rjuKZqhuz1tZot` artifact supplied directly). Now uses the real college name (Sindh Muslim Government Science College, Karachi), the real circular number (I.C/SALU/KHP/-662), and the real stats (672 unit + 250 e2e tests, 8 roles, 20 circular items) — see `docs/decisions.md`.
- [x] `images` — 4 real screenshots (home, admissions, notices, faculty) captured from the live site.
- [ ] `videos` — optional, still none.
- [ ] `testimonial` — none yet; likely N/A for a government client but confirm.

## 3. Manza — live at `/work/manza`, fully real, no placeholders

- [x] `images` — the 4 real screenshots have been pulled from the original case-study artifact and are live at `public/case-studies/manza/*.jpg`, rendered in the case study's Final Product section.
- [x] `liveUrl` — manza-modesty.vercel.app (public), linked on the case-study page.
- [x] Source repo public (github.com/osamaikhlas/manza) — low permission risk.
- [x] `client` — resolved as "Solo project" (matches what's known; update if that's inaccurate).
- [ ] `videos` — optional, would strengthen the checkout-flow story.
- [ ] `results` — currently qualitative (ESLint 42,914→0, 77MB removed) with no business/traffic metrics; confirm whether any exist or keep qualitative.

## 4. Shakeel Pakwan Catering (secondary — Insights candidate, not launch portfolio slot)

- [x] `images`/performance data — real before/after numbers exist (photo/video/homepage weight reductions).
- [x] `liveUrl` — shakeelpakwaan.vercel.app (public)
- [ ] Confirm OK to feature named local client publicly (likely yes for their own public marketing site, but confirm rather than assume).
- **Why held back from launch portfolio**: no AI involvement at all; strongest as an Insights/blog technical post ("how we cut media weight in half without touching visible quality") rather than a Work case study, since the launch portfolio is intentionally AI-forward.

## 5. Adz Lab — live at `/work/adz-lab`

- [x] **Publishing permission confirmed (2026-09-21)** — user supplied the real live URL (`adzlab.co`) and the case-study artifact directly, resolving the prior block. `results` explicitly frames the revenue figures ($200,000 / $1,613,608.18 / 3,000+ creatives) as Adz Lab's own reported business numbers, not an Arvexa outcome — see `docs/decisions.md`.
- [x] `images` — 4 real screenshots (home, services, work, contact) captured directly from the live site.
- **Not in the homepage's curated "Selected Work" grid** (`featured: false`) — fully live on `/work`, same as Shakeel Pakwan.

## 6. Mobile Automation Rig (not a portfolio candidate — Insights/capabilities material)

- Not a client engagement — a personal QA framework. Doesn't map to BUILD/RESCUE/SCALE.
- **Recommendation**: repurpose as an Insights post evidencing the "Evaluate" stage of the AI→Production framework (real automated visual-regression + business-logic testing discipline), or fold into an About/Process "capabilities" mention — not a `/work` case study.

## 7. Cool n Bite — live at `/work/cool-n-bite` (added 2026-09-22, not part of the original 7-project inventory)

- [x] Added directly from the live site (`https://coolnbite.vercel.app/`) — no case-study artifact was supplied, so `content` was written from what's directly observable on the site rather than a source doc. All facts (menu prices, address, phone, the 68%-recommend testimonial stat) are real, pulled live.
- [x] `images` — 4 real screenshots (home, menu, gallery, counter/gallery-detail).
- [x] `technology` — verified via client-side inspection (`window.__NEXT_DATA__` absent, `<div id="root">`, hashed Vite-style bundle) rather than assumed; listed as `["React", "Vite", "Vercel"]` only — no TypeScript claim, since that couldn't be confirmed client-side.
- **Not in the homepage's curated "Selected Work" grid** (`featured: false`) — fully live on `/work`.

---

## Still Needed Regardless of Which Projects Are Selected

- ~~Founder bio + photo for About page.~~ Resolved 2026-09-26: the "Who's behind this" section was removed from About entirely, per explicit user request, rather than left as a visible placeholder — see `docs/decisions.md`.
- ~~At least one more real project for the AI Agents & Automation gap~~ (carried from Checkpoints 1 & 2). Resolved 2026-09-22: OPD Reimbursement Workflow (AI Automation) added, and RAG-Based AI Chatbot recategorized to AI Agents — see `docs/decisions.md`. All 4 `ProjectCategory` tabs now have at least one real project.
- ~~Decision on whether to feature 3 (recommended above) or more projects at launch.~~ Resolved implicitly at Checkpoint 8 — built with the 3 recommended (AI Content Publisher, College Compliance Portal, Manza); the 4th slot stays open for the first AI Agent/Automation project. The portfolio now has 8 real projects total, and the stale homepage note referencing "pending image assets/client-naming permission" (both fully resolved since) was removed from `src/app/page.tsx` 2026-09-26.
