import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { seo } from "@config/seo";
import { getContentSlug } from "@utils/slugs";

type SitemapEntry = {
  path: string;
  priority: number;
  lastmod?: Date;
};

const baseUrl = seo.canonicalBaseUrl.replace(/\/$/, "");

function absoluteUrl(path: string): string {
  return new URL(path, `${baseUrl}/`).toString();
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderUrl(entry: SitemapEntry): string {
  const lastmod = entry.lastmod
    ? `\n    <lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>`
    : "";

  return [
    "  <url>",
    `    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>`,
    lastmod,
    `    <changefreq>${seo.sitemap.changefreq}</changefreq>`,
    `    <priority>${entry.priority.toFixed(1)}</priority>`,
    "  </url>"
  ]
    .filter(Boolean)
    .join("\n");
}

export const GET: APIRoute = async () => {
  const programs = (await getCollection("programs")).filter(
    (program) => !program.data.draft
  );
  const workshops = (await getCollection("workshops")).filter(
    (workshop) => !workshop.data.draft
  );

  const entries: SitemapEntry[] = [
    { path: "/", priority: seo.sitemap.priority.home },
    { path: "/about/", priority: seo.sitemap.priority.page },
    { path: "/contact/", priority: seo.sitemap.priority.page },
    { path: "/teams/", priority: seo.sitemap.priority.page },
    { path: "/programs/", priority: seo.sitemap.priority.listing },
    { path: "/workshops/", priority: seo.sitemap.priority.listing },
    ...programs.map((program) => ({
      path: `/programs/${getContentSlug(program)}/`,
      priority: seo.sitemap.priority.detail,
      lastmod: program.data.updatedAt ?? program.data.publishedAt
    })),
    ...workshops.map((workshop) => ({
      path: `/workshops/${getContentSlug(workshop)}/`,
      priority: seo.sitemap.priority.detail,
      lastmod: workshop.data.updatedAt ?? workshop.data.publishedAt
    }))
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderUrl),
    "</urlset>"
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
