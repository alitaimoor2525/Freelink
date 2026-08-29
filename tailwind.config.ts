import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-forest": "rgb(var(--deep-forest-rgb) / <alpha-value>)",
        forest: {
          deep: "rgb(var(--deep-forest-rgb) / <alpha-value>)",
          mid: "rgb(var(--forest-green-rgb) / <alpha-value>)",
        },
        gold: {
          cta: "rgb(var(--warm-gold-rgb) / <alpha-value>)",
          pale: "rgb(var(--pale-gold-rgb) / <alpha-value>)",
        },
        cream: "rgb(var(--cream-rgb) / <alpha-value>)",
        ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        // Explicit fallbacks for when CSS variables fail
        "forest-mid-fallback": "#1b4332",
        "ink-fallback": "#132419",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        microlabel: "0.14em",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          md: "2rem",
        },
      },
      fontOpticalSizing: {
        enable: "auto",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;