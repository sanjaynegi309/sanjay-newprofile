import { brand } from "./brand";

export type ContactConfig = {
  email: string;
  phone: string;
  address: string;
};

export type SocialConfig = {
  linkedin: string;
  github: string;
  youtube: string;
  instagram: string;
  facebook: string;
};

export type SiteConfig = {
  name: string;
  url: string;
  basePath: string;
  language: string;
  locale: string;
  timezone: string;
  lms: {
    label: string;
    url: string;
  };
  contact: ContactConfig;
  social: SocialConfig;
};

export const site: SiteConfig = {
  name: brand.name,
  url: import.meta.env.SITE_URL || "https://sanjaynegi.in",
  basePath: "/",
  language: "en",
  locale: "en_US",
  timezone: "Asia/Calcutta",
  lms: {
    label: "Login",
    url: import.meta.env.PUBLIC_LMS_URL || "https://learn.sanjaynegi.in/"
  },
  contact: {
    email: "support@sanjaynegi.in",
    phone: "",
    address: ""
  },
  social: {
    linkedin: "https://www.linkedin.com/in/sanjay-negi-ai/",
    github: "https://github.com/sanjaynegi-ai",
    youtube: "https://www.youtube.com/@skillupwithsanjay",
    instagram: "https://www.instagram.com/skillup_with_sanjay/",
    facebook: "https://www.facebook.com/skillupwithsanjay"
  }
} as const;
