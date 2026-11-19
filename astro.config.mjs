import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const siteUrl = process.env.SITE_URL || "https://sanjaynegi.in";

export default defineConfig({
  site: siteUrl,
  base: "/",
  output: "static",
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ]
});
