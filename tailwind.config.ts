import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B0000", // Rouge bordeaux foncé
          dark: "#5C0000",
          light: "#A52A2A",
        },
        dark: {
          DEFAULT: "#000000",
          light: "#1a1a1a",
          lighter: "#2a2a2a",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "system-ui", "sans-serif"],
        anton: ["var(--font-anton)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;






