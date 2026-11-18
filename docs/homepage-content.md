# Homepage — content, evidence, and checks

Updated 4 October 2026. This is the implementation record for the homepage described in `ai-workshop-brief.md`, using `visual-foundation.md`.

## Page and content decisions

The opening addresses experienced developers, technical leads, and teams. Its learning goal is to build AI systems that learners can explain, test, and deploy. Sanjay's existing portrait and configured name/role appear before the headline. The main action goes to the learner/team decision area; the quieter alternative goes to the teaching exercise.

The right side contains an explicitly illustrative Retrieve → Generate → Evaluate teaching diagram. It is an explanation, not a screenshot of a delivered system or a learner project. On smaller screens its three steps become a compact horizontal sequence, following the main action.

The eight stages are: outcome-led opening; a small evidence-checking exercise; curriculum evidence; individual/team paths; three focused live program rows; mentoring delivery; teaching philosophy; FAQs and a fit enquiry. Recorded learning remains a modest waitlist link inside the learner-path section, without an unconfirmed price or launch date.

Program rows use collection frontmatter. The capstone preview reads three build/evaluation/documentation tasks from the actual AI Engineer Markdown section. A missing or renamed evidence section fails the build so an empty evidence block cannot silently ship. Dates and per-program registration URLs stay on their existing detail routes; the homepage asks visitors to confirm current intake availability.

The teaching exercise asks visitors to check a fictional AI answer against a short fictional workshop policy and identify one unsupported turnaround-time claim. All three native-button choices receive specific feedback, followed by the general lesson that numbers, dates, prices, and promises need direct evidence. The exercise is explicitly illustrative, makes no model/API calls, and collects no user input. JavaScript adds pressed states, focused live feedback, reset behaviour, and a mentoring next step; a `noscript` note preserves the answer when scripting is unavailable. `teaching_experiment` uses the existing consent-gated analytics helper and records only the selected choice identifier.

`SectionHeader` gains an optional heading size; existing defaults are preserved. The footer's existing link groups use a compact two-column mobile arrangement to reduce scrolling while preserving touch targets and destinations. The FAQ page continues sharing the homepage's common questions; its duplicate missed-session question was removed.

## Source ledger

| Homepage material | Existing source | Boundary |
| --- | --- | --- |
| Sanjay's identity and photo | `config/brand.ts`, `src/assets/founder/sanjay-negi.jpeg`; instructor fields in `docs/references/data/programs.json` | No new credentials, experience counts, or instructor team claims |
| Audience, engineering goal, live reviews and feedback | `src/content/programs/ai-engineer.md` and its reference HTML/JSON | Learning objectives and delivery features, not proven learner results |
| Capstone evidence | AI Engineer “Module 8 — Capstone: Deploy a Production-Ready AI System” | Direct curriculum excerpt; no claim of a completed project |
| Three program choices and durations | Frontmatter for AI Engineer, Forward Deployed Engineer, GenAI Architect | No copied descriptions, stale cohort dates, price figures, or seat claims in rows |
| Mentoring steps | AI Engineer “Program Delivery and Support” and reference `ai-engineer.html` | The delivery example is explicitly scoped to AI Engineer; current schedule still needs confirmation |
| Philosophy | Curriculum's implementation, evaluation, human-review, documentation, and design-defence topics; `src/content/pages/about.md` | Newly written personal copy, not a verbatim quote or testimonial |
| Background, projects, recordings, fees | Existing program prerequisites/capstone/FAQ sections | No new refund terms, guarantees, dates, or prices |
| Team and recorded-learning paths | Existing Teams/config and self-paced waitlist infrastructure | Training enquiry and planned catalog; no invented client proof or on-sale recorded courses |

## Missing content checklist

- [ ] A founder-approved demo, repository, or annotated real build with publication rights. No suitable project artifact was found; the illustrative lesson and real curriculum excerpt are used instead.
- [ ] A short, shareable teaching recording with permission and an accurate caption/transcript. None is assumed to exist.
- [ ] Confirmation of attendee publication permissions and context for the three session screenshots. They include identifiable participants and remain off the new homepage.
- [ ] Current cohort intake dates. Existing paid-program pages still reference August 2, 2026; the bootcamp Markdown date differs from its reference page. No new dates were inferred.
- [ ] Provenance/current approval for the free beginner journey's schedule and the self-paced roadmap/price. The homepage links to these existing routes without adding new commercial claims.
- [ ] Authentic, consented testimonials and measurable project outcomes. The existing testimonial collection is empty; no substitute testimonials or numbers were written.
- [ ] Founder review of the new first-person editorial copy. Its claims are source-based; it is not presented as an existing quoted statement.

The broader evidence/commercial checklist in `ai-workshop-brief.md` still applies. Missing content belongs here, not in public editorial placeholders. No publishing or deployment was performed.

## Verification

- `npm run build` (Astro check/static generation), ESLint, and whitespace checks.
- Chromium homepage checks at 320px, 375px, 768px, and 1440px: no horizontal overflow or unexpected console/page errors; opening message/photo/actions visible without interaction.
- Primary hero action ends at about 607px at 320px width and 579px at 375px width, inside the tested 812px viewport. The diagram follows the copy on narrow screens.
- All 15 links in the homepage main content return working local destinations or existing section/form anchors under `/sanjay-newprofile/`.
- All 23 existing HTML routes checked at 320px, 768px, and 1440px: 69 route/viewport combinations pass; the 404 route returns its expected status.
- Every lesson answer was activated with Enter or Space at 320px, 375px, 768px, and 1440px. Each choice reveals its own explanation, moves focus to the live feedback, and exposes the correct evidence check. Reset clears the state and returns focus to the first choice; the mentoring next step resolves to the existing section anchor. The no-JavaScript answer fallback was also checked. Keyboard focus on the paper-surface lesson controls uses a visible dark-cyan outline, and reduced motion removes transition and smooth-scroll effects.
- Computed text-contrast sampling of 146 visible text elements finds no AA failures; the minimum sampled ratio is 6.28:1. This composites solid colors and is supplemented by screenshot inspection, not a complete accessibility certification.
- Existing integrations and external URLs are preserved. No real form was submitted, registration completed, or production analytics data sent. External LMS/social destinations are unchanged; third-party uptime is outside these local route checks.
