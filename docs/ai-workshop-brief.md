# Sanjay's AI Workshop — project brief

Working brief · 4 October 2026 · First task: inspection and documentation only.

## Goal and scope

Make SkillUp feel like entering Sanjay Negi's teaching workshop: a place to ask questions, understand a system, build something useful, and choose the right guidance. Personality: curious, approachable, energetic, practical, technically credible. Success means qualified learner enquiries, relevant registrations, team-training enquiries, and genuine waitlist interest.

Use “Sanjay's AI Workshop” as a creative direction, not an unconfirmed legal/business rename. Keep SkillUp's configured identity. No visual changes, publishing, or deployment in this task.

## Inspected foundation

- `CLAUDE.md` points to `AGENTS.md`. Astro 5, TypeScript, Tailwind 3, Markdown collections, static output; no migration needed. Actual content lives in `src/content/`, not a root `content/` directory.
- `config/` owns business copy, navigation, theme, SEO, analytics, forms, and offer settings. `src/pages/` assembles reusable components and `BaseLayout`, `ProgramLayout`, and `WorkshopLayout`.
- Homepage currently uses a metrics-led `Hero`, repeated glass cards, offering sections, and a later founder block. Sanjay's portrait is available; three session photos appear on About. Detailed curriculum and FAQ material already exists.
- Current inventory: three advanced paid live programs, a free beginner live journey, one public bootcamp, eight coming-soon self-paced entries, and no testimonials. This is newer than the zero-course/three-program snapshot in `AGENTS.md` and `docs/PLAN.md`; reconcile documentation rather than deleting newer content to match it.
- Preserve `/`, `/about/`, `/programs/` and all program detail slugs, `/workshops/` and its detail slug, `/self-paced/`, `/teams/`, `/contact/`, `/faq/`, `/privacy/`, 404, sitemap, and robots routes.
- `astro.config.mjs` uses `SITE_URL` and `BASE_PATH`; `src/utils/url.ts` provides `withBase`. The requested preview is under `/sanjay-newprofile/`; examples and workflow defaults use `/`. Preserve effective environment configuration and verify the subpath explicitly in later tasks.
- `.github/workflows/deploy.yml` builds static `dist/` with Node 20 and deploys on main pushes/manual dispatch. Do not trigger it. Preserve external LMS/registration links, Google Apps Script enquiry backend (`PUBLIC_FORMS_ENDPOINT`), email fallback, consent-gated GA, SEO, and motion preferences. Backend delivery and hosted environment values have not been verified by this inspection.
- Existing working tree has substantial uncommitted edits. Subsequent work must preserve them and keep changes narrowly scoped.

## Audience assumptions

| Audience | Likely need and hesitation | Useful next step |
| --- | --- | --- |
| Individual: experienced developer/technical lead | Wants practical AI engineering and mentor feedback; needs fit, prerequisites, time commitment, and curriculum clarity | Compare live paths, inspect a curriculum, register externally or ask about fit |
| Individual: beginner/explorer | Wants an approachable starting point without being routed into an advanced program | Discover the existing free journey; evaluate a bootcamp only if its prerequisites fit |
| Individual: independent learner | Wants flexible recorded study; needs an honest distinction between planned and available material | Explore the planned catalog and join the shared All-Access waitlist |
| Team buyer: engineering lead, L&D, or business sponsor | Needs role/use-case relevance, delivery options, and a credible planning conversation | Visit `/teams/`, describe team size, goal, and timeline, submit an enquiry |

These are hypotheses grounded in existing offer audiences, not validated research. Do not assume beginners fit the advanced programs or that every visitor is a team buyer.

## Visual and editorial direction

1. **Mentor first.** Bring Sanjay's real portrait and a clear teaching invitation into the opening composition. Explain what visitors can learn/build before presenting catalog navigation. Use singular, personal language where source material supports it; avoid implying an unnamed instructor team.
2. **Workshop character through teaching artifacts.** Use curriculum-derived diagrams, annotated steps, module previews, and session photography. Prefer useful explanations over decorative dashboards, fake terminals, or simulated learner activity. Label conceptual illustrations as illustrations, never learner work.
3. **Varied composition.** Alternate a portrait-led introduction, editorial teaching example, compact offer comparison, curriculum preview, photo strip, and clear action area. Reserve cards for genuinely comparable choices; do not wrap every paragraph in a card.
4. **Balance ink with workbook surfaces.** Following the visual-foundation direction (4 October 2026), use dark ink for introductions and offers, warm light paper for teaching and long reading, Inter/Space Grotesk, and one dominant electric cyan accent. Favor expressive solid headlines, restrained surfaces, and annotation rules over animated neon gradients. Other accents remain reserved. This explicitly supersedes the earlier all-dark visual direction for this work. Keep urgency treatments inactive without verified urgency. Use shared theme/CSS tokens.
5. **Motion supports understanding.** Replace pointer glow and particle canvases with restrained static decoration and a brief optional entrance. Preserve reduced-motion support and the existing stored motion preference/event. No continuous decorative motion, animation around reading text, or heavy new libraries.
6. **Approachable precision.** Favor concrete verbs such as learn, build, test, and ask over corporate abstraction. Distinguish intended learning objectives from demonstrated learner outcomes. One prominent next step per decision area, with a quieter alternative for visitors who need guidance.

Keep the low-to-high commitment offering sequence: Bootcamps → live Programs → Self-Paced → Teams. Mentor presence and teaching evidence can appear earlier as well as in the fuller founder section. The pre-launch catalog remains visually secondary to available offers.

## Primary conversion journeys

- **Guided live learning:** mentor invitation → choose an appropriate starting point → offer detail with audience, prerequisites, duration, curriculum, verified availability → existing external registration. Offer `/contact/` as a clear fit-question alternative.
- **Unsure where to start:** teaching evidence → compare beginner/experienced routes → enquiry with name, email, interest, and learning goal/timeline. Reuse `EnquiryForm`; retain direct email as fallback.
- **Team training:** distinct team entry → `/teams/` → explain configurable delivery around existing supported capabilities → qualified enquiry with team size, use case, and timeline. No invented client logos or case studies.
- **Recorded learning:** coming-soon catalog → pass-level explanation → shared waitlist; no payment or individual course pricing before launch. Carry viewed-course interest into the form/event when implemented.

Use existing analytics names/helpers. Distinguish CTA clicks from confirmed registrations or delivered enquiries: current click tracking and iframe-load success UI do not establish backend acceptance. Review measurement before treating `waitlist_signup` clicks as completed signups. Define conversion baselines before setting numeric targets; never send personal form data to GA.

## Content and evidence checklist

Existing evidence: founder portrait (`src/assets/founder/`), session photos (`src/assets/sessions/`), program/bootcamp curricula and FAQs, founder-authored reference sales pages/data (`docs/references/`), and a self-paced curriculum planning document. Local existence alone does not establish a claim's freshness, consent, or commercial approval.

- [ ] Confirm current cohort availability: three paid programs still say “August 2, 2026,” now past. Do not present those dates as an upcoming cohort or substitute invented dates.
- [ ] Reconcile GenAI Jumpstart's `2026-11-03` content date against the reference's August 1, 2026. Keep its genuine three-hour duration distinct from the general 2–5-day bootcamp positioning.
- [ ] Confirm the free journey's current weekly schedule, enrollment availability, and provenance before promoting it more heavily.
- [ ] Establish sources and as-of dates for “2,000+ learners,” “12+ bootcamps,” and “3 cohorts” in home/about config. Do not amplify unverified metrics; suppress unsupported claims in the relevant implementation task.
- [ ] Confirm the planned ₹1,499 pass price and commercial promises in `config/self-paced.ts`/`config/home.ts`; their presence in config is not independent verification. Confirm which roadmap entries are approved for public preview; planning material is not shipped content.
- [ ] Obtain a concise founder-approved mentor bio and evidence for any specific credentials/experience claims. Do not infer credentials from curriculum breadth.
- [ ] Confirm photo permissions and accurate captions/context; avoid implying identifiable attendees endorse the offer.
- [ ] Request one shareable teaching excerpt, demo/repository, or annotated build from Sanjay. Until supplied, use sourced curriculum explanations without pretending they are completed student projects.
- [ ] Add testimonials only with authentic attribution, publication consent, and evidence for measurable outcomes. Keep the empty collection conditionally hidden; seek 3–4 real featured entries when available.
- [ ] Obtain actual refund/cancellation terms and confirm response-time promises. Do not manufacture policies, learner outcomes, pricing, dates, counts, seats remaining, or deadlines.
- [ ] Verify enquiry endpoint delivery/error behavior and waitlist interest capture in a controlled test. Current interest field is optional; iframe load alone is insufficient delivery evidence.

Keep missing information here, never as public editorial placeholders. Reference sources should be updated alongside Markdown/frontmatter when approved facts change; avoid copy drift and duplicated business information.

## Prioritized implementation checklist

**P0 — establish a trustworthy baseline**

- [ ] Capture current rendered pages and navigation/form behavior at the effective base path; reconcile time-sensitive facts and unsupported claims above with source/owner approval.
- [ ] Record current build/lint diagnostics and conversion instrumentation; verify integrations without creating uncontrolled real leads. Preserve routes, consent, SEO, and environment settings.

**P1 — mentor-led homepage and clear decisions**

- [ ] Update config-driven voice and opening composition using the real portrait; explain who Sanjay teaches and what guided building involves.
- [ ] Add a compact, sourced teaching example and reuse session assets with confirmed captions. Introduce varied layouts before adding more effects.
- [ ] Make beginner, experienced learner, and team next steps easy to identify; retain the offering sequence and honest coming-soon treatment.

**P2 — carry the workshop through existing journeys**

- [ ] Improve shared hero, heading, button, and offer presentation consistently; then refine program/bootcamp details and About using existing layouts/content.
- [ ] Clarify fit, prerequisites, mentor feedback, availability, and registration handoff. Strengthen Teams qualification and shared waitlist context capture.
- [ ] Add genuine proof when available; keep evidence gaps out of public UI.

**P3 — qualify each implementation before completion**

- [ ] Run `npm run build` (Astro check + static build), `npm run lint` as relevant, and verify base-aware links, canonical/OG URLs, images, and all retained routes.
- [ ] Inspect affected rendered pages at 320–375px, 768px, and desktop in an actual browser. Check `scrollWidth <= viewport width`, console errors, keyboard/focus, readable contrast, and reduced motion; exercise navigation, offer links, and form validation at narrow width.
- [ ] Test submission states and analytics with controlled fixtures/mocks where practical; do not claim backend delivery from a UI success message. Check image optimization, layout stability, and added JS cost.
- [ ] Report changed files/behavior, checks and results, evidence gaps, and any browser/integration limitations. Do not publish, deploy, or push to a deploy-triggering branch.

This brief is a repo inspection and design direction, not a rendered visual or accessibility audit. Each later UI task must perform the browser verification above.
