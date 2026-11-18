import type { CollectionEntry } from "astro:content";
import { getEnquiryHref } from "./enquiry";
import { getContentSlug } from "./slugs";

export type OfferStatus =
  | "open"
  | "upcoming"
  | "in-progress"
  | "waitlist"
  | "on-request"
  | "completed";

type Program = CollectionEntry<"programs">;

export function getProgramAvailability(program: Program, now = new Date()) {
  const configured = program.data.availability;

  if (!configured) {
    return {
      status: program.data.launchStatus === "coming-soon" ? "waitlist" : "on-request",
      label: program.data.launchStatus === "coming-soon" ? "Coming soon" : "Ask for availability",
      detail: program.data.launchStatus === "coming-soon"
        ? "Join the waitlist for launch updates."
        : "Current dates have not been announced.",
      actionLabel: program.data.launchStatus === "coming-soon" ? "Join the waitlist" : "Ask about this program",
      actionHref: program.data.launchStatus === "coming-soon" ? "/self-paced/#waitlist-form" : getEnquiryHref("program", program.data.title, `/programs/${getContentSlug(program)}/`),
      actionExternal: false,
      startsAt: undefined
    } as const;
  }

  if (
    configured.status === "upcoming" &&
    configured.startsAt &&
    configured.startsAt.getTime() < now.getTime()
  ) {
    return {
      ...configured,
      status: "completed" as const,
      label: "Completed",
      detail: `This intake started ${formatOfferDate(configured.startsAt)}.`,
      actionLabel: "Ask about the next intake",
      actionHref: getEnquiryHref("program", program.data.title, `/programs/${getContentSlug(program)}/`),
      actionExternal: false
    };
  }

  if (!configured.actionExternal && configured.actionHref.startsWith("/contact")) {
    return { ...configured, actionHref: getEnquiryHref("program", program.data.title, `/programs/${getContentSlug(program)}/`) };
  }

  return configured;
}

export function formatOfferDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(date);
}

export function availabilityTone(status: OfferStatus) {
  if (status === "open" || status === "upcoming") return "accent" as const;
  if (status === "waitlist") return "brand" as const;
  return "neutral" as const;
}

export const availabilityOrder: Record<OfferStatus, number> = {
  open: 0,
  upcoming: 1,
  "in-progress": 2,
  waitlist: 3,
  "on-request": 4,
  completed: 5
};
