import { analytics } from "./analytics";

export const corporate = {
  hero: {
    eyebrow: "Corporate training",
    title: "Build AI Capabilities That Translate Into Business Outcomes.",
    description:
      "Practical, customizable AI engineering and GenAI training for teams that want to identify valuable opportunities, build reliable solutions, and develop stronger technical decision-making. Personally designed and led by Sanjay Negi, drawing on 20+ years of software engineering experience.",
    actions: [
      {
        label: "Discuss Your Team's AI Training Needs",
        href: "#corporate-enquiry-form",
        analyticsEvent: analytics.events.primaryCtaClick
      },
      {
        label: "Explore Training Tracks",
        href: "#training-tracks",
        variant: "secondary",
        analyticsEvent: analytics.events.ctaClick
      }
    ],
    metrics: [
      { label: "Experience", value: "20+ years" },
      { label: "Led by", value: "Sanjay Negi" },
      { label: "Approach", value: "Goal first" }
    ]
  },
  tracks: {
    eyebrow: "Corporate training tracks",
    title: "Focused AI Training. Tailored to Your Team.",
    description: "Choose a starting focus. We'll tailor the depth, exercises, duration, and delivery format around your team's experience and business goals.",
    items: [
      { title: "AI Engineering & Agentic AI", description: "AI application engineering, LLM workflows, tool integration, agent orchestration, RAG, and evaluation.", detail: "Technologies may include LangChain, LangGraph, Hugging Face, and relevant model APIs." },
      { title: "Enterprise RAG & Production AI", description: "Retrieval architecture, enterprise integrations, evaluation, observability, reliability, and deployment patterns.", detail: "" },
      { title: "Forward Deployed AI Engineering", description: "Translate business problems into implementation plans, integrate AI with real workflows, and explore practical delivery trade-offs.", detail: "" },
      { title: "GenAI Architecture & Technical Leadership", description: "System design, scalability, governance, security, evaluation strategy, cloud architecture, and cost-performance decisions.", detail: "" }
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
          "Exercises are designed to clarify where AI may reduce friction, improve throughput, or support customer and employee experiences."
      },
      {
        title: "Shared evaluation habits",
        description:
          "Participants practise judging AI output quality, identifying failure modes, and defining acceptance criteria before scaling a workflow."
      },
      {
        title: "Responsible adoption patterns",
        description:
          "Sessions can help leaders and practitioners discuss boundaries for data use, review, escalation, and human oversight."
      },
      {
        title: "Workflow-level implementation plans",
        description:
          "A scoped engagement can include practical next steps for roles, processes, and tools."
      }
    ]
  },
  engagement: {
    eyebrow: "How engagements work",
    title: "A lightweight path from discovery to practical capability.",
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
      "Engineering & Platform Teams",
      "Product & Innovation Teams",
      "Operations & Business Teams",
      "Leadership Groups Planning AI Adoption"
    ]
  },
  deliverables: {
    eyebrow: "Example deliverables",
    title: "What Your Team Can Walk Away With",
    items: [
      "AI Opportunity Prioritization Matrix",
      "Working AI Workflow or Proof of Concept",
      "Architecture Blueprint & Decision Record",
      "Evaluation & Production-Readiness Checklist"
    ],
    note: "Deliverables depend on the agreed engagement scope, team readiness, and training format."
  },
  why: {
    eyebrow: "Why SkillUp",
    title: "Practitioner-Led. Built Around Your Real Work.",
    description: "SkillUp training is personally designed and led by Sanjay Negi. With more than two decades of experience across the enterprise software lifecycle, the approach connects modern AI engineering to requirements, architecture, implementation, testing, deployment, monitoring, and production considerations."
  },
  finalCta: {
    title: "Let's Discuss Your Team's AI Training Needs.",
    description:
      "Share your team context, training goals, and expected timeline so we can scope a relevant learning intervention."
  },
  form: {
    id: "corporate-enquiry-form",
    heading: "Let's Discuss Your Team's AI Training Needs.",
    description:
      "Share your team goals, audience, and business outcome. We'll send it straight to Sanjay; if that doesn't go through, you'll get a prefilled email instead.",
    analyticsEvent: analytics.events.corporateCta,
    interestLabel: "Company or team",
    interestPlaceholder: "e.g. Platform Engineering, Acme Ltd.",
    goalsLabel: "Training goals",
    qualifyingLabel: "Team size and timeline",
    submitLabel: "Request a Training Discussion"
  }
} as const;
