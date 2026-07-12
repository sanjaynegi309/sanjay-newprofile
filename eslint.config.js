import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      // astro-eslint-parser@3 cannot preprocess a self-closing
      // `<script is:inline set:html={...} />` tag (throws "Cannot read
      // properties of null (reading 'start')"). Reproduces on a 3-line
      // minimal file, so it's an upstream parser limitation, not a bug in
      // this component — `astro check` and the build both pass clean.
      // Re-lint this file once astro-eslint-parser fixes that case.
      "src/components/Analytics.astro"
    ]
  },
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    }
  },
  {
    // Astro's own generated env.d.ts requires a triple-slash reference to
    // pull in .astro/types.d.ts — there's no `import`-style equivalent.
    files: ["src/env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off"
    }
  }
]);
