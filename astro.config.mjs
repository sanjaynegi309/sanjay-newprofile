import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const siteUrl = process.env.SITE_URL || "https://example.com";
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  site: siteUrl,
  base: basePath,
  output: "static",
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ]
});
