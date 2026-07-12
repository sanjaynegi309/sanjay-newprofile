# Code Review — SkillUp (Astro static site)

Reviewed: full `src/`, `config/`, build tooling, and CI workflow. `npm run build` (`astro check && astro build`) passes clean (0 errors/warnings/hints, 14 pages built), so this review focuses on correctness issues that type-checking can't catch, dead code, and process gaps.

Legend: 🔴 Bug (fix) · 🟡 Cleanup / robustness (should do) · 🟢 Optional / process

---

## 🔴 1. `SectionHeader`'s `tone` prop is declared but never used

**File:** `src/components/SectionHeader.astro:5-20`

The `Props` interface declares `tone?: "light" | "dark"`, and five call sites pass `tone="dark"` expecting a visual variant (`src/pages/index.astro:185`, `src/pages/programs/index.astro:34`, `src/pages/workshops/index.astro:41`, `src/pages/teams.astro:62`, and the `ProgramLayout`/`WorkshopLayout` hero asides use similar intent). The destructuring only pulls `eyebrow, title, description, align, class`, so `tone` is silently dropped — every `SectionHeader` renders identically regardless of what's passed.

**Action:** Destructure `tone = "light"` and apply it (e.g. swap text color classes, or drop the prop from all 5 call sites and the type if "dark" styling was abandoned intentionally). Either way, the current state is dead/misleading API surface that passed type-check because an unused optional prop isn't a type error.

---

## 🔴 2. `SITE_URL` has no fallback in CI, unlike the other three env vars

**Files:** `.github/workflows/deploy.yml:38-42`, `astro.config.mjs:4`, `config/site.ts:33`

```yaml
env:
  SITE_URL: ${{ vars.SITE_URL }}                                          # no fallback
  BASE_PATH: ${{ vars.BASE_PATH || '/' }}
  PUBLIC_GA_MEASUREMENT_ID: ${{ vars.PUBLIC_GA_MEASUREMENT_ID || 'G-NNJRMTPHZK' }}
  PUBLIC_LMS_URL: ${{ vars.PUBLIC_LMS_URL || 'https://learn.sanjaynegi.in/' }}
```

If the `SITE_URL` repository variable is ever unset, GitHub Actions renders the expression as an **empty string**, not "undefined" — so the env var is set to `""`. Both `astro.config.mjs:4` (`process.env.SITE_URL ?? "https://example.com"`) and `config/site.ts:33` use `??`, which only falls back on `null`/`undefined`, not on `""`. Verified locally:

```
SITE_URL unset   → process.env.SITE_URL ?? "fallback" → "fallback"
SITE_URL=""      → process.env.SITE_URL ?? "fallback" → ""   (bug reproduced)
```

The result: canonical URLs, `sitemap.xml`, and `robots.txt` (`src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`) would all be built against an empty base URL — either throwing on `new URL(path, "")` or silently emitting broken relative URLs, with no build-time signal pointing at the real cause.

**Action:** Add a real-domain fallback in the workflow (`${{ vars.SITE_URL || 'https://<production-domain>' }}`), matching the other three vars, and/or guard against empty string explicitly in `astro.config.mjs` / `config/site.ts` (e.g. `process.env.SITE_URL || "https://example.com"`).

---

## 🟡 3. Two layout components are entirely unused

**Files:** `src/layouts/PageLayout.astro`, `src/layouts/ContentLayout.astro`

Neither is imported by any file in `src/pages`. All pages use `BaseLayout` directly, or `ProgramLayout`/`WorkshopLayout` for content-collection detail pages. These two look like earlier scaffolding that was superseded.

**Action:** Delete both, or wire one in if there's a near-term plan for generic markdown pages (currently `about`/`contact` each hand-roll their own layout composition instead of using `ContentLayout`, which does the same thing).

---

## 🟡 4. `NeuralBackground.astro` is dead code

**File:** `src/components/NeuralBackground.astro`

Not referenced anywhere in `src/` — superseded by `InteractiveAIAmbientBackground.astro`, which is used in `Hero.astro`, `CTASection.astro`, `index.astro`, and `teams.astro`.

**Action:** Delete.

---

## 🟡 5. `registrationUrl` content field is collected but never rendered

**File:** `src/content/config.ts:54` (workshop schema), populated in `src/content/workshops/rag-foundations.md` and `prompt-systems-for-teams.md`

Neither `WorkshopLayout.astro` nor `WorkshopCard.astro` reads `data.registrationUrl` — the only way to get a working link today is the separately-authored `cta.href`, which in both existing entries duplicates the same URL by hand. A content editor who fills in `registrationUrl` alone (without also setting `cta`) gets no visible effect.

**Action:** Either have the layout/card fall back to `registrationUrl` when `cta` is absent (e.g. render a default "Register" button), or drop the field from the schema to stop the duplication.

---

## 🟡 6. `teams.md` content entry is orphaned

**File:** `src/content/pages/teams.md`

This markdown file has `pageType: "landing"` and reads "This dummy page validates landing page metadata" — but `src/pages/teams.astro` is fully driven by `config/corporate.ts` and never calls `getEntry("pages", "teams")` (unlike `about.astro` and `contact.astro`, which do call `getEntry` for their matching slugs). Editing this file has zero effect on the live `/teams/` page.

**Action:** Wire `teams.astro` to render this entry's `Content` (matching the `about`/`contact` pattern), or delete the file to avoid confusing future content edits.

---

## 🟡 7. Unused variant surface on `Button` and `Card`

**Files:** `src/components/Button.astro:5` (`variant: "hot" | "ghost"`), `src/components/Card.astro:4` (`hot?: boolean`)

Grepped across `src/` — no call site anywhere passes `variant="hot"`, `variant="ghost"`, or `hot` to `<Card>`. The corresponding CSS (`.btn-glow-hot`, `.glass-card-hot`) in `global.css` is fully built out and working, just currently unreachable from content or pages.

**Action:** Keep only if there's a near-term need (e.g. a "limited seats" urgent CTA); otherwise this is speculative API surface that adds cognitive overhead with no current caller.

---

## 🟡 8. Tailwind color scales `brand`, `magenta`, `purple` are unused as utility classes

**File:** `config/theme.ts:57-111`

All three are registered as full 50–950 Tailwind scales (11 shades × 3 = 33 values), but nothing in `src/` uses `bg-brand-*`, `text-magenta-*`, `border-purple-*`, etc. The magenta/purple *hex values* are used, but only indirectly — hard-coded as raw `rgb(...)` literals in `global.css` and via the `boxShadow`/`backgroundImage` theme tokens (`glow-magenta`, `glow-purple`, `hero-atmosphere`, etc.), not through the color-scale utilities Tailwind generates from `theme.colors`.

**Action:** Either trim `theme.colors` down to just the tokens actually referenced (accent, neutral, atmosphere, plus the boxShadow/backgroundImage values), or keep the scales but leave a short comment noting they're a reserved palette for future components — right now it reads as leftover configuration.

---

## 🟢 9. Duplicated `Action` type shape

**Files:** `src/components/Hero.astro:6-11` (`HeroAction`), `src/components/CTASection.astro:7-12` (`CtaAction`)

Both interfaces are structurally identical (`label`, `href`, `variant?`, `analyticsEvent?`). Low risk today, but the two will silently drift if one is edited without the other.

**Action:** Extract a shared `ActionLink` type (e.g. co-located with `Button.astro`) and import it in both places.

---

## 🟢 10. `.replace("-", " ")` only replaces the first hyphen

**Files:** `src/layouts/ProgramLayout.astro:38,69`, `src/layouts/WorkshopLayout.astro:40,71`, `src/components/ProgramCard.astro:49`, `src/components/WorkshopCard.astro:51`

All current `format` enum values (`self-paced`, `live-online`, `private-team`, `cohort`, `corporate`, `hybrid`) have at most one hyphen, so this works today, but it's a latent bug if a multi-hyphen format value is ever added to the schema.

**Action:** Use `.replaceAll("-", " ")` instead of `.replace("-", " ")` at all six call sites.

---

## 🟢 11. Production analytics/LMS values are baked in as source-level defaults

**Files:** `config/analytics.ts:36`, `config/site.ts:40`

```ts
measurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? "G-NNJRMTPHZK",
...
url: import.meta.env.PUBLIC_LMS_URL ?? "https://learn.sanjaynegi.in/"
```

This matches the CI workflow's own fallback (see finding #2), so it's clearly intentional rather than a leaked secret — GA measurement IDs aren't sensitive. But it does mean any local `npm run dev`, PR preview build, or fork that doesn't set `PUBLIC_GA_MEASUREMENT_ID` will send real page-view events to the production GA property.

**Action (optional):** Consider defaulting `googleAnalytics.enabled` to `false` unless a measurement ID is explicitly supplied via env, so dev/preview traffic doesn't pollute production analytics.

---

## 🟢 12. No lint/format tooling or tests

**File:** `package.json` — `devDependencies` is empty, no `lint` or `test` script.

`astro check` catches type errors but nothing else — it's exactly why finding #1 (`tone` prop) shipped clean: an unused optional prop isn't a type error. There's also no automated check that would catch dead files (#3, #4) or unused exports.

**Action (scale to project needs):** Add ESLint with `eslint-plugin-astro` (and optionally `unused-imports`/`no-unused-vars` tuned for `.astro` frontmatter) and/or Prettier for consistency. Given this is a small single-maintainer marketing site, this is a nice-to-have rather than urgent — but worth it once more content or contributors are added.

---

## Summary

| # | Severity | Finding | File(s) |
|---|----------|---------|---------|
| 1 | 🔴 Bug | `SectionHeader` `tone` prop is dead — 5 call sites have no effect | `SectionHeader.astro` |
| 2 | 🔴 Bug | `SITE_URL` CI fallback missing; `??` doesn't catch `""` | `deploy.yml`, `astro.config.mjs`, `config/site.ts` |
| 3 | 🟡 Cleanup | `PageLayout.astro` / `ContentLayout.astro` unused | `src/layouts/` |
| 4 | 🟡 Cleanup | `NeuralBackground.astro` unused | `src/components/` |
| 5 | 🟡 Gap | `registrationUrl` field collected but never rendered | `content/config.ts`, workshop layout/card |
| 6 | 🟡 Gap | `teams.md` content entry orphaned | `content/pages/teams.md`, `pages/teams.astro` |
| 7 | 🟡 Cleanup | `Button`/`Card` "hot"/"ghost" variants unused | `Button.astro`, `Card.astro` |
| 8 | 🟡 Cleanup | `brand`/`magenta`/`purple` Tailwind scales unused as utilities | `config/theme.ts` |
| 9 | 🟢 DRY | Duplicated `HeroAction`/`CtaAction` type | `Hero.astro`, `CTASection.astro` |
| 10 | 🟢 Robustness | `.replace` vs `.replaceAll` on format strings | layouts/cards (6 spots) |
| 11 | 🟢 Hygiene | Production GA/LMS defaults baked into source | `config/analytics.ts`, `config/site.ts` |
| 12 | 🟢 Process | No lint/test tooling | `package.json` |

Nothing here blocks shipping — the site builds clean and the architecture (content collections + typed config modules + shared layouts) is sound. Findings #1 and #2 are the only ones with live user-facing or build-fragility impact; the rest are cleanup that will keep the codebase easy to extend as more programs/workshops are added.
