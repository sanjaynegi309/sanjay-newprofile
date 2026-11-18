# AGENTS.md

Version: 1.0

---

# Purpose

You are contributing to the SkillUp website.

This project is a lightweight, static, GitHub Pages compatible website built using Astro.

The goal is not simply to create pages.

The goal is to build a reusable, maintainable, high-performance website that generates qualified learner and corporate enquiries.

Always prioritize:

- Simplicity
- Readability
- Reusability
- Performance
- Accessibility
- Maintainability

---

# Read First

Before making changes, understand:

- Configuration drives the website.
- Content drives the website.
- Components build the UI.
- Pages assemble components.

Never hardcode business information.

---

# Technology

Use:

- Astro
- Tailwind CSS
- TypeScript
- Markdown / MDX
- GitHub Pages

Avoid unnecessary JavaScript.

---

# Architecture

The project is:

Configuration-driven

Content-driven

Component-driven

Never hardcode:

- Company name
- Navigation
- Contact details
- URLs
- Analytics IDs
- Theme values

Read them from configuration.

---

# Configuration

Configuration lives under:

config/

Files include:

brand.ts

site.ts

navigation.ts

theme.ts

analytics.ts

seo.ts

If new global values are introduced, place them in configuration.

---

# Content

Content lives under:

content/

Examples

programs/

workshops/

testimonials/

pages/

Future

blog/

resources/

Near-term (see "Offering Taxonomy & Self-Paced Early Access" below)

self-paced entries live inside programs/ via `format: "self-paced"` — no new top-level content folder needed yet.

All cards should be generated from frontmatter.

Detail pages should render Markdown.

Never duplicate content.

---

# EdTech Conversion & Trust (UX)

The business objective (see Purpose) is qualified learner and corporate enquiries, not just polished pages. Evaluate every program, workshop, and content page against that objective, not only against visual polish. Findings below come from a senior-EdTech-UX code review (2026-09) of the current site and should be treated as durable product requirements, not a one-time fix list.

## Lead capture

**Status (2026-09): implemented.** `/contact/` and `/teams/` now use `src/components/EnquiryForm.astro`, posting to a Google Apps Script Web App backed by a Google Sheet (`config/forms.ts`, `PUBLIC_FORMS_ENDPOINT`; setup in `docs/google-form-backend.md`) instead of `mailto:` links. A `mailto:` link remains only as a small "or email us directly" fallback next to each form's submit button. The guidance below stays the durable rule for any future enquiry surface (e.g. program/workshop detail page CTAs, the self-paced waitlist).

- Prefer a real `<form>` posting to a static-friendly backend (e.g. Formspree, Netlify Forms, Getform) over mailto links wherever one is available. A forms endpoint is no more a "server-side dependency" than Google Analytics is — it doesn't break GitHub Pages compatibility.
- Capture qualifying fields on program/workshop/corporate enquiries: name, email, program or workshop of interest, and one qualifying question (team size, timeline, etc).
- Never make the raw email address the only visible label on a CTA button — label buttons by intent ("Ask about a program"), not by contact method.

## Program & workshop depth

**Status (2026-09): resolved with real data.** The site's 3 programs (AI Engineer, Forward Deployed Engineer, GenAI Architect) and 1 public bootcamp (GenAI Jumpstart) were replaced end-to-end with real content sourced from `docs/references/data/{programs,workshops}.json` and `docs/references/html_pages/*.html` — the founder's actual existing marketing pages. Each program carries a real `nextCohort` (August 2, 2026, all three), a deliberately worded `fee` ("Displayed during registration" — directly sourced from the real FAQ answer, not invented), a real `capacity` (30), and a full Markdown-body curriculum (8-11 modules each, transcribed from the source pages) plus the source pages' full FAQ sets. CTAs point at the real external registration URLs (`learn.sanjaynegi.in/l/...`) via `cta.external: true` on `ctaSchema`, which adds `target="_blank"` + the sr-only "opens in new tab" pattern automatically in `ProgramCard`/`ProgramLayout`/`WorkshopCard`/`WorkshopLayout`.

- Keep treating `docs/references/` as the source of truth when the founder updates a program — re-sync the Markdown body and frontmatter rather than hand-editing copy that will drift from the founder's actual sales pages.
- `programSchema.fee` should stay "Displayed during registration" (or the founder's real published price, if one is ever set) — never a fabricated number.
- A syllabus lead-magnet (downloadable curriculum in exchange for an email) is still unbuilt — the curriculum is public in the Markdown body instead, which covers the "curriculum depth" conversion driver without gating it.

## Trust & social proof

**Status (2026-09):** the 2 testimonials that existed pre-launch (Ananya Rao, Michael Chen) were placeholder scaffolding referencing programs that turned out to be fictional — deleted at the founder's direction rather than kept with dangling program references. There are currently **zero** testimonials; the homepage testimonials section is conditionally hidden when the collection is empty (`src/pages/index.astro`) rather than rendering an empty grid.

- Keep at least 3-4 `featured: true` testimonials at all times once real ones exist, so grids never render a single stranded card (the `[&>*:last-child:nth-child(odd)]:lg:col-span-2` CSS trick already handles odd counts gracefully, but more real proof is still the goal).
- `testimonialSchema` already supports `image` (headshot, falls back to initials avatar in `TestimonialCard.astro`) and `outcome` (a measurable result, rendered as its own badge) — use both when real testimonials are added.
- Never fabricate a testimonial — a name, quote, or outcome attributed to a person who didn't say it is fake social proof, not placeholder copy. This applies with the same force as never fabricating scarcity or a refund policy.
- Don't leave placeholder Markdown bodies in content collections even when currently unused. Delete filler body text or write it for real before it ships.

## Urgency & scarcity — sparingly, only when true

- `.btn-glow-hot` / `.glass-card-hot` / the magenta badge tone exist specifically for genuine urgency (a workshop genuinely close to full, a closing cohort). Use them when `capacity` is genuinely close to being reached ("3 of 12 seats left") — the system should not sit permanently idle, but never fabricate scarcity that isn't real. The real bootcamp/programs now carry real `capacity` values (30 each) shown as "Limited to 30 professionals," but that's a stated cap, not a scarcity claim — don't add hot/urgent styling until told a specific cohort is actually close to full.

## FAQ coverage

**Status (2026-09): mostly resolved with real answers.** `config/faq.ts` now answers certificate-of-completion, missed-live-session, prerequisites/tooling, and employer-sponsorship/instalment questions with real content sourced from the founder's program pages (not invented). Each program's own Markdown body additionally carries its full original FAQ set (20-30 Q&As each). **Still open:** an explicit refund/cancellation policy — none of the source material states one, so don't add it until the founder provides real terms.

## Mentor & instructor presence

**Status (2026-09): resolved — confirmed founder-only.** All 3 programs and the bootcamp list `"instructor": "Sanjay Negi"` in the source data with no other named instructor anywhere in the reference material. Founder presence being the only human signal is accurate, not a gap, unless the founder later brings on another instructor for a specific program.

---

# Offering Taxonomy & Self-Paced Early Access

(2026-09 UX review, founder-confirmed business model) SkillUp actually runs four offering types. UI/visual language stays exactly as documented above — this section is IA and content architecture only, reusing existing components and design tokens.

The four real lines and how they currently map:

| Real offering | Current mapping | Gap |
|---|---|---|
| Short LIVE bootcamps (2-5 days) | `workshops` collection, nav label "Bootcamps" | **Resolved (2026-09) with real data.** The one real public bootcamp (GenAI Jumpstart) is 3 hours — shorter than the 2-5 day range. **Founder-confirmed (2026-09): "these can be anything between 2-5 days"** — 2-5 days remains the real target for future bootcamps; GenAI Jumpstart stands as a genuine one-off exception, not a reason to loosen the general guidance. |
| Long LIVE courses (6-12 months) | `programs` collection | **Resolved (2026-09) with real data.** All 3 real programs (AI Engineer 6mo, Forward Deployed Engineer 8mo, GenAI Architect 10mo) fall within the 6-12 month range, all `level: "advanced"` (all three explicitly target 10+ year professionals). |
| Corporate training | `/teams/` + `config/corporate.ts` | Already a first-class section. The 2 placeholder private-team workshops (AI Adoption Sprint, AI for Leaders) were removed at the founder's direction — no real corporate-session data exists yet, so `/teams/`'s "Ready-to-run private workshops" section gracefully shows nothing until real ones are added (same conditional-empty pattern as self-paced). |
| Self-paced (recorded, in plan, not yet sold) | `/self-paced/` page + `config/self-paced.ts` + `programSchema.launchStatus`/`estimatedLaunch` fields — **infrastructure resolved (2026-09)**, see below | Zero actual courses yet — needs real course entries from the founder, handled gracefully as an honest empty state in the meantime |

## Fix the two live-course lines first — done (2026-09)

- **Founder decided: "Bootcamps"** (not "Workshops"). Applied to the nav label, footer nav label, the `/workshops/` page's SEO title/hero/eyebrow, the homepage's featured-bootcamps section, and every "View workshops" CTA button sitewide. Deliberately left unchanged: the `/workshops/` URL path, the `workshops` collection/component/analytics-event names (internal plumbing, not user-facing), and individual bootcamp entries' own titles (e.g. "RAG Foundations Workshop" — same pattern as programs keeping "Program" in their own title inside the "Programs" section).
- The original 2 placeholder bootcamp entries were replaced by the one real bootcamp, `genai-jumpstart.md` (3 hours, real data — see "Program & workshop depth" above for the taxonomy note on duration).
- The `private-team` format and its `/teams/` "Ready-to-run private workshops" section are still supported in code (`WorkshopCard`'s `ctaLabel` prop, the conditional section in `src/pages/teams.astro`) but currently have zero entries — the 2 placeholder corporate sessions (AI Adoption Sprint, AI for Leaders) were removed since no real replacement data exists. Add real `format: "private-team"` entries when the founder provides them; the section will pick them up automatically.
- `programs` durations (real data, 2026-09): AI Engineer 6 months, Forward Deployed Engineer 8 months, GenAI Architect 10 months — all within the 6-12 month range. Full curriculum-depth content (module-by-module breakdowns) is in each program's Markdown body — see "Program & workshop depth" above.

## Self-paced: an All-Access Pass, sold as a waitlist until launch

**Status (2026-09): infrastructure done, zero courses yet — by design, not oversight.** Everything below is implemented: `programSchema.launchStatus`/`estimatedLaunch`, the `waitlist_signup` analytics event, `ProgramCard`/`ProgramLayout`'s coming-soon treatment, `config/self-paced.ts`, `/self-paced/`, nav (reordered low-to-high commitment), the homepage teaser, and the homepage/nav section order below. No `format: "self-paced"` content entries exist yet because inventing course titles the founder hasn't actually decided on would be a false product-roadmap claim, not placeholder copy — same principle as never fabricating a testimonial or a refund policy. `/self-paced/` and the homepage teaser handle zero entries gracefully ("the first courses haven't been announced yet — join the waitlist"); adding a real entry needs no further code changes, it just appears.

Self-paced isn't ready to sell (**founder-confirmed, 2026-09**: waitlist only until real content ships — do not accept payment before then). The commercial model is a single one-time-cost **All-Access Pass**: one payment unlocks every self-paced course, current and future, with new recorded courses added incrementally starting the month after launch. Self-paced courses are never priced or sold individually — the pass is the only product; individual course entries are its (growing) content catalog. The UX goal today is demand validation and a launch waitlist, not making recorded courses look on-sale. Reuse existing structure rather than building a parallel system:

- Add self-paced entries to the existing `programs` collection using the `format: "self-paced"` value the schema already reserves, plus two new optional fields on `programSchema` (`src/content/config.ts`):
  - `launchStatus: z.enum(["live", "coming-soon"]).default("live")`
  - `estimatedLaunch: z.string().optional()` (e.g. `"Q1 2027"`)
  This reuses `ProgramCard`/`ProgramLayout` as-is instead of a new component tree.
- In `ProgramCard`/`ProgramLayout`, when `launchStatus === "coming-soon"`:
  - Swap the level/format badge for `Badge tone="brand"` (the existing purple tone, already used for the founder eyebrow) reading "Coming soon" — a deliberately distinct tone from live cyan badges and urgent magenta ones, no new color introduced.
  - Replace the "Next cohort"/"Fee" aside rows with a single "Included in the All-Access Pass" row (plus `estimatedLaunch` if set) — never show a per-course fee, since self-paced is never priced individually.
  - Swap the CTA from "Enquire about this program" to "Join the All-Access waitlist", pointing at the shared pass-level waitlist form (see Lead Capture above), tagged with which course the visitor viewed for interest tracking — but every self-paced course points at the same one pass offer, not a separate per-course waitlist/price.
- Model the All-Access Pass itself as its own config-driven content block — e.g. `config/self-paced.ts` (mirroring `config/corporate.ts`'s shape: hero, how-it-works, FAQ) — covering the one-time-cost model, "new courses added monthly starting [date]," and the waitlist CTA. This is the one product; the `programs` entries are its catalog, not separate products.
- Add "Self-Paced" to `navigation.primary`, pointing at a new `/self-paced/` index that renders the All-Access Pass explainer plus a list of `format: "self-paced"` entries (as a content preview, each reading "Included in the All-Access Pass," not individually priced), with a short intro explaining the catalog is in development and the waitlist is how to get early access.
- On the homepage, add one compact section for self-paced between Bootcamps/Workshops and Corporate Training — teaser-weight only (2-3 course cards + one "Join the All-Access waitlist" CTA). A pre-launch line must not outrank the three revenue-generating lines in visual hierarchy or section size.
- Track a distinct analytics event (`waitlist_signup`, following the existing `snake_case` naming in `config/analytics.ts`) so waitlist interest is measurable, with the course the visitor was viewing recorded as an event parameter rather than as separate per-course events.

## Homepage & nav order once self-paced ships

Hero → Why Learn Here → **Bootcamps** (lowest-commitment entry point) → **Long Courses** (Programs) → **Self-Paced (Coming Soon)** → Corporate Training → Founder → Testimonials → FAQ → CTA. This runs low-to-high individual commitment, then to the org-level offer — matching how EdTech buyers typically self-qualify.

---

# Components

Prefer reusable components.

Examples

Header

Footer

Hero

CTA

Button

ProgramCard

WorkshopCard

SectionHeader

Badge

Container

FAQ

TestimonialCard

If UI repeats twice, create a component.

---

# Layouts

Use layouts for common page structure.

Avoid duplicated page wrappers.

---

# Styling

Use Tailwind first.

Create custom CSS only when necessary.

Avoid inline styles.

Avoid magic spacing values.

Use theme configuration.

---

# Typography

Use consistent typography.

Headings should clearly establish hierarchy.

Body text should remain readable.

Avoid overly long paragraphs.

---

# Design

SkillUp's visual identity should be dark, AI-native, digital, and premium.

The design should feel:

AI-native

Digital

Premium

Modern

Slightly futuristic

Interactive

Professional

Trustworthy

Avoid:

Plain white corporate SaaS layouts

Boring corporate minimalism

Neon overload

Gaming, crypto, or Web3 aesthetics

Childish course-marketplace styling

Distracting animation around body text

---

# Visual System Direction

Preserve the cyan / magenta / purple accent system, animated gradient headings, glassmorphism cards, glow buttons, dark atmospheric backgrounds, and interactive particle background. Avoid reverting to a plain white corporate SaaS look. Maintain accessibility, strong contrast, reduced-motion support, and performance.

Color system (`config/theme.ts` / `src/styles/global.css` CSS variables):

- `--bg` / `--primary`: true black / near-black page backgrounds
- `--accent` (cyan, `accent-*` scale): the primary interactive accent — links, focus states, badges, primary buttons, particle lines
- `--accent-2` (magenta, `magenta-*` scale): hot/urgent accent only — limited-seat badges, hot CTAs, `.btn-glow-hot`, `.glass-card-hot`
- `--accent-3` (purple, `purple-*` scale): supporting accent — gradients and small highlights only, never large text or large surfaces
- `--card` / `--card-border`: glassmorphism surface tokens
- `--text` / `--text-muted`: white / white-70 text tokens

Use:

- True black / near-black backgrounds everywhere, with subtle radial cyan/purple glows and a faint grid texture (see `body::before` and `.section-atmospheric` in `global.css`)
- `.gradient-heading` (cyan → magenta → purple, animated) for hero `h1`s and major `h2`s — do not use it for body text or every heading
- `.glass-card` / `.glass-card-hot` for content cards, `.btn-glow` / `.btn-glow-hot` / `.btn-ghost-glass` for buttons, `.badge` + `.badge-cyan` / `.badge-purple` / `.badge-magenta` / `.badge-neutral` for pills
- The interactive AI particle background (`InteractiveAIAmbientBackground.astro`) on hero, process/AI, and CTA sections — cyan lines/particles with occasional magenta pulses
- `font-display` (Space Grotesk) for headings and buttons, `font-sans` (Inter) for body copy

Avoid:

- Reintroducing plain white or light-gray section backgrounds
- Large purple or magenta text/surfaces — purple stays in gradients and small highlights, magenta stays rare and urgent
- Random colors outside `--accent` / `--accent-2` / `--accent-3` / the neutral scale
- Loud, chaotic, or constant motion — animate gradient headings, button/card hovers, and badge pulses only, never body text

Treat `config/theme.ts` and `src/styles/global.css` as the source of truth for color tokens, gradients, shadows, and reusable classes.

Keep visual changes consistent across reusable components before changing individual pages.

Maintain accessibility and contrast on every section, glass card, navigation element, and CTA.

Ambient motion must remain elegant, slightly dynamic, responsive to user interaction, professional, performant, and accessible. Respect `prefers-reduced-motion`, respect the `skillup:ambient-motion` localStorage toggle (wired through the header's motion button and `skillup:ambient-motion-change` event), simplify interaction on touch devices, pause animation when offscreen, cap device pixel ratio, keep particle counts adaptive, and clean up animation frames/listeners.

---

# Animation

Animations should be subtle.

Prefer:

Fade

Slide

Opacity

Small transforms

Avoid:

Large motion

Parallax

Continuous animations

Heavy libraries

---

# AI Ambient Background

Use the interactive AI ambient background selectively. Do not apply heavy animation to every section.

Preferred placement:

- Homepage hero with the strongest effect
- AI/process sections with medium effect
- Final CTA with a lighter effect

Requirements

Low CPU usage

Readable text

Support prefers-reduced-motion

No distracting visuals

Desktop cursor interaction may be used when it remains subtle and elegant.

---

# Images

Prefer:

SVG

WebP

Optimized assets

Lazy load non-critical images.

---

# Accessibility

Every feature must support:

Keyboard navigation

Visible focus states

Semantic HTML

Good contrast

Reduced motion

Accessibility is mandatory.

---

# Google Analytics

Google Analytics is enabled globally.

Never duplicate analytics code.

Use analytics helper functions.

Track meaningful user actions.

Examples

Program CTA

Workshop Registration

Corporate CTA

Contact

Outbound Links

---

# SEO

Every page should support:

Title

Description

Canonical URL

Open Graph

SEO defaults come from configuration.

---

# Performance

Performance is a feature.

Prefer:

Static rendering

Small bundles

Minimal hydration

Avoid unnecessary client-side JavaScript.

---

# Responsive Design

Design mobile-first.

Desktop should enhance.

Never assume desktop width.

## Responsiveness is a qualification criterion, not an assumption

Any change that touches layout, a component, or a page (new or edited) is not done until it has been verified at mobile width, not just written with mobile-first classes and assumed correct. "It uses Tailwind's responsive prefixes" is not verification.

Minimum bar before calling frontend work complete:

- Start the dev server and load the changed page(s) in an actual browser (headless is fine — a Playwright/Chromium check counts; reasoning about the CSS does not).
- Check at least a narrow mobile width (~320-375px) and a tablet width (~768px) in addition to desktop.
- Confirm no horizontal overflow (`document.documentElement.scrollWidth` should not exceed the viewport width) and no new console errors.
- For an interactive element (form, nav, card), actually exercise it at the narrow width — don't just screenshot it sitting idle.
- If browser verification genuinely isn't possible in the environment, say so explicitly rather than reporting the change as responsive-safe.

This applies to every future change, not only the change that prompted this rule.

---

# Naming

Components

PascalCase

ProgramCard.astro

Configuration

camelCase

theme.ts

Markdown

kebab-case

genai-developer.md

Variables

camelCase

---

# Code Quality

Prefer:

Small functions

Reusable logic

Readable names

Single responsibility

Avoid:

Long files

Nested conditions

Repeated code

Premature abstraction

---

# Before Adding New Code

Ask:

Can this be reused?

Should this be configuration?

Should this be Markdown?

Should this be a component?

Can this be simplified?

---

# Before Creating a New Page

Ask:

Does this page support a business objective?

Can an existing layout be reused?

Should the content come from Markdown?

---

# GitHub Pages

The project must remain compatible with GitHub Pages.

Do not introduce server-side dependencies.

The website should always build as static files.

---

# Pull Request Checklist

Before considering work complete:

✓ Project builds successfully

✓ Responsive — actually verified at mobile/tablet widths in a browser (see "Responsiveness is a qualification criterion" above), not just assumed from mobile-first classes

✓ Accessible

✓ No duplicated code

✓ Configuration respected

✓ Analytics included where appropriate

✓ SEO complete

✓ Mobile tested

✓ Components reused

✓ Lighthouse-friendly

---

# Definition of Done

Work is complete only when:

It is correct.

It is maintainable.

It is reusable.

It is performant.

It is accessible.

It is documented.

---

# Final Principle

Write code as if another engineer—or another AI assistant—will continue this project in six months.

Leave the project cleaner than you found it.

## Visual Design Direction

SkillUp should feel like a premium AI education platform, not a generic white SaaS site.

SkillUp's visual identity should be dark, AI-native, digital, and premium. Preserve the cyan / magenta / purple accent system, animated gradient headings, glassmorphism cards, glow buttons, dark atmospheric backgrounds, and interactive particle background. Avoid reverting to a plain white corporate SaaS look. Maintain accessibility, strong contrast, reduced-motion support, and performance.

Preferred homepage rhythm (all dark, varying only in emphasis):
1. Dark gradient hero with the interactive particle background and a gradient-heading `h1`
2. Dark section with glassmorphism cards (why-learn-here / offerings)
3. Dark immersive AI/process section (stronger particle background, cyan/purple glow)
4. Featured cohort / offer sections use `.glass-card-hot` and magenta badges sparingly, only for genuine urgency
5. Proof/testimonials section in glass cards
6. Dark gradient CTA with glow and a gradient-heading `h2`
7. Near-black footer with a faint gradient top border

`config/theme.ts` and `src/styles/global.css` are the source of truth for color tokens, gradients, and reusable classes. Avoid hardcoding colors unless extending those documented tokens/utilities.
