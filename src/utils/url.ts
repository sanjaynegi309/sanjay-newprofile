const ABSOLUTE_OR_ANCHOR = /^([a-z][a-z0-9+.-]*:|#)/i;

export function withBase(path: string): string {
  if (ABSOLUTE_OR_ANCHOR.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
