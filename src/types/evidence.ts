import type { ImageMetadata } from "astro";

export type EvidencePermission = "approved" | "pending" | "private";

export interface CaseStudyEvidence {
  title: string;
  startingPoint: string;
  challenge: string;
  intervention: string;
  artifact: {
    image: ImageMetadata;
    alt: string;
    caption: string;
  };
  verifiedResult: string;
  attribution: string;
  permission: EvidencePermission;
  evidenceSource: string;
}
