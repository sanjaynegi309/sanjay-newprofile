export type JanuaryBootcamp = {
  slug: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  date: string;
  dateLabel: string;
  shortDate: string;
  time: string;
  duration: string;
  format: string;
  audienceSummary: string;
  why: string;
  learning: readonly string[];
  project: { title: string; description: string };
  technologies: readonly string[];
  audience: readonly string[];
  prerequisites: readonly string[];
  registrationUrl: string | null;
  seo: { title: string; description: string };
};

export const januaryBootcamps: readonly JanuaryBootcamp[] = [
  {
    slug: "spec-driven-ai-development",
    title: "Spec-Driven AI Development",
    category: "AI-Assisted Software Engineering",
    headline: "Stop Prompting Randomly. Start Engineering with AI.",
    description: "Turn requirements into structured specifications, working code, and verified implementations using AI coding agents.",
    date: "2027-01-02", dateLabel: "Saturday, January 2, 2027", shortDate: "Jan 02", time: "7–10 PM IST", duration: "3 hours", format: "Live Online",
    audienceSummary: "Experienced developers, software engineers, and technical leads",
    why: "AI coding agents can produce code quickly, but vague instructions often lead to inconsistent implementations, missing requirements, and difficult-to-maintain software. This bootcamp focuses on engineering discipline when working with AI coding agents.",
    learning: ["Translate business requirements into clear development specifications.", "Structure tasks for AI coding agents.", "Generate and review application code.", "Validate implementation with tests.", "Maintain engineering control over AI-generated changes."],
    project: { title: "AI-Powered Support Ticket API", description: "Create a small AI-assisted API feature using specifications, structured coding-agent tasks, and automated validation. The emphasis is on a disciplined workflow and a reviewable implementation—not an enterprise-ready product in three hours." },
    technologies: ["AI Coding Agents", "Python", "Git", "Testing"], audience: ["Experienced developers", "Software engineers", "Technical leads"], prerequisites: ["Basic software development", "Git", "Familiarity with an AI coding assistant"], registrationUrl: null,
    seo: { title: "Spec-Driven AI Development Bootcamp", description: "Join a live three-hour SkillUp bootcamp on specifications, AI coding agents, code generation, and automated validation on January 2, 2027." }
  },
  {
    slug: "ai-powered-code-review",
    title: "AI-Powered Code Review",
    category: "AI Software Quality",
    headline: "Your AI Can Write Code. Can It Catch Bad Code?",
    description: "Build an intelligent code review assistant that identifies bugs, security risks, and architectural issues.",
    date: "2027-01-09", dateLabel: "Saturday, January 9, 2027", shortDate: "Jan 09", time: "7–10 PM IST", duration: "3 hours", format: "Live Online",
    audienceSummary: "Software engineers, senior developers, technical leads, and reviewers",
    why: "AI can accelerate code generation, but software quality still depends on detecting defects, security issues, and architectural inconsistencies.",
    learning: ["Understand AI-assisted code review patterns.", "Analyze Git changes and repository context.", "Identify correctness and security concerns.", "Generate structured review findings.", "Evaluate review quality and false positives."],
    project: { title: "AI Pull Request Review Assistant", description: "Build a practical assistant that examines code changes and produces structured, prioritized review feedback. The project demonstrates a focused review workflow rather than a complete production review platform." },
    technologies: ["Git", "LLM APIs", "Code Review", "Security"], audience: ["Software engineers", "Senior developers", "Technical leads", "Code reviewers"], prerequisites: ["Comfort with Git", "Pull requests", "Basic application development"], registrationUrl: null,
    seo: { title: "AI-Powered Code Review Bootcamp", description: "Build an AI pull request review assistant in a live three-hour SkillUp bootcamp on January 9, 2027." }
  },
  {
    slug: "multi-agent-systems",
    title: "Multi-Agent Systems with CrewAI",
    category: "Agentic AI Engineering",
    headline: "One Agent Is Useful. What Happens When Agents Collaborate?",
    description: "Build a coordinated team of specialized AI agents that work together to complete practical business workflows.",
    date: "2027-01-16", dateLabel: "Saturday, January 16, 2027", shortDate: "Jan 16", time: "7–10 PM IST", duration: "3 hours", format: "Live Online",
    audienceSummary: "Python developers, AI application developers, and technical architects",
    why: "Some business workflows benefit from specialized agents working together, but adding more agents can also increase complexity, latency, and cost.",
    learning: ["Understand single-agent versus multi-agent design.", "Define agent responsibilities and tasks.", "Implement coordinated workflows using CrewAI.", "Pass structured information between agents.", "Evaluate collaboration quality and engineering trade-offs."],
    project: { title: "Enterprise Incident Analysis Agent Team", description: "Create a small multi-agent workflow where specialized agents collaborate to analyze an incident and prepare a structured response recommendation. The goal is to examine coordination and trade-offs in a bounded example." },
    technologies: ["CrewAI", "Python", "Agent Orchestration"], audience: ["Python developers", "AI application developers", "Technical architects"], prerequisites: ["Python fundamentals", "Basic LLM concepts"], registrationUrl: null,
    seo: { title: "Multi-Agent Systems with CrewAI Bootcamp", description: "Build a coordinated CrewAI agent workflow in a live three-hour SkillUp bootcamp on January 16, 2027." }
  },
  {
    slug: "deep-agents-loop-engineering",
    title: "Deep Agents & Loop Engineering",
    category: "Deep Agent Engineering",
    headline: "Build AI Agents That Don't Just Execute. They Verify.",
    description: "Design agent workflows that plan, execute, inspect results, recover from failures, and improve using controlled feedback loops.",
    date: "2027-01-23", dateLabel: "Saturday, January 23, 2027", shortDate: "Jan 23", time: "7–10 PM IST", duration: "3 hours", format: "Live Online",
    audienceSummary: "AI engineers, experienced developers, and technical leads",
    why: "A single successful agent execution does not guarantee a reliable result. Useful agent systems need verification, controlled retries, failure handling, and observability.",
    learning: ["Understand agent execution and verification loops.", "Explore Deep Agent architecture.", "Implement bounded execute–verify–retry workflows.", "Capture execution traces and failures.", "Improve reliability using evidence-based feedback."],
    project: { title: "Self-Checking Engineering Documentation Agent", description: "Build an agent that updates documentation, verifies results against defined checks, and retries within controlled limits. The outcome is a compact demonstration of loop engineering, not a fully autonomous production system." },
    technologies: ["LangChain Deep Agents", "Verification", "Agent Loops"], audience: ["AI engineers", "Experienced developers", "Technical leads"], prerequisites: ["Python", "LLM tool calling", "Basic agent workflow familiarity"], registrationUrl: null,
    seo: { title: "Deep Agents & Loop Engineering Bootcamp", description: "Build a bounded execute-verify-retry agent workflow in a live SkillUp bootcamp on January 23, 2027." }
  },
  {
    slug: "production-ai-guardrails",
    title: "Production AI Guardrails",
    category: "Production AI Reliability",
    headline: "From AI That Works to AI You Can Trust.",
    description: "Implement validation, policy checks, security controls, and evaluation practices for more reliable LLM applications.",
    date: "2027-01-30", dateLabel: "Saturday, January 30, 2027", shortDate: "Jan 30", time: "7–10 PM IST", duration: "3 hours", format: "Live Online",
    audienceSummary: "AI engineers, backend engineers, and technical architects",
    why: "LLM applications can produce malformed outputs, unsafe tool requests, policy violations, or unreliable answers. Production-oriented systems need validation, safety controls, and measurable failure handling.",
    learning: ["Understand common LLM application risks.", "Implement input and output validation.", "Enforce structured-response contracts.", "Explore prompt-injection and policy testing.", "Design controlled failure-handling patterns."],
    project: { title: "Guardrail-Protected AI Support Assistant", description: "Add layered validation and safety controls to a small AI application and test its behavior against problematic inputs. The project demonstrates practical protection patterns within a workshop-sized scope." },
    technologies: ["Guardrails", "LLM Security", "Evaluation", "Reliability"], audience: ["AI engineers", "Backend engineers", "Technical architects"], prerequisites: ["Basic Python", "APIs", "LLM application concepts"], registrationUrl: null,
    seo: { title: "Production AI Guardrails Bootcamp", description: "Add validation, security controls, and evaluation to an LLM application in a live SkillUp bootcamp on January 30, 2027." }
  }
] as const;

export function getJanuaryBootcamp(slug: string): JanuaryBootcamp | undefined {
  return januaryBootcamps.find((bootcamp) => bootcamp.slug === slug);
}
