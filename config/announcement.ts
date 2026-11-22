export type AnnouncementConfig = {
  enabled: boolean;
  message: string;
  actionLabel: string;
  href: string;
};

export const announcement: AnnouncementConfig = {
  enabled: true,
  message: "Free live masterclass · Why AI demos fail in production · Sat 12 Dec, 7 PM IST",
  actionLabel: "Register free →",
  href: "https://learn.sanjaynegi.in/l/62bbdfc9b2"
} as const;
