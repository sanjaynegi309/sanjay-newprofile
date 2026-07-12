import { theme } from "./config/theme.ts";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: theme.colors,
      backgroundImage: theme.backgroundImage,
      boxShadow: theme.boxShadow,
      fontFamily: theme.fontFamily,
      borderRadius: theme.borderRadius,
      transitionDuration: theme.motion.duration,
      transitionTimingFunction: theme.motion.easing
    }
  },
  plugins: []
};
