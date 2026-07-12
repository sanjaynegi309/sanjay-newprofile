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

All cards should be generated from frontmatter.

Detail pages should render Markdown.

Never duplicate content.

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

✓ Responsive

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
