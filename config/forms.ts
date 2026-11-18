export type FormsConfig = {
  endpoint: string;
  handoffMessage: string;
  fallbackMessage: string;
};

// The endpoint is a Google Apps Script Web App URL bound to a Google Sheet
// (doPost appends a row per submission). Set PUBLIC_FORMS_ENDPOINT once the
// script is deployed -- see docs/google-form-backend.md for the script,
// deployment steps, and the submit/fallback behavior this powers. Left
// empty, EnquiryForm.astro skips the network attempt entirely and goes
// straight to the mailto fallback below.
export const forms: FormsConfig = {
  endpoint: import.meta.env.PUBLIC_FORMS_ENDPOINT || "",
  handoffMessage:
    "This submits directly to Sanjay. If that doesn't go through, we'll open a prefilled email for you to send instead.",
  fallbackMessage:
    "We couldn't submit this automatically, so we've opened a prefilled email instead. Review it and send it from there."
} as const;
