import { analytics } from "./analytics";

export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  analyticsEvent?: string;
  hidden?: boolean;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export type NavigationConfig = {
  primary: NavigationItem[];
  footer: NavigationGroup[];
  utility: NavigationItem[];
  prospectAction: NavigationItem;
};

export const navigation: NavigationConfig = {
  prospectAction: { label: "Find your learning path", href: "/contact/", analyticsEvent: analytics.events.primaryCtaClick },
  primary: [
    {
      label: "Bootcamps",
      href: "/bootcamps/",
      description: "Independent live AI intensives"
    },
    {
      label: "Programs",
      href: "/programs/",
      description: "Structured AI learning paths"
    },
    {
      label: "Self-Paced",
      href: "/self-paced/",
      description: "Recorded courses — coming soon",
      hidden: true
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
        { label: "Bootcamps", href: "/bootcamps/" },
        { label: "Programs", href: "/programs/" },
        { label: "Self-Paced", href: "/self-paced/", hidden: true }
      ]
    },
    {
      label: "Company",
      items: [
        { label: "About", href: "/about/" },
        { label: "Contact", href: "/contact/" },
        { label: "FAQ", href: "/faq/" },
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

export const primaryNavigation = navigation.primary.filter((item) => !item.hidden);
export const footerNavigation = navigation.footer.map((group) => ({
  ...group,
  items: group.items.filter((item) => !item.hidden)
}));
