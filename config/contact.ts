import { analytics } from "./analytics";

export const contact = {
  hero: {
    eyebrow: "Contact",
    title: "Talk through the right AI learning path.",
    description:
      "Choose an individual or team path, add one useful question, and open a prefilled email to Sanjay.",
    actions: [
      {
        label: "Start an enquiry",
        href: "#enquiry-form",
        analyticsEvent: analytics.events.primaryCtaClick
      }
    ],
    metrics: [
      { label: "Individual", value: "Programs" },
      { label: "Teams", value: "Training" },
      { label: "Reviewed by", value: "Sanjay, personally" }
    ]
  },
  channels: [
    {
      title: "Program enquiries",
      description:
        "Ask about learner fit, commitments, current availability, or the right starting point.",
      href: "/contact/?type=program#enquiry-form"
    },
    {
      title: "Corporate training",
      description:
        "Share the team, business goal, and likely timeline for a focused training conversation.",
      href: "/contact/?type=corporate#enquiry-form"
    },
    {
      title: "Bootcamp enquiries",
      description:
        "Ask about a specific bootcamp or the next available session.",
      href: "/contact/?type=workshop#enquiry-form"
    }
  ],
  form: {
    id: "enquiry-form",
    heading: "Prepare your enquiry",
    description:
      "Only your name, email, and question are required. We'll send it straight through; if that doesn't go through, you'll get a prefilled email to send instead.",
    typeOptions: [
      {
        value: "program",
        label: "Program enquiry",
        analyticsEvent: analytics.events.programApply
      },
      {
        value: "workshop",
        label: "Bootcamp enquiry",
        analyticsEvent: analytics.events.workshopRegistration
      },
      {
        value: "corporate",
        label: "Corporate training enquiry",
        analyticsEvent: analytics.events.corporateCta
      }
    ],
    submitLabel: "Send enquiry"
  },
  note:
    "Choose a path below. If you arrived from a program or bootcamp, its name is kept in the form."
} as const;
