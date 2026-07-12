export function formatList(values: string[]): string {
  return values.join(", ");
}

export function formatDate(value: Date, locale = "en"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(value);
}

export type WorkshopDateInfo = {
  label: string;
  isPast: boolean;
  tone: "accent" | "neutral";
};

export function getWorkshopDateInfo(
  date: Date | undefined,
  locale = "en"
): WorkshopDateInfo {
  if (!date) {
    return { label: "Available by request", isPast: false, tone: "neutral" };
  }

  const isPast = date.getTime() < Date.now();
  const formatted = formatDate(date, locale);

  return {
    label: isPast ? `Past — ${formatted}` : formatted,
    isPast,
    tone: isPast ? "neutral" : "accent"
  };
}
