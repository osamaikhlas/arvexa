import type { Project, ProjectCategory } from "@/types/project";

/**
 * Source facts: docs/project-inventory-raw.md. Never add a claim here that
 * isn't traceable to that file — see docs/case-study-framework.md's content
 * policy. The SMGSC Portal entry (below) used to run anonymized — see
 * docs/decisions.md, 2026-09-21, for why it switched to the named version.
 */
export const PROJECTS: Project[] = [
  {
    title: "RAG-Based AI Chatbot",
    slug: "rag-based-ai-chatbot",
    category: "AI Agents",
    summary:
      "A multi-tenant, white-label AI chatbot platform for websites. One codebase serves every customer, and each gets a branded widget that answers questions using retrieval-augmented generation (RAG) over their own uploaded documents.",
    client: "Solo project",
    content: {
      problem:
        "The goal was a chatbot that knows a customer's business, matches their brand, and lives on their website, sold as a single multi-tenant platform instead of a bespoke build for every customer.",
      startingPoint:
        "Built from scratch as a multi-tenant SaaS platform from day one, so branding, billing, and per-tenant data isolation are part of the core architecture instead of being retrofitted onto a single-customer chatbot later.",
      solution:
        "Each tenant gets a branded chat widget (colors, logo, name, position), their own uploaded knowledge base (PDF, DOCX, TXT, web pages), their own system prompt, and either the platform's shared Anthropic key or their own key on the top plan. The branding runs deeper than a color swap. A demo travel site's widget introduces itself as \"Journey, Driftwood's trip planner\" in a coral-branded header, while a demo cloud-hosting site's widget is \"Byte,\" a purple-branded support bot with a completely different opening line. Same underlying widget, two distinct products. The widget ships in two parts: a tiny (~8KB) vanilla JS snippet that customers paste into their site, which injects a shadow-DOM iframe for CSS/DOM isolation from the host page, and the chat UI itself, which lives inside that iframe. A retrieval-augmented generation pipeline embeds each user message, retrieves the top five tenant-scoped chunks by cosine similarity from pgvector, and streams a Claude response back over SSE.",
      architecture: [
        "widget.js (~8KB): embed snippet loading a shadow-DOM iframe",
        "/app/widget/[tenant]: chat UI, isolated inside the iframe",
        "/api/chat: RAG pipeline, embed, retrieve top 5 chunks, Claude (streamed)",
        "search_web tool: fallback for questions outside the uploaded knowledge base",
        "/api/widget-config: public branding only, open-CORS by design",
        "Supabase Postgres + pgvector: tenant data and vector search",
        "Stripe Subscriptions: plan billing and usage gating",
      ],
      engineeringContribution:
        "Multi-tenant isolation is enforced at the database layer, not just in application code. Row Level Security is enabled on every Supabase table, anonymous reads are blocked by default, and every API route re-verifies the authenticated tenant_id server-side, so cross-tenant data access is architecturally impossible rather than merely checked for. The widget's security model is deliberately layered. allowed_domains drives a Content-Security-Policy frame-ancestors header on the widget route itself, which is the actual enforced boundary, applied by the browser, so an unlisted site simply cannot render the widget. /api/chat separately validates the request's Origin and cross-checks it against that same allowed-domains list for attribution. /api/widget-config is intentionally left open-CORS, since it only returns public branding data with no secrets and has to be fetchable before any iframe exists; the real cost and abuse surface is /api/chat, which is where the strict checks live. Known gaps are tracked rather than hidden: the BYOK Anthropic API key is currently stored in plaintext, flagged as needing a key-management decision before Scale-plan customers rely on it, and the internal /api/admin/* routes still go through an unnecessary HTTP hop slated to collapse into direct server-side calls.",
      aiContribution:
        "Retrieval-augmented generation runs over each tenant's own uploaded documents: chunked into 512-token segments with 50-token overlap, embedded with OpenAI's text-embedding-3-small (1536 dimensions), and retrieved at query time via tenant-scoped cosine similarity in pgvector. The retrieved chunks, the tenant's own system prompt, and recent message history are assembled into a single prompt and answered by Claude, streamed back to the widget over SSE. Claude also has a search_web tool available for questions the tenant's own uploaded documents don't cover. Each call is logged with its input, result, and elapsed time, an 18-match web search resolving in 342ms, for example, giving that fallback path the same auditability as the RAG retrieval step.",
      results:
        "Phase 1 (core RAG pipeline, embed widget, admin tenant/document management, message logging) and most of Phase 2 (Stripe billing and webhooks, plan-based rate limiting, an admin analytics dashboard, document management) are built; onboarding email automation is the one Phase 2 item still open. Phase 3 (a customer-facing self-serve portal, custom domains, webhook notifications, prompt A/B testing) hasn't started yet. Roughly 80 files at MVP: 6 API routes, 12 React components, 8 lib utilities, 6 test files, 4 migrations.",
    },
    technology: [
      "Next.js 14",
      "Supabase Postgres",
      "Supabase pgvector",
      "Supabase Auth",
      "OpenAI text-embedding-3-small",
      "Claude (Anthropic)",
      "Stripe Subscriptions",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "Jest",
      "Playwright",
    ],
    images: [
      "/case-studies/rag-based-ai-chatbot/widget-driftwood-travel.jpg",
      "/case-studies/rag-based-ai-chatbot/widget-vertex-cloud.jpg",
      "/case-studies/rag-based-ai-chatbot/tool-call.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: null,
    featured: false,
    permissionLevel: "anonymized",
  },
  {
    title: "AI Content Publisher",
    slug: "ai-content-publisher",
    category: "AI Saas Implementation",
    summary:
      "A multi-sided AI SaaS platform that turns book publishing into a guided, AI-assisted product, taking a writer from a first idea to a finished manuscript, cover, and distribution package.",
    client: "Solo project",
    content: {
      problem:
        "Turn a static marketing site into a full publishing platform modeled on premium ghostwriting services, with an AI co-writer at the center, serving three different audiences from one codebase: independent authors writing their first book, agency clients managing a slate of titles for a team, and internal admins reviewing every manuscript before it goes to print.",
      startingPoint:
        "An idea and an existing static marketing site, rebuilt from the ground up into a full production SaaS platform over roughly four months, solo.",
      solution:
        "Ten interlocking systems shipped as their own specs and pull requests: an AI writing engine, a manuscript editor, a cover design studio, a layout and publishing pipeline, manuscript import, an admin review workflow, client and agency dashboards, billing, and realtime notifications, all built to work together as one product rather than as ten separate demos.",
      architecture: [
        "Author / Admin / Agency UI",
        "Next.js App Router",
        "Supabase (Postgres, Auth, Storage, Realtime)",
        "Claude for streamed writing (SSE), Ideogram v2 for covers",
        "Vercel Sandbox: isolated PDF/EPUB rendering",
        "PayPal / Google Pay for billing",
        "Resend + Realtime for notifications",
      ],
      engineeringContribution:
        "Row-Level Security on every table, server-side ownership checks on every resource, Zod validation on all external input, and AI/payment calls kept server-only. The process was spec-first: 30 written specs, one branch per feature, PR-reviewed, nothing merged straight to main, with typecheck, lint, unit tests, and a production build required before every merge. Three real production incidents were found and fixed after launch. A retired AI model ID started 404-ing in production and was fixed by moving to a durable alias. A silent token-ledger gap, where usage rows were being rejected by a missing Row-Level-Security insert policy, was fixed by routing writes through the service-role client. A cross-chapter autosave race condition caused by a stale closure was fixed by scoping the save to a captured snapshot. Print-quality PDF rendering is isolated in a Vercel Sandbox rather than the main app process, since it's heavy and sits close to untrusted input.",
      aiContribution:
        "Claude powers the writing engine: chapter drafts stream over SSE with live token accounting, metered and rate-limited by plan before every call. Ideogram v2 generates cover concepts, and title typography is overlaid client-side afterward so the AI is never asked to render text directly.",
      results:
        "124 commits, 50 merged pull requests, 478 TypeScript source files, 21 database migrations, and 53 unit/E2E test files across a roughly four-month solo build. These are engineering-effort metrics, not business outcome metrics; real usage numbers aren't available yet.",
    },
    technology: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "TipTap",
      "Supabase Postgres",
      "Supabase Auth",
      "Supabase Realtime",
      "Claude (Anthropic)",
      "Ideogram v2",
      "PayPal Subscriptions",
      "Google Pay",
      "Vercel Sandbox",
      "Sentry",
      "Resend",
      "Jest",
      "Playwright",
    ],
    images: [
      "/case-studies/ai-content-publisher/home.jpg",
      "/case-studies/ai-content-publisher/services.jpg",
      "/case-studies/ai-content-publisher/pricing.jpg",
      "/case-studies/ai-content-publisher/about.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: "https://ai-content-publisher-six.vercel.app",
    featured: true,
    permissionLevel: "public",
  },
  {
    title: "SMGSC Portal",
    slug: "smgsc-portal",
    category: "AI Saas Implementation",
    summary:
      "The official website and compliance back office for Sindh Muslim Government Science College, Karachi. Built to satisfy a real university circular where every published fact has to trace back to an approved, audited, human-verified source.",
    client: "Sindh Muslim Government Science College, Karachi (affiliated with Shah Abdul Latif University, Khairpur)",
    content: {
      problem:
        "Shah Abdul Latif University's Office of the Inspector of Colleges issued Circular No. I.C/SALU/KHP/-662, requiring every affiliated college to publish an official website covering a fixed list of categories, including admissions, faculty, results, notices, and grievances, with accuracy held as the Principal's personal responsibility. That one clause rules out a static site someone edits by hand. It demands a system where every fact on the public page traces to a person authorized to publish it, and nothing goes live without a second person checking it first.",
      startingPoint:
        "A government circular, built from scratch, with no existing site or system to build on.",
      solution:
        "A five-state content lifecycle (Draft → Submitted → Under Review → Approved → Published, with a reject-with-reason path back to Submitted) applies uniformly across every content domain, including notices, results, fee schedules, and faculty listings, instead of one-off logic per content type. The permission that lets someone author content (content:manage) is never granted to the same role as the permission that lets them publish it (content:publish), with exactly one break-glass exception (SUPER_ADMIN). Self-approval is structurally impossible, not just a review-checklist rule.",
      architecture: [
        "Public site: 16 sections (admissions, faculty, notices, results, grievance, and more)",
        "Admin CMS with 8 distinct role types",
        "5-state content workflow with a manage/publish permission split",
        "PostgreSQL (Neon) + Prisma 7",
        "Immutable, DB trigger-enforced audit log",
        "Cloudflare R2 for document storage",
      ],
      engineeringContribution:
        "A database trigger makes every AuditLog row physically un-updatable and un-deletable, so immutability is enforced at the database layer rather than by application convention. Every route re-checks permissions server-side against the database on each request, never trusting a session cookie's claims. Official facts live in Postgres, never hard-coded, with isPlaceholder flags marking anything not yet confirmed by the college itself. A confidential grievance system encrypts submitter PII with AES-256-GCM at rest, with no public read path for case data, on top of rate limiting and a honeypot against automated submissions. No status can reach \"verified\" without a logged human decision; the system cannot self-certify. Dedicated accessibility and security passes shipped concrete fixes rather than just findings: axe-core caught a site-wide contrast failure across roughly 90 files and missing landmarks, and the security pass added per-IP login rate limiting, magic-byte upload verification, and a full CSP/security-header set. Every push runs lint, typecheck, the full unit and e2e suite against a real Postgres container, and a build-without-secrets check before it can ship.",
      aiContribution: null,
      results:
        "672 unit tests (Vitest) and 250 end-to-end tests (Playwright), 8 distinct admin roles, and all 20 items from the university's circular tracked to completion, running on $0/month across 3 free-tier services (Vercel, Neon Postgres, Cloudflare R2).",
    },
    technology: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "Prisma 7",
      "Tailwind CSS 4",
      "Vitest",
      "Playwright",
      "GitHub Actions",
      "Cloudflare R2",
      "Vercel",
    ],
    images: [
      "/case-studies/smgsc-portal/home.jpg",
      "/case-studies/smgsc-portal/admissions.jpg",
      "/case-studies/smgsc-portal/notices.jpg",
      "/case-studies/smgsc-portal/faculty.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: "https://university-web-app-xi.vercel.app",
    featured: true,
    permissionLevel: "public",
  },
  {
    title: "Manza",
    slug: "manza",
    category: "AI Web Development",
    summary:
      "A luxury, editorial-first e-commerce storefront built end-to-end, then hardened for production: clean typecheck and lint, real error handling, SEO plumbing, and accessibility fixes across every overlay in the app.",
    client: "Solo project",
    content: {
      problem:
        "Manza needed to look and feel like a considered fashion retailer, not a template, while shipping without a commerce backend, payment gateway, or CMS.",
      startingPoint: "Built solo from scratch.",
      solution:
        "Catalog, cart, wishlist, and live search live entirely client-side, with no commerce backend, payment gateway, or CMS. Checkout collects delivery details, validates them, then hands the order to WhatsApp as a pre-filled message for Cash on Delivery: a genuine ordering flow for a small business, not a placeholder waiting on a payment integration.",
      architecture: [
        "Next.js 16 with static generation per product page",
        "Client-side cart / wishlist state",
        "WhatsApp checkout handoff",
      ],
      engineeringContribution:
        "77MB of unused scraped assets were found sitting in the repo and removed. That alone took ESLint from 42,914 problems to zero. A sitemap, robots.txt, and per-route metadata were added; client-only pages were split so cart, checkout, and wishlist get real page titles; and branded error, global-error, and not-found boundaries were written using Next 16.3's retry API. Cart drawer, mobile menu, and search each handled focus and scroll differently before being replaced with one shared hook so all three lock background scroll and close on Escape consistently. Verified with a clean typecheck, lint, and production build, plus a manual pass through search, add-to-bag, checkout validation, and the 404 page in a real browser before merging.",
      aiContribution: null,
      results:
        "77MB of dead assets removed, and ESLint problems went from 42,914 to zero. TypeScript strict mode throughout with zero uses of `any`, and a clean `tsc --noEmit`.",
    },
    technology: ["Next.js 16", "TypeScript", "React 19", "Tailwind CSS v4", "Radix UI", "Framer Motion"],
    images: [
      "/case-studies/manza/home.jpg",
      "/case-studies/manza/shop.jpg",
      "/case-studies/manza/product.jpg",
      "/case-studies/manza/about.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: "https://manza-modesty.vercel.app",
    featured: true,
    permissionLevel: "public",
  },
  {
    title: "Shakeel Pakwan",
    slug: "shakeel-pakwan",
    category: "AI Web Development",
    summary:
      "A bilingual (English/Urdu) catering and events website for a Karachi caterer, built to turn a menu scroll into a WhatsApp quote request with no framework, no backend, and no dropped leads.",
    client: "Shakeel Pakwan Catering & Decoration",
    content: {
      problem:
        "Shakeel Pakwan caters weddings, corporate events, and family gatherings in Karachi, and most of it is booked over a phone call or a WhatsApp voice note, not email. The site needed to hold a genuinely large menu (six sections, 80+ dishes) in a way that reads naturally in Urdu as well as English, run fast on a mid-range phone over a mobile connection, and turn a browsing visitor into a quote request without a backend to maintain.",
      startingPoint:
        "No existing website. Built from scratch for an already-operating catering business (40+ years in business, per their own site).",
      solution:
        "Seven static pages, Home, About, Catering Services, Menu, Gallery, Contact, and Request a Quote, shipped with zero framework and no build step, deployed straight to Vercel. Every dish on the menu carries its Urdu name set in proper right-to-left type next to the English, across all six menu sections. Contact and quote forms validate in the browser, then hand off a pre-filled wa.me WhatsApp message instead of posting to an email server or CMS. The photo and video gallery is built on the native <dialog> element for a free focus trap and Escape-to-close, plus a scroll-snap slider.",
      architecture: [
        "Static HTML / CSS / JS: 7 pages, no framework or build step",
        "Bilingual EN/UR menu, Urdu set right-to-left per dish",
        "WhatsApp handoff via a pre-filled wa.me message, no backend",
        "Native <dialog> lightbox gallery + scroll-snap slider",
        "FoodEstablishment + Menu JSON-LD, per-page Open Graph",
      ],
      engineeringContribution:
        "A performance pass cut media weight without touching visible quality. Gallery videos were shipping at 576px wide into tiles displayed at roughly 260px, nearly five times the pixels the layout ever showed, so they were re-encoded to match the real display size and given poster frames, cutting video weight from 8.2MB to 3.1MB (a 62% reduction). Every photo moved from JPEG to WebP, taking site-wide photo weight from 5.7MB to 3.3MB (down 45%) and homepage image weight from 2.59MB to 1.59MB (down 38%) on the first page most visitors land on. Accessibility got a skip link, aria-current on the active nav item, and an accessible mobile menu toggle throughout. Structured data (FoodEstablishment and Menu JSON-LD), per-page Open Graph tags, a sitemap, and robots.txt were added for search.",
      aiContribution: null,
      results:
        "Seven pages, 80+ menu items across six courses in two languages (English and Urdu), and a 38 to 62 percent cut in media weight across homepage images, site-wide photos, and gallery videos, with zero visible quality loss and zero framework dependencies.",
    },
    technology: ["HTML", "CSS", "JavaScript", "WebP", "Vercel"],
    images: [
      "/case-studies/shakeel-pakwan/home.jpg",
      "/case-studies/shakeel-pakwan/menu.jpg",
      "/case-studies/shakeel-pakwan/gallery.jpg",
      "/case-studies/shakeel-pakwan/about.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: "https://shakeelpakwaan.vercel.app",
    featured: false,
    permissionLevel: "public",
  },
  {
    title: "Adz Lab",
    slug: "adz-lab",
    category: "AI Web Development",
    summary:
      "A marketing site and lead funnel for a performance-creative agency serving ecommerce brands across the UK, USA, and UAE, built to sell the studio as hard as the ads it makes for clients.",
    client: "Adz Lab",
    content: {
      problem:
        "Adz Lab makes performance creative: video ads, UGC, and AI motion work for ecommerce and DTC brands. Their own site had to prove that in seconds rather than act as a static gallery. Every page needed to end at one conversion (a booked discovery call), carry dozens of ad reels without a slow first paint, and make its own revenue and creative-output numbers feel verified rather than printed.",
      startingPoint: "A five-page marketing site built from scratch, with no existing site or CMS to build on.",
      solution:
        "The entire site, five routes, every section, and the contact form, lives in a single App.tsx, with a lightweight custom router built on history.pushState and popstate handling navigation and hash-scrolling in under 30 lines, instead of a router library or page-per-file scaffolding. Every ad reel sits behind an IntersectionObserver with a 400px lookahead margin. Videos mount only once they're about to enter view, play on hover, and reset on mouse-leave, so the homepage carries twenty-plus reels without twenty-plus video requests firing on load. The contact form validates name, work email, phone, and website against real patterns as each field blurs, not just on submit, and normalizes a bare domain like brand.com into a proper URL before it hits Formspree.",
      architecture: [
        "Single App.tsx: 5 routes, custom pushState/popstate router",
        "IntersectionObserver-gated video loading (400px lookahead)",
        "Count-up stat animation via requestAnimationFrame, 1.6s ease",
        "Formspree-validated contact form, no backend",
        "Hand-rolled CSS design system (Tailwind installed, deliberately unused)",
      ],
      engineeringContribution:
        "Revenue and creative-output stats animate from zero the moment they scroll into view, eased over 1.6 seconds with requestAnimationFrame, a small piece of motion doing a credibility job so the number feels calculated live rather than typed into a template. Two dependencies were deliberately left unused despite being installed. Tailwind sat unused because the design's specific negative letter-spacing, oversized display type, and bespoke card geometry were more directly controlled with a plain, well-organized stylesheet than utility classes would allow, and a router library went unused because five routes and a couple of hash-linked anchors don't need one.",
      aiContribution: null,
      results:
        "Adz Lab's own reported business figures, $200,000 in revenue generated from their clients since 2024, $1,613,608.18 in revenue impact attributed to their ad creative, and 3,000+ creatives produced since 2024, are what the homepage counts up to on load. These are the agency's business numbers, not an Arvexa engineering-effort metric.",
    },
    technology: ["React 18", "TypeScript", "Vite", "Formspree", "Vercel"],
    images: [
      "/case-studies/adz-lab/home.jpg",
      "/case-studies/adz-lab/services.jpg",
      "/case-studies/adz-lab/work.jpg",
      "/case-studies/adz-lab/contact.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: "https://adzlab.co",
    featured: false,
    permissionLevel: "public",
  },
  {
    title: "Cool n Bite",
    slug: "cool-n-bite",
    category: "AI Web Development",
    summary:
      "A menu-first marketing site for a North Karachi ice cream, pizza, and fast food counter, built around real Facebook/Instagram content, real PKR pricing, and a one-tap call-to-order flow.",
    client: "Cool n Bite",
    content: {
      problem:
        "Cool n Bite sells ice cream, pizza, and fast food from a single counter in North Karachi, and most orders come in by phone call, not a web form. The site needed to answer the two questions a hungry visitor actually has, what's on the menu and how much does it cost, in the bilingual Roman Urdu/English the business actually talks in, without pretending to be a delivery app it isn't.",
      startingPoint: "No existing website. Built from scratch for an already-operating local food counter.",
      solution:
        "A single-page site (Home, Menu, and Gallery reached by anchor links) with the full menu grouped by category, Pizza, Pasta, Kunafa & Ice Cream, and more, every item carrying its real PKR price and a short bilingual tagline matching how the business actually talks to its customers (\"Kya Khayen Aaj?\"). A gallery pulls real photos straight from the business's own Facebook and Instagram feed instead of staged product shots. Every call to action, the header's \"Call to Order\" button, the hero's phone number, and each menu section, resolves to the same real tel: link, matching how this business actually takes orders.",
      architecture: [
        "Single-page React app with anchor-link navigation (Home/Menu/Gallery)",
        "Menu grouped by category, real PKR pricing per item",
        "Gallery sourced from the business's real Facebook/Instagram content",
        "tel: link ordering, no cart, no form, no backend",
      ],
      engineeringContribution:
        "Real customer feedback replaces a manufactured star-rating block. The testimonials section reports the business's actual Facebook recommendation rate (68%) alongside two named, real reviewer quotes. Every ordering path on the site resolves to the same real phone number, and the footer links straight to the business's real Google Maps listing, Facebook, and Instagram. Nothing on the site points anywhere fictional.",
      aiContribution: null,
      results:
        "A live, single-page site covering the full menu across multiple categories with real PKR pricing throughout, a real Facebook-sourced testimonial section, and a direct-dial ordering path, taking real calls at the business's real number.",
    },
    technology: ["React", "Vite", "Vercel"],
    images: [
      "/case-studies/cool-n-bite/home.jpg",
      "/case-studies/cool-n-bite/menu.jpg",
      "/case-studies/cool-n-bite/gallery.jpg",
      "/case-studies/cool-n-bite/counter.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: "https://coolnbite.vercel.app",
    featured: false,
    permissionLevel: "public",
  },
  {
    title: "Sybrisco",
    slug: "sybrisco",
    category: "AI Web Development",
    summary:
      "A fully bilingual (Arabic/English) corporate site for a Saudi IT and digital-transformation consultancy, built to read as a credible enterprise partner for Vision 2030 work, with a real Arabic-first experience rather than a translated afterthought.",
    client: "SYBRISCO KSA",
    content: {
      problem:
        "SYBRISCO sells enterprise IT, cybersecurity, cloud, and digital-transformation services into the Saudi market, where credibility depends on reading as a genuine Arabic-language, Vision 2030–aligned partner, not an English site with a translate button bolted on. The site had to carry real trust signals (certifications, compliance posture, named leadership) and convert a visitor straight into a qualified consultation request.",
      startingPoint: "Built from scratch as a bilingual corporate site; no earlier version is visible from the deployed product.",
      solution:
        "A single-page site, hero, stats, about (vision/mission/goal), seven services, a \"why us\" trust section, a four-step engagement approach, nine target sectors, and a contact section with a real working form, that loads in Arabic by default and switches to English (or back) instantly via a nav toggle. The switch isn't a text swap: it flips the entire layout direction, right-to-left for Arabic and left-to-right for English, mirroring the nav, logo lockup, stat blocks, and every section's alignment, and swaps typefaces per script (IBM Plex Sans Arabic for Arabic copy, Sora/Manrope for Latin) rather than rendering Arabic in a Latin font pretending to support it.",
      architecture: [
        "React (Vite) single-page app, static-deployed on Vercel",
        "i18n layer driving both copy and document text-direction (RTL ↔ LTR)",
        "Per-script web fonts: IBM Plex Sans Arabic (AR), Sora / Manrope (EN)",
        "Animated stat counters (founded year, service-area count, quality/vision figures)",
        "Client-side contact form (name, email, company, message)",
      ],
      engineeringContribution:
        "The real engineering is in the localization, not just the copy. Switching languages re-renders the whole document direction, so RTL Arabic and LTR English aren't two skins on the same fixed layout: nav order, the logo lockup, icon placement, and every card and stat block mirror correctly rather than just having their text replaced in place. Loading a matched Arabic web font (IBM Plex Sans Arabic) instead of leaning on the Latin body font's fallback glyphs is a deliberate, easy-to-skip detail that this site gets right. Content is organized into clearly scoped sections (About, Services, Why Us, Approach, Sectors, Contact) that hold up in both directions and at both text lengths, since Arabic and English strings for the same sentence are rarely the same width.",
      aiContribution: null,
      results:
        "A complete bilingual corporate site, hero, stats, about, seven services, a trust/credentials section, a four-step approach, nine target sectors, and a working contact form, with full RTL/LTR mirroring verified live in both directions, not just spot-checked copy.",
    },
    technology: ["React", "Vite", "Google Fonts (IBM Plex Sans Arabic, Sora, Manrope)", "Vercel"],
    images: [
      "/case-studies/sybrisco/home-arabic.jpg",
      "/case-studies/sybrisco/services-arabic.jpg",
      "/case-studies/sybrisco/services-english.jpg",
      "/case-studies/sybrisco/contact-english.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: "https://sybrisco.vercel.app",
    featured: false,
    permissionLevel: "public",
  },
  {
    title: "OPD Reimbursement Workflow",
    slug: "opd-reimbursement-workflow",
    category: "AI Automation",
    summary:
      "An n8n automation that turns a photographed or scanned medical bill, typed or handwritten, into a calculated, audited OPD reimbursement claim, with a human review step for anything OCR can't read confidently.",
    client: "An employer's HR/Finance department (name withheld pending publishing confirmation)",
    content: {
      problem:
        "OPD (Outpatient Department) medical bill reimbursement is normally a manual HR/Finance process. An employee submits a photo or scan of a bill, sometimes handwritten, and someone has to read it, check it against that employee's remaining annual OPD limit and policy rules, and calculate what's actually payable. That's slow, inconsistent between reviewers, and leaves no audit trail for why a claim was approved at a given amount.",
      startingPoint:
        "No existing system. Built from scratch as an n8n workflow rather than a custom backend service, so HR/Finance can inspect and adjust the policy logic without needing a developer for every rule change.",
      solution:
        "A single n8n workflow takes a bill upload (image or PDF) plus employee ID through a webhook, routes it through OCR, a handwriting-capable path for handwritten slips and a standard path for printed ones, then an AI/LLM node turns the raw OCR text into a structured record (employee, patient, hospital, bill number, line items, amounts). A validation step checks the extraction is actually usable: employee exists, date is valid, amount is numeric, bill number isn't a duplicate, and OCR confidence clears a threshold, before a calculation stage applies the real OPD policy, where the eligible amount is the minimum of the bill amount, the employee's remaining OPD limit, and any policy-specific cap. Anything that fails validation, or where OCR confidence is low (most commonly on handwritten bills), routes to a manual HR review step instead of being auto-approved, so a misread handwritten amount can never turn into an incorrect payout on its own.",
      architecture: [
        "n8n Webhook: bill upload (image/PDF) + employee ID",
        "File validation for type, size, and quality",
        "OCR with automated vs. handwritten bill paths",
        "AI/LLM extraction: OCR text → structured record",
        "Validation for completeness, duplicate bill, OCR confidence",
        "Low-confidence branch routed to manual HR review",
        "OPD eligibility & calculation engine (MIN of bill / remaining limit / policy cap)",
        "Database for employees, bills, OPD claims",
        "PDF OPD statement, generated and stored",
        "Notifications & approvals for employee, HR/Admin, Finance",
      ],
      engineeringContribution:
        "The calculation stage is isolated in its own step so the eligibility formula (bill amount, remaining annual/monthly limit, policy-specific maximum, prior claims) is auditable on its own, independent of whatever the OCR/AI step extracted. Every bill, its raw OCR text, and its resulting claim are persisted as separate records, employee, bill, and OPD claim, so an approved or rejected amount can always be traced back to the source document rather than just a number in an approval email. The confidence-gated manual-review branch was a deliberate addition beyond the base extraction pipeline: any bill the OCR/AI step isn't confident about goes to a human before a claim amount is calculated from it, rather than trusting an automated read of a handwritten figure.",
      aiContribution:
        "OCR reads raw text off the uploaded bill, a handwriting-capable path for handwritten slips and a standard path for printed ones, then an AI/LLM node parses that raw text into the structured bill record (employee, patient, hospital, line items, amounts) the rest of the workflow calculates against. AI is used for extraction only; the reimbursement calculation and approval routing run on deterministic rules, not model output.",
      results:
        "A single workflow now handles bill intake, OCR, structured extraction, OPD policy calculation, database recordkeeping, PDF statement generation, and HR/Finance notification end to end, with confidence-based manual review as the safety net for handwritten bills instead of every bill needing a fully manual read.",
    },
    technology: ["n8n", "OCR (handwriting-capable)", "LLM extraction", "PostgreSQL", "PDF generation"],
    images: [
      "/case-studies/opd-reimbursement-workflow/architecture.jpg",
      "/case-studies/opd-reimbursement-workflow/n8n-canvas.jpg",
    ],
    videos: [],
    testimonial: null,
    liveUrl: null,
    featured: false,
    permissionLevel: "anonymized",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

/** Fixed, full taxonomy — NOT derived from PROJECTS. Deliberately shows
 * every category as a `/work` filter tab even when it currently has zero
 * real projects (AI Automation, AI Agents — see docs/decisions.md,
 * 2026-09-21), at the user's explicit request. `WorkFilter`'s existing
 * "No projects in this category yet" fallback covers the empty ones
 * honestly rather than hiding them. */
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "AI Automation",
  "AI Agents",
  "AI Web Development",
  "AI Saas Implementation",
];
