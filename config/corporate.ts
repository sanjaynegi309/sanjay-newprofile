import { analytics } from "./analytics";

export const corporate = {
  hero: {
    eyebrow: "Corporate training",
    title: "AI capability programs built around business outcomes.",
    description:
      "SkillUp helps teams identify useful AI opportunities, adopt safer workflows, and build shared decision-making habits without turning training into a disconnected curriculum exercise.",
    actions: [
      {
        label: "Start a training conversation",
        href: "/contact/",
        analyticsEvent: analytics.events.corporateCta
      },
      {
        label: "View workshops",
        href: "/workshops/",
        variant: "secondary",
        analyticsEvent: analytics.events.workshopRegistration
      }
    ],
    metrics: [
      { label: "Primary focus", value: "Business outcomes" },
      { label: "Delivery", value: "Private teams" },
      { label: "Output", value: "Adoption plan" }
    ]
  },
  outcomes: {
    eyebrow: "Outcomes",
    title: "Training tied to what the organization needs to change.",
    description:
      "The goal is not course completion. It is better decisions, faster useful experimentation, and clearer operating practices for AI-enabled work.",
    items: [
      {
        title: "Prioritized AI opportunities",
        description:
          "Teams leave with a clearer view of where AI can reduce friction, improve throughput, or create better customer and employee experiences."
      },
      {
        title: "Shared evaluation habits",
        description:
          "Participants learn how to judge AI output quality, identify failure modes, and define acceptance criteria before scaling a workflow."
      },
      {
        title: "Responsible adoption patterns",
        description:
          "Leaders and practitioners align on boundaries for data use, review, escalation, and human oversight."
      },
      {
        title: "Workflow-level implementation plans",
        description:
          "Training sessions produce practical next steps for roles, processes, and tools rather than generic AI enthusiasm."
      }
    ]
  },
  engagement: {
    eyebrow: "How engagements work",
    title: "A lightweight path from discovery to measurable capability.",
    steps: [
      {
        title: "Define the business target",
        description:
          "Clarify the teams, workflows, risks, and decisions the training should improve."
      },
      {
        title: "Shape the learning intervention",
        description:
          "Select private workshops, cohort programs, or leadership sessions around the target outcome."
      },
      {
        title: "Apply to real workflows",
        description:
          "Use practical exercises that mirror the team's current operating environment."
      },
      {
        title: "Document next actions",
        description:
          "Close with adoption priorities, evaluation criteria, and follow-up recommendations."
      }
    ]
  },
  audiences: {
    eyebrow: "Teams",
    title: "Designed for cross-functional adoption.",
    items: [
      "Engineering and platform teams",
      "Product and innovation teams",
      "Operations and business teams",
      "Leadership groups planning AI adoption"
    ]
  },
  finalCta: {
    title: "Turn AI training into operational progress.",
    description:
      "Start with the business outcome, then choose the workshops and programs that move the team toward it.",
    actions: [
      {
        label: "Contact SkillUp",
        href: "/contact/",
        analyticsEvent: analytics.events.contact
      }
    ]
  }
} as const;
