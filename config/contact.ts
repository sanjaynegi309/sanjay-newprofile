import { analytics } from "./analytics";
import { site } from "./site";

export const contact = {
  hero: {
    eyebrow: "Contact",
    title: "Talk through the right AI learning path.",
    description:
      "Use the contact options below for live programs, workshops, corporate training, or a focused conversation about team AI capability.",
    actions: [
      {
        label: "Email SkillUp",
        href: `mailto:${site.contact.email}`,
        analyticsEvent: analytics.events.contact
      }
    ],
    metrics: [
      { label: "Best for", value: "Programs" },
      { label: "Teams", value: "Workshops" },
      { label: "Response", value: "Email" }
    ]
  },
  channels: [
    {
      title: "Program enquiries",
      description:
        "Ask about upcoming live cohorts, learner fit, outcomes, and recommended starting points.",
      href: `mailto:${site.contact.email}?subject=Program%20enquiry`,
      label: site.contact.email,
      analyticsEvent: analytics.events.programApply
    },
    {
      title: "Corporate training",
      description:
        "Share your team goals, audience, and business outcome so training can be scoped around the right change.",
      href: `mailto:${site.contact.email}?subject=Corporate%20training%20enquiry`,
      label: site.contact.email,
      analyticsEvent: analytics.events.corporateCta
    },
    {
      title: "Workshop planning",
      description:
        "Discuss private workshops, live sessions, or focused AI adoption sprints.",
      href: `mailto:${site.contact.email}?subject=Workshop%20enquiry`,
      label: site.contact.email,
      analyticsEvent: analytics.events.workshopRegistration
    }
  ],
  note:
    "Every enquiry goes straight to a real person — no ticketing queue, no automated response."
} as const;
