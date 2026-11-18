export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type ThemeConfig = {
  colors: {
    brand: ColorScale;
    accent: ColorScale;
    magenta: ColorScale;
    purple: ColorScale;
    neutral: ColorScale;
    workbook: { paper: string; ink: string; muted: string; rule: string };
    atmosphere: {
      deep: string;
      dark: string;
      rich: string;
      elevated: string;
    };
  };
  backgroundImage: Record<string, string>;
  boxShadow: Record<string, string>;
  fontFamily: {
    sans: string[];
    display: string[];
    mono: string[];
  };
  borderRadius: Record<string, string>;
  spacing: Record<string, string>;
  container: {
    maxWidth: string;
    padding: string;
  };
  motion: {
    duration: {
      fast: string;
      base: string;
      slow: string;
    };
    easing: {
      standard: string;
    };
  };
};

export const theme: ThemeConfig = {
  colors: {
    // Cyan leads. Warm paper supports reading; other accents are reserved.
    brand: {
      50: "#f6f8fb",
      100: "#e7edf5",
      200: "#cbd9ea",
      300: "#9fb9d9",
      400: "#6d94c3",
      500: "#4a73a8",
      600: "#385b89",
      700: "#304a6f",
      800: "#2b405d",
      900: "#27374f",
      950: "#192233"
    },
    // Primary AI-native interactive accent: cyan.
    accent: {
      50: "#e6fbff",
      100: "#ccf6ff",
      200: "#99edff",
      300: "#5ce4ff",
      400: "#22d9ff",
      500: "#00d4ff",
      600: "#00a8cc",
      700: "#007d99",
      800: "#005266",
      900: "#003340",
      950: "#001a20"
    },
    // Hot / urgent accent: magenta. Use sparingly.
    magenta: {
      50: "#ffe6f2",
      100: "#ffcce5",
      200: "#ff99cb",
      300: "#ff5ca8",
      400: "#ff2e8c",
      500: "#ff006e",
      600: "#cc0058",
      700: "#990042",
      800: "#66002c",
      900: "#400019",
      950: "#26000f"
    },
    // Supporting AI accent: purple. Mostly gradients + small highlights.
    purple: {
      50: "#f2e9fe",
      100: "#e5d3fd",
      200: "#cba7fb",
      300: "#ab7cf7",
      400: "#9657f2",
      500: "#8338ec",
      600: "#6a1fd0",
      700: "#5117a3",
      800: "#390f76",
      900: "#22084a",
      950: "#14042c"
    },
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617"
    },
    workbook: { paper: "#f4f0e6", ink: "#172320", muted: "#4c5b56", rule: "#c8c8b8" },
    atmosphere: {
      deep: "#101916",
      dark: "#14201c",
      rich: "#192822",
      elevated: "#20332b"
    }
  },
  backgroundImage: {
    "hero-atmosphere": "radial-gradient(ellipse at 85% 15%, rgb(0 212 255 / 0.07), transparent 55%), linear-gradient(145deg, #101916, #192822)",
    "section-atmosphere": "linear-gradient(150deg, #101916, #14201c)",
    "navy-tint": "linear-gradient(180deg, #14201c, #192822)",
    "hot-atmosphere":
      "radial-gradient(circle at 20% 20%, rgb(255 0 110 / 0.18), transparent 36%), linear-gradient(160deg, #120005 0%, #08000a 60%, #000000 100%)"
  },
  boxShadow: {
    glass: "0 8px 24px rgb(0 0 0 / 0.12)",
    "teal-glow": "0 0 32px rgb(0 212 255 / 0.22)",
    "glow-cyan": "0 0 28px rgb(0 212 255 / 0.35)",
    "glow-magenta": "0 0 28px rgb(255 0 110 / 0.35)",
    "glow-purple": "0 0 28px rgb(131 56 236 / 0.35)",
    card: "0 14px 36px rgb(0 0 0 / 0.4)"
  },
  fontFamily: {
    sans: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
    display: [
      "Space Grotesk Variable",
      "Space Grotesk",
      "Inter Variable",
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "sans-serif"
    ],
    mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
  },
  borderRadius: {
    DEFAULT: "0.5rem",
    surface: "0.5rem",
    control: "0.375rem"
  },
  spacing: { section: "clamp(4rem, 8vw, 7rem)", editorial: "3rem" },
  container: {
    maxWidth: "72rem",
    padding: "1rem"
  },
  motion: {
    duration: {
      fast: "120ms",
      base: "180ms",
      slow: "240ms"
    },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)"
    }
  }
} as const;
