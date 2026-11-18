export type EnquiryType = "program" | "workshop" | "corporate";

export function getEnquiryHref(type: EnquiryType, interest: string, source?: string) {
  const params = new URLSearchParams({ type, interest });
  if (source) params.set("source", source);
  return `/contact/?${params.toString()}#enquiry-form`;
}
