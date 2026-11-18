# About and evidence record

Updated 5 October 2026.

## Published evidence

- Sanjay Negi’s name, AI mentor role, portrait, and public social destinations come from repository configuration and the existing founder asset.
- The “more than two decades” enterprise-software background and transition into AI Engineering come from the founder’s existing program marketing pages under `docs/references/html_pages/`.
- The teaching method is a concise synthesis of confirmed curriculum and delivery practices: architecture before framework choice, implementation, evaluation, deployment, design review, code feedback, project clinics, and explaining trade-offs.
- Mentoring expectations are limited to the support explicitly described by the live AI Engineer program. They are presented as program practices, not learner outcomes.

## Evidence held back from the public UI

- [ ] Confirm publication permission from every identifiable attendee in `src/assets/sessions/session-1.jpeg`, `session-2.jpeg`, and `session-3.jpeg`; also record the event, date, and accurate context for each screenshot.
- [ ] Add authentic testimonials only with the speaker’s approved name, wording, role/organisation where applicable, and publication permission. The testimonials collection is currently empty.
- [ ] Supply approved learner or team case studies with a starting point, challenge, mentoring intervention, artifact, independently checkable result, attribution, and permission record.
- [ ] Verify whether any credentials, certifications, employers, speaking engagements, or education history should be published. None are claimed on the revised About page.
- [ ] Confirm which GitHub repositories and YouTube recordings should be featured individually, with accurate descriptions and rights to all visible material.
- [ ] Confirm whether the founder portrait has a documented photographer/source credit requirement.

## Case-study publishing rule

`CaseStudy.astro` accepts the full evidence structure defined in `src/types/evidence.ts`. It renders only entries marked `permission: "approved"` with every required evidence field populated. `config/evidence.ts` is intentionally empty, so no template, invented outcome, or unapproved artifact appears publicly.
