import type { APIRoute } from "astro";
import { seo } from "@config/seo";
import { withBase } from "@utils/url";

const sitemapUrl = new URL(withBase("/sitemap.xml"), seo.canonicalBaseUrl).toString();

export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      seo.robots.index ? "Allow: /" : "Disallow: /",
      `Sitemap: ${sitemapUrl}`
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
