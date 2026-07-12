import { brand } from "./brand";

export const about = {
  hero: {
    eyebrow: "About",
    title: "Practical AI education with engineering discipline.",
    description:
      "SkillUp helps learners and organizations turn AI interest into useful capability through clear teaching, applied practice, and maintainable workflows.",
    metrics: [
      { label: "Approach", value: "Practical" },
      { label: "Tone", value: "Clear" },
      { label: "Focus", value: "Outcomes" }
    ]
  },
  principles: {
    eyebrow: "Principles",
    title: "The learning experience is shaped by how real teams work.",
    description: brand.description,
    items: [
      {
        title: "Teach for transfer",
        description:
          "Every concept should help learners make better decisions when they return to their own projects and teams."
      },
      {
        title: "Prefer working patterns",
        description:
          "Programs emphasize workflows, evaluation habits, and implementation judgment over tool novelty."
      },
      {
        title: "Keep adoption responsible",
        description:
          "Learners build practical boundaries for data, review, accuracy, and human oversight."
      }
    ]
  }
} as const;
