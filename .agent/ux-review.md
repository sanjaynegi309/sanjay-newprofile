# UI/UX Review — SkillUp (senior designer audit, code + built-output pass)

Audit-only: no code was changed. Reviewed every page template, shared component, `global.css`, theme config, and the rendered HTML in `dist/`. Severity: **HIGH** = hurts conversion, trust, or accessibility today · **MED** = noticeable quality/consistency gap · **LOW** = polish.

**Top 5 to fix first:** placeholder/dev copy shipped to users (#1.1–#1.4), placeholder contact email & registration URLs (#1.5), OG image is a favicon (#2.1), lonely single testimonial in a 2-col grid (#5.1), non-interactive cards that animate like buttons (#11.2).

---

## 1. Content integrity (cross-page) — the biggest first-impression risk

- [ ] **[HIGH]** `/teams/` now renders "This dummy page validates landing page metadata." as visible body copy (side effect of wiring `teams.md` into the page in the last change). — Fix: replace `src/content/pages/teams.md` body with real corporate-training copy before deploying.
- [ ] **[HIGH]** Program detail pages ship dev placeholder body copy: `/programs/genai-developer/` and `/programs/ai-product-manager/` render "This dummy entry validates…". — Fix: write real curriculum copy or set `draft: true` until it exists.
- [ ] **[HIGH]** Workshop detail pages same issue: `/workshops/ai-for-leaders/` and `/workshops/rag-foundations/` render "This dummy workshop…". — Fix: same as above.
- [ ] **[HIGH]** Dev-speak leaks into user-facing UI copy: programs listing hero says "generated from Markdown… Add a Markdown file to the programs collection and it appears here automatically" (`src/pages/programs/index.astro:32-33`, same on workshops); home FAQ includes "Is the site ready for GitHub Pages?" and the FAQ description "Answers stay configuration-driven until…" (`config/home.ts:105-125`); contact note explains "SkillUp is a static website, so contact actions use email links rather than a server-side form" (`config/contact.ts:49-50`). — Fix: rewrite all four as learner-facing benefit copy; users should never see the CMS architecture.
- [ ] **[HIGH]** Primary conversion paths point at placeholders: every contact CTA is `mailto:learn@example.com` (`config/site.ts:43`) and workshop registration goes to `https://example.com/register/…`. Clicking the site's main CTA today opens a dead email draft. — Fix: set the real email and registration URLs (or hide registration buttons until real).
- [ ] **[MED]** Only one testimonial is `featured`, so the home "Learner outcomes" section renders a single card stranded in a 2-column grid. — Fix: feature at least 2 (Michael Chen exists, just flip `featured: true`) or make the grid 1-col until there are more.

## 2. Global head / BaseLayout

- [ ] **[HIGH]** `og:image` and `twitter:image` point at `/favicon.svg` while `twitter:card` claims `summary_large_image` — most platforms won't render an SVG favicon, so every share (LinkedIn especially, for a B2B education brand) shows a blank card. — Fix: add a 1200×630 PNG/JPG OG image and reference it in `config/seo.ts:47`.
- [ ] **[MED]** `<meta name="viewport" content="width=device-width">` is missing `initial-scale=1` (`BaseLayout.astro:25`), which can cause odd initial zoom on some mobile browsers. — Fix: `content="width=device-width, initial-scale=1"`.
- [ ] **[MED]** No custom 404 page — Astro serves a bare default; a lost visitor gets zero brand or navigation. — Fix: add `src/pages/404.astro` with nav back to programs/contact.
- [ ] **[LOW]** No `theme-color` meta for mobile browser chrome on an otherwise all-black site. — Fix: `<meta name="theme-color" content="#000000">`.
- [ ] **[LOW]** Google Fonts are a render-blocking third-party request (privacy + first-paint cost); `display=swap` helps but self-hosting is better for both. — Fix: self-host Inter/Space Grotesk via `@fontsource-variable/*`.

## 3. Header / navigation

- [ ] **[MED]** Mobile menu is a bare `<details>`: it doesn't close when a link is tapped, on Escape, or on outside click — after navigating via anchor jump or reopening the page, the panel state feels broken compared to user expectations of a menu. — Fix: small script to close the `details` on link click / Escape / outside click.
- [ ] **[MED]** The "Menu" summary is text-only with no hamburger affordance, and there's no visual state change between open/closed beyond the panel appearing. — Fix: add a hamburger/close icon that swaps with `group-open:`.
- [ ] **[MED]** All nav hrefs are root-absolute (`/programs/`) and ignore `import.meta.env.BASE_URL`, so a GitHub Pages *project-site* deploy (`BASE_PATH=/repo/`) breaks every internal link even though the config supports a base path. — Fix: prefix internal hrefs with the base path (helper function) or commit to custom-domain-only and delete `BASE_PATH`.
- [ ] **[LOW]** Ambient-motion toggle is an unlabeled abstract icon; even with `aria-label`, sighted users can't guess what it does before clicking. — Fix: add a tooltip-on-hover text or move it into a footer "reduce motion" control.
- [ ] **[LOW]** Inactive toggle state `color: rgb(255 255 255 / 0.35)` (`global.css`) is ≈3.2:1 against black — borderline for the 3:1 non-text UI contrast minimum (WCAG 1.4.11). — Fix: raise to ≥0.45 opacity.

## 4. Hero (home)

- [ ] **[MED]** The "metrics" card contains label/value filler ("Focus: Applied AI", "Audience: Professionals") — it occupies the highest-value viewport slot with content that carries no proof (no learner counts, cohort dates, outcomes). — Fix: replace with real numbers (learners trained, cohorts run, next start date) or drop the card.
- [ ] **[MED]** Four simultaneous background systems compete in the hero: animated particle canvas + cursor glow + smoke gradients + grid overlay + an *animated* gradient on the H1 itself. The headline — the one thing that must win — is the least stable element on screen. — Fix: keep the canvas, make the H1 gradient static (remove `gradientShift` animation from `.gradient-heading`).
- [ ] **[MED]** For an "AI mentor" brand, the mentor is invisible above the fold — founder-led teaching is the differentiator but appears only mid-page, text-only. — Fix: bring a founder photo + one-line credential into or directly under the hero.
- [ ] **[LOW]** Eyebrow badges render at 11px (`0.6875rem`) uppercase with wide tracking — at the threshold of legibility, especially in the cyan-on-dark glow treatment. — Fix: bump to 12px minimum.

## 5. Home page sections

- [ ] **[MED]** Founder card (`index.astro:159-167`) is a badge, a 4rem void (`mt-16`), then a name — it reads as a card whose photo failed to load. — Fix: add a real portrait or restructure as a quote-style card.
- [ ] **[MED]** "Why learn here" feature #2, "Content-driven learning paths — Programs and workshops can evolve independently without rebuilding the website…" (`config/home.ts:51-53`) is a benefit *to the site maintainer*, not the learner. — Fix: rewrite as a learner benefit or replace the feature.
- [ ] **[LOW]** Section rhythm alternates navy-tint / black / atmospheric backgrounds without an obvious system; the corporate-training and testimonial sections both use the heavy atmospheric treatment, diluting its "special section" signal. — Fix: reserve atmospheric+canvas for at most hero + one mid-page moment.
- [ ] **[LOW]** `CTASection` uses `py-16` with no `sm:py-20` step-up, unlike every other section. — Fix: align padding scale.

## 6. Programs — listing & detail

- [ ] **[MED]** ProgramCard shows level/duration badges, then repeats format+audience in a `<dl>`, then outcomes — and the detail page hero repeats level/duration/format as badges *and again* in the aside "quick facts" `<dl>` (`ProgramLayout.astro:33-39` vs `61-80`). Same data three times within one viewport. — Fix: badges for level+format only; keep duration/audience solely in the aside.
- [ ] **[MED]** No pricing, start date, or schedule anywhere on program pages — the #1 question for a paid cohort program is unanswerable, and the only path is "email us". — Fix: add a "Next cohort / Fees" row to frontmatter + aside, even if the value is "Contact for dates".
- [ ] **[LOW]** Listing sort is featured-then-alphabetical; with 4 programs the beginner program sits between advanced ones — no level-based scanning aid. — Fix: add level filter chips or sort by level within featured groups.

## 7. Workshops — listing & detail

- [ ] **[MED]** Dated workshops (Aug 20, Sep 10 2026) show the date in a cyan badge, but nothing communicates urgency/seats-left, and past-dated workshops will keep rendering as if upcoming (no "past event" handling anywhere). — Fix: compute date-in-past at build and either hide or badge as "Past / Join waitlist".
- [ ] **[LOW]** Workshop card `<dl>` uses `sm:grid-cols-2` with 3 items — the capacity item orphans onto its own row. — Fix: 3-col at `sm` or keep single column.
- [ ] **[LOW]** "Available by request" renders in the same accent badge slot as real dates — two different meanings, one visual treatment. — Fix: use neutral badge tone for request-only workshops.

## 8. Teams page

- [ ] **[MED]** The newly appended markdown `<Content />` section sits between the audiences grid and the final CTA with no heading and (currently) one dummy sentence — it reads as a rendering artifact. — Fix: give the section a `SectionHeader` and real copy, or move `<Content />` higher as an intro.
- [ ] **[LOW]** Engagement steps are numbered "Step 1–4" in cards with no connecting visual (line/arrow); on `lg` they read as four unrelated cards. — Fix: add a subtle connector or ordinal styling to imply sequence.

## 9. Contact page

- [ ] **[MED]** Three contact "channels" are all the same email with different subject lines, presented as three equally-weighted cards showing the raw address as the button label — high effort for what is one action. — Fix: one primary "Email us" CTA + a compact secondary list; put intent ("Program enquiry") on the button, not the email string.
- [ ] **[LOW]** Button labels render the full email address (`label: site.contact.email`), which will overflow awkwardly on narrow screens once a real (longer) address replaces the placeholder. — Fix: label buttons by action, not address.

## 10. Footer

- [ ] **[LOW]** Footer is sparse for a trust-driven education brand: two link groups, no social (all empty), no legal/privacy page link despite GA running. — Fix: add privacy policy link (needed with analytics) and real social URLs when available.
- [ ] **[LOW]** Social links render `capitalize`d object keys ("X" shows as "X", "linkedin" → "Linkedin", "youtube" → "Youtube") once populated. — Fix: proper display-name map (LinkedIn, YouTube).

## 11. Component library

- [ ] **[MED]** `.glass-card:hover` lifts −8px with a glow sweep on **every** glass card, including non-interactive ones (founder card, corporate feature chips, audience chips, hero metrics) — hover affordance on non-clickable elements trains users to click things that do nothing. — Fix: split into `.glass-card` (static) and `.glass-card--interactive` (hover lift), apply the latter only where there's a link.
- [ ] **[MED]** ProgramCard/WorkshopCard have small tap targets for the real action: only the title text and the `sm` button (36px `min-h-9`) are clickable, not the card surface, while the whole card *animates* as if clickable. — Fix: make the whole card the link (stretched-link pattern) or stop animating the card shell.
- [ ] **[LOW]** `sm` buttons are 36px tall — below the ~44px touch-target guideline; they're the primary card CTAs on mobile. — Fix: `min-h-11` on touch via `min-h-11 md:min-h-9` or padding bump.
- [ ] **[LOW]** TestimonialCard's `variant="light"` renders the identical dark treatment as `glass` — a misleading API that will bite the next contributor. — Fix: remove the variant or implement a genuinely lighter treatment.
- [ ] **[LOW]** FAQ "+" indicator rotates 45° to an "×" — correct pattern, but the 1-character glyph is easy to miss as the only affordance; the whole row *is* clickable but nothing signals it on hover. — Fix: add `hover:text-accent-300` or row background on summary hover.

## 12. Accessibility (cross-cutting)

What's already good: skip link, `:focus-visible` outlines everywhere, `aria-current="page"`, `aria-pressed` on the motion toggle, `aria-hidden` on decorative SVG/canvas, empty-`alt` + `aria-label` logo pattern, semantic `<dl>`/`<figure>`/`<details>`, and a real `prefers-reduced-motion` kill-switch plus a user-facing motion toggle. Genuinely above average.

- [ ] **[MED]** Animated gradient H1s (`gradientShift`, infinite) run by default for everyone *except* reduced-motion users; moving text is the hardest element to read for low-vision and dyslexic readers, and it's applied to every page's H1. — Fix: static gradient (see #4.2) — this resolves the a11y and hierarchy issue together.
- [ ] **[MED]** Mid-animation, the H1 gradient passes through magenta `#ff006e` (~5.4:1 on black) and purple `#8338ec` (~3.5:1 on black) — the purple stop dips below 4.5:1; large-text 3:1 saves it only while the text stays ≥24px bold, but `text-4xl` H1s on small screens sit right at the boundary. — Fix: lighten the purple stop (e.g. `#ab7cf7`) in the `.gradient-heading` stops.
- [ ] **[LOW]** External links (`Login`, social, registration) open new tabs with no "opens in new tab" indication for screen-reader or sighted users. — Fix: visually-hidden "(opens in new tab)" span or an external-link glyph.
- [ ] **[LOW]** GA loads and fires page-view events with no consent mechanism — a compliance/UX issue for EU visitors. — Fix: add a lightweight consent banner or switch to a cookieless analytics tool.

## 13. Performance / loading behavior

- [ ] **[MED]** The particle canvas runs O(n²) line-distance checks per frame (~112 particles ⇒ ~6k distance calcs/frame) plus shadowBlur draws — on low-end Android this will jank scroll on the very first screen. IntersectionObserver pausing and the dpr cap help, but there's no capability check. — Fix: also gate on `navigator.hardwareConcurrency`/`deviceMemory` or drop `maxParticles` to ~70 and remove `shadowBlur` (use pre-rendered glow sprite).
- [ ] **[LOW]** `backdrop-filter: blur(20px)` on every card + `blur(12px)` on every badge stacks many blur surfaces per viewport — a known mobile-GPU cost multiplier. — Fix: reduce badge blur or use solid semi-transparent fills for badges.
- [ ] **[LOW]** No loading states are needed (fully static — good), but the font swap causes a visible Space-Grotesk reflow on slow connections since headings are the largest elements. — Fix: `font-display: optional` or self-host with preload (ties into #2.5).

## 14. Brand / first-impression clarity ("AI mentor")

- [ ] **[MED]** Declared voice is "professional, practical, clear, engineering-first" (`config/brand.ts:26`), but the visual language — neon cyan/magenta glows, pulsing badges, cursor-reactive particles, animated rainbow headings — reads gaming/crypto-launch. The two audiences that pay (engineering leaders, corporate teams) skew conservative. — Fix: keep the dark palette, cut animation count by ~half, reserve magenta strictly for one urgent accent, and let cyan be the single brand accent.
- [ ] **[MED]** Nothing on the site shows a human or a classroom/session artifact — no founder photo, no cohort screenshots, no company logos next to testimonials. For a mentor-led education brand, zero faces is a trust gap no gradient can fill. — Fix: add founder portrait, 2–3 org logos (with permission), and one real session screenshot.
- [ ] **[LOW]** The name "SkillUp" + tagline positions a generic upskilling platform; "mentor" appears nowhere in the hero, nav, or page titles. If "AI mentor" is the brand, the IA hides it. — Fix: work "mentor-led" into the hero eyebrow or tagline (e.g. "Mentor-led AI education for modern teams").

---

## Summary

| Area | HIGH | MED | LOW |
|---|---|---|---|
| Content integrity | 5 | 1 | 0 |
| Head/meta & global | 1 | 2 | 2 |
| Header/nav | 0 | 3 | 2 |
| Hero | 0 | 3 | 1 |
| Home sections | 0 | 2 | 2 |
| Programs | 0 | 2 | 1 |
| Workshops | 0 | 1 | 2 |
| Teams / Contact / Footer | 0 | 2 | 4 |
| Components | 0 | 2 | 3 |
| Accessibility | 0 | 2 | 2 |
| Performance | 0 | 1 | 2 |
| Brand clarity | 0 | 2 | 1 |
| **Total** | **6** | **23** | **22** |

The engineering foundation (semantics, focus management, reduced-motion handling, responsive scaffolding) is stronger than most marketing sites. The gaps are almost all **content and restraint**: placeholder copy/links shipped to users, and a motion-heavy treatment that fights the "professional mentor" positioning. Fixing the six HIGH items is copy/config work, not redesign.
