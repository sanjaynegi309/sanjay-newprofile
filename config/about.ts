import { analytics } from "./analytics";

export const about = {
  hero: {
    eyebrow: "Meet your AI Engineering mentor",
    title: "Real Engineering Experience. Practical AI Mentorship.",
    supporting: "I teach AI the way experienced engineers learn best: by building, reviewing, and explaining decisions.",
    description: "I'm Sanjay Negi. After more than two decades across enterprise software design, development, testing, deployment, monitoring, and production support, I built my own route into AI Engineering—and turned that route into structured mentorship for other professionals.",
    paragraphs: [
      "I'm Sanjay Negi. After more than two decades across enterprise software design, development, testing, deployment, monitoring, and production support, I built my own route into AI Engineering.",
      "Today, I use that experience to help working professionals develop practical AI engineering capabilities—from building applications to delivering enterprise solutions and making sound architecture decisions."
    ],
    highlights: ["20+ Years in Software Engineering", "AI Engineering • FDE • GenAI Architecture"],
    actions: [
      { label: "Explore My Flagship Mentorship", href: "/programs/", variant: "primary" as const, analyticsEvent: analytics.events.primaryCtaClick },
      { label: "My Teaching Philosophy", href: "#teaching-philosophy", variant: "secondary" as const, analyticsEvent: analytics.events.ctaClick }
    ]
  },
  story: {
    eyebrow: "Why I teach",
    title: "The Missing Piece Wasn't Another Framework. It Was a Path to Complete AI Systems.",
    paragraphs: [
      "When generative AI began changing software work, I explored courses and tutorials like many experienced engineers.",
      "They helped me understand individual tools and concepts. But knowing how a framework works is different from knowing how to design, build, evaluate, and operate a complete AI system.",
      "I wanted a learning approach that connected AI engineering to the software fundamentals professionals already understand: requirements, architecture, implementation, testing, deployment, monitoring, and technical decision-making.",
      "That's the thinking behind SkillUp."
    ],
    quote: "My goal is to help experienced professionals build AI systems they can test, deploy, review, and explain—not simply complete another collection of tutorials."
  },
  experience: {
    eyebrow: "Engineering perspective",
    title: "AI Changes the Tools. Engineering Fundamentals Still Matter.",
    description: "My approach draws on years of experience across the software delivery lifecycle. Reliable AI systems still require strong requirements, thoughtful architecture, testing, observability, production support, and clear engineering decisions.",
    capabilities: [
      { title: "System Design", description: "Understand business requirements, technical constraints, and architecture." },
      { title: "Software Development", description: "Translate designs into working, maintainable solutions." },
      { title: "Testing & Evaluation", description: "Measure system behavior, quality, and reliability." },
      { title: "Deployment & Integration", description: "Connect applications to real services and production workflows." },
      { title: "Monitoring & Operations", description: "Understand system behavior after deployment." },
      { title: "Architecture Decisions", description: "Evaluate trade-offs involving scalability, security, cost, and maintainability." }
    ]
  },
  method: {
    eyebrow: "How I teach",
    title: "Difficult Ideas Become Clearer When Every Concept Has a Job.",
    description: "I connect each concept to a practical decision, a working implementation, and a review—rather than teaching disconnected tools and framework terminology.",
    steps: [
      { number: "01", title: "Start with the system", description: "See the problem, users, data, constraints, and architecture before choosing tools." },
      { number: "02", title: "Build the smallest useful version", description: "Turn the idea into working code, then inspect where retrieval, model behavior, or integration can fail." },
      { number: "03", title: "Test the answer", description: "Use evaluation, source checks, guardrails, and human review to decide whether the system is dependable." },
      { number: "04", title: "Defend the decisions", description: "Explain architecture choices, trade-offs, production readiness, and what should improve next." }
    ]
  },
  audience: {
    eyebrow: "Built for experienced professionals",
    title: "Your Experience Is an Advantage. Build on It.",
    description: "I work with experienced technology professionals who want to apply their existing software engineering, systems, architecture, or enterprise delivery experience to modern AI systems.",
    roles: ["Software Engineers & Senior Developers", "Technical Leads", "Solution & Cloud Architects", "Engineering Managers", "Technical Consultants", "Experienced IT Professionals transitioning into AI engineering responsibilities"],
    note: "This is not a beginner programming program. The approach assumes professional experience, independent practice, and willingness to work hands-on with technical systems."
  },
  mentoring: {
    eyebrow: "The mentorship experience",
    title: "Bring the Unfinished Work. Let's Review What Is Actually Happening.",
    description: "Real engineering learning happens when ideas meet implementation constraints. My mentorship approach emphasizes practical work, discussion, feedback, and clear technical reasoning.",
    experiences: [
      { title: "Ask Better Questions", description: "Explore implementation problems and engineering choices during live discussions." },
      { title: "Review Real Engineering Decisions", description: "Discuss system architecture, source code, evaluation, and production-readiness considerations." },
      { title: "Improve Through Iteration", description: "Refine implementations instead of treating the first working version as finished." },
      { title: "Explain What You've Built", description: "Develop documentation, technical narratives, and the ability to justify decisions." }
    ],
    boundary: "Mentorship is a structured, group-based learning experience. It does not include unlimited personal reviews, continuous one-to-one access, or individual project consulting."
  },
  continued: {
    eyebrow: "Continued professional development",
    title: "Learning Doesn't End When the Course Does.",
    description: "Production AI engineering continues to evolve. That's why my flagship mentorship includes an additional 12 months of structured production AI project and architecture discussions after the four-month core program.",
    metrics: [["4 Months", "Core Live Program"], ["+12 Months", "Post-Course Architecture Guild"], ["Fortnightly", "Group Technical Discussions"]],
    note: "Guild discussions run for three hours per session, with timing finalized in consultation with participating batches."
  },
  work: {
    eyebrow: "Connect with me",
    title: "Explore My Work and Learning Community.",
    description: "Follow the public work, technical discussions, and current mentorship journey through these verified channels."
  }
} as const;
