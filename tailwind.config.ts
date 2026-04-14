import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f7fa",
        primary: "#216ab7",
        "primary-hover": "#1c5898"
      }
    }
  },
  plugins: []
};

export default config;
