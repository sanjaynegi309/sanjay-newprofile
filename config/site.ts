import { brand } from "./brand";

export type ContactConfig = {
  email: string;
  phone: string;
  address: string;
};

export type SocialConfig = {
  linkedin: string;
  x: string;
  github: string;
  youtube: string;
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
  url: import.meta.env.SITE_URL || "https://example.com",
  basePath: import.meta.env.BASE_PATH || "/",
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
    x: "",
    github: "",
    youtube: ""
  }
} as const;
