# Color Scheme

This document describes the confirmed SkillUp color system after the premium dark-gradient update.

The source of truth is `config/theme.ts`. Tailwind imports these values through `tailwind.config.mjs`, and the site uses the generated `brand-*`, `accent-*`, `neutral-*`, and `atmosphere-*` utility classes across components, layouts, and pages.

## Design Direction

The palette remains navy + teal + cool neutrals. The visual application is now more premium, modern, atmospheric, and AI-native.

The site should feel:

- Professional
- Engineering-first
- Trustworthy
- Premium but restrained
- Appropriate for learners and enterprise buyers

The site should not feel neon, childish, flashy, consumer-course-like, or overly colorful.

## Section Rhythm

Use dark backgrounds strategically, not everywhere.

- Hero: deep navy / near-black atmospheric gradient
- Course and offering sections: light backgrounds for reading and comparison
- Why SkillUp / differentiation: soft navy-tinted light background
- AI process / corporate process / proof moments: dark immersive sections
- Testimonials: dark glass cards or elevated white cards depending on context
- Final CTA: full-width dark atmospheric gradient
- Footer: almost-black navy

White sections are still allowed where readability and scanning matter, especially cards, Markdown content, listings, and forms. Avoid reverting the overall site back to mostly white.

## Atmospheric Palette

These tokens support the premium dark-gradient direction.

| Token | Hex | Usage |
| --- | --- | --- |
| `atmosphere.deep` | `#08111F` | Deep page base, footer, darkest gradient stop |
| `atmosphere.dark` | `#0B1220` | Header, dark surface base |
| `atmosphere.rich` | `#132744` | Rich navy gradient stop |
| `atmosphere.elevated` | `#1B365D` | Elevated navy surfaces and depth |

## Primary Brand Palette

The primary brand palette is a deep blue/navy scale. It carries the identity of the website and supports headings, primary actions, borders, and brand depth.

| Token | Hex |
| --- | --- |
| `brand.50` | `#f6f8fb` |
| `brand.100` | `#e7edf5` |
| `brand.200` | `#cbd9ea` |
| `brand.300` | `#9fb9d9` |
| `brand.400` | `#6d94c3` |
| `brand.500` | `#4a73a8` |
| `brand.600` | `#385b89` |
| `brand.700` | `#304a6f` |
| `brand.800` | `#2b405d` |
| `brand.900` | `#27374f` |
| `brand.950` | `#192233` |

Common usage:

- `brand.950`: high-emphasis text on light surfaces
- `brand.900`: primary buttons and strong brand emphasis
- `brand.800` / `brand.700`: links and hover states
- `brand.100` / `brand.200`: borders and soft tinted surfaces
- `brand.50`: light navy-tinted backgrounds

## Accent Palette

The accent palette is muted teal. It should remain an accent, not the dominant color.

| Token | Hex |
| --- | --- |
| `accent.50` | `#f4fbf9` |
| `accent.100` | `#dff4ef` |
| `accent.200` | `#bee9df` |
| `accent.300` | `#92d9ca` |
| `accent.400` | `#62c1ae` |
| `accent.500` | `#3ea491` |
| `accent.600` | `#2f8274` |
| `accent.700` | `#2a685e` |
| `accent.800` | `#25544d` |
| `accent.900` | `#224640` |
| `accent.950` | `#102925` |

Common usage:

- Focus rings and accessible interaction states
- Eyebrows, badges, and small highlights
- Neural hero animation signal points
- Subtle glows inside dark atmospheric sections

Do not use teal as a large-page background or dominant gradient color.

## Neutral Palette

The neutral palette is a cool slate scale. It supports body text, borders, cards, and readable light sections.

| Token | Hex |
| --- | --- |
| `neutral.50` | `#f8fafc` |
| `neutral.100` | `#f1f5f9` |
| `neutral.200` | `#e2e8f0` |
| `neutral.300` | `#cbd5e1` |
| `neutral.400` | `#94a3b8` |
| `neutral.500` | `#64748b` |
| `neutral.600` | `#475569` |
| `neutral.700` | `#334155` |
| `neutral.800` | `#1e293b` |
| `neutral.900` | `#0f172a` |
| `neutral.950` | `#020617` |

Common usage:

- White: readable content bands, cards, listings, and Markdown pages
- `neutral.50`: alternate light sections
- `neutral.200`: borders and dividers on light surfaces
- `neutral.600` / `neutral.700`: body copy on light surfaces
- `neutral.200` / `neutral.300`: body copy on dark surfaces

## Reusable Surface Utilities

The site now uses reusable visual utilities instead of hardcoded color effects.

- `section-atmospheric`: dark navy gradient with subtle grid texture and broad radial depth
- `section-navy-tint`: soft light navy-tinted section background
- `glass-card`: translucent dark card with blur, border, and controlled depth
- `teal-glow`: restrained teal glow for small emphasis only

Use these utilities before adding one-off gradient or glass styles.

## Interactive AI Ambient Background

The dark atmospheric sections use `InteractiveAIAmbientBackground.astro` for a premium AI-native effect. It is applied selectively:

- Homepage hero: strongest particle field and cursor response
- AI/process sections: medium intensity
- Final CTA: lighter, quieter ambient layer

The system uses muted brand and accent values so it remains visible on dark navy without becoming distracting.

- Neural threads: low-opacity `brand.300` / `brand.400`
- Particle nodes: muted teal derived from `accent.300` / `accent.400`
- Signal glow: low-opacity teal derived from `accent.600`
- Cursor interaction: subtle teal/blue ripple and particle bending on desktop only
- Smoky gradients: low-opacity teal and blue radial layers over the navy base

The animation should feel alive and slightly dynamic, but never chaotic. It respects `prefers-reduced-motion`, pauses when offscreen, caps device pixel ratio, keeps adaptive particle counts, and avoids heavy dependencies.

## Designer Notes

When reviewing or extending the visual system:

- Preserve the navy + teal identity.
- Keep dark atmospheric sections strategic and premium.
- Use the interactive AI ambient system for key dark moments rather than adding one-off visual effects.
- Use light sections where readability, comparison, and Markdown content benefit.
- Use teal sparingly as an accent.
- Avoid neon gradients, saturated purple/pink AI cliches, and loud visual effects.
- Avoid gaming, crypto, cyberpunk, or overly flashy visual language.
- Avoid random colors outside the configured theme.
- Maintain strong contrast for text, cards, buttons, and navigation.
- Keep the experience enterprise-credible, not like a consumer course marketplace.
