import { analytics } from "./analytics";

export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  analyticsEvent?: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export type NavigationConfig = {
  primary: NavigationItem[];
  footer: NavigationGroup[];
  utility: NavigationItem[];
};

export const navigation: NavigationConfig = {
  primary: [
    {
      label: "Programs",
      href: "/programs/",
      description: "Structured AI learning paths"
    },
    {
      label: "Workshops",
      href: "/workshops/",
      description: "Focused hands-on sessions"
    },
    {
      label: "For Teams",
      href: "/teams/",
      description: "Corporate AI enablement"
    },
    {
      label: "About",
      href: "/about/",
      description: "How SkillUp teaches AI"
    }
  ],
  footer: [
    {
      label: "Learning",
      items: [
        { label: "Programs", href: "/programs/" },
        { label: "Workshops", href: "/workshops/" }
      ]
    },
    {
      label: "Company",
      items: [
        { label: "About", href: "/about/" },
        { label: "Contact", href: "/contact/" },
        { label: "Privacy", href: "/privacy/" }
      ]
    }
  ],
  utility: [
    {
      label: "Contact",
      href: "/contact/",
      analyticsEvent: analytics.events.contact
    }
  ]
};

export const primaryNavigation = navigation.primary;
export const footerNavigation = navigation.footer;
