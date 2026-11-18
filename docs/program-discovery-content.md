# Program discovery — content and availability record

Updated 19 October 2026.

## Naming and source boundary

The former “Generative AI Developer Program” was placeholder scaffolding and is not a verified offer. It remains removed. The verified developer-focused live offer is **AI Engineer**, sourced from `docs/references/data/programs.json`, `docs/references/html_pages/ai-engineer.html`, and `src/content/programs/ai-engineer.md`.

Program discovery now compares role focus, duration, weekly commitment, delivery format, concrete curriculum deliverables, and public availability. Topic-pill lists were removed from discovery and detail surfaces because they obscured these differences.

## Availability rules

`availability.status` supports `open`, `upcoming`, `in-progress`, `waitlist`, `on-request`, and `completed`. `getProgramAvailability()` is the shared renderer and date guard. If an offer is still marked `upcoming` after its `startsAt` date, it is shown as completed and its action becomes an enquiry about the next intake. Explicit `in-progress` offers remain in progress until the founder confirms completion.

## Reference course import (19 October 2026)

`reference_courses/cards/programs.json` now supplies card summaries, audiences, outcomes, durations, and schedules. `reference_courses/course_landing_pages/*.html` supplies all curriculum modules, FAQs, and registration URLs. These files supersede the older `docs/references/` versions for these courses. Existing mentorship slugs are retained and Python is added at `/programs/python-for-experienced-engineers/`. The free weekly journey is unchanged: five live programs, with no duplicate mentorship entries.

AI Engineer and Forward Deployed Engineer now show January 2, 2027, weekends at 08:00-09:30 AM IST (three live hours weekly). Python shows November 1, 2027, weekends at 12:30-2:30 PM IST, four curriculum phases, sixteen sessions, four project milestones, and ten FAQs. Its eight-week duration is a verified exception to the usual long-course duration and remains a live Program.

GenAI Architect has conflicting dates: JSON says January 2, 2027; HTML says September 5, 2027. It uses on-request availability and an enquiry CTA until confirmed. Its live schedule comes from the JSON. JSON IDs have stale August labels and are not treated as dates. Python's contradictory before-2027 marketing copy is excluded; no replacement timeline was invented.

Prices remain "Displayed during registration" because the source prices are blank. No testimonials, scarcity, or refund terms were added. The existing components render static Markdown; source HTML scripts, styling, and analytics are not embedded.

## Editorial checklist

- [ ] Resolve the conflicting GenAI Architect start dates in the reference sources.
- [ ] Publish the actual fee if it should appear before registration; the current verified wording is “Displayed during registration.”
- [ ] Provide the refund, cancellation, transfer, and deferral policy. No applicable terms were found in the source material.
- [ ] Confirm whether instalment options are available for each next intake. Current copy only promises that visitors may ask.
- [ ] Confirm whether the 30-person cohort cap remains applicable to each next intake.
- [ ] Reconfirm the GenAI Architect schedule when its intake date is resolved.
- [ ] Confirm whether the free weekly journey provides recordings, mentor feedback, projects, or support outside its live session. These fields remain absent.

No mock project is presented as learner work. Detail pages label build items as curriculum deliverables, not past results.
