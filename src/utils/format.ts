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
