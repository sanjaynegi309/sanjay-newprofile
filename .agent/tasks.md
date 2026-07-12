# SkillUp UX Fix Tasks

Derived from `.agent/ux-review.md`. Ordered: content/broken-link fixes first (fastest, highest impact, lowest risk), then technical/head, nav, hero, page-level, component system, accessibility, performance, brand. Each task is a self-contained, testable unit — check it off only once its acceptance line passes.

> **Note (added during execution):** `AGENTS.md` at the repo root documents the project's own design-system requirements and wasn't consulted when the original UX review was written. It explicitly preserves the animated gradient heading, the cyan/magenta/purple accent system, and `.btn-glow-hot`/`.glass-card-hot` as intentional patterns (magenta = "hot/urgent accent... limited-seat badges, hot CTAs"). T0 below fixes a regression this caused; T12, T15, and T30 were rewritten to work *within* that documented system instead of against it — see each task's note.

---

## Phase 0 — Reconciliation

- [x] **T0. Restore `.btn-glow-hot` / `.glass-card-hot` / Button "hot" variant / Card "hot" prop**
  A prior code-review pass deleted these as "unused dead code" without checking `AGENTS.md`, which documents them by name as the intentional magenta "hot/urgent" accent pattern (limited-seat badges, hot CTAs). Restored: `ButtonVariant` back to `"primary" | "secondary" | "hot"` in `Button.astro` (the separate text-only `"ghost"` variant, which `AGENTS.md` does *not* document, stays removed); `Card.astro`'s `hot` prop; the `.btn-glow-hot`/`.glass-card-hot` CSS in `global.css`.
  *Accept:* `npm run build` and `npm run lint` both pass; `grep -n "btn-glow-hot\|glass-card-hot" src/styles/global.css` shows both classes present.

---

## Phase 1 — Content & broken links (HIGH priority, copy-only)

- [x] **T1. Replace placeholder body copy in content collections**
  Rewrite the dummy body text in `src/content/pages/teams.md`, `src/content/programs/genai-developer.md`, `src/content/programs/ai-product-manager.md`, `src/content/workshops/ai-for-leaders.md`, `src/content/workshops/rag-foundations.md` with real copy, or set `draft: true` on any not ready.
  *Accept:* `grep -ri "dummy" dist -r` after `npm run build` returns no matches.

- [x] **T2. Remove dev-speak from user-facing copy**
  Rewrite: programs/workshops listing intros (`src/pages/programs/index.astro`, `src/pages/workshops/index.astro`) that mention "Markdown"/"collection"; home FAQ items in `config/home.ts` ("Is the site ready for GitHub Pages?", the config-driven FAQ description); contact note in `config/contact.ts` ("static website… server-side form"); the "Content-driven learning paths" feature in `config/home.ts` (currently a maintainer benefit, not a learner benefit).
  *Accept:* none of "Markdown", "GitHub Pages", "static website", "collection", "rebuilding the website" appear in rendered `dist/**/*.html` body text.

- [x] **T3. Fix placeholder conversion links**
  Workshop `registrationUrl`/`cta.href` values now route "Register interest" to `/contact/` instead of a fake registration domain (no real registration backend exists on a static site). Real contact email `support@sanjaynegi.in` (provided by site owner) now set in `config/site.ts`, replacing `learn@example.com` everywhere it's used (footer, contact page mailto links).
  *Accept:* `grep -r "example.com" dist` after build returns no matches except canonical/OG URLs, which only resolve once `SITE_URL` is set (production CI already sets it; T6 covers the OG image itself).

- [x] **T4. Feature a second testimonial**
  Set `featured: true` on `src/content/testimonials/michael-chen.md` (or another entry) so the home "Learner outcomes" grid isn't a single stranded card.
  *Accept:* view `/` — the testimonials section shows 2 cards side by side at `lg` width, not one card alone.

- [x] **T5. Work "mentor-led" into brand positioning copy**
  Update `config/brand.ts` tagline and/or the home hero eyebrow (`config/home.ts`) to surface "mentor" — currently absent from hero, nav, and page titles despite being the core brand promise.
  *Accept:* "mentor" (case-insensitive) appears in the rendered `/` hero section.

---

## Phase 2 — Global head & technical hygiene

- [x] **T6. Add a real OG/Twitter share image**
  Create a 1200×630 PNG/JPG and reference it via `config/seo.ts` `openGraph.image` (currently `/favicon.svg`, which most platforms won't render as a share card).
  *Accept:* view-source on `/` shows `og:image` pointing at a `.png`/`.jpg`, not `.svg`.

- [x] **T7. Global head & 404 hygiene**
  In `src/layouts/BaseLayout.astro`: fix viewport meta to `width=device-width, initial-scale=1`; add `<meta name="theme-color" content="#000000">`. Add `src/pages/404.astro` with brand header/footer and links back to `/programs/` and `/contact/`.
  *Accept:* `npm run build` succeeds and produces `dist/404.html`; view-source on any page shows `initial-scale=1` and a `theme-color` meta.

- [ ] **T8. Self-host Google Fonts**
  Replace the Google Fonts `<link>` in `BaseLayout.astro` with a self-hosted `@fontsource-variable` (or equivalent) import for Inter and Space Grotesk.
  *Accept:* view-source on `/` shows no `fonts.googleapis.com`/`fonts.gstatic.com` requests; `npm run build` still passes.

---

## Phase 3 — Navigation

- [ ] **T9. Fix mobile menu interaction**
  In `src/components/Header.astro`: close the mobile `<details>` panel on link click, Escape, and outside click; add a hamburger/close icon that swaps on open state instead of the text-only "Menu" label.
  *Accept:* on a mobile viewport, tapping a nav link inside the open panel closes it; pressing Escape while open closes it.

- [ ] **T10. Make internal nav links base-path aware**
  Either prefix all root-absolute internal `href`s (`Header.astro`, `Footer.astro`, page CTAs) with `import.meta.env.BASE_URL`, or remove `BASE_PATH` support from `astro.config.mjs`/`config/site.ts` and document custom-domain-only deployment.
  *Accept:* `BASE_PATH=/skillup/ npm run build` followed by inspecting `dist/index.html` shows nav hrefs prefixed with `/skillup/` (or `BASE_PATH` is fully removed from the codebase — `grep -r BASE_PATH src config astro.config.mjs` returns nothing).

- [ ] **T11. Ambient-motion toggle affordance + contrast**
  In `Header.astro`/`global.css`: add a discoverable label (tooltip text or move to a labeled footer control) for the ambient-motion toggle; raise the inactive-state color from `rgb(255 255 255 / 0.35)` to ≥0.45 opacity to clear 3:1 non-text contrast.
  *Accept:* inactive toggle icon contrast ratio against black ≥3:1 (check via browser devtools contrast picker).

---

## Phase 4 — Hero & typography

- [ ] **T12. Contrast-safe gradient stops + eyebrow legibility (animation preserved)**
  *Revised from the original review:* `AGENTS.md` explicitly requires the animated gradient heading ("`.gradient-heading` (cyan → magenta → purple, animated) for hero h1s") and the sitewide `@media (prefers-reduced-motion: reduce)` rule in `global.css` already forces `animation-duration: 0.01ms` on `.gradient-heading` for motion-sensitive users — so removing the animation outright is out of scope. In `src/styles/global.css`: lighten only the purple stop (e.g. `#8338ec` → `#ab7cf7`) so all three gradient stops clear 4.5:1 on black at small H1 sizes. Bump the `.badge` font-size from `0.6875rem` to `0.75rem` minimum.
  *Accept:* the animated gradient still runs for users without `prefers-reduced-motion`; contrast-check the lightened purple stop at ≥4.5:1 against `#000000`.

- [ ] **T13. Hero metrics — real proof numbers**
  Replace the filler hero metrics ("Focus: Applied AI", "Audience: Professionals" in `config/home.ts`) with real numbers (learners trained, cohorts run, next cohort date) or remove the metrics card if no real data exists yet.
  *Accept:* hero metrics card on `/` shows no label/value pair that merely restates the tagline.

- [ ] **T14. Founder presence — portrait + credential**
  Add a real founder portrait to the hero or the founder section on `/` (`config/home.ts` founder block, `src/pages/index.astro:159-167`); fix the founder card layout so it doesn't read as a broken image slot (the `mt-16` gap before the name/role).
  *Accept:* view `/` — founder section shows an actual photo, not an empty gap between badge and name.

---

## Phase 5 — Page-level fixes

- [ ] **T15. Home section rhythm & spacing consistency**
  *Revised from the original review:* `AGENTS.md`'s documented "preferred homepage rhythm" is hero (strongest atmospheric+particle effect) → glass-card section → one AI/process section (medium effect) → featured/hot section → testimonials in glass cards (no atmospheric) → CTA (lighter effect) → footer. So 3 atmospheric-tier uses (hero/process/CTA) is by design, not a defect — the actual outlier is the testimonials section (`index.astro`) using the full `section-atmospheric` treatment when the documented rhythm puts testimonials in plain glass cards instead. In `src/pages/index.astro`: drop `section-atmospheric` from the testimonials section (keep the glass `TestimonialCard`s). Separately, align `CTASection`'s `py-16` to the `py-16 sm:py-20` pattern used elsewhere.
  *Accept:* testimonials section on `/` no longer uses `section-atmospheric`; hero, one process/corporate-training section, and the CTA still do; `CTASection` markup includes `sm:py-20`.

- [ ] **T16. Program listing & card info architecture**
  In `ProgramCard.astro`/`ProgramLayout.astro`: stop repeating duration/audience in both the card badges and the `<dl>` — badges show level+format only, `<dl>` owns duration/audience. Add level-based sort or filter chips to `src/pages/programs/index.astro`.
  *Accept:* on a program detail page, level/duration/format each appear exactly once outside the aside `<dl>`; `/programs/` groups or filters by level.

- [ ] **T17. Add pricing/schedule info to programs**
  Add a `nextCohort`/`fee` (or similar) field to the program schema in `src/content/config.ts`, populate it in program frontmatter, and display it in `ProgramLayout.astro`'s aside (value can be "Contact for dates" where unknown).
  *Accept:* every program detail page's aside shows a schedule/fee row, even if the value is a contact prompt.

- [ ] **T18. Past-event handling for dated workshops**
  In `src/pages/workshops/index.astro` (and `WorkshopCard.astro`): compute whether `data.date` is in the past at build time and either exclude past workshops from the listing or badge them "Past / Join waitlist" instead of showing them as upcoming.
  *Accept:* set a workshop's `date` frontmatter to a past date, rebuild, and confirm it no longer renders with an upcoming-style date badge.

- [ ] **T19. Workshop card polish**
  In `WorkshopCard.astro`: fix the `<dl>` `sm:grid-cols-2` layout so the 3rd (capacity) item doesn't orphan onto its own row; use a neutral badge tone (not accent) for "Available by request" workshops so it's visually distinct from real dates.
  *Accept:* a workshop with `capacity` set shows no single-item row at `sm` width; a workshop without `date` renders its date badge in `badge-neutral`, not `badge-cyan`.

- [ ] **T20. Teams page content section + engagement sequencing**
  In `src/pages/teams.astro`: give the `<Content />` markdown section (added when `teams.md` was wired up) a proper `SectionHeader` instead of appearing headerless; add a visual connector (line/ordinal styling) to the 4-step engagement cards to imply sequence.
  *Accept:* the markdown content section on `/teams/` has a visible eyebrow/heading; engagement steps show a connecting visual at `lg` width.

- [ ] **T21. Simplify contact channels to one primary CTA**
  In `src/pages/contact.astro`/`config/contact.ts`: replace the three same-email cards with one primary "Email us" CTA plus a compact secondary list; label buttons by intent ("Program enquiry") instead of rendering the raw email address as the button text.
  *Accept:* `/contact/` shows one visually primary contact action; no button label is a raw email address.

- [ ] **T22. Footer trust & completeness**
  In `src/components/Footer.astro`/`config/site.ts`: add a privacy-policy link (required given GA is running), populate real social URLs, and replace the `capitalize`d raw object keys with a proper display-name map (LinkedIn, YouTube, X).
  *Accept:* footer includes a privacy-policy link; any populated social link renders its brand name correctly capitalized (not CSS `capitalize` on a lowercase key).

---

## Phase 6 — Component system

- [ ] **T23. Split glass-card hover into interactive vs. static variants**
  In `global.css`/`Card.astro`: add a `.glass-card--interactive` (or similar) modifier carrying the −8px lift + glow-sweep hover, and apply it only where the card is a link; non-interactive cards (founder card, corporate feature chips, hero metrics) keep the static `.glass-card` look with no hover motion.
  *Accept:* hovering the home hero metrics card (non-link) produces no lift/glow; hovering a `ProgramCard` (link) still does.

- [ ] **T24. Fix card/button tap targets**
  In `ProgramCard.astro`/`WorkshopCard.astro`: make the whole card a clickable stretched-link (or stop animating the card shell if it stays non-clickable as a whole); bump the `sm` button height in `Button.astro` from `min-h-9` (36px) to at least 44px on touch (e.g. `min-h-11` with a `md:min-h-9` desktop override).
  *Accept:* tapping anywhere on a program/workshop card (not just the title or button) navigates to the detail page; `sm` button height ≥44px on a mobile viewport.

- [ ] **T25. Component API cleanup**
  In `TestimonialCard.astro`: remove the `variant="light"` option (renders identically to `glass`) or implement a genuinely distinct light treatment. In `FAQ.astro`: add a hover state (`hover:text-accent-300` or row background) to the summary row so its clickability is signaled beyond the "+" glyph.
  *Accept:* `grep -r 'variant="light"' src` returns no call sites, or the light variant visibly differs from glass when rendered; hovering an FAQ question row shows a visible state change.

---

## Phase 7 — Accessibility

- [ ] **T26. External-link "opens in new tab" affordance**
  Add a visually-hidden `(opens in new tab)` span (or icon with accessible text) to every `target="_blank"` link: LMS login (`Header.astro`), social links (`Footer.astro`), workshop registration links.
  *Accept:* screen-reader-only text or an icon with `aria-label` is present on every `target="_blank"` anchor — `grep -rn 'target="_blank"' src` and confirm each match has an adjacent affordance.

- [ ] **T27. Analytics consent gate**
  In `src/components/Analytics.astro`: don't fire `gtag`/page-view events until the user accepts a lightweight consent banner (or switch to a cookieless analytics tool that doesn't require consent).
  *Accept:* on first visit with no prior consent stored, no `gtag`/`collect` network request fires until consent is given (check browser Network tab).

---

## Phase 8 — Performance

- [ ] **T28. Particle canvas performance budget**
  In `InteractiveAIAmbientBackground.astro`: gate particle density on `navigator.hardwareConcurrency`/`navigator.deviceMemory` where available, or lower `maxParticles` to ~70 and replace the per-particle `shadowBlur` draw with a pre-rendered glow sprite.
  *Accept:* on a throttled 4x CPU slowdown (Chrome devtools), hero canvas frame time stays reasonable and doesn't visibly jank scroll — spot-check via Performance panel.

- [ ] **T29. Reduce blur/font-swap rendering cost**
  In `global.css`: reduce badge `backdrop-filter: blur(12px)` to a solid semi-transparent fill or lower blur radius. Set `font-display: optional` (or preload self-hosted fonts from T8) to avoid visible heading reflow on slow connections.
  *Accept:* `npm run build` passes; badges no longer use `blur(12px)`, or the value is measurably reduced.

---

## Phase 9 — Brand & visual language

- [ ] **T30. Tune visual language toward AGENTS.md's own "avoid neon overload / gaming aesthetic" guidance**
  *Revised from the original review:* `AGENTS.md` explicitly wants the animated-gradient / glassmorphism / multi-accent / particle system preserved — it is the documented brand identity, not a defect to remove. But `AGENTS.md` *also* explicitly says to avoid "neon overload" and "gaming, crypto, or Web3 aesthetics," which is the real, narrower problem: audit for uses of magenta/purple outside their documented scope (magenta = rare/urgent only, via `.btn-glow-hot`/`.glass-card-hot`/`badge-magenta`; purple = gradients and small highlights only, never large text or surfaces) and correct those specific over-uses. Do not reduce the animated gradient heading, the particle background, or cyan usage — those are in scope and required.
  *Accept:* `grep -rn "badge-magenta\|btn-glow-hot\|glass-card-hot" src` call sites are all genuinely urgent/limited use cases (not decorative default state); no large text block or full-section background uses purple/magenta as its dominant color outside a gradient.

- [ ] **T31. Add trust artifacts**
  Add 2–3 real organization logos (with permission) near testimonials, and one real session/product screenshot somewhere on `/` or `/about/` (founder portrait already covered by T14).
  *Accept:* `/` or `/about/` renders at least one non-decorative image that isn't the founder portrait, logo mark, or an SVG background pattern.

---

When every task is checked off and `npm run build` / `npm run lint` pass, output <promise>DONE</promise>.
