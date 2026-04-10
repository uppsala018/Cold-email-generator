import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#08111f",
        foreground: "#f7fafc",
        brand: {
          DEFAULT: "#2dd4bf",
          dark: "#14b8a6",
          soft: "#99f6e4"
        },
        surface: "#102035"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(45, 212, 191, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
