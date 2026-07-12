import { analytics } from "./analytics";
import { brand } from "./brand";

export type HomeFeature = {
  title: string;
  description: string;
};

export type HomeFaq = {
  question: string;
  answer: string;
};

export const home = {
  hero: {
    eyebrow: "AI education for builders and teams",
    title: brand.tagline,
    description:
      "Build practical AI capability through focused programs, live workshops, and team training designed around real engineering and product workflows.",
    actions: [
      {
        label: "Explore programs",
        href: "/programs/",
        analyticsEvent: analytics.events.ctaClick
      },
      {
        label: "Train your team",
        href: "/teams/",
        variant: "secondary",
        analyticsEvent: analytics.events.corporateCta
      }
    ],
    metrics: [
      { label: "Learning formats", value: "Live + cohort" },
      { label: "Focus", value: "Applied AI" },
      { label: "Audience", value: "Professionals" }
    ]
  },
  whyLearnHere: {
    eyebrow: "Why learn here",
    title: "Designed for people who need AI skills that survive real work.",
    description:
      "The learning experience is practical, implementation-minded, and grounded in how teams actually build, evaluate, and adopt AI systems.",
    features: [
      {
        title: "Engineering-first curriculum",
        description:
          "Concepts are tied to implementation patterns, evaluation habits, and maintainable delivery practices."
      },
      {
        title: "Content-driven learning paths",
        description:
          "Programs and workshops can evolve independently without rebuilding the website or duplicating information."
      },
      {
        title: "Business outcomes included",
        description:
          "Learners connect technical decisions to product value, team adoption, and operational risk."
      }
    ]
  },
  programs: {
    eyebrow: "Featured live programs",
    title: "Structured paths for practical AI fluency.",
    description:
      "Live and cohort-based programs help learners turn AI ideas into reliable workflows and working systems."
  },
  workshops: {
    eyebrow: "Featured workshops",
    title: "Focused sessions for immediate capability.",
    description:
      "Short-format workshops help teams build shared language and hands-on confidence around specific AI topics."
  },
  corporateTraining: {
    eyebrow: "Corporate training",
    title: "Bring practical AI learning into your team workflow.",
    description:
      "Private programs can be shaped around your team roles, tooling, use cases, and adoption goals.",
    features: [
      "Role-aware learning paths",
      "Private workshops for teams",
      "Use-case discovery and prioritization",
      "Evaluation and responsible adoption practices"
    ],
    action: {
      label: "Plan corporate training",
      href: "/teams/",
      analyticsEvent: analytics.events.corporateCta
    }
  },
  founder: {
    eyebrow: "Founder-led learning",
    title: "Built by practitioners, not trend watchers.",
    name: "Sanjay Negi",
    role: "Founder and AI educator",
    description:
      "The teaching approach combines engineering discipline with clear business thinking, helping learners move from vague AI interest to practical capability."
  },
  testimonials: {
    eyebrow: "Learner outcomes",
    title: "Trusted by professionals turning AI into useful work.",
    description:
      "Learners and teams use the programs to move from AI experiments to practical, maintainable workflows."
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions",
    description:
      "Answers stay configuration-driven until a fuller resources section is introduced.",
    items: [
      {
        question: "Who are these programs for?",
        answer:
          "They are designed for professionals, developers, product teams, and leaders who need practical AI fluency rather than abstract theory."
      },
      {
        question: "Can workshops be delivered privately?",
        answer:
          "Yes. Private workshops can be tailored to team roles, current projects, and internal adoption goals."
      },
      {
        question: "Is the site ready for GitHub Pages?",
        answer:
          "Yes. The website is statically generated with Astro and avoids server-side runtime dependencies."
      }
    ]
  },
  finalCta: {
    title: "Build AI capability your team can actually use.",
    description:
      "Start with a focused program, a private workshop, or a conversation about the right learning path.",
    actions: [
      {
        label: "Contact SkillUp",
        href: "/contact/",
        analyticsEvent: analytics.events.contact
      },
      {
        label: "View workshops",
        href: "/workshops/",
        variant: "secondary",
        analyticsEvent: analytics.events.workshopRegistration
      }
    ]
  }
} as const;
