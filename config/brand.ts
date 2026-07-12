export type BrandConfig = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  logo: {
    text: string;
    mark: string;
  };
  voice: {
    adjectives: string[];
  };
};

export const brand: BrandConfig = {
  name: "SkillUp",
  legalName: "SkillUp Learning",
  tagline: "Practical AI education for modern teams",
  description:
    "SkillUp helps professionals and organizations build useful AI skills through structured programs, workshops, and hands-on learning.",
  logo: {
    text: "SkillUp",
    mark: "/favicon.svg"
  },
  voice: {
    adjectives: ["professional", "practical", "clear", "engineering-first"]
  }
} as const;
