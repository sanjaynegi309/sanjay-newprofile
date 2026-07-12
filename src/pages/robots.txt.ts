import type { APIRoute } from "astro";
import { seo } from "@config/seo";

const baseUrl = seo.canonicalBaseUrl.replace(/\/$/, "");

export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      seo.robots.index ? "Allow: /" : "Disallow: /",
      `Sitemap: ${baseUrl}/sitemap.xml`
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
