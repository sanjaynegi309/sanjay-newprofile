export type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "program_apply"
  | "workshop_registration"
  | "corporate_cta"
  | "contact"
  | "login"
  | "outbound_link"
  | "waitlist_signup"
  | "teaching_experiment"
  | "primary_cta_click"
  | "program_view"
  | "lesson_completion"
  | "enquiry_start"
  | "enquiry_completion";

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
    waitlistSignup: AnalyticsEventName;
    teachingExperiment: AnalyticsEventName;
    primaryCtaClick: AnalyticsEventName;
    programView: AnalyticsEventName;
    lessonCompletion: AnalyticsEventName;
    enquiryStart: AnalyticsEventName;
    enquiryCompletion: AnalyticsEventName;
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
    outboundLink: "outbound_link",
    waitlistSignup: "waitlist_signup",
    teachingExperiment: "teaching_experiment",
    primaryCtaClick: "primary_cta_click",
    programView: "program_view",
    lessonCompletion: "lesson_completion",
    enquiryStart: "enquiry_start",
    enquiryCompletion: "enquiry_completion"
  }
} as const;
