import { analytics } from "./analytics";

export const selfPaced = {
  hero: {
    eyebrow: "Self-paced — coming soon",
    title: "One All-Access Pass. Every self-paced course.",
    description:
      "SkillUp's recorded course library is in development. A single one-time payment of ₹1,499 will unlock every self-paced course — the ones live at launch and every one added afterward — with new courses shipping incrementally starting the month after launch. Join the waitlist to be notified the moment it opens."
  },
  howItWorks: {
    eyebrow: "How the All-Access Pass works",
    title: "Pay once. The library keeps growing under the same pass.",
    items: [
      {
        title: "One-time payment",
        description:
          "No subscription and no per-course pricing. A single ₹1,499 payment unlocks the self-paced library."
      },
      {
        title: "Everything included",
        description:
          "Every self-paced course available at launch, plus every course added afterward, at no extra cost."
      },
      {
        title: "Built incrementally",
        description:
          "New recorded courses ship on an ongoing basis starting the month after launch — the library grows over time, not all at once."
      }
    ]
  },
  faq: {
    eyebrow: "All-Access Pass FAQ",
    title: "Questions about the pass",
    items: [
      {
        question: "Is the All-Access Pass available to buy now?",
        answer:
          "Not yet — the self-paced library is still in development. The planned price is ₹1,499 one-time for full access. Join the waitlist to be notified the moment it opens."
      },
      {
        question: "What happens to my access when new courses are added?",
        answer:
          "The All-Access Pass is a one-time payment for the whole library, not a per-course purchase — new self-paced courses are included automatically as they ship, at no extra cost."
      },
      {
        question: "How is this different from the live programs and bootcamps?",
        answer:
          "Programs and bootcamps are live, cohort-based, and mentor-led on a schedule. The self-paced library is recorded content you work through on your own time — a different format for a different kind of learner, not a replacement for the live tracks."
      }
    ]
  },
  form: {
    id: "waitlist-form",
    heading: "Join the All-Access waitlist",
    description:
      "Be first to know when the ₹1,499 All-Access Pass opens.",
    formType: "waitlist",
    analyticsEvent: analytics.events.waitlistSignup,
    interestLabel: "Which topics are you most interested in?",
    interestPlaceholder: "e.g. RAG, AI agents, evaluation",
    qualifyingLabel: "Anything else that would help us prioritize the first courses?",
    submitLabel: "Join the waitlist"
  }
} as const;
