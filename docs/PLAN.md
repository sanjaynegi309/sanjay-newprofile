# Improvement Plan — EdTech Conversion, Trust & Offering Taxonomy

Source: the "EdTech Conversion & Trust (UX)" and "Offering Taxonomy & Self-Paced Early Access" sections added to `AGENTS.md` (senior-EdTech-UX review, 2026-09, founder-confirmed business model). This document turns those durable requirements into an ordered, verifiable execution plan. Each phase lists the current state (verified against the repo as of 2026-09-07), the target state, and the concrete steps. Phases are ordered so later phases build on infrastructure earlier phases create — follow the order unless a phase is explicitly marked independent.

Do not treat this as a one-time checklist to clear and forget — re-run the "Verified current state" checks periodically as content changes, since several rules (testimonial count, program dates/fees, capacity-based urgency) decay as content is added or goes stale.

**Standing qualification criterion for every phase below that touches layout, a component, or a page:** the change is not done until it's been verified responsive in an actual browser at mobile (~320-375px) and tablet (~768px) widths — not assumed from mobile-first Tailwind classes. Confirm no horizontal overflow and no new console errors, and actually exercise any interactive element (form, nav, card) at the narrow width. See `AGENTS.md`'s "Responsive Design" section for the exact bar. Phase 0 was verified this way after the fact (headless Chromium via Playwright); every phase from here on should be verified before being reported complete.

---

## Phase 0 — Lead-capture infrastructure (foundation) — ✅ done, pending endpoint deployment

Almost every later phase (enquiries, syllabus lead magnet, waitlist) needs a real form, so build this first rather than bolting mailto-replacement onto each phase separately.

**Implemented (2026-09):** backend is Google Sheets via a Google Apps Script Web App (user's choice — not a third-party forms SaaS). `src/components/EnquiryForm.astro` is a reusable component (name/email/type-selector/interest/qualifying-question fields, honeypot spam field, hidden-iframe POST so no CORS handling is needed, and a submit-triggered "thanks" message). Wired into `/contact/` (type selector: program/workshop/corporate, each option mapped to the matching existing analytics event) and `/teams/` (fixed corporate type). `config/forms.ts` holds the endpoint via `PUBLIC_FORMS_ENDPOINT` (wired into `.github/workflows/deploy.yml` alongside the other `PUBLIC_*` vars, same pattern as `PUBLIC_GA_MEASUREMENT_ID`). All `mailto:` links on `/contact/` and `/teams/` were removed except a small "or email us directly" fallback next to each form. `npm run build` (`astro check && astro build`) passes clean with these changes.

**Blocking action — needs you, not more code:** the Apps Script itself must be deployed from your Google account (I can't do this from here). Full script + step-by-step deployment instructions are in `docs/google-form-backend.md`. Once deployed, give me the `/exec` URL and I'll set it as the `PUBLIC_FORMS_ENDPOINT` repo variable — until then, the forms render correctly but have nowhere to submit to (the `action` attribute is empty).

**Verified current state:** every enquiry path is a `mailto:` link — `config/contact.ts` (hero action + all 3 channel cards), `config/corporate.ts` (`finalCta`), `config/home.ts` (finalCta), and every program/workshop `cta.href` is `/contact/` or `/teams/`, which themselves resolve to mailto links. No structured data is captured before a human sees an enquiry, and clicks are only analytics-instrumented as a link click, not a qualified submission.

**Target state:** a shared form component posting to a static-friendly backend (Formspree, Netlify Forms, or Getform — pick one; Formspree is the safest default for GitHub Pages since it needs no additional host config beyond a form action URL and a site key).

Steps:
1. Choose and provision a forms backend account; add its endpoint(s) as configuration, not hardcoded — extend `config/contact.ts` (or a new `config/forms.ts`) with the endpoint URL(s), one per enquiry type if the backend supports routing, or one shared endpoint with a `formName`/`subject` hidden field.
2. Build a reusable `EnquiryForm.astro` component (fields: name, email, program/workshop of interest — pre-filled via prop when arriving from a specific program/workshop page — and one qualifying question, e.g. team size or timeline). Style with existing `.glass-card` / `Button` / form-control tokens, no new visual language.
3. Wire the component into `/contact/`, replacing the three mailto channel cards with three form variants (or one form with a "type of enquiry" select), and into `/teams/` for corporate enquiries.
4. Fire a `program_apply` / `workshop_registration` / `corporate_cta` analytics event (existing names in `config/analytics.ts`) on successful submit, not just on click — this is the qualified-lead signal the mailto approach couldn't provide.
5. Keep a `mailto:` fallback link only as a small "or email us directly" secondary line, not the primary CTA.
6. Update button labels site-wide so no CTA's only visible label is the raw email address — audit `config/contact.ts`, `config/corporate.ts`, `config/home.ts` (already mostly intent-labeled; verify after the form swap).

**Depends on:** nothing. **Blocks:** Phase 3 (syllabus lead magnet), Phase 4 is independent, Phase 6 (self-paced waitlist).

---

## Phase 1 — Fix the offering taxonomy (bootcamps vs. corporate vs. long courses) — ✅ done

Do this before Phase 6 (self-paced) since self-paced's homepage placement depends on Bootcamps/Programs already being correctly scoped.

**Implemented (2026-09):** founder chose "Bootcamps" over keeping "Workshops." Nav label, footer nav label, `/workshops/` page's SEO title/hero/eyebrow, the homepage's `home.workshops` section copy, the homepage and corporate "View workshops" CTA buttons, and the contact form's type-selector option + descriptive channel card were all renamed to "Bootcamps"/"Bootcamp." The `/workshops/` URL path, the `workshops` content collection name, `WorkshopCard`/`WorkshopLayout` component names, and the `workshop_registration` analytics event name were deliberately left unchanged (internal plumbing, not user-facing — AGENTS.md's consistency requirement was scoped to nav/hero/page-title copy, not a full rename of every internal identifier). Individual bootcamp entry titles (e.g. "RAG Foundations Workshop") were also left as-is — same pattern as programs keeping "Program" in their own titles inside the "Programs" section; the section label communicates format, the offering keeps its own name.

`rag-foundations.md` duration → `3 days` (added a Day 1/2/3 breakdown replacing the old single "What We Cover" section); `prompt-systems-for-teams.md` → `2 days` (added a Day 1/2 breakdown). The two `private-team` entries (`ai-adoption-sprint.md`, `ai-for-leaders.md`) are excluded from `/workshops/` index's query and instead rendered in a new "Ready-to-run private workshops for your team" section on `/teams/`, reusing `WorkshopCard` with a new `ctaLabel` prop (defaults to "View bootcamp", passed as "View details" for the private-team reuse so corporate sessions aren't mislabeled as bootcamps) — same Markdown source, listed from one place only. All 4 programs' `duration` updated to a 6-12 month spread (`applied-ai-analyst`: 6 months, `ai-product-manager`: 8 months, `genai-developer`: 10 months, `ai-engineering-leadership`: 12 months) — body copy left as-is since generic "each week/session" cadence language doesn't contradict a longer duration (curriculum depth itself is Phase 2's job, not this phase's).

Verified: `npm run build` passes clean (0 errors), and a Playwright pass at 320/375/768px across home, `/workshops/`, `/teams/`, a program detail, and a bootcamp detail page showed no horizontal overflow and no console errors (per the standing responsiveness qualification criterion — see `AGENTS.md`).

**Superseded by Phase 8 (2026-09):** the specific entries named below (`rag-foundations.md`, `prompt-systems-for-teams.md`, `ai-adoption-sprint.md`, `ai-for-leaders.md`, and the 4 fictional programs) were all placeholder content and have since been replaced with the founder's real programs/bootcamp — see Phase 8. The naming decision, taxonomy structure, and component work described above are still accurate and unaffected; only the specific placeholder entries changed.

**Historical record — verified current state at the time (`src/content/workshops/*.md`):**
- `rag-foundations.md` — `format: live-online`, `duration: "1 day"` — public bootcamp, correctly placed.
- `prompt-systems-for-teams.md` — `format: live-online`, `duration: "Half day"` — public, but duration reads as a short session, not a 2-3 day bootcamp.
- `ai-adoption-sprint.md` — `format: private-team`, `duration: "1 day"` — corporate-commissioned, currently listed in the public `/workshops/` catalog.
- `ai-for-leaders.md` — `format: private-team`, `duration: "Half day"` — same issue.

**Verified current state (`src/content/programs/*.md`):** all 4 programs have `duration` of 3-6 weeks (`genai-developer`: 6 weeks, `ai-engineering-leadership`: 5 weeks, `ai-product-manager`: 4 weeks, `applied-ai-analyst`: 3 weeks) — none read as a 6-12 month commitment.

**Founder-confirmed durations (2026-09):** bootcamps run **2-5 days**; long courses run **6-12 months**. Corporate training is unchanged (already correctly scoped at `/teams/` + `config/corporate.ts`).

Steps:
1. **Founder decision needed:** confirm whether the nav label stays "Workshops" or becomes "Bootcamps" (AGENTS.md defers this explicitly). Use `AskUserQuestion` or ask directly before implementing nav copy — this name must then be applied consistently.
2. Update `rag-foundations.md` and `prompt-systems-for-teams.md` durations to genuinely reflect a 2-5 day live bootcamp (and update any hour/day-specific copy in their Markdown bodies).
3. Move `ai-adoption-sprint.md` and `ai-for-leaders.md` out of the public bootcamp catalog:
   - Simplest option that reuses existing structure: keep them in the `workshops` collection (so `WorkshopCard`/`WorkshopLayout` still render them) but filter `src/pages/workshops/index.astro`'s query to exclude `format: "private-team"`, and instead render those same entries from `src/pages/teams.astro` (query the `workshops` collection there, filtered to `format: "private-team"`) using `WorkshopCard`.
   - This avoids content duplication (one Markdown source, rendered from one place) while satisfying "never duplicate content."
4. Update `config/navigation.ts` label/description if renamed, plus any hero/page-title copy on `src/pages/workshops/index.astro` and header/footer nav referencing "Workshops."
5. Rewrite `duration` (and any body copy referencing weeks) on all 4 program entries to reflect the real 6-12 month long-course line, and adjust `ProgramLayout`/`ProgramCard` copy if any hardcoded "weeks" language exists outside the schema field.

**Depends on:** founder naming decision. **Blocks:** Phase 6 (self-paced homepage ordering assumes Bootcamps/Programs are correctly scoped first).

---

## Phase 2 — Program & workshop depth (dates, fees, curriculum) — ✅ done via Phase 8 (real content import)

**Verified current state (pre-Phase-8):** all program entries omitted `nextCohort` and `fee`, falling through to schema defaults. Program bodies had only three prose sections, no curriculum breakdown.

**Resolved (2026-09):** Phase 8 (below) replaced the entire programs/workshops catalog with real founder content, which happened to satisfy every step of this phase at once: real `nextCohort` (August 2, 2026), a deliberately worded real `fee` ("Displayed during registration" — sourced from the founder's actual FAQ copy), and a full module-by-module curriculum in each program's Markdown body. See Phase 8 for detail.

**Still not done:** the syllabus lead-magnet (a gated curriculum download). **Correction (2026-09, via Phase 11):** this doc previously called the comparison table "moot" on the reasoning that all 3 programs share `level: "advanced"` — that reasoning was backwards. AGENTS.md's actual trigger is "once more than 2-3 programs **share** a level" — which is exactly the current state (3 of 3 are advanced), not a reason to skip it. See Phase 11 for the live finding and recommendation.

---

## Phase 3 — Trust & social proof (testimonials) — ✅ structural work done, 0 testimonials pending real content (see Phase 8)

**Verified current state (2026-09, before this phase):** only 2 entries existed, both `featured: true`. Neither had an image field. Both quotes were sentiment-only, no measurable outcome. Both entries' Markdown bodies were literally `"Dummy testimonial content for collection validation."`

**Implemented:**
1. `testimonialSchema` (`src/content/config.ts`) extended with `image: z.string().startsWith("/").optional()` (public-path string, same convention as `brand.logo.mark` — rendered via `withBase()`, not Astro's optimized `<Image>` pipeline, since a dynamic per-entry path from frontmatter doesn't fit static-import optimization without extra glob machinery) and `outcome: z.string().optional()` (a distinct field for a measurable result, rendered as its own badge rather than folded into the quote).
2. `TestimonialCard.astro` renders the photo when `image` is set, and falls back to a two-letter initials avatar (matches the person's actual name, not a generic silhouette) when it isn't — so cards look intentional with or without a photo, and nothing blocks on sourcing headshots first.
3. Deleted the placeholder `"Dummy testimonial content..."` body text from both existing entries — confirmed first that no layout/page anywhere calls `render()` on a testimonial (`grep` across `src/` found only the schema, the card, and the two content files themselves), so the Markdown body is genuinely unused and an empty body is correct, not a content gap.
4. Verified responsive: `npm run build` clean, Playwright check at 320/375/768px on the homepage testimonials section — no overflow, no console errors, initials-avatar fallback renders correctly.

**Update (Phase 8, 2026-09):** the 2 existing testimonials turned out to be placeholder scaffolding, not real content — they referenced "Generative AI Developer Program" and "AI Product Manager Program," neither of which exist in the founder's real program data. At the founder's direction, both were deleted rather than kept with dangling references. There are currently **zero** testimonials; the homepage testimonials section is now conditionally hidden when the collection is empty rather than rendering an empty grid (`src/pages/index.astro`).

**Not done — needs real input, not fabrication:** a testimonial is a factual claim that a specific named person said something and got a specific result — inventing names, quotes, or outcomes would be publishing fake social proof (the same "never fabricate" principle AGENTS.md states for urgency/scarcity and refund policy applies here). This step is on hold until you provide real learner/client quotes (with permission), and optionally headshots and a measurable outcome per person.

**Depends on:** none for the structural work (done). The remaining content step depends on you sourcing real testimonials.

---

## Phase 4 — FAQ coverage — ✅ done, all 5 mandated topics covered

**Verified current state (before this phase):** the only FAQ content was `config/home.ts`'s `faq.items` (3 questions: who it's for, private workshops, choosing a program). None of the 5 AGENTS.md-mandated topics were covered.

**Implemented:**
1. Added `config/faq.ts` — a full FAQ list (the 3 existing homepage questions plus a new "What do I need before starting a program or bootcamp?" prerequisites/tooling answer, safely drafted from facts already in the schema: level/audience per program, laptop + internet, program-specific setup shared ahead of the first session).
2. New `src/pages/faq.astro` renders the full list via the existing `FAQ.astro` component (no new component built). Added to `navigation.footer`'s Company group, `sitemap.xml.ts`, and linked from the homepage FAQ teaser via a "See all FAQs →" link — homepage keeps its original 3-question teaser untouched rather than growing to 4+ items and hurting scan-ability, per the plan's original fallback option.
3. Verified: clean build, Playwright check at 320/375/768px on `/faq/` and home — no overflow, no console errors.

**Resolved via Phase 8 (2026-09):** the founder's real program pages (`docs/references/html_pages/*.html`) already answered 3 of the 4 remaining topics, so these were added to `config/faq.ts` with real, sourced copy rather than invented:
- ✅ Certificate of completion — yes, issued on completion, with the real "don't join just for the certificate" framing preserved.
- ✅ Missed live session — lifetime recording access, real policy as stated by the founder.
- ✅ Payment options for corporate buyers — employer sponsorship possible via the enquiry flow; instalment options available on request to support@sanjaynegi.in.
- ✅ **Refund/cancellation policy — resolved 2026-09.** Founder confirmed: no refunds, since seats are limited and reserved exclusively per learner. Added to `config/faq.ts`. All 5 mandated FAQ topics are now covered with real, founder-provided policy — nothing invented. Worth a lawyer's review before launch given the financial/legal weight, but the drafting itself is done.

**Depends on:** nothing — this phase is complete.

---

## Phase 5 — Mentor & instructor presence — ✅ resolved via Phase 8 (confirmed founder-only)

**Resolved (2026-09):** the founder's real program data (`docs/references/data/programs.json`, `workshops.json`) lists `"instructor": "Sanjay Negi"` for all 3 programs and the bootcamp, with no other instructor named anywhere in the source material (including the detailed mentor-bio sections transcribed into each program's Markdown body). Founder-only presence is confirmed accurate, not an oversight — no schema change needed unless the founder brings on another instructor for a future program.

---

## Phase 6 — Self-paced: the All-Access Pass (waitlist, not a per-course catalog) — ✅ infrastructure done, blocked on real course lineup

Do this after Phase 1 (taxonomy) and Phase 0 (forms), since it reuses both.

**Implemented (2026-09):** every structural step below is done — schema, analytics event, `ProgramCard`/`ProgramLayout` coming-soon treatment, `config/self-paced.ts`, `/self-paced/` page, nav (reordered to low-to-high commitment: Bootcamps → Programs → Self-Paced → For Teams → About, footer to match), homepage teaser (compact, correctly sized below Bootcamps/Programs), sitemap entry, and homepage/nav section order. Verified: clean build, Playwright check at 320/375/768px on home and `/self-paced/` — no overflow, no console errors, visually confirmed the empty-state, pass FAQ, and waitlist form all render correctly on mobile.

**Update (2026-09): course entries added from real curriculum data.** The founder provided `docs/references/self-paced/courses_topics.md` — a full "Curriculum Architecture Standard v1.0" (Common Foundation, GenAI Builder, 6 career paths, specializations, technology labs, ~150+ individual lessons). Rather than create a card per micro-lesson (disproportionate for a pre-launch teaser and against AGENTS.md's "not a full catalog" guidance), 8 entries were added at the flagship-track level the source document itself uses ("GenAI Builder," "AI Engineer Path," etc.):
- `ai-genai-foundations.md`, `genai-builder.md` (the two shared foundation tiers)
- `ai-genai-engineer-path.md`, `forward-deployed-engineer-path.md`, `genai-architect-path.md` (self-paced mirrors of the 3 live career programs — `featured: true`, surfaced on the homepage teaser)
- `ai-native-developer-path.md`, `ai-product-path.md`, `ai-leadership-path.md` (the remaining 3 real career paths — not featured, still listed on `/self-paced/`)

All 8 use `launchStatus: "coming-soon"` and real content (descriptions, audiences, outcomes, topics) drawn from the source document, not invented — specializations, technology labs, industry packs, and the emerging-AI/case-study series were deliberately left out of this pass as secondary content the source itself says "should NOT block the main GenAI journey."

**Bug fixed while adding these:** the homepage's `programs`/`workshops` queries and `/programs/`'s listing query only filtered on `draft`/`featured`, not `format` — so a `featured: true` self-paced entry would have leaked into the "Featured live programs" grid and the public `/programs/` catalog. Added `format !== "self-paced"` (and `!== "private-team"` for workshops, for the same latent reason) to all three queries. The homepage self-paced teaser now shows the 3 featured tracks as compact linked pills alongside the waitlist CTA — still visibly smaller than the Bootcamps/Programs sections above it — and falls back to the original text-only block if the collection is ever empty again.

**Founder-confirmed commercial model (2026-09):** self-paced is sold as a single one-time-cost **All-Access Pass** — one payment unlocks every self-paced course, current and future, with new recorded courses added incrementally starting next month. There is no per-course price, ever, for self-paced content — the pass is the one product; individual course entries are its (growing) content catalog, shown to build demand and let visitors see what's coming. The pass is **not sellable yet** — the site collects waitlist emails only, and takes no payment until real content actually ships next month. Do not build a checkout/payment flow in this phase.

**Verified current state:** `programSchema.format` already includes `"self-paced"` as an enum value (`src/content/config.ts:39`) but zero entries use it. No `launchStatus`/`estimatedLaunch` fields exist. No `/self-paced/` page, no nav entry, no homepage section, no `waitlist_signup` analytics event (`config/analytics.ts`'s `AnalyticsEventName` union has 8 values, none matching), and no config file describing the pass itself.

Steps:
1. Extend `programSchema` in `src/content/config.ts`:
   ```ts
   launchStatus: z.enum(["live", "coming-soon"]).default("live"),
   estimatedLaunch: z.string().optional()
   ```
   Do **not** add a per-course price field for self-paced — `fee` stays meaningless for `format: "self-paced"` entries and should never be rendered for them (enforce this in the card/layout template logic in step 3, not the schema, since `fee` is shared with cohort programs).
2. Add `waitlist_signup` to `AnalyticsEventName` and `AnalyticsConfig.events` in `config/analytics.ts`, following the existing `snake_case`/camelCase pairing pattern. Record the course slug the visitor was viewing as an event parameter/label, not as separate per-course event names.
3. Update `ProgramCard.astro` and `ProgramLayout.astro`: when `launchStatus === "coming-soon"`, swap the level/format badge for `Badge tone="brand"` reading "Coming soon," replace the Next-cohort/Fee rows with a single **"Included in the All-Access Pass"** row (plus `estimatedLaunch` if set, e.g. "Available Q1 2027"), and swap the CTA to **"Join the All-Access waitlist"**. Every self-paced course's CTA points at the same shared pass-level waitlist offer — never a per-course fee or a per-course waitlist with its own pricing.
4. Add a new `config/self-paced.ts` (mirroring `config/corporate.ts`'s shape: hero, how-it-works/benefits, FAQ) describing the All-Access Pass itself as the one product: the one-time-cost model, "new courses added monthly starting [date]," what happens when new content ships (existing pass holders get it automatically, no re-purchase), and the waitlist CTA wired to the Phase-0 form. This is the actual sales page for the pass; the individual course cards are previews of its catalog.
5. Add 2-3 initial `format: "self-paced"`, `launchStatus: "coming-soon"` program entries with real `estimatedLaunch` values — needs founder input on which courses launch first and roughly when (e.g. first drop next month, then monthly additions).
6. Add "Self-Paced" to `navigation.primary` in `config/navigation.ts`, pointing at a new `src/pages/self-paced/index.astro` that renders the `config/self-paced.ts` pass explainer up top, then a preview grid of `format: "self-paced"` entries via `getCollection("programs", ({data}) => data.format === "self-paced")` (reusing the existing `ProgramCard` pattern from `src/pages/programs/index.astro`), each card reading "Included in the All-Access Pass," never an individual price.
7. Add a homepage section in `src/pages/index.astro` between Bootcamps/Workshops and Corporate Training: teaser-weight only (2-3 course-preview cards + one "Join the All-Access waitlist" CTA), sized visibly smaller than the Programs/Workshops sections so it doesn't outrank revenue-generating lines.
8. Re-check homepage/nav ordering matches: Hero → Why Learn Here → Bootcamps → Programs (long courses) → Self-Paced All-Access (Coming Soon) → Corporate Training → Founder → Testimonials → FAQ → CTA.
9. Explicitly do not build any payment/checkout integration in this phase — that's a separate, later phase once the founder is ready to actually sell the pass (post-launch, once the first batch of content ships next month).

**Depends on:** Phase 0 (waitlist form, done), Phase 1 (Bootcamps/Programs correctly scoped, done). **Still blocked on you:** which track launches first and roughly when — none of the 8 entries has an `estimatedLaunch` set yet (all show the generic "Announced to waitlist members" fallback). The pass's price point is not needed yet (site deliberately shows no price pre-launch) but will be needed before Phase 6 can ever go from "waitlist" to "on sale," which is explicitly out of scope for this phase.

---

## Phase 7 — Urgency & scarcity (apply only when true)

**Verified current state:** no workshop currently sets `capacity` close to a real limit in a way that's surfaced as urgent (per `docs/code_review.md` finding #7, the `.btn-glow-hot`/`.glass-card-hot`/hot `Button`/`Card` variants exist in CSS but had no live call site as of the last code review — re-check after Phases 0-6 land, since new content may change this).

Steps:
1. Re-audit `capacity` fields across `src/content/workshops/*.md` after Phase 1's taxonomy cleanup.
2. Only where a workshop is genuinely near its capacity (e.g. registrations tracked manually and close to `capacity`), apply `Badge tone="magenta"` / `.btn-glow-hot` / `.glass-card-hot` with real seat-count copy ("3 of 12 seats left"). Never hardcode a fabricated countdown.
3. This is an ongoing content-maintenance rule, not a one-time code change — document the trigger condition wherever workshop content is edited (this file, or a short note in the workshop content README if one exists) so it isn't forgotten.

**Depends on:** Phase 1 (correct workshop set) for an accurate audit. **Re-audited 2026-09:** grepped `capacity:` across all workshop and program content — only the 3 live programs set it, all at the flat cap of 30 with no seats-filled/remaining data. Nothing to apply yet; stays correctly blocked rather than fabricating urgency.

---

## Phase 8 — Real content import: replace placeholder programs/bootcamps with founder data — ✅ done

The founder provided real business data: `docs/references/data/{programs,workshops}.json` (structured card data) and `docs/references/html_pages/{ai-engineer,fde,ai_architect_cohort,genai-jumpstart-workshop}.html` (the founder's actual existing marketing pages, full curriculum + FAQ copy). This replaced the entire placeholder programs/workshops/testimonials catalog wholesale, resolving Phases 2, 4, and 5 as a side effect.

**Data conflict resolved (founder-confirmed):** `programs.json` said GenAI Architect starts "August 2, 2026" / "10 Months"; `ai_architect_cohort.html` said "Sep 05, 2026" / "6-month". Founder confirmed `programs.json` is correct — the HTML page's hero/delivery section was stale.

**Content decisions (founder-confirmed):**
- The 2 pre-existing testimonials (Ananya Rao, Michael Chen) referenced fictional programs and were deleted as placeholder scaffolding, not kept.
- The 2 placeholder private-team corporate workshops (AI Adoption Sprint, AI for Leaders) were removed rather than left as unconfirmed placeholders — no real corporate-session data was provided. `/teams/`'s private-workshops section (built in Phase 1) already handles zero entries gracefully; it'll pick up real ones automatically when added.

**Implemented:**
1. Deleted all 4 fictional program entries, all 4 fictional/placeholder workshop entries, and both placeholder testimonials.
2. Added 3 real programs — `ai-engineer.md` (6 months), `forward-deployed-engineer.md` (8 months), `genai-architect.md` (10 months) — each `level: "advanced"`, `format: "cohort"`, real `nextCohort: "August 2, 2026"`, real `fee: "Displayed during registration"` (sourced from the founder's own FAQ copy, not invented), real `capacity: 30`, and a full Markdown body transcribing every module of the source curriculum (8-11 modules each) plus the source page's complete FAQ set (20-30 Q&As each, both the "standard" and role-specific sections).
3. Added 1 real bootcamp — `genai-jumpstart.md`, 3 hours, `level: "beginner"` — with its own build-plan, outcomes, fit-check, and FAQ content transcribed from the source page.
4. **Schema additions:** `ctaSchema.external: z.boolean().default(false)` (so a CTA can point at a real external registration URL and get `target="_blank"` + the sr-only "opens in new tab" pattern automatically — added to `ProgramCard`, `ProgramLayout`, `WorkshopCard`, `WorkshopLayout`) and `programSchema.capacity: z.number().int().positive().optional()` (mirrors the existing `workshopSchema.capacity`, rendered as "Limited to N professionals" on cards/detail pages, real informational content — not styled as urgency).
5. Every program/bootcamp CTA now points at the founder's real external registration URL (`learn.sanjaynegi.in/l/...`) instead of the internal enquiry form — these specific offerings already have a live registration funnel, so routing through the site's own form would add friction, not reduce it. The enquiry form (Phase 0) remains the right default for any future offering that doesn't have its own registration link yet.
6. `config/faq.ts` gained 3 new real answers (certificate, missed session, employer sponsorship/instalments) sourced directly from the founder's FAQ copy — see Phase 4.
7. Homepage testimonials section now conditionally hides when the collection is empty (`src/pages/index.astro`) instead of rendering an empty grid.
8. `EnquiryForm.astro`'s `interestPlaceholder` default updated from a now-deleted fictional program name to a real one ("e.g. AI Engineer").

**Taxonomy note surfaced by real data:** the one real bootcamp (GenAI Jumpstart) is 3 hours, not the "2-5 days" the founder specified earlier in this conversation for the Bootcamps line. Treat "2-5 days" as a target for future multi-day bootcamps rather than a hard floor — a real, honest single-session bootcamp is legitimate and wasn't stretched to fit the earlier generic guidance. Flagged to the founder; no action taken pending their view.

**Verified:** `npm run build` clean (0 errors). Playwright pass at 320/375/768px across home, `/programs/`, all 3 program detail pages, `/workshops/`, the bootcamp detail page, and `/teams/` — no horizontal overflow, no console errors. Visually confirmed real data (badges, dates, fee text, cohort size, CTA labels) renders correctly on mobile.

**Depends on:** Phase 0 (external-link accessibility pattern reused from the sr-only convention), Phase 1 (taxonomy structure the new content slots into).

---

## Phase 9 — Homepage UX & CTA density review (2026-09) — ✅ fully implemented

**Reviewed:** `/` (homepage) only — reviewed live in-browser (desktop 1440px screenshot + source read of `src/pages/index.astro` and `config/home.ts`), per the founder's request to review one page at a time and document findings before changing anything.

**The founder's framing, confirmed by this review:** sections aren't clearly bifurcated, there's too much information on the page, and CTAs aren't maximized (both too many competing ones and too few in the sections that have none).

### Sitewide CTA inventory (the core problem)

**Historical count, before Findings 3 & 4 were fixed** — counting every clickable action on the homepage top to bottom:

| Section | CTAs | Labels |
|---|---|---|
| Hero | 2 | "Explore programs", "Train your team" |
| Why Learn Here | 0 | *(none)* |
| Featured Bootcamps | 2 | "View bootcamp", "Build My First AI Agent →" (on the one bootcamp card) |
| Featured Live Programs | 6 | "View program" ×3 + a unique external CTA per card ("Rewrite My AI Career Story", "Build My FDE Career Roadmap", "Build My GenAI Architect Roadmap") |
| Self-Paced teaser | 1 | "Join the waitlist" |
| Corporate Training | 1 | "Plan corporate training" |
| Founder | 0 | *(none)* |
| FAQ | 1 (soft) | "See all FAQs →" |
| Final CTA | 2 | "Contact SkillUp", "View bootcamps" |
| **Total** | **~15 distinct CTAs, ~13 distinct labels** | |

That was the real issue underneath "too much information": it's not just prose density, it's that the page asked the visitor to make **13 different decisions** with no signal about which one matters most. **After Findings 2, 3, 4 & 7 (below):** the total CTA count hasn't dropped dramatically (removing Programs' 3 redundant secondary buttons and Bootcamps' 1 was offset by adding 2 "View all" links plus one CTA each to Why Learn Here and Founder), but the *quality* of that count changed — no section fires two competing, equally-weighted buttons anymore, and no section is a dead end with zero next action. That distinction (redundant competing CTAs vs. one clear action per section) was always the real fix, not raw count reduction. The cross-cutting section-rhythm pass (background elevation/dividers) and the minor gradient-heading polish note (Finding 6) are now both resolved too — see below.

### Section-by-section findings

**1. Hero — 🟢 fine as-is.** Two CTAs, clearly primary/secondary, standard pattern. No change needed.

**2. Why Learn Here — ✅ resolved 2026-09.** Three feature cards, zero CTA — a visitor convinced by this section had nothing to click. **Fixed:** added a config-driven `action` (`config/home.ts`'s `whyLearnHere.action`) rendered as a text link "See the full curriculum →" pointing at `/programs/`, placed directly under the section's description in `src/pages/index.astro`. Deliberately points at the real per-program curriculum content added in Phase 8 rather than a generic repeat of the hero's "Explore programs" CTA. Verified in the build and visually; no responsive overflow.

**3. Featured Bootcamps — ✅ resolved 2026-09.** One real bootcamp card showed both "View bootcamp" and "Build My First AI Agent →" at equal visual weight. **Fixed:** added a `compact` prop to `WorkshopCard.astro` — when set, drops the secondary/external CTA entirely (single "View bootcamp" action, no ambiguity) along with the Audience/Format/Capacity `<dl>` and topic badges, and clamps the description to 2 lines (`line-clamp-2`). Homepage now passes `compact` on its `WorkshopCard` instance; `/workshops/` and `/teams/`'s private-sessions section are unaffected (full card, unchanged).

**4. Featured Live Programs — ✅ resolved 2026-09; this was most of "too much information."** Three full-detail `ProgramCard`s stacked, each carrying 2 badges, description, Audience, Duration, Cohort size, 3 outcome bullets, and 2 CTA buttons — the same card used on `/programs/`, reused verbatim on the homepage teaser. **Fixed:** added the same `compact` prop to `ProgramCard.astro` (drops the `<dl>`, outcomes list, and secondary `data.cta` button; clamps description to 2 lines; keeps the badge, title, `bestFor` tag, and single "View program" CTA). Homepage passes `compact` on its `ProgramCard` instances; `/programs/`, `/self-paced/`, and program detail pages are unaffected (full card, unchanged). Also added a "View all programs →" link (and "View all bootcamps →" on the Bootcamps section, extending the same fix consistently) matching the existing FAQ/self-paced "see all" pattern. Verified: clean build, confirmed in the built HTML that homepage cards have zero `Audience` rows and zero secondary CTA buttons while `/programs/` and `/workshops/` retain full detail; visually confirmed on screenshots; no responsive overflow at 320/375/768/1440px.

**5. Self-Paced teaser — 🟢 already the right model.** Compact, one CTA, linked pills instead of full cards, visibly smaller than the sections above it. This is the density/CTA-count target the Bootcamps and Programs sections above should be pulled toward, not the other way around.

**6. Corporate Training — ✅ resolved 2026-09.** One clear CTA, compact feature-chip grid. Was using `.gradient-heading` (cyan → magenta → purple), which at some points in the animation read mostly magenta/pink — visually (if briefly) echoing the site's "urgent/hot" accent reserved elsewhere for genuine scarcity (`.btn-glow-hot`, magenta badges), even though nothing about Corporate Training is urgent/scarce. **Fixed:** replaced the hand-rolled gradient `<h2>` in `src/pages/index.astro` with the shared `<Heading as="h2" size="lg">` component (plain white), matching the static heading style already used on Founder and Why-Learn-Here. The Final CTA section's gradient heading was deliberately left unchanged — AGENTS.md's documented homepage rhythm calls for a gradient-heading closing bookend there specifically, so that's the one section where the animated treatment is intentional, not a leftover default.

**7. Founder — ✅ resolved 2026-09.** Photo, name, role, one paragraph, zero CTA — for a "mentor-led" brand promise, this section carried real trust weight but converted nothing. **Fixed:** added a config-driven `action` (`config/home.ts`'s `founder.action`) rendered as a secondary `Button`, "Talk to Sanjay about your path," pointing at `/contact/`. Deliberately chose `/contact/` over "Read Sanjay's full story → `/about/`" (the other option this finding suggested) because `/about/` doesn't have a founder section yet (see Phase 14) — linking there now would be a hollow promise; revisit once Phase 14's founder section is built, since "read the full story" may then be the better-fitting CTA. Verified in the build and visually; no responsive overflow.

**8. Testimonials — currently hidden (zero entries, per Phase 3/8).** No action needed until real testimonials exist; the conditional-hide is working as designed.

**9. FAQ — 🟢 fine as-is.** Compact, one soft CTA ("See all FAQs →"), appropriately light.

**10. Final CTA — 🟢 fine as-is.** Two clearly differentiated actions (primary contact, secondary browse). Good closing pattern.

### Cross-cutting: section bifurcation

The founder's "not clearly bifurcated" observation is accurate — verified by reading the actual computed colors, not just eyeballing it. `bg-black` is pure `#000000`. `.section-navy-tint` (`src/styles/global.css` / `config/theme.ts`'s `navy-tint` token) is a gradient from `#000000` to `#060608` — a 6-out-of-255 RGB delta. `.section-atmospheric` goes to `#0a0a0f` plus low-opacity radial glows. **Two of the site's three "alternating" backgrounds are within single-digit RGB values of pure black** — on most monitors this reads as flat black, not a deliberate alternation. The site already tried "slightly different backgrounds"; the values just aren't large enough to be perceptible, which is why the sections still blur together.

**Founder asked directly: should we make section backgrounds slightly different for better bifurcation?** Genuine answer: partially yes, but "slightly" is the wrong dose (see above — that's already what's happening, and it isn't working), and background color shouldn't be the primary fix:
- **For:** a real, deliberately-larger darkness step (not a new hue) between sections is low-risk and consistent with the existing dark-only palette — it just needs to be big enough to register, unlike the current 6-value delta.
- **Against leading with this:** it's one continuous scroll, not separate pages — too many distinct steps risks reading as inconsistent lighting rather than intentional structure. It also doesn't address *why* a section is different (that's an eyebrow/label/content job, not a background-color job), and it does nothing for the zero-CTA dead ends or the CTA-count problem, which are the bigger drivers of "too much information."
- **Recommendation:** treat it as a small, fixed dark-mode *elevation* system (the same principle Material Design uses for dark surfaces) rather than alternating for alternation's sake — e.g. `#000000` for hero and sections meant to recede, a genuinely visible `#0d0f14`–`#101014` step (roughly 3-4x today's delta) for standard content sections, and reserve `.section-atmospheric` (particles/glow) for fewer, more deliberate "this section matters" moments rather than one of three interchangeable options. Pair with, not instead of: (a) increasing the eyebrow badge's visual prominence so section identity is scannable while skimming; (b) a visible divider (the same accent-to-transparent line already used for the engagement-steps connector on `/teams/`) between every homepage section, not just some.

### Suggested priority if the founder wants to implement this phase

1. ✅ Lighter homepage program-card variant and fixed dual-CTA hierarchy (items 3 and 4) — done.
2. ✅ CTAs added to Why Learn Here and Founder (items 2 and 7) — done.
3. ✅ "View all programs →" / "View all bootcamps →" links — done (bundled into item 1's implementation).
4. ✅ Section-rhythm pass — done 2026-09. Added a genuinely visible elevation step and a consistent divider, replacing the near-imperceptible 6-value RGB delta identified above:
   - `config/theme.ts`'s `navy-tint` backgroundImage token now ends on `#0f172a` (the existing `neutral.900` design-system color, not a new hex value) instead of `#060608` — a real, perceptible step rather than a token nobody could actually see.
   - Added a new `.section-divider` utility (`src/styles/global.css`) — a faint cyan-to-transparent 1px top-edge gradient on every homepage `<section>`, using `::after` specifically so it coexists with `.section-atmospheric`'s own `::before` glow overlay without colliding.
   - Applied `.section-divider` consistently to all 8 homepage sections (`src/pages/index.astro`) and to `CTASection.astro`, replacing the previous ad-hoc mix of `border-y`/`border-t border-white/10`/no border. `Footer.astro` already carries its own matching gradient top border, so removing `CTASection`'s old bottom border leaves no visual gap.
   - **Verified:** clean build (0 errors); `navy-tint` is a shared token also used on `about.astro`, `self-paced/index.astro`, `teams.astro`, `ProgramLayout.astro`, and `WorkshopLayout.astro` — checked all five plus the homepage at 375/768/1440px via Playwright (no horizontal overflow, no console errors) and visually confirmed via screenshots that the new elevation step and dividers read as a deliberate, subtle chapter break everywhere, not washed-out or broken on any page.

**Depends on:** nothing — this phase is now fully implemented. Every finding above is either 🟢 (fine as-is / already the right model), ✅ (resolved), or a deliberately-deferred future item (Testimonials, item 8 — blocked on real testimonials existing at all, tracked in "Open questions" below).

---

## Phase 10 — `/workshops/` (Bootcamps catalog) UX review (2026-09) — ✅ done 2026-11, all findings resolved

**Reviewed:** `/workshops/` only, live in-browser at desktop (1440px) and mobile (375px), plus the page/component source (`src/pages/workshops/index.astro`, `src/components/WorkshopCard.astro`). Second entry in the page-by-page UX review series (see tracker below). Findings only — nothing implemented yet, pending founder direction, same as Phase 9.

This page has only two sections (hero, card grid), so the review is shorter than the homepage's — but it surfaced one real content bug that matters more than any layout finding.

### ✅ Finding 1 (resolved 2026-09) — the only bootcamp on the page was shown as already past, with a live registration button

The page's single entry, GenAI Jumpstart (`src/content/workshops/genai-jumpstart.md`, was `date: 2026-08-01`), rendered a badge reading **"PAST — Aug 1, 2026"** — correctly computed (the date had genuinely lapsed), but the card still showed a full-weight, equally-prominent secondary button, **"Build My First AI Agent →"**, linking to the live external registration URL. A visitor's only option on the entire Bootcamps catalog was a session that already happened, with a CTA that looked exactly as live and clickable as it would for a genuinely upcoming one.

This was the opposite of "maximize conversion" — actively worse than showing nothing, since it invited a click that led nowhere useful. The existing past-dated badge logic (`getWorkshopDateInfo`) was working correctly at the badge level; the gap was that *nothing downstream reacted to that same signal* — the registration CTA didn't know or care that the event it was promoting was over.

**Fixed, both halves:**
1. **The immediate content fix** — founder confirmed 2026-09-08 the real next cohort date, **November 3, 2026**. Updated `date: 2026-11-03` in `src/content/workshops/genai-jumpstart.md`. The badge now reads a live cyan "NOV 3, 2026" (accent tone) instead of the grey "PAST" tone, and the existing "Build My First AI Agent →" registration CTA is correct again as-is — no CTA swap needed for this cohort right now.
2. **The systemic fix, so this doesn't silently recur when Nov 3 itself eventually lapses** — connected the CTA to the same `dateInfo.isPast` signal the badge already computes, per the original recommendation. In both `WorkshopCard.astro` and `WorkshopLayout.astro`, the secondary registration button (`data.cta` / `data.registrationUrl`) is now only shown when the workshop is upcoming; when `dateInfo.isPast` is true, it's replaced with "Join the waitlist for the next session" linking to `/contact/` (tagged via `analytics.events.contact`, the same event used for every other contact-routed CTA sitewide). The primary "View bootcamp" link is unaffected either way — browsing a past bootcamp's detail page is still fine, only the dead registration link was the problem.
3. **Verified:** clean build (0 errors); confirmed in the built HTML that both `/workshops/` and the detail page now render "Nov 3, 2026" not "PAST"; confirmed via Playwright that the real "Build My First AI Agent →" CTA renders (not the waitlist fallback, since the date is genuinely upcoming); no overflow or console errors at 375/768/1440px on either page.

### ✅ Finding 2 (resolved 2026-09) — a single full-width card wasted its own space

With one entry, the existing "avoid a stranded odd card" grid trick (`[&>*:last-child:nth-child(odd)]:lg:col-span-2`) correctly stretched the only card to the container's full width on desktop — but `WorkshopCard`'s internal layout wasn't designed for that width. The `Audience`/`Format` two-column `<dl>` ended up with "Audience" wrapping across 2-3 lines on the left while "Format: Live Online" sat alone on the right with a large empty gap beneath it before the topic badges. The card *read* correctly but *looked* unbalanced — proportioned for a ~600px card, stretched to ~1100px.

**Fixed:** took the smaller of the two options noted below — capped the card's width for the stranded-odd-card case instead of redesigning `WorkshopCard`'s internal layout. Added `[&>*:last-child:nth-child(odd)]:lg:mx-auto [&>*:last-child:nth-child(odd)]:lg:max-w-2xl` alongside the existing `col-span-2` selector in `src/pages/workshops/index.astro`'s grid — the lone card now renders centered at `max-w-2xl` (672px) instead of stretching to the full ~1150px container, restoring normal card proportions without touching `WorkshopCard.astro` itself. Scoped to this page only (not a shared utility) since Phase 11's equivalent finding calls for a different treatment — capping only the text content, not the whole card — so the two aren't the same fix. Verified: clean build (0 errors), confirmed visually at 1440px that the card now reads as a normal, proportioned card rather than a stretched one; no overflow or console errors at 375/768/1440px.

### ✅ Finding 3 (resolved 2026-11) — the catalog was a dead end for anyone the one bootcamp doesn't fit

Confirmed still real before fixing (re-checked 2026-11: still exactly one bootcamp entry, `genai-jumpstart.md`): below the single card there was nothing else — no cross-link to Programs or Self-Paced for a visitor whose interest doesn't match "AI agents" specifically. **Fixed:** added a closing `CTASection` to `src/pages/workshops/index.astro` ("Not the right topic?") with two actions — "Compare live programs" (`/programs/`) and "See self-paced plans" (`/self-paced/`), both tagged with the existing `ctaClick` analytics event — the same pattern just built for Phase 11, Finding 4, with the two destinations swapped (this page cross-links to Programs + Self-Paced; `/programs/` cross-links to Bootcamps + Self-Paced).

**Verified:** `npm run build` clean (0 errors/warnings/hints). Playwright confirmed at 375/768/1440px: zero horizontal overflow, zero console errors, the new section's title and both links render and resolve to the right hrefs. Screenshots confirm clean stacking at mobile and a clear, deliberate closing section at desktop.

**Note surfaced, not fixed:** `genai-jumpstart.md` still shows `date: 2026-08-01` (a "PAST — Aug 1, 2026" badge, today being 2026-11-11), despite this same Phase 10 (Finding 1, above) and Phase 16 both recording that the founder had confirmed a real next-cohort date of November 3, 2026. That date was apparently never actually written back to the content file, or has since lapsed again without a new one — either way, this needs a current real date from the founder, not an invented one. Already tracked in "Open questions."

### 🟢 What's already working

The hero is clear and single-purpose. The nav active-state (Bootcamps underlined) is correct. The past-event badge itself (as opposed to what happens after it) is exactly the right pattern — neutral tone, clear label, doesn't pretend the event is upcoming. No responsiveness issues at 320/375/768px (verified: no horizontal overflow, no console errors). One thing checked and ruled out rather than reported: a cluster of small icons visible mid-page in the mobile full-page screenshot turned out to be a Chromium/Playwright screenshot-stitching artifact, not a real fixed-position element on the site — confirmed via `getComputedStyle`, no false finding recorded.

### Suggested priority

1. ✅ Finding 1 — done 2026-09, real date (Nov 3, 2026) applied plus the systemic past-event CTA swap (date has since drifted back to past again — see note above and "Open questions").
2. ✅ Finding 2 (card width cap) — done 2026-09, contained to the page's grid markup.
3. ✅ Finding 3 (closing cross-link section) — done 2026-11, reuses `CTASection`.

**Depends on:** nothing — all 3 findings are resolved. The recurring past-date content issue is tracked separately under "Open questions," not part of this UX-review phase's scope.

---

## Phase 11 — `/programs/` (Live Programs catalog) UX review (2026-09) — ✅ done 2026-11, all findings resolved

**Reviewed:** `/programs/` only, live in-browser at desktop (1440px) and mobile (375px), plus source (`src/pages/programs/index.astro`, `src/components/ProgramCard.astro`). Third entry in the page-by-page UX review series. Findings only, nothing implemented, same ground rules as Phases 9-10.

### ✅ Finding 1 (resolved 2026-09) — the level-grouping and badges provided zero differentiation between the 3 programs

All 3 real programs are `level: "advanced"`, `format: "cohort"`, so the badges and level-grouping gave every card the same visual tag — a visitor had to read full paragraphs to tell Engineer, FDE, and Architect apart. This was precisely the case AGENTS.md's original UX review anticipated ("once more than 2-3 programs share a level, give learners a way to compare... not only a grouped list") — this plan had previously and incorrectly called it "moot" (corrected in Phase 2).

**Fixed:** went with the lower-effort option over a full comparison table — added an optional `bestFor: z.string().optional()` field to `programSchema` and a one-line, verb-led role tag per program, drafted from each program's own real description (not invented): AI Engineer → "Builds and deploys the AI system," Forward Deployed Engineer → "Owns the customer's AI outcome," GenAI Architect → "Designs the enterprise AI platform." Rendered as a bold accent-colored line directly under the title in both `ProgramCard.astro` (listing/homepage) and `ProgramLayout.astro` (detail page hero) — visible immediately, before the longer description. Verified in the build and visually: the three cards now differentiate at a glance without adding a new table component. No responsiveness issues at 320/375/768/1440px.

### ✅ Finding 2 (resolved — already fixed by a later catalog redesign, confirmed 2026-11) — the stranded full-width card breaking line length

Original finding: the `[&>*:last-child:nth-child(odd)]:lg:col-span-2` CSS trick stretched an odd-one-out card to full container width with no `max-width` on its text, producing ~180-char lines. **2026-11 re-check:** `/programs/` no longer uses that CSS trick at all (confirmed via grep — it only remains on `/workshops/` and `/self-paced/` now) and the catalog grew from 3 to 6 programs grouped by level (`beginner`/`intermediate`/`advanced`) in a fixed `lg:grid-cols-2` grid, so no card is ever stretched full-width. No code change needed — this was resolved as a side effect of the catalog growing and being restructured, not a deliberate fix for this finding.

### ✅ Finding 3 (resolved — already fixed, confirmed 2026-11) — hero copy promising variety the catalog didn't have

Original finding: hero subtext promised "pick a level and format" when all 3 programs then on the page were the same level/format. **2026-11 re-check:** the hero copy now reads "Compare the role focus, time commitment, work you will produce, and current availability before choosing a path" — accurate copy that no longer claims level/format variety, and the catalog genuinely has 3 levels today (Free AI Engineering Journey is `beginner`, Python for Experienced Engineers is `intermediate`, the other 4 are `advanced`). No code change needed.

### ✅ Finding 4 (resolved 2026-11) — dead-end pattern, no closing cross-link

Confirmed still real before fixing: the page went straight from the last program card to the footer, with no cross-link to Bootcamps or Self-Paced for a visitor who decides a full cohort program isn't the right commitment level (the sitewide footer's single generic "Find your learning path" CTA, present on every page, isn't a substitute for a contextual one). **Fixed:** added a closing `CTASection` to `src/pages/programs/index.astro` ("Not ready for a full program yet?") with two actions — "Explore bootcamps" (`/workshops/`) and "See self-paced plans" (`/self-paced/`), both tagged with the existing `ctaClick` analytics event — reusing the existing `CTASection` component rather than building a new one. `/workshops/`'s equivalent gap (Phase 10, Finding 3) is still open and should reuse the same pattern when it's tackled.

**Verified:** `npm run build` clean (0 errors/warnings/hints). Playwright confirmed at 375/768/1440px: zero horizontal overflow, zero console errors, the new section's title and both links render and resolve to the right hrefs. Screenshots confirm it reads as a deliberate closing chapter (consistent with `.section-divider`), not a bolted-on afterthought.

### 🟢 What's already working

The primary/secondary CTA hierarchy on each card ("View program" in the primary cyan style, the external registration link styled as secondary/ghost) is correctly weighted for this page specifically — unlike the homepage teaser (Phase 9), a visitor arriving at a dedicated listing page is already in decision mode, so offering both "learn more" and "apply directly" at differentiated visual weight is appropriate here, not redundant. No responsiveness issues at 320/375/768px (verified: no overflow, no console errors) — mobile's single-column stack sidesteps Finding 2's line-length problem entirely, since the stranded-card CSS trick only applies at the `lg` breakpoint.

### Suggested priority

1. ✅ Finding 1 ("best for" tags) — done 2026-09.
2. ✅ Finding 2 (max-width on card text) — resolved as a side effect of the catalog redesign, confirmed 2026-11.
3. ✅ Finding 3 (hero copy accuracy) — resolved as a side effect of real copy/content updates, confirmed 2026-11.
4. ✅ Finding 4 (closing cross-link section) — built 2026-11.

**Depends on:** nothing — all 4 findings are resolved.

---

## Phase 12 — `/self-paced/` UX review (2026-09) — 📋 documented, not yet implemented

**Reviewed:** `/self-paced/` only, live in-browser at desktop (1440px) and mobile (375px), plus source (`src/pages/self-paced/index.astro`, `config/self-paced.ts`). Fourth entry in the page-by-page UX review series. Findings only, nothing implemented.

This page is a case of my own earlier design decision (Phase 6/the self-paced course-cards follow-up) not holding up once it actually had 8 real entries to render — worth reviewing critically rather than assuming it's fine because it was recently built.

### 🔴 Finding 1 — 8 near-identical "coming soon" cards make this read as a full catalog, contradicting the page's own stated purpose

The page renders all 8 self-paced tracks as full `ProgramCard`s. Every one of them shares the identical badge ("Coming soon"), identical Duration ("Self-paced"), and identical Access row ("Included in the All-Access Pass") — three of the card's data points are 100% repeated 8 times with zero differentiating value, and the page runs to ~5300px of scroll on desktop. `config/self-paced.ts`'s own hero copy says "the catalog is in development," and AGENTS.md's original spec for this page explicitly said "not a full catalog" — but a wall of 8 full-detail cards, each visually identical except title/description, reads exactly like a full catalog. This is the same density mistake flagged on the homepage (Phase 9, Finding 4) — reusing a listing-page-weight card where a lighter teaser was called for — recurring here on the one page that most needed to stay light.
- **Recommendation:** group the 8 tracks into their real structure instead of one flat grid — the source curriculum document (`docs/references/self-paced/courses_topics.md`) itself describes a learner journey (Foundation → Builder → career specialization), which the current unordered grid doesn't communicate at all. Two lighter-weight options, roughly in order of effort: (a) keep all 8 but group under two headers ("Start here" for Foundations + Builder, "Then choose your path" for the 6 career tracks) and drop Duration/Access from the card display here since they add no information at this density; (b) show only 3-4 of the most-featured tracks with a "+4 more tracks in development" line, deferring full detail to a "see the full curriculum" expand/link. Either fixes both the density problem and the missing-sequence problem below in one pass.

### ✅ Finding 2 (resolved 2026-09) — the course order didn't reflect the actual learner journey, and buried the second-most-important entry last

The grid had no explicit sort, so it rendered in whatever order the content collection returned (effectively alphabetical-by-filename), with GenAI Builder — the mandatory second step before any career path per the source curriculum doc — landing dead last instead of second. **Fixed:** added an explicit `CURRICULUM_ORDER` sort in `src/pages/self-paced/index.astro` (Foundations → Builder → Engineer/FDE/AI-Native tier → Architect/Product → Leadership last), resolved while answering the "which track launches first" open question by referring back to the curriculum document's own sequence. Verified in the built HTML — cards now render in the intended order.

### 🟡 Finding 3 — every "Join the waitlist" click reports identically to analytics, losing per-course signal

All 8 cards' CTA buttons link to the same `/self-paced/#waitlist-form` anchor and fire the same `waitlist_signup` event — confirmed by inspecting the rendered button, which has `data-analytics-event="waitlist_signup"` but no `data-analytics-label`. Since `Analytics.astro`'s click handler falls back to the button's visible text when no label is set, and every button's text is the identical "Join the waitlist," **GA cannot tell which of the 8 courses drove a given click** — directly undercutting AGENTS.md's own Phase 6 requirement that waitlist interest be "measurable, with the course the visitor was viewing recorded as an event parameter." The form itself compounds this: its free-text "interest" field isn't pre-filled from whichever card was clicked, so a visitor who clicked "Join the waitlist" on the Architect card still has to manually retype "GenAI Architect" (or doesn't bother, leaving it blank) once they reach the form.
- **Recommendation:** pass `analyticsLabel={data.title}` on the coming-soon CTA `Button` in `ProgramCard.astro` (one-line fix, immediately restores per-course analytics signal). As a further improvement, pre-fill the waitlist form's interest field from a URL parameter (e.g. `#waitlist-form?course=...` read by a small inline script) so clicking a specific card's button carries that intent into the form instead of losing it.

### 🟡 Finding 4 — the hero states the goal but offers no immediate way to act on it

The hero paragraph ends with "Join the waitlist to be notified when it opens and to hear pricing first" — but the hero itself has no button. A convinced-immediately visitor has to scroll past How It Works and all 8 course cards to reach the actual form, or hunt for one of the 8 per-card buttons. The homepage's much lighter self-paced teaser already gets this right (description immediately followed by a "Join the waitlist" button) — this dedicated page, which exists specifically to convert waitlist signups, is more waitlist-focused, and paradoxically requires more scrolling to act on it than the teaser does.
- **Recommendation:** add a "Join the waitlist" button directly in the hero, linking to `#waitlist-form`, for visitors who don't need convincing.

### 🟢 What's already working

The How It Works section's 3-card single-column-on-desktop layout looks unusual at first glance but is correct given the layout it's in (a narrower right-hand column in a 2-column split, matching the homepage's Why-Learn-Here section) — checked the CSS before flagging it, not a bug. The pass-specific FAQ (3 items) is appropriately light and directly answers the objections that matter for a pre-launch waitlist ("can I buy now," "what about new courses," "how is this different from live programs"). The waitlist form itself is well-scoped (name, email, topic interest, one qualifying question). No responsiveness issues at 320/375/768px — no overflow, no console errors.

### Suggested priority

1. 🔴 Finding 1 (reduce/group card density) — highest value, directly fixes the "full catalog" contradiction and folds in Finding 2's sequencing fix.
2. 🟡 Finding 3 (analytics label) — trivial one-line fix, restores data quality the site is supposed to already have per its own spec.
3. 🟡 Finding 4 (hero CTA button) — small, additive.
4. 🟡 Finding 2 (explicit sort) — small; likely gets folded into Finding 1's restructuring anyway.

**Depends on:** nothing — all findings are code/markup changes to existing files, no founder input or new content required.

---

## Phase 13 — `/teams/` (Corporate Training) UX review + naming assessment (2026-09) — 📋 documented, not yet implemented

**Reviewed:** `/teams/` only, live in-browser at desktop (1440px) and mobile (375px), plus source (`src/pages/teams.astro`, `config/corporate.ts`, `src/content/pages/teams.md`, `config/navigation.ts`). Fifth entry in the page-by-page UX review series. Also answers the founder's direct question: is "For Teams" the right nav name for this offering in an EdTech context? Findings only, nothing implemented.

### Naming assessment: is "For Teams" appropriate?

Genuine answer: **the specific label matters less than the fact that the site currently uses three different labels for the same offering, which is the real problem.** Confirmed by reading the actual strings in the codebase:

| Where | Label used |
|---|---|
| Primary nav (`config/navigation.ts`) | **"For Teams"** |
| Nav item's own `description` field (screen-reader/tooltip text, same file) | **"Corporate AI enablement"** |
| Hero eyebrow badge on the page itself (`config/corporate.ts`) | **"Corporate training"** |
| Page `<title>` / meta description (`src/content/pages/teams.md`) | **"AI Training for Teams"** |

A visitor clicks "For Teams" in the nav and lands on a page whose hero badge immediately says "CORPORATE TRAINING" — a different term, one click apart. That inconsistency is a bug regardless of which term is "correct."

On the substance of "For Teams" specifically: it's a legitimate, common EdTech/SaaS pattern (Pluralsight for Teams, Slack for Teams, etc.), and it's appropriately short for a 5-item nav where every other label is one or two words (Bootcamps, Programs, Self-Paced, About). But "For Teams" also carries a specific connotation in that category — a lighter-touch, often self-serve, per-seat product a team lead signs up for directly. That's not what this page actually sells: the content describes a consultative, discovery-call-led engagement ("Start a training conversation," custom-scoped workshops, leadership briefings, an "adoption plan" as the deliverable) aimed at buyers evaluating a training *vendor*, not a team lead buying seats. The GenAI Architect-level content elsewhere on the site (enterprise governance, platform architecture) also signals a larger-organization buyer than "team" typically implies. "Corporate Training" (or "For Business") telegraphs that procurement/L&D-evaluation motion more accurately than "For Teams" does.
- **Recommendation:** keep the nav label short (brevity is a real, working constraint on this nav — don't force a long label like "Corporate Training" into that slot if it breaks the visual rhythm), but pick **one** term and use it as the consistent formal name everywhere else. Concretely: keep **"For Teams"** in the nav only (it's short and the click-through cost of learning the formal name is low), and standardize every other surface — hero eyebrow, page `<title>`, meta description, footer link text if added (see below) — on **"Corporate Training"**. Drop "AI Training for Teams" and "Corporate AI enablement" as stray third/fourth variants; they add no information the other two don't already carry. This is ultimately the founder's brand call, same as the earlier Bootcamps-naming decision — but the 3-different-labels state is a bug worth fixing regardless of which term wins.

### 🟡 Finding 1 — the footer doesn't link to this page at all

`config/navigation.ts`'s footer "Learning" group lists Bootcamps, Programs, and Self-Paced — but not Teams/Corporate Training, despite it being a first-class offering line per AGENTS.md's own taxonomy. A visitor on `/faq/` or `/privacy/` who wants to jump straight to corporate training has no footer path there; they have to return to the top nav.
- **Recommendation:** add it to the footer's "Learning" group (or a "Company"-adjacent group, depending on the naming decision above) — a one-line config addition.

### 🟡 Finding 2 — three sections say the same thing three times

**Outcomes** (4 cards: prioritized AI opportunities, shared evaluation habits, responsible adoption, workflow-level plans), **How Engagements Work** (4 steps: define target, shape intervention, apply to workflows, document next actions), and the **Approach** markdown body (three prose sections: "Training that fits how your team already works," "What a typical engagement includes," "Why teams choose SkillUp") cover substantially overlapping ground — "what a typical engagement includes" in the Approach prose is close to a paragraph re-statement of the Engagement-steps cards a few sections earlier, and "Why teams choose SkillUp" re-covers the same ground as the Outcomes cards. Verified by reading all three side by side, not just skimming. On mobile this page runs ~7000px — a meaningful share of that is restating the same 2-3 ideas in a third format (cards → cards → prose) rather than adding new information.
- **Recommendation:** cut the Approach section's first two subsections ("Training that fits..." and "What a typical engagement includes") since Outcomes and Engagement-steps already cover that ground with better scannability (cards beat prose for this kind of content) — keep "Why teams choose SkillUp" if it earns its place, or fold its one genuinely new idea (training as a capability investment, not a one-off event) into the Outcomes section header instead of a separate prose block.

### 🟢 What's already working

This page has the tightest, most coherent CTA structure of any page reviewed so far: hero offers exactly two well-differentiated actions (anchor to the form, or browse Bootcamps), every mid-page section correctly has no CTA of its own because the whole page funnels toward one bottom form rather than competing for attention — that's the right pattern for a single-destination sales page, unlike the catalog pages reviewed earlier where multiple competing CTAs were a real problem. The conditional "Private sessions" section (built in Phase 1) correctly disappears with zero private-team workshop entries, exactly as designed — verified, not assumed. The form itself is well-scoped (team/department of interest, team size and timeline). No responsiveness issues at 320/375/768px.

### Suggested priority

1. 🟡 Consolidate the naming to two consistent terms (nav-only "For Teams" + everywhere-else "Corporate Training") — small, mostly copy/config changes, but needs the founder's confirmation on which term wins since it's a brand call, not just a bug fix.
2. 🟡 Add the missing footer link — trivial, one line in `config/navigation.ts`.
3. 🟡 Trim the redundant Approach prose — small content edit, no schema/code change.

**Depends on:** the naming consolidation (item 1) benefits from a quick founder confirmation of which term to standardize on, though "Corporate Training" is the recommendation above if a decision is wanted now. Items 2 and 3 are independent and unblocked.

---

## Phase 14 — `/about/` UX review + founder/mentor section assessment (2026-09) — ✅ resolved 2026-11 (already implemented via subsequent redesign)

**Original review (2026-09):** `/about/` live in-browser at desktop (1440px) and mobile (375px), plus source (`src/pages/about.astro`, `config/about.ts`, `src/content/pages/about.md`). Sixth entry in the page-by-page UX review series. Found zero mentions of Sanjay and zero CTAs anywhere on the page.

**Re-audit (2026-11):** the page has since been fully redesigned into the same editorial/"workbook" style as the homepage (Phase 16 found the same staleness pattern there). Re-reading the current `about.astro`/`config/about.ts` and verifying live found every recommendation below **already built**, just not in the shape this finding assumed:
- Hero now uses `Hero`'s `mentor` prop — founder photo + name + role shown directly in the hero, replacing the old generic metrics.
- Hero description and a dedicated "Why I teach" story section are written in first person ("I'm Sanjay Negi...") with the full real 20+-year background → AI transition story (sourced from the same program-page bios Phase 14 recommended consolidating from).
- A second founder photo + name/role caption appears again in the "What mentoring feels like" section.
- A "Follow the work" section links out to the real LinkedIn (`https://www.linkedin.com/in/sanjay-negi-ai/`), GitHub, YouTube, and Programs — all real configured URLs in `config/site.ts`, not placeholders.
- Multiple real CTAs exist: 2 hero actions, a `CTASection` with 2 actions at the bottom, 4 public-channel links, and a sticky mini-CTA bar ("AI Mentor / Sanjay Negi" + "Find your learning path") above the footer — 8 total CTA-eligible links on the page, confirmed via Playwright.
- The old Markdown body (`src/content/pages/about.md`, the generic "SkillUp exists for..." prose that Finding 2 flagged as overlapping with the Principles cards) is no longer rendered on the page at all — only used for its SEO frontmatter now — so the prose/cards overlap from Finding 2 no longer exists either. Finding 1's generic hero metrics are also gone, replaced by the mentor photo.

**Verified 2026-11:** `npm run build` clean. Playwright confirmed at 375/768/1440px: zero horizontal overflow, zero console errors, Sanjay mentioned in body text, founder photo loads, LinkedIn link resolves to the real profile URL, 8 CTA-eligible links present. No code changes were needed — this phase closes as "already done," not "newly built."

### Original 2026-09 findings (superseded — kept for history only)

At the time of the original review, the page had zero mention of Sanjay Negi and zero CTAs, and recommended building a founder/mentor section (real photo, consolidated story, LinkedIn link, CTA) from scratch, plus two smaller findings: generic hero metrics, and Principles-cards/Approach-prose overlap. The 2026-11 re-audit above found the page redesigned since then, with all of this already in place — see "Re-audit (2026-11)" for exactly what now exists and where. None of the original suggested-priority items need separate action.

---

## Phase 15 — Real content addition: Free AI Engineering Journey (2026-09) — ✅ done

Founder-provided a new, real offering: a free, live, weekly beginner AI program (`src/content/programs/free-ai-engineering-journey.md`), sourced from the founder's actual marketing copy, registration URL (`https://learn.sanjaynegi.in/l/adff39aacd`), and schedule (every Wednesday, 10:00–11:30 PM IST, 4 months, no fee).

**Content-accuracy check before shipping:** the founder's copy said the series "Starts 2 September 2026," which was already 6 days in the past by the time this was added (2026-09-08) — the same "CTA promoting a lapsed date" failure mode just fixed in Phase 10, Finding 1. Flagged directly to the founder rather than publishing the stale date silently; **founder confirmed:** registration is ongoing and new joiners can start anytime, so reword the schedule line rather than showing a passed start date. Implemented: `nextCohort` reads "Live every Wednesday, 10:00–11:30 PM IST — join anytime" instead of a dated "Starts..." claim, and the Markdown body's own Schedule section uses the same framing. The rest of the founder's marketing copy (motivational framing, ML Foundations → Deep Learning → GenAI → AI Engineering progression, WhatsApp-group-after-registration note) was kept close to verbatim — real founder-authored content, not invented.

**Fields set (all sourced from the founder's message, nothing fabricated):** `level: "beginner"`, `format: "cohort"`, `duration: "4 months"`, `fee: "Free"`, `bestFor: "Starts your AI journey, no experience required"`, `featured: false` (added to the Programs catalog only, per the request's literal scope — not pushed onto the homepage teaser). No curriculum-module breakdown or FAQ was invented for the Markdown body, since the founder's source material was schedule/positioning copy, not a module-by-module syllabus — unlike the 3 paid programs (Phase 8), which had real module content to transcribe.

**Side effect worth noting:** this is also the first `beginner`-level program in the catalog. `/programs/index.astro`'s level-grouping (Beginner → Intermediate → Advanced) now actually differentiates, which directly closes part of Phase 11, Finding 3's concern (the hero copy "pick a level... that fits how you learn best" was inaccurate when all 3 programs were `advanced`-only — it's now literally true).

**Verified:** clean build (0 errors); confirmed via curl that the registration link, `target="_blank"`, `rel="noreferrer"`, and `program_apply` analytics event all render correctly; Playwright check at 375/768/1440px on both `/programs/` and the new detail page — no horizontal overflow, no console errors; visually confirmed the new "Beginner" group renders correctly above "Advanced" on the catalog page and the detail page's aside shows "Next cohort" / "Fee: Free" correctly instead of a stale past date.

---

## Phase 16 — Regression & gap audit (2026-11) — ✅ done, all 8 findings resolved

**Reviewed:** full-site read-only CRO/UX re-audit (config, content collections, key components/pages, and a production build check), prompted by a fresh site review two months after the Phase 0-15 work above. `npm run build` passes clean (0 errors, 25 pages), and the content catalog has grown well past what Phases 0-15 describe (14 program entries now vs. the 3-then-6 tracked above). The important finding: **some items this plan already marks ✅ "done" have since regressed or no longer match the live code** — this phase exists to re-ground the plan in what's actually in the repo today, not to re-litigate settled decisions. Nothing in this phase has been implemented yet.

### ✅ Finding 1 (resolved 2026-11) — Lead-capture form has regressed to mailto-only, contradicting Phase 0's "done" status

**Correction before the fix:** this wasn't actually an unexplained regression. `docs/google-form-backend.md` (dated 2026-10-05) documents that the on-site POST was deliberately disabled: the hidden-iframe transport to the Apps Script endpoint couldn't read a real success/error response, so it was showing a "Thanks" message even on submissions that may have failed (confirmed 403s on the response, even when the row sometimes landed in the Sheet) — `config/contact.ts`'s hero metrics and `config/forms.ts`'s copy even stated the email-handoff design explicitly. The mailto fallback was a considered fix for that dishonesty problem, not an oversight — mechanically restoring the old hidden-iframe POST would have reintroduced the exact bug it was built to fix.

**Implemented (2026-11), per the three steps `docs/google-form-backend.md` itself specified before restoring on-site submission:**
1. `src/components/EnquiryForm.astro`'s submit handler now attempts a direct `fetch()` POST to `forms.endpoint` (form-urlencoded body, matching the Apps Script `doPost`'s `e.parameter` fields) instead of a hidden iframe. `fetch()` can actually read the response — including a CORS/network failure — unlike the iframe, which could only guess.
2. Success is shown only after the response is confirmed `ok` and returns `{ "result": "success" }`; any other outcome (network error, bad status, unexpected body) falls back to the exact same honest `mailto:` handoff from October, with a message explaining the automatic attempt didn't go through. If `PUBLIC_FORMS_ENDPOINT` is unset (e.g. local dev), it skips straight to mailto as before.
3. A hidden honeypot field (`company`) was added back, per the doc's explicit "any restored on-site form needs a spam strategy" requirement — real visitors never see it (off-screen, `tabindex="-1"`, `aria-hidden`), so it can't discard a legitimate enquiry; a filled value short-circuits before any network call.
4. Wired the existing-but-unused `analyticsEvent` prop and the already-defined `enquiry_completion` event (`config/analytics.ts`) to fire only on confirmed success — this also resolves part of Finding 5 below. Submit button shows a "Sending…" state and disables itself during the request to avoid double-submits.
5. Updated copy that explicitly promised the old email-only flow — `config/contact.ts` (hero metric, form description, submit label), `config/corporate.ts` (form description, submit label), `config/forms.ts` (`handoffMessage`/new `fallbackMessage`) — so the UI doesn't contradict the new behavior. `docs/google-form-backend.md` updated with the 2026-11 status and what still needs live verification.

**Verified:** `npm run build` (`astro check && astro build`) passes clean — 0 errors, 0 warnings. Playwright checks at 375/768/1440px on `/contact/` confirmed: honeypot is present and genuinely off-screen at every width, no horizontal overflow, no console errors on a normal run. Using route interception (never touching the real Apps Script endpoint, per the doc's "do not send test enquiries... without authorization" rule): a mocked success response shows the real success message and re-enables the button; a mocked failure (aborted request) correctly falls back to the honest mailto message and updates the direct-email link; filling the honeypot makes zero network calls and shows a harmless fake-success message.

**Still needs you, not more code:** per `docs/google-form-backend.md`, (1) confirm the Apps Script deployment is still genuinely set to "Anyone" access (this was the suspected cause of the original 403s), and (2) submit one real test enquiry on the live site and confirm both the on-site success message appears and a row lands in the Sheet — then delete the test row. If the mailto fallback still appears on a live test, the deployment needs re-checking before assuming the code is at fault.

### ✅ Finding 2 (resolved 2026-11) — Homepage has no dedicated Bootcamps / Self-Paced / Corporate sections

**Correction before the fix:** this also wasn't a simple regression to patch. The homepage had been fully redesigned at some point after Phase 9 into a different concept — a teaching-demonstration narrative (hero → an interactive mini-exercise → a curriculum excerpt → one combined "choose your route" block → featured programs → mentoring → philosophy → FAQ), built with its own custom components (`TeachingDiagram`, `TeachingExperiment`, `CurriculumExcerpt`, `ProgramSummary`) and no `ProgramCard`/`WorkshopCard` grids anywhere. Reusing Phase 9's glass-card sections verbatim would have clashed with that redesign. Asked the founder directly: keep the redesign and extend it in its own visual language, rather than reverting to the old card-grid style — confirmed.

**Implemented:**
1. Built `src/components/WorkshopSummary.astro`, a row-style summary for one workshop entry (mirrors `ProgramSummary.astro`'s pattern: meta line, description, single CTA link) — reuses the shared `getWorkshopDateInfo` util so a past-dated event correctly falls back rather than ever linking straight to a dead external registration page.
2. Extracted the row layout both components share into a new `.summary-row` utility in `src/styles/global.css` (replacing `ProgramSummary`'s component-scoped `.program-summary` style block) instead of duplicating the CSS a second time.
3. Replaced the single combined `#learning-paths` section in `src/pages/index.astro` with a dedicated **Bootcamps** section (featuring the one real bootcamp via `WorkshopSummary`, plus a "See all bootcamps" link) positioned directly after the curriculum-excerpt section and before Programs — the correct position per AGENTS.md's mandated low-to-high-commitment order.
4. Added two new dedicated sections after the existing Programs section: **Self-Paced** (teaser-weight only — a `secondary`-variant button, a "See what's planned" link, and a text line listing featured in-development tracks; deliberately lighter than Bootcamps/Programs, no card grid) and **Corporate Training** (a `secondary`-variant button to `/teams/` with a short real description pulled from `config/corporate.ts`'s own copy). Final order now matches AGENTS.md: Hero → (mini-lab/curriculum-excerpt as the "why learn here" equivalent) → **Bootcamps** → **Programs** → **Self-Paced** → **Corporate** → Mentoring/Philosophy (founder) → FAQ.
5. `config/home.ts`: replaced the old combined `paths` block with separate `bootcamps`, `selfPacedTeaser`, and `corporate` blocks; renumbered the `mentoring`/`philosophy`/`faq` eyebrow labels (05/06/07 → 07/08/09) to stay sequential; updated the hero's primary CTA anchor from the now-removed `#learning-paths` to `#bootcamps`.
6. Removed the now-orphaned `.audience-paths` CSS rules from `index.astro`'s local `<style>` block.

**New issue surfaced while verifying, not yet fixed (separate from this finding):** the one real bootcamp (`src/content/workshops/genai-jumpstart.md`) still has `date: 2026-08-01` — the PLAN.md record above (Phase 10, Finding 1) claims this was updated to November 3, 2026, but the live file still shows the original August date, now genuinely past (today is 2026-11-11). This is the same class of doc/reality drift as Finding 1's forms regression. **Not a dead-link risk** — `WorkshopCard`/`WorkshopLayout`'s existing `dateInfo.isPast` fallback (confirmed still intact) already swaps the registration CTA to a waitlist link whenever a workshop is past-dated, and the new homepage teaser links only to the detail page, which carries that same protection. But the homepage now visibly shows a "Past — Aug 1, 2026" badge on its one featured bootcamp, which looks bad regardless of whether the link is safe. Needs a real next-cohort date from the founder — not invented here, same rule as every other date/fee claim in this plan. Logged under "Open questions" below.

**Verified:** `npm run build` (`astro check && astro build`) passes clean — 0 errors, 0 warnings. Playwright checks at 375/768/1440px on `/` confirmed: all three new sections (`#bootcamps`, `#self-paced`, `#teams`) are present and visible, no horizontal overflow, no console errors, and DOM order is correct (Bootcamps → Programs → Self-Paced → Corporate → Mentoring).

### ✅ Finding 3 (resolved 2026-11) — 14 programs, no comparison aid; choice-paralysis risk

**Re-audit before the fix:** this had already been substantially addressed without a PLAN.md update to say so. All 6 live (non-self-paced) programs — not just the original 3 — already have a real `bestFor` tag, `/programs/` already has a "Choose by responsibility" compare strip surfacing all 6 at once, and `ProgramCard` already shows a prominent `level · duration` line above the title. Screenshotting the actual rendered page (desktop + mobile) confirmed the catalog reads clearly, not as choice-paralysis-inducing.

**The one real gap found by inspection:** two of the 6 — "Forward Deployed Engineer" (8 months, published 2026-09-07) and "Forward Deployed AI Engineer" (7 weeks live + 6 months mentorship, published 2026-11-03, a newer and genuinely different accelerated program, not a duplicate or typo) — sit adjacent in both the advanced-level card grid and the compare strip, and differ by only the word "AI" in the title. The compare strip (`src/pages/programs/index.astro`) showed only title + `bestFor` for each entry — missing the one real, already-authored fact (`duration`) that disambiguates them fastest.

**Implemented:** added a `{level} · {duration}` line to each entry in the "Choose by responsibility" strip (matching the styling already used on `ProgramCard`), so "ADVANCED · 7 WEEKS LIVE + 6 MONTHS PROJECT MENTORSHIP" sits directly under "Forward Deployed AI Engineer" and "ADVANCED · 8 MONTHS" under "Forward Deployed Engineer" — visible at a skim, without opening either program. No new filter/comparison-table component built — the existing strip plus this one addition was sufficient once actually viewed in the browser; a heavier UI would have been solving a problem that mostly didn't exist by the time real `bestFor` data had already landed.

**Verified:** `npm run build` clean, 0 errors. Playwright checks at 375/768/1440px — no horizontal overflow, no console errors. Screenshots confirmed the strip reads cleanly at both widths and the two Forward Deployed entries are now clearly distinguishable side by side.

### ✅ Finding 4 (resolved 2026-11) — Testimonials section is now absent, not conditionally hidden

**Confirmed before the fix:** this was a real gap, not a stale finding — the homepage redesign (see Finding 2) dropped the testimonials section entirely rather than keeping a conditional-hide version of it, and `TestimonialCard.astro` (the existing glass-card component) had zero references anywhere in `src/`.

**Implemented, consistent with the editorial design direction confirmed in Finding 2:**
1. Built `src/components/TestimonialQuote.astro` — a row-style summary (quote + attribution, reusing the shared `.summary-row` utility from Finding 2) instead of reintroducing `TestimonialCard`'s glass-card look on this redesigned page. `TestimonialCard.astro` itself was left untouched — it's explicitly named as a reusable component in `AGENTS.md`, not dead code to delete, and may still suit a future full testimonials page or `/about/`.
2. Added a `testimonials` query (`getCollection("testimonials")`, filtered to `featured: true`) and a new `#testimonials` section to `src/pages/index.astro`, positioned between Founder (philosophy) and FAQ per AGENTS.md's mandated order. The section is wrapped in `{testimonials.length > 0 && (...)}` — renders nothing at all when the collection is empty, exactly the conditional-hide behavior Phase 8/9 originally documented.
3. `config/home.ts` gained a `testimonials.{eyebrow,title}` block; renumbered the FAQ eyebrow (09 → 10) to stay sequential now that testimonials sits before it.

**Verified:** confirmed the section renders nothing in the current zero-testimonial state (`curl` + grep for `id="testimonials"` found no match). Then, to verify the non-empty path actually works (not just assumed), added a temporary, clearly-labeled test entry (`name: "Temp Verify"`, explicitly marked "Not real content" in the quote itself) to a fresh `src/content/testimonials/` file, confirmed via dev server + Playwright that the section renders correctly with no horizontal overflow and no console errors at 375/768/1440px, screenshotted it, then deleted the temp file immediately after and re-ran the build to confirm the empty state is restored exactly as before (`git status` on `src/content/testimonials/` shows no trace of it — the temp file was never committed, per the project's own "never fabricate a testimonial" rule, this was treated as test fixture, not content). `npm run build` passes clean — 0 errors, 0 warnings from `astro check`.

### ✅ Finding 5 (resolved 2026-11, as a side effect of Finding 1) — No conversion-tracking event fires on actual lead submission
Only `enquiry_start` fired (on form interaction/click); there was no event for a completed submission, and no fallback or tracking if a mailto link failed to open a configured mail client.

Both resolved by Finding 1's `fetch()`-based rewrite of `EnquiryForm.astro`: the already-defined-but-unused `enquiry_completion` event (and each form's own `analyticsEvent`/typeOptions event) now fires only on a confirmed successful POST; and a real, visible fallback message (`forms.fallbackMessage` in `config/forms.ts`) now shows whenever the automatic submission fails and the form falls back to mailto, instead of the old silent/no-feedback path.

### ✅ Finding 6 (resolved 2026-11) — refund-policy copy needs a founder-provenance re-check
`config/faq.ts` (lines ~26-28) states a non-refundable policy. Re-confirmed directly with the founder (2026-11): still accurate as published, no changes needed. No code change — this was a provenance check, not a content gap.

### ✅ Finding 7 (resolved 2026-11) — Free, no-prerequisite program isn't featured on the homepage

**Decision made:** rather than adding `free-ai-engineering-journey` to `home.programs.slugs` (the "Featured Live Programs" rows), which would have contradicted that section's own copy — "Advanced live mentorships for experienced software and systems professionals" — the existing Bootcamps section already had an unlinked line ("New to AI? The programs page also lists a beginner route.") clearly intended for exactly this purpose but never wired to anything.

**Implemented:** turned `home.bootcamps.beginnerLabel` (plain text) into `home.bootcamps.beginnerRoute` (`label`/`href`/`analyticsEvent`, matching the existing action-object pattern used everywhere else in `config/home.ts`) and rendered it in `src/pages/index.astro` as a real link to `/programs/free-ai-engineering-journey/`, alongside the "See all bootcamps" link. The free program now gets direct homepage visibility without touching the Programs section's advanced-only framing. Phase 15's original `featured: false` decision (catalog-only, not pushed onto the Programs teaser) still stands — this is a separate, lighter-weight discovery path.

**Verified:** `npm run build` clean, 0 errors. Playwright confirmed the link renders at 375/768/1440px with no overflow or console errors, and a real click-through lands on `/programs/free-ai-engineering-journey/` (confirmed via the page's `<h1>`).

### ✅ Finding 8 (resolved 2026-11) — frontmatter field order (cosmetic)
`src/content/programs/python-for-experienced-engineers.md` had `level`/`format`/`featured` before `title`, unlike every other program file (which lead with `title`, `description`, then `publishedAt`/`updatedAt`, `audience`, `bestFor`, `level`, `duration`, `format`...). Reordered to match the canonical order used in `ai-engineer.md` and the other program entries — values unchanged, YAML key order has no effect on Zod validation. Verified: `npm run build` clean, 0 errors.

### Standing note on verification
No finding in this phase has been browser-verified at mobile/tablet widths yet — per this project's own responsiveness rule, each fix above needs a real Playwright/Chromium check at 320-375px and 768px, with no horizontal overflow and no new console errors, before being marked done — not just reasoned about from Tailwind classes.

### Suggested priority
1. ✅ Finding 1 (lead-capture form) — done 2026-11; fetch()-based POST with honest success/failure replaces the hidden-iframe transport, honeypot restored, blocked only on you re-verifying the live Apps Script deployment.
2. ✅ Finding 2 (homepage section restructuring) — done 2026-11; Bootcamps/Self-Paced/Corporate added as dedicated sections in the current editorial design (founder confirmed keeping the redesign over reverting to glass cards). Surfaced a new, separate stale-date issue on the one real bootcamp — see Open Questions.
3. ✅ Finding 3 (programs comparison aid) — done 2026-11; re-audit found most of the concern already resolved by existing `bestFor` data, fixed the one real gap (duration missing from the compare strip for two similarly-named programs).
4. ✅ Finding 4 (testimonials section) — done 2026-11; rebuilt as a conditionally-hidden `#testimonials` section in the current editorial design, verified both the empty and non-empty render paths.
5. ✅ Finding 6 — done 2026-11; founder reconfirmed the refund policy is still accurate, no changes needed.
6. ✅ Finding 7 — done 2026-11; free program linked from the homepage Bootcamps section instead of the advanced-only Programs section.
7. ✅ Finding 8 — done 2026-11; frontmatter field order normalized.

All 8 findings in Phase 16 are now resolved.

(Finding 5 — conversion-tracking event on lead submission — was resolved as part of Finding 1's fix, which wired `enquiry_completion` to fire on confirmed success.)

**Depends on:** nothing blocking — all findings are either code fixes to existing files or quick founder confirmations, no new infrastructure required.

### ✅ Finding 9 (resolved 2026-11, reported directly by the founder) — two white-on-white contrast bugs

1. **Contact form's "Enquiry path" dropdown — options unreadable.** `src/components/EnquiryForm.astro`'s `<select>` used `inputClasses` (a translucent `bg-white/5`) for styling, but native `<option>` popups don't render translucent/inherited backgrounds consistently — Chromium falls back to a default background while the inherited white text stayed white, making every option invisible until hovered. Fixed by setting an explicit `background-color: var(--card); color: var(--text);` inline style directly on each `<option>`. Verified visually (headless Chromium renders the native dropdown) and via `getComputedStyle` — options now show dark background with light text.
2. **Program detail pages — the repeated sticky-sidebar "availability" text (e.g. "Live every Wednesday at 10:00 PM IST.") was invisible against the light `.workbook` theme, on every program page, not just Free AI Engineering Journey.** Root cause in `src/styles/global.css`: the `.workbook` theme bridge that recolors dark-theme text utilities for the light editorial sections only listed four hardcoded opacity variants (`text-white/50,/60,/70,/80`). Several components actually use other values — `text-white/65` (this exact text, via `ProgramLayout.astro`'s second "at a glance" card), `/55`, `/75`, `/40`, `/90` — which fell through uncaught and stayed near-white against the light `--paper` background. Fixed by replacing the hardcoded list with a wildcard attribute selector (`.workbook [class*="text-white/"]`) so every current and future opacity variant is covered, not just the four someone happened to enumerate. This was a latent bug affecting every program detail page's lower sidebar card, not specific to the free program — the free program just made it obvious because that specific text sits directly in that card.

**Verified:** `npm run build` clean, 0 errors. Playwright regression pass across `/`, `/contact/`, `/teams/`, `/self-paced/`, `/about/`, and two program detail pages at 375/768/1440px — no horizontal overflow, no console errors on any of them (confirming the broadened `.workbook` selector didn't break anything elsewhere). Screenshotted both the open dropdown and the program sidebar card to confirm real visual contrast, not just computed-style values.

---

## Suggested execution order

1. ✅ Phase 0 — Lead-capture form (done; blocked only on you deploying the Apps Script and sending the URL)
2. ✅ Phase 1 — Taxonomy fixes (done)
3. ✅ Phase 3 — Testimonials (structural work done; 0 testimonials — adding real ones is on you)
4. ✅ Phase 4 — FAQ coverage (4 of 5 topics done; refund/cancellation policy is on you)
5. ✅ Phase 2 — Program/workshop depth (done via Phase 8's real content import)
6. ✅ Phase 5 — Mentor/instructor presence (resolved via Phase 8 — confirmed founder-only)
7. ✅ Phase 6 — Self-paced early access (infrastructure done; adding real courses is on you)
8. ⬜ Phase 7 — Urgency/scarcity — not started (quick, unblocked — the real bootcamp/programs now have real `capacity: 30`, but no data yet on how close any cohort is to full)
9. ✅ Phase 8 — Real content import (done — this is what unblocked Phases 2, 4, and 5 above)
10. ✅ Phase 9 — Homepage UX & CTA density review (fully implemented 2026-09, including the section-rhythm pass and Finding 6)
11. ✅ Phase 10 — `/workshops/` (Bootcamps) UX review — done 2026-11; all 3 findings resolved (Finding 3, the closing cross-link CTA, built last)
12. ✅ Phase 11 — `/programs/` (Live Programs catalog) UX review — done 2026-11; Findings 2-3 turned out already resolved by the catalog's growth/redesign, Finding 4 (closing cross-link CTA) built fresh
13. 📋 Phase 12 — `/self-paced/` UX review (documented; all 4 findings unblocked, includes a self-critique of the Phase 6 course-card design now that it has 8 real entries)
14. 📋 Phase 13 — `/teams/` UX review + naming assessment (documented; naming consolidation benefits from a quick founder call, footer link and content trim are unblocked)
15. ✅ Phase 14 — `/about/` UX review + founder/mentor section — resolved 2026-11; re-audit found the page already redesigned with a full founder/mentor section, real story, LinkedIn link, and multiple CTAs, superseding the 2026-09 "zero CTA" finding
16. ✅ Phase 16 — Regression & gap audit (2026-11) — done; all 8 findings resolved (lead-capture form fixed, homepage sections rebuilt, programs compare strip improved, testimonials section rebuilt, refund policy reconfirmed, free program linked, frontmatter normalized)

## Page-by-page UX review series

The founder asked to review the site one page at a time for section clarity, information density, and CTA effectiveness, documenting findings before implementing. Track progress here:

- ✅ **Homepage (`/`)** — reviewed 2026-09, findings in Phase 9 above.
- ✅ **`/workshops/` (Bootcamps catalog)** — reviewed 2026-09, findings in Phase 10 above; all 3 findings resolved as of 2026-11 (closing cross-link CTA built last). Surfaced a real content bug (the only bootcamp shows as past-dated with a live registration CTA) that has since recurred — see "Open questions." Bootcamp detail page (`/workshops/[slug]/`) not yet reviewed separately.
- ✅ **`/programs/` (Live Programs catalog)** — reviewed 2026-09, findings in Phase 11 above; all 4 findings resolved as of 2026-11 (2 already fixed by catalog growth, 1 built fresh — closing cross-link CTA). Corrected an earlier inaccurate note in Phase 2 about the comparison table being "moot." Program detail pages (`/programs/[slug]/`) not yet reviewed separately.
- ✅ **`/self-paced/`** — reviewed 2026-09, findings in Phase 12 above. Includes a self-critique: the 8 course cards built in the Phase 6 follow-up read as a full catalog in practice, contradicting the page's own "not a full catalog" premise.
- ✅ **`/teams/`** — reviewed 2026-09, findings + naming assessment in Phase 13 above. Confirmed the site uses three different labels for this one offering ("For Teams" / "Corporate training" / "AI Training for Teams") across nav, hero, and page metadata.
- ✅ **`/about/`** — reviewed 2026-09, findings + founder-section assessment in Phase 14 above. 2026-09 review found zero mentions of the founder and zero CTAs; 2026-11 re-audit found the page since redesigned with a full founder section already in place — resolved, no code changes needed.
- ⬜ `/contact/` — not yet reviewed.
- ⬜ `/faq/`, `/privacy/` — not yet reviewed.
- ⬜ Detail pages (`/programs/[slug]/`, `/workshops/[slug]/`) — not yet reviewed as their own review pass; some findings surfaced incidentally via the listing-page reviews above (e.g. Phase 11 Finding 2's line-length issue applies to the card, not the detail page itself).

## Open questions requiring founder/business input before implementation

**Blocking a live feature (highest priority):**
- **The one real bootcamp (GenAI Jumpstart) is past-dated again** — `src/content/workshops/genai-jumpstart.md` still shows `date: 2026-08-01` as of 2026-11-11, despite Phase 10/Phase 16 both recording this as fixed to November 3, 2026 at some point; the live file doesn't match either record. Not currently a dead-link risk (the existing past-event CTA fallback still works), but the homepage's new Bootcamps section (Phase 16, Finding 2) now visibly shows a "Past" badge on it. Needs a real next-cohort date from you — not invented here.
- ~~Deploy the Google Apps Script Web App~~ → done, URL received and wired into `.env` (local) 2026-09. A network-level test showed a 403 on the redirect-response delivery, but the founder confirmed real rows are actually landing in the Sheet — Apps Script apparently can 403 on the echo/response delivery while `doPost` still executes successfully underneath; treat the founder's direct Sheet check as the authoritative signal over the network test. **Still needed:** set `PUBLIC_FORMS_ENDPOINT` as a GitHub Actions repo variable for production (Settings → Secrets and variables → Actions → Variables) — no `gh` CLI available in this environment, so this is a manual step on GitHub's website; local `.env` is done but production build won't have the endpoint until this is set. A few test rows ("Test Submission (delete me)", "diagnostic test") from verification are safe to delete from the Sheet.
- ~~The only public bootcamp (GenAI Jumpstart) was dated August 1, 2026 — already past~~ → resolved 2026-09-08: founder confirmed the real next cohort date, **November 3, 2026**. Updated in `src/content/workshops/genai-jumpstart.md`; also added the systemic past-event CTA fallback ("Join the waitlist for the next session" → `/contact/`) so this doesn't silently recur once Nov 3 itself lapses (Phase 10, Finding 1 — now closed).

**Content/policy decisions (each unblocks a specific phase):**
- ~~Refund/cancellation policy~~ → resolved 2026-09: no refunds, seats are limited and reserved exclusively per learner. Added to `config/faq.ts` — this closes out Phase 4; all 5 mandated FAQ topics are now covered with real policy. **Note:** this is real customer-facing financial/legal copy — worth a quick pass by an actual lawyer before launch, since none of this plan's drafting constitutes legal advice.
- Real learner/client testimonials (name, role, org, quote, permission — photo and measurable outcome optional) — **confirmed 2026-09: none exist yet** ("I have no testimonials as of now"). No action possible until the founder has real learners/clients willing to be quoted — revisit after the first cohorts complete. Site already handles zero testimonials gracefully (homepage section conditionally hides, per Phase 8) so there's no broken state in the meantime (Phase 3).
- ~~Which of the 8 self-paced tracks launches first~~ → resolved 2026-09: founder pointed back to the curriculum document's own sequence (`docs/references/self-paced/courses_topics.md`) rather than a separate answer. Fixed the actual card order on `/self-paced/` to match (Foundations → Builder → Engineer/FDE/AI-Native tier → Architect/Product → Leadership last) — this also resolved the Phase 12, Finding 2 bug where GenAI Builder rendered last instead of second. **Still open:** no specific *timing* (quarter/date) was given for any track, so `estimatedLaunch` remains unset on all 8 entries (falls back to the generic "Announced to waitlist members") — that's a real calendar commitment, not inferable from the document, so it wasn't fabricated. ~~The pass's eventual price point~~ and ~~confirmation that "existing pass holders get new courses automatically" is really the intended policy~~ → both resolved 2026-09: **₹1,499 one-time**, and yes, confirmed. Price now shown (not hidden) across the hero, How It Works, FAQ, and waitlist form on `/self-paced/`, plus the homepage teaser — a concrete, accessible price is a stronger waitlist-conversion hook than "pricing hidden," so it was revealed rather than kept as a soft hint. This closes out all of Phase 6's founder-blocked items except `estimatedLaunch` timing above.
- ~~Whether "2-5 day" bootcamps is still the target duration for future bootcamps~~ → confirmed 2026-09: "these can be anything between 2-5 days" — 2-5 days remains the real target for the Bootcamps line going forward. GenAI Jumpstart (3 hours) stands as a genuine one-off exception, not a sign the general duration guidance should loosen (Phase 8/1 taxonomy note).
- Real corporate/private-team session data for `/teams/`'s "Ready-to-run private workshops" section — **confirmed 2026-09: none yet** ("I am yet to actually work on corporate training"). Left empty as designed. **But:** founder wants their real 22+ years of industry experience used as the trust anchor in place of case studies — added to `config/corporate.ts`'s hero description and replaced the vaguest hero metric ("Primary focus: Business outcomes") with a concrete one ("Led by: 22+ years in industry"), directly fixing the generic-metrics issue this shared with the About page (Phase 14, Finding 1). Use "22+ years" (the precise figure) rather than the vaguer "more than two decades" phrasing when the About-page founder section (Phase 14) gets built, for consistency (Phase 8/13).
- Any capacity/registration-count data needed to know if a real cohort is genuinely close to full, before applying urgency styling — **partially answered 2026-09**: no specific seats-remaining figure was given for a current cohort, so no hot/urgent badge was applied (correctly, per the site's own "never fabricate scarcity" rule — Phase 7 stays undone until real seat-count data exists). But the founder shared real track-record numbers instead — 1 completed 6-month cohort, 2 completed 3-month cohorts, a 6-month cohort currently underway, ~12 bootcamps run, 2,000+ learners taught — which is even more valuable as general trust proof than a single seat-count would be. Used immediately: replaced the generic filler hero metrics on the homepage (which had none before) and `/about/` (which had "Approach: Practical / Tone: Clear / Focus: Outcomes" — exactly the generic-metrics problem flagged in Phase 14, Finding 1) with real numbers ("Learners taught: 2,000+", "Bootcamps run: 12+", "Cohorts completed: 3"). Verified: clean build, real numbers present on both pages, no responsive overflow at 320/375/768px.
- Which Phase 9 recommendations to actually implement, and in what priority — this is a findings list, not yet approved for execution (Phase 9).
- Confirm "Corporate Training" (recommended) as the one consistent formal name for the `/teams/` offering, replacing "AI Training for Teams" and "Corporate AI enablement" everywhere except the nav, which can keep the shorter "For Teams" label (Phase 13).

**Resolved (2026-09):**
- ~~Bundle scope for the "one time cost" offer~~ → self-paced library only; bootcamps, long courses, and corporate training stay separately priced/enquiry-based.
- ~~Whether the self-paced pass is sellable now~~ → no — waitlist only, no payment flow, until real content ships next month (Phase 6).
- ~~Bootcamp/long-course durations~~ → long courses 6-12 months, confirmed by real data (AI Engineer 6, FDE 8, GenAI Architect 10); bootcamp duration is real data too (3 hours), see the open taxonomy note above.
- ~~Workshops vs. Bootcamps naming~~ → renamed to Bootcamps, applied consistently (Phase 1).
- ~~Choice of forms backend~~ → Google Sheets via Apps Script Web App, not a third-party SaaS (Phase 0) — deployment itself is the one remaining blocking action above.
- ~~Real program dates, fees, and curriculum~~ → all sourced from the founder's real materials (Phase 8).
- ~~Certificate, missed-session, and corporate-payment FAQ policy~~ → sourced from the founder's real materials (Phase 8).
- ~~Instructor/mentor for each program~~ → confirmed founder-only across all 3 programs and the bootcamp (Phase 8).
- ~~GenAI Architect date/duration conflict between programs.json and the HTML page~~ → founder confirmed `programs.json` (Aug 2, 2026 / 10 months) is correct (Phase 8).
- ~~What to do with the 2 pre-existing testimonials referencing fictional programs~~ → deleted as placeholder scaffolding (Phase 8).
- ~~What to do with the 2 placeholder private-team corporate workshops~~ → removed, no real replacement data yet (Phase 8).
