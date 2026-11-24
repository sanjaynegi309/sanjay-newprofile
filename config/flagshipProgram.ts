import { programBatches } from "./programBatches";

const batchStartSummary = programBatches.batches
  .map((batch, index) => `${batch.label}${index === 0 ? " starts" : ""} ${index === 0 ? batch.starts : batch.starts.replace(" 2027", "")}`)
  .join(", ");

export const flagshipProgram = {
  seasonalMessage: "2027 Professional Development Cohorts — Limited to 15 Learners Per Batch.",
  mentorDescription: "I'm Sanjay Negi. After 22+ years across enterprise software design, development, testing, deployment, monitoring, and production support, I built my own route into AI Engineering—and turned that route into structured mentorship for other professionals.",
  audience: ["Experienced Software Engineers", "Senior Developers & Tech Leads", "Solution & Cloud Architects", "Engineering Managers", "Technical Consultants", "Experienced IT Professionals moving into AI engineering responsibilities"],
  journey: [
    { period: "2–3 weeks before week 1; gates due end of week 2", capability: "Pre-work", action: "Prepare", topics: ["P1 Infra bootcamp: Docker, CI, Terraform on AWS, Kubernetes", "P2 ML foundations: baselines, honest metrics"], outcome: "Confirm your infrastructure and ML foundations before the core program begins." },
    { period: "Weeks 1–4", capability: "Build", action: "Build", topics: ["M01 LLM internals & AI problem framing", "M02 ML vs GenAI baselines & cost modeling"], outcome: "Frame AI problems and build evidence-based baselines before choosing an approach." },
    { period: "Weeks 5–8", capability: "Prove", action: "Prove", topics: ["M03 Retrieval & RAG done right", "M04 Evals, structured outputs, tools & agents"], outcome: "Evaluate system behavior and prove that an AI solution works as intended." },
    { period: "Weeks 9–14", capability: "Operate", action: "Operate", topics: ["M05 LLMOps: CI/CD, IaC, serving", "M06 Observability, guardrails, security, cost & latency", "M07 Post-production: drift, online evals, SRE for AI"], outcome: "Deploy, observe and operate production AI systems with appropriate controls." },
    { period: "Weeks 15–16", capability: "Deliver", action: "Deliver", topics: ["M08 FDE in practice, game day & capstone defense"], outcome: "Defend your engineering decisions and deliver the system in a client-facing setting." }
  ],
  roleOutcomes: [
    { role: "AI Engineer", outcome: "Build and evaluate practical AI-powered applications." },
    { role: "Forward Deployed Engineer", outcome: "Translate real business requirements into deployable AI solutions." },
    { role: "GenAI Architect", outcome: "Design and defend production-oriented GenAI system architectures." }
  ],
  programFormat: [
    { title: "One capstone, built through milestones", description: "Build one capstone step by step, deploy it to AWS, then finish with a game day on your own system and a capstone defense: a recorded client pitch, live Q&A and an incident." },
    { title: "Production failure practice", description: "Take part in weekly failure clinics and break-fix labs where systems fail silently—they return 200 OK with a wrong answer—and find out why." },
    { title: "Automated grading and feedback", description: "Submit a lab as a pull request and receive a graded result, usually within an hour. Weekly quizzes explain the answers as soon as you submit." },
    { title: "A realistic weekly commitment", description: "Plan for 7–9 hours a week: 3 live hours plus 4–6 hours of labs and self-study." },
    { title: "Readiness gates before the core", description: "P1 infrastructure and P2 ML foundations tell you early whether you're ready. Both are due at the end of week 2." }
  ],
  proofLinks: [
    { label: "Start here", href: "https://github.com/deep-skill-networks/course-hub/blob/main/START-HERE.md" },
    { label: "Course hub (syllabus, radar, case library)", href: "https://github.com/deep-skill-networks/course-hub" },
    { label: "Shared toolkit (open source)", href: "https://github.com/deep-skill-networks/shared-toolkit" }
  ],
  technologyStack: {
    featured: [
      { name: "AWS", use: "Lambda, ECR and Bedrock" },
      { name: "Terraform", use: "Infrastructure as code" },
      { name: "Containers", use: "Reproducible packaging and delivery" },
      { name: "Kubernetes", use: "Container orchestration" },
      { name: "OpenTelemetry", use: "Production observability" },
      { name: "Eval-gated CI", use: "Quality gates for AI delivery" }
    ],
    frameworkExamples: ["LangChain", "LangGraph", "Hugging Face", "FastAPI"]
  },
  benefitGroups: [
    { title: "Live Learning Experience", items: ["Four months of live mentor-led sessions", "Production-focused practical learning", "Session-wise technical handouts", "Knowledge-check quizzes", "Role-focused technical interview questions", "Guided practice and learning discussions"] },
    { title: "Production Engineering Toolkit", items: ["Production AI Architecture Playbook", "Reusable engineering starter kits", "Project scaffolding and code examples", "Architecture decision checklists", "Production AI patterns and reference templates", "Engineering documentation resources"] },
    { title: "Project & Interview Readiness", items: ["Portfolio-ready capstone project", "Architecture documentation templates", "A portfolio capstone built through milestones, ending in a game day and a capstone defense.", "Group technical interview simulation", "AI Engineer, FDE, and GenAI Architect interview preparation", "Project presentation and GitHub documentation guidance"] },
    { title: "Professional Growth", items: ["Professional peer-learning opportunities", "Continued learning through the post-course Guild"] }
  ],
  bonusItems: ["LinkedIn Profile Building course access", "Vibe Coding course access"],
  deliverables: [
    { number: "01", title: "Working AI application", type: "Build artifact", description: "A practical AI-powered application shaped through production-oriented implementation and evaluation." },
    { number: "02", title: "Production AI architecture blueprint", type: "Architecture artifact", description: "A system blueprint covering components, integrations, resilience, security, observability, and scale." },
    { number: "03", title: "Documented technical decision-making", type: "Decision artifact", description: "Clear architecture decisions, constraints, alternatives, and engineering trade-offs you can explain and defend." },
    { number: "04", title: "Portfolio-ready capstone case study", type: "Professional artifact", description: "A structured account of the problem, implementation, architecture, evaluation, and lessons learned." }
  ],
  guildThemes: ["Production-Grade AI Project Walkthroughs", "System Architecture Design & Reviews", "Scalability, Security & Reliability", "Observability, Evaluation & Cost Optimization", "Enterprise AI Implementation Challenges", "Emerging AI Engineering Patterns & Technologies", "Architecture Trade-Off Discussions", "Peer Learning and Technical Decision-Making"],
  faq: [
    { question: "Is this program for beginners?", answer: "No. This program is designed for experienced working professionals with existing technology, software engineering, systems, or relevant enterprise delivery experience." },
    { question: "Is this three separate courses?", answer: "No. It is one integrated four-month learning journey covering AI engineering, forward-deployed engineering, and GenAI architecture capabilities." },
    { question: "Do all batches cover the same curriculum?", answer: "Yes. All three schedules follow the same flagship curriculum and offer three live hours per week." },
    { question: "How is my batch confirmed?", answer: "When you enroll. Each batch has its own enrollment link, so your payment reserves your seat in that batch. Each batch is limited to 15 learners." },
    { question: "When does my batch start?", answer: `${batchStartSummary}. Pre-work opens ${programBatches.cohort.preworkOpens} and is due at the end of week 2.` },
    { question: "What happens after the four-month program?", answer: "Participants receive an additional 12 months of group-based production AI project and architecture discussions through the SkillUp Production AI Engineering & Architecture Guild." },
    { question: "How often are Guild sessions held?", answer: "The Guild includes about 26 sessions over 12 months. Sessions are planned fortnightly and last 60 minutes. Timings will be finalized in consultation with participating batches." },
    { question: "Will I receive learning resources?", answer: "Yes. Session-wise technical handouts, quizzes, interview preparation questions, architecture references, and engineering starter resources are included." },
    { question: "What if I miss a live class?", answer: "You'll have lifetime access to recordings of all live sessions, so you can revisit any class you miss and review the material at your own pace." },
    { question: "How do I join sessions and watch recordings?", answer: "After you enroll, sign in to the learning platform (learn.sanjaynegi.in) with your phone number and a one-time code. Live sessions and their Zoom links are under WORKSHOPS; recordings and course material are under COURSES." },
    { question: "Will I work on projects?", answer: "Yes. Practical project work and a portfolio-ready capstone form part of the learning experience." },
    { question: "Do I need coding experience?", answer: "Hands-on engineering practice is central to the program. Experienced professionals without regular coding experience should expect additional preparation and independent practice. The pre-work (P1 infrastructure and P2 ML foundations) shows you exactly what's expected. If it feels out of reach, talk to us before you enroll." },
    { question: "Is placement guaranteed?", answer: "No. The program is focused on building professional capabilities, practical engineering judgment, and relevant technical experience. Job placement or specific career outcomes are not guaranteed." },
    { question: "What is the refund policy?", answer: "Fees are non-refundable once you're enrolled, except where required by law or where we can't provide your batch. If your batch fills while your payment is in progress, you can switch batch, move to the next cohort, or get a full refund." },
    { question: "Where can I view the price?", answer: "Program fees and enrollment details are available on the registration page when you select “Reserve Your Seat.”" }
  ]
} as const;
