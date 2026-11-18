# Sanjay's AI Workshop — visual foundation

Implemented 4 October 2026. The user's ink-and-workbook direction supersedes the older all-dark/neon guidance for this foundation. Astro, Tailwind, static rendering, routes, and integrations remain in place; nothing was deployed.

## Design decisions

- **Ink and paper:** `config/theme.ts` owns dark atmospheric colors and the warm `workbook` palette. Dark sections introduce offers; paper sections support explanation and curriculum reading. Cyan is the dominant electric accent. Magenta/purple remain reserved, without animated gradient headlines or invented urgency.
- **Type:** locally hosted Space Grotesk for expressive, tightly spaced headlines; Inter for readable body text; system monospace for quiet annotations. Long prose uses generous line height and a roughly 68-character reading measure. Section introductions and controls inherit their surface's text/link/focus colors.
- **Rhythm:** shared `spacing.section` gives sections 4–7rem of responsive breathing room. Editorial splits use `editorial-layout`; comparable offers retain modest surfaces. `Card variant="editorial"` provides a rule and spacing instead of a rounded box. Surface and control radii are theme tokens.
- **Controls:** filled cyan primary buttons, outlined secondary buttons, underlined editorial links, 44px button targets, and visible keyboard outlines. Paper uses a darker cyan for links/focus so the electric accent never becomes faint reading text.
- **Brand:** `BrandLockup` pairs the existing logo and SkillUp with “with Sanjay Negi.” The mentor name/role live in brand configuration. Home/About use the existing portrait through the shared Hero. Unverified counts were removed from their hero configuration pending confirmation in the content checklist.
- **Navigation:** retain existing primary labels and routes. Configured “Find your learning path” points to Contact and has more visual weight than Login. Below 1280px, native disclosure navigation provides full-width links, a prominent action, a scrollable short-screen menu, Escape/outside-click dismissal, and keyboard focus return.
- **Footer:** shared brand, prospect invitation, existing route/social/contact links, copyright, and the motion control. Login retains its external destination and analytics event.
- **Motion:** remove the canvas particle network, cursor tracking/glow, continuous gradients, heavy blur, and card sweeps. Decorative orbit rules are static, with one brief optional entrance on larger screens. Keep `skillup:ambient-motion`, its change event, and reduced-motion support; there is no continuous background animation to pause.

## Reuse contract

Use `config/theme.ts` for new palette, spacing, or radius tokens, and `src/styles/global.css` for shared treatment. Continue using configuration for business copy/links and Markdown/frontmatter for offer content.

```astro
<section class="workbook workshop-section">
  <Container>
    <div class="editorial-layout">
      <SectionHeader eyebrow={section.eyebrow} title={section.title} />
      <Card variant="editorial">
        <h3 class="text-heading">{section.subtitle}</h3>
        <p class="text-copy">{section.description}</p>
      </Card>
    </div>
  </Container>
</section>
```

`workbook` supplies the surface variables; `text-heading` and `text-copy` are the preferred text classes in new shared UI. A documented CSS bridge remaps the existing white/neutral text utilities within workbook sections, keeping older content readable while it is migrated. Do not put a nested dark panel inside a workbook without explicitly restoring its surface variables.

Use `Button` for prospect actions and `workshop-link` for editorial links. Reserve card grids for comparing real offers, not explaining every teaching principle. Keep the existing base-path helper, external-link labels, consent behavior, and analytics attributes. Do not introduce a new framework or animation dependency.

## Verification and limits

- Astro check/static build and ESLint pass; the existing empty-testimonial notices remain.
- Chromium checks cover 23 HTML routes at 320px, 768px, and 1440px under `/sanjay-newprofile/`, including all program details, the bootcamp detail, and the 404 page. Check document width, console errors, images, menu navigation, Escape/focus return, empty-form validation, and motion preferences.
- Computed text-contrast sampling across Home, About, Contact, Teams, Self-Paced, a live program, the bootcamp detail, FAQ, and Privacy found no sampled text below the applicable WCAG AA threshold. The lowest sampled ratio was 4.92:1. Sampling composites solid background colors; screenshots supplement this check. This is not a complete accessibility certification.
- Browser screenshots were inspected for the shared header/menu, hero, workbook prose, and forms at narrow/tablet/desktop widths. The menu also needs to remain scrollable on short screens in future changes.
- A static-link audit found the existing Privacy-to-Contact Markdown link bypassed the deployment base. It now uses a relative URL; clicking it at 320px reaches `/sanjay-newprofile/contact/` correctly.
- Real form delivery, third-party registration completion, and production analytics were not exercised. Their existing endpoints and wiring were preserved. The dated content, commercial terms, roadmap approval, and evidence gaps in `ai-workshop-brief.md` still require owner confirmation.

Future page-composition and copy tasks should build on this foundation rather than reintroducing neon effects or duplicating the shared controls.
