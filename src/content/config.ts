import { defineCollection, z } from "astro:content";

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case slugs.");

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
  analyticsEvent: z.string().optional(),
  external: z.boolean().default(false)
});

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonicalPath: z.string().startsWith("/").optional(),
  noindex: z.boolean().default(false),
  ogImage: z.string().startsWith("/").optional()
});

const baseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: slugSchema.optional(),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false)
});

const pageSchema = baseContentSchema.extend({
  pageType: z.enum(["standard", "landing", "legal"]).default("standard"),
  seo: seoSchema.default({})
});

const programSchema = baseContentSchema.extend({
  audience: z.array(z.string()).min(1),
  bestFor: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  duration: z.string(),
  format: z.enum(["self-paced", "cohort", "corporate", "hybrid"]),
  nextCohort: z.string().default("Contact for dates"),
  fee: z.string().default("Contact for pricing"),
  capacity: z.number().int().positive().optional(),
  outcomes: z.array(z.string()).min(1),
  topics: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  launchStatus: z.enum(["live", "coming-soon"]).default("live"),
  estimatedLaunch: z.string().optional(),
  prerequisites: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  weeklyCommitment: z.string().optional(),
  liveSchedule: z.string().optional(),
  timezone: z.string().optional(),
  deliveryFormat: z.string().optional(),
  support: z.array(z.string()).default([]),
  recordingAccess: z.string().optional(),
  terms: z.array(z.string()).default([]),
  availability: z.object({
    status: z.enum(["open", "upcoming", "in-progress", "waitlist", "on-request", "completed"]),
    label: z.string(),
    detail: z.string(),
    startsAt: z.coerce.date().optional(),
    actionLabel: z.string(),
    actionHref: z.string(),
    actionExternal: z.boolean().default(false)
  }).optional(),
  cta: ctaSchema.optional(),
  seo: seoSchema.default({})
});

const workshopSchema = baseContentSchema.extend({
  audience: z.array(z.string()).min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  date: z.coerce.date().optional(),
  duration: z.string(),
  format: z.enum(["live-online", "in-person", "private-team"]),
  capacity: z.number().int().positive().optional(),
  registrationUrl: z.string().url().optional(),
  topics: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  cta: ctaSchema.optional(),
  seo: seoSchema.default({})
});

const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  organization: z.string(),
  quote: z.string(),
  program: z.string().optional(),
  image: z.string().startsWith("/").optional(),
  outcome: z.string().optional(),
  featured: z.boolean().default(false)
});

export const collections = {
  pages: defineCollection({
    type: "content",
    schema: pageSchema
  }),
  programs: defineCollection({
    type: "content",
    schema: programSchema
  }),
  workshops: defineCollection({
    type: "content",
    schema: workshopSchema
  }),
  testimonials: defineCollection({
    type: "content",
    schema: testimonialSchema
  })
};
