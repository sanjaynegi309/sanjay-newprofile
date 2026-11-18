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
    eyebrow: "Build. Evaluate. Explain.",
    title: "Would you trust this AI answer?",
    description: "Read the fictional source, inspect the answer, and find the claim the evidence does not support.",
    label: "Illustrative exercise · fictional source · no live AI",
    introduction: "A support assistant answers a question about a fictional workshop's cancellation policy.",
    sourceLabel: "Source / Northstar AI Workshop policy",
    source: "Cancellations made at least seven days before the workshop receive a full refund. Later cancellations may transfer their place to another person. Refunds are processed within five business days.",
    responseLabel: "Fictional AI response",
    response: "You can receive a full refund if you cancel seven days before the workshop. Late cancellations can transfer the booking to someone else, and refunds usually arrive in three business days.",
    prompt: "Which claim is unsupported by the source?",
    choices: [
      { id: "refund-window", label: "A full refund requires seven days' notice", correct: false, feedbackTitle: "That claim is supported.", feedback: "The first sentence says cancellations made at least seven days before the workshop receive a full refund. You can point to the evidence directly." },
      { id: "transfer-place", label: "A late booking can be transferred", correct: false, feedbackTitle: "That claim is supported.", feedback: "The source says later cancellations may transfer their place to another person. The AI paraphrased this without changing its meaning." },
      { id: "refund-speed", label: "Refunds usually arrive in three business days", correct: true, feedbackTitle: "You found the unsupported claim.", feedback: "The source says refunds are processed within five business days. It never promises that they usually arrive in three. The AI introduced a more specific timeline without evidence." }
    ],
    lesson: "A mostly correct answer can still contain one invented detail. Check each important claim against the source—especially numbers, dates, prices, and promises.",
    resetLabel: "Try again",
    nextStep: { label: "Explore the flagship mentorship", href: "/programs/" }
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
