import { analytics } from "./analytics";
import { brand } from "./brand";

export const home = {
  seo: {
    title: `AI Engineering Mentorship with ${brand.mentor.name}`,
    description: "Practical, mentor-led AI engineering education for experienced professionals. Explore the flagship AI Engineer to FDE to GenAI Architect journey, live bootcamps, and corporate training."
  },
  hero: {
    eyebrow: "AI Engineering Mentorship for Experienced Professionals",
    title: "Engineer. Deliver. Architect.",
    tagline: "One Journey. Three AI Engineering Capabilities.",
    description: "Build on your professional experience. Learn to engineer production AI applications, deliver real-world AI solutions, and make sound architecture decisions through practical mentorship.",
    highlights: ["4-Month Live Flagship", "+12-Month Production AI Architecture Guild", "Maximum 15 Professionals Per Batch"],
    primary: { label: "Explore Flagship Mentorship", href: "/programs/", analyticsEvent: analytics.events.primaryCtaClick },
    secondary: { label: "Explore January Bootcamps", href: "/bootcamps/", analyticsEvent: analytics.events.ctaClick }
  },
  journey: {
    eyebrow: "The Flagship Mentorship",
    title: "One Journey. Three AI Engineering Capabilities.",
    description: "Four months of live learning, followed by twelve additional months of continued production AI engineering and architecture discussions.",
    stages: [
      { action: "Build", capability: "AI Engineer", description: "Engineer practical, production-oriented AI applications." },
      { action: "Deliver", capability: "Forward Deployed Engineer", description: "Translate business requirements into deployable AI solutions." },
      { action: "Architect", capability: "GenAI Architect", description: "Design and defend sound production AI architectures." }
    ],
    action: { label: "Explore the Complete Journey", href: "/programs/", analyticsEvent: analytics.events.programView }
  },
  bootcamps: {
    eyebrow: "January 2027 · AI Engineering Saturdays",
    title: "New Year. New AI Engineering Skills.",
    description: "Five independent, live three-hour bootcamps designed for experienced software professionals. Choose the topics that matter to your work.",
    note: "Each bootcamp stands alone. Attend any one independently.",
    action: { label: "Explore January Bootcamps", href: "/bootcamps/", analyticsEvent: analytics.events.ctaClick }
  },
  experiment: {
    eyebrow: "AI Engineering Challenge",
    title: "Would You Trust This AI Answer?",
    description: "An AI assistant answers a question using an internal incident-response document. Can you spot where it misinterprets the evidence?",
    label: "Fictional enterprise scenario",
    introduction: "Evaluate the answer against the source document before choosing your response.",
    sourceLabel: "Sample Incident Response Runbook",
    source: "Severity 1 incidents must be acknowledged within 10 minutes and receive status updates every 30 minutes. Severity 2 incidents must be acknowledged within 30 minutes and receive status updates every 60 minutes.",
    responseLabel: "AI-Generated Answer",
    response: "All production incidents must be acknowledged within 10 minutes, with status updates every 30 minutes.",
    prompt: "What's wrong with this AI answer?",
    choices: [
      { id: "fully-supported", label: "A. The answer is fully supported by the source.", correct: false, feedbackTitle: "Not quite.", feedback: "The answer applies Severity 1 rules to every incident, but the source specifies different requirements for Severity 2." },
      { id: "severity-generalization", label: "B. The AI incorrectly applies Severity 1 rules to all incidents.", correct: true, feedbackTitle: "Correct!", feedback: "The AI generalized Severity 1 requirements to all incidents, ignoring the different rules for Severity 2." },
      { id: "no-response-times", label: "C. The source does not mention incident response times.", correct: false, feedbackTitle: "Not quite.", feedback: "The answer applies Severity 1 rules to every incident, but the source specifies different requirements for Severity 2." }
    ],
    lesson: "Grounded AI answers need evidence verification, not just plausible wording.",
    resetLabel: "Try again",
    nextStep: { prompt: "Want to engineer AI systems that can be evaluated and trusted?", label: "Explore Flagship Mentorship", href: "/programs/" }
  },
  mentor: {
    eyebrow: "Personally Led by Sanjay Negi",
    title: "20+ Years of Engineering Experience. Practical AI Mentorship.",
    description: "Learn from a practitioner who connects software design, development, testing, deployment, and production operations with modern AI engineering.",
    quote: "Build. Evaluate. Review. Defend the Decisions.",
    action: { label: "Meet Your Mentor", href: "/about/", analyticsEvent: analytics.events.ctaClick }
  },
  corporate: {
    eyebrow: "AI Training for Teams",
    title: "Build AI Capabilities Across Your Team.",
    description: "Practical, customizable AI engineering and GenAI training designed around your team's business goals, workflows, and technical readiness.",
    action: { label: "Explore Corporate Training", href: "/teams/", analyticsEvent: analytics.events.corporateCta }
  },
  finalCta: {
    title: "Ready to Engineer the Next Generation of AI Systems?",
    description: "Explore a mentor-led professional learning journey designed for experienced engineers, technical leads, architects, and IT professionals.",
    primary: { label: "Explore the Flagship Program", href: "/programs/", analyticsEvent: analytics.events.primaryCtaClick },
    secondary: { label: "Explore Independent Bootcamps", href: "/bootcamps/", analyticsEvent: analytics.events.ctaClick }
  }
} as const;
