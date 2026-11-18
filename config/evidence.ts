import type { CaseStudyEvidence } from "../src/types/evidence";

// Add an entry only after every field is supported and publication permission is recorded.
// CaseStudy renders approved entries only; pending/private evidence never reaches the public UI.
export const caseStudies: CaseStudyEvidence[] = [];
