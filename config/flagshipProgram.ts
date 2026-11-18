import { analytics } from "./analytics";

export const TAGMANGO_REGISTRATION_URL =
  "https://learn.sanjaynegi.in/web/checkout/6afd228779901d1204871d43";

export const flagshipProgram = {
  seasonalMessage: "2027 Professional Development Cohorts — Limited to 15 Learners Per Batch.",
  registrationUrl: TAGMANGO_REGISTRATION_URL,
  registrationAnalyticsEvent: analytics.events.programApply,
  audience: ["Experienced Software Engineers", "Senior Developers & Tech Leads", "Solution & Cloud Architects", "Engineering Managers", "Technical Consultants", "Experienced IT Professionals moving into AI engineering responsibilities"],
  journey: [
    { period: "Months 1–2", capability: "AI Engineer", action: "Build", postCourse: false, topics: ["AI application engineering", "Retrieval-Augmented Generation", "AI agents and tool integration", "LLM application workflows", "Evaluation and testing", "Reliability and engineering best practices", "Production-oriented implementation"], outcome: "Build and evaluate practical AI-powered applications." },
    { period: "Month 3", capability: "Forward Deployed Engineer", action: "Deliver", postCourse: false, topics: ["Translating business problems into technical requirements", "Enterprise workflow integration", "Production deployment considerations", "API and system integration", "Working with business constraints", "Solution delivery and engineering trade-offs"], outcome: "Translate real business requirements into deployable AI solutions." },
    { period: "Month 4", capability: "GenAI Architect", action: "Architect", postCourse: false, topics: ["AI system architecture", "Scalability and resilience", "Security and governance", "Observability", "Latency and cost optimization", "Architecture decision-making", "Enterprise production design patterns"], outcome: "Design and defend production-oriented GenAI system architectures." },
    { period: "Months 5–16", capability: "Continued Professional Development", action: "Evolve", topics: ["Production AI project walkthroughs", "Architecture decisions and reviews", "Evolving engineering practices", "Structured peer and mentor discussions"], outcome: "Continue exploring production AI projects, architecture decisions, and evolving engineering practices with your mentor and professional cohort.", postCourse: true }
  ],
  technologyStack: {
    featured: [
      { name: "LangChain", use: "AI application development" },
      { name: "LangGraph", use: "Agent orchestration and workflows" },
      { name: "Hugging Face", use: "Models and inference" },
      { name: "AWS Bedrock", use: "Enterprise GenAI solutions" },
      { name: "Google Cloud", use: "AI platforms and deployment" },
      { name: "FastAPI", use: "Production API development" }
    ],
    supporting: ["Python", "Model APIs", "MCP", "RAG", "Vector Databases", "Docker", "Evaluation", "Observability & CI/CD"]
  },
  benefitGroups: [
    { title: "Live Learning Experience", items: ["Four months of live mentor-led sessions", "Production-focused practical learning", "Session-wise technical handouts", "Knowledge-check quizzes", "Role-focused technical interview questions", "Guided practice and learning discussions"] },
    { title: "Production Engineering Toolkit", items: ["Production AI Architecture Playbook", "Reusable engineering starter kits", "Project scaffolding and code examples", "Architecture decision checklists", "Production AI patterns and reference templates", "Engineering documentation resources"] },
    { title: "Project & Interview Readiness", items: ["Portfolio-ready capstone project", "Architecture documentation templates", "One structured final capstone architecture review", "Group technical interview simulation", "AI Engineer, FDE, and GenAI Architect interview preparation", "Project presentation and GitHub documentation guidance"] },
    { title: "Professional Growth", items: ["LinkedIn Profile Building course access", "Vibe Coding course access", "Professional peer-learning opportunities", "Continued learning through the post-course Guild"] }
  ],
  deliverables: [
    { number: "01", title: "Working AI application", type: "Build artifact", description: "A practical AI-powered application shaped through production-oriented implementation and evaluation." },
    { number: "02", title: "Production AI architecture blueprint", type: "Architecture artifact", description: "A system blueprint covering components, integrations, resilience, security, observability, and scale." },
    { number: "03", title: "Documented technical decision-making", type: "Decision artifact", description: "Clear architecture decisions, constraints, alternatives, and engineering trade-offs you can explain and defend." },
    { number: "04", title: "Portfolio-ready capstone case study", type: "Professional artifact", description: "A structured account of the problem, implementation, architecture, evaluation, and lessons learned." }
  ],
  guildThemes: ["Production-Grade AI Project Walkthroughs", "System Architecture Design & Reviews", "Scalability, Security & Reliability", "Observability, Evaluation & Cost Optimization", "Enterprise AI Implementation Challenges", "Emerging AI Engineering Patterns & Technologies", "Architecture Trade-Off Discussions", "Peer Learning and Technical Decision-Making"],
  batches: [
    { id: "weekday-early", name: "Weekday Early Morning", days: "Monday, Wednesday, Friday", time: "6:00 AM – 7:00 AM", timezone: "IST", hours: "3 live hours per week", duration: "4 months" },
    { id: "weekday-morning", name: "Weekday Morning", days: "Tuesday, Thursday", time: "8:00 AM – 9:30 AM", timezone: "IST", hours: "3 live hours per week", duration: "4 months" },
    { id: "weekend-morning", name: "Weekend Morning", days: "Saturday, Sunday", time: "8:00 AM – 9:30 AM", timezone: "IST", hours: "3 live hours per week", duration: "4 months" }
  ],
  faq: [
    { question: "Is this program for beginners?", answer: "No. This program is designed for experienced working professionals with existing technology, software engineering, systems, or relevant enterprise delivery experience." },
    { question: "Is this three separate courses?", answer: "No. It is one integrated four-month learning journey covering AI engineering, forward-deployed engineering, and GenAI architecture capabilities." },
    { question: "Do all batches cover the same curriculum?", answer: "Yes. All three schedules follow the same flagship curriculum and offer three live hours per week." },
    { question: "How is my batch confirmed?", answer: "After successful enrollment, we'll contact you via email or WhatsApp to collect your preferred batch schedule. Batch allocation is subject to availability, with a maximum of 15 learners per batch." },
    { question: "What happens after the four-month program?", answer: "Participants receive an additional 12 months of group-based production AI project and architecture discussions through the SkillUp Production AI Engineering & Architecture Guild." },
    { question: "How often are Guild sessions held?", answer: "Sessions are planned fortnightly, with three hours per session. Timings will be finalized in consultation with participating batches." },
    { question: "Will I receive learning resources?", answer: "Yes. Session-wise technical handouts, quizzes, interview preparation questions, architecture references, and engineering starter resources are included." },
    { question: "What if I miss a live class?", answer: "You'll have lifetime access to recordings of all live sessions, so you can revisit any class you miss and review the material at your own pace." },
    { question: "Will I work on projects?", answer: "Yes. Practical project work and a portfolio-ready capstone form part of the learning experience." },
    { question: "Do I need coding experience?", answer: "Hands-on engineering practice is central to the program. Experienced professionals without regular coding experience should expect additional preparation and independent practice. Specific prerequisites should be confirmed before enrollment." },
    { question: "Is placement guaranteed?", answer: "No. The program is focused on building professional capabilities, practical engineering judgment, and relevant technical experience. Job placement or specific career outcomes are not guaranteed." },
    { question: "What is the refund policy?", answer: "This is an exclusive, small-cohort mentorship program limited to 15 professionals per batch. Because each enrollment reserves a limited-capacity seat, course fees are non-refundable, except where required by applicable law or where SkillUp is unable to provide an agreed batch or suitable alternative.\n\nYour preferred batch will be collected after enrollment and confirmed subject to availability. Please review the schedule options and refund terms carefully before completing payment." },
    { question: "Where can I view the price?", answer: "Program fees and enrollment details are available on the registration page when you select “Reserve Your Seat.”" }
  ]
} as const;
