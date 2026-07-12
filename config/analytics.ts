export type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "program_apply"
  | "workshop_registration"
  | "corporate_cta"
  | "contact"
  | "login"
  | "outbound_link";

export type AnalyticsConfig = {
  googleAnalytics: {
    enabled: boolean;
    measurementId: string;
    sendPageView: boolean;
  };
  attributes: {
    event: string;
    label: string;
  };
  events: {
    pageView: AnalyticsEventName;
    ctaClick: AnalyticsEventName;
    programApply: AnalyticsEventName;
    workshopRegistration: AnalyticsEventName;
    corporateCta: AnalyticsEventName;
    contact: AnalyticsEventName;
    login: AnalyticsEventName;
    outboundLink: AnalyticsEventName;
  };
};

export const analytics: AnalyticsConfig = {
  googleAnalytics: {
    enabled: Boolean(import.meta.env.PUBLIC_GA_MEASUREMENT_ID),
    measurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? "G-NNJRMTPHZK",
    sendPageView: true
  },
  attributes: {
    event: "data-analytics-event",
    label: "data-analytics-label"
  },
  events: {
    pageView: "page_view",
    ctaClick: "cta_click",
    programApply: "program_apply",
    workshopRegistration: "workshop_registration",
    corporateCta: "corporate_cta",
    contact: "contact",
    login: "login",
    outboundLink: "outbound_link"
  }
} as const;
