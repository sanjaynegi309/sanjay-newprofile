import type { CollectionEntry } from "astro:content";

export function getContentSlug(entry: CollectionEntry<"programs" | "workshops">): string {
  return entry.data.slug ?? entry.id.replace(/\.mdx?$/, "");
}
