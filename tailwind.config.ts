import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brutal: {
          orange: "#FF4D00",
          lime: "#CCFF00",
          forest: "#0D3B2E",
          red: "#FF2E2E",
          purple: "#7928CA",
          blue: "#0047FF",
          pink: "#FF4D8D",
          cream: "#FBF8F1",
          yellow: "#FFE500",
          black: "#0A0A0A",
          white: "#FFFFFF",
        },
        brand: {
          50: "#f0f4fe",
          100: "#dbe5fc",
          200: "#bfd3fa",
          300: "#93b8f6",
          400: "#6093f0",
          500: "#3b73e8",
          600: "#2556cb",
          700: "#1e44a5",
          800: "#1d3a86",
          900: "#1d336f",
          950: "#121f45",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["Impact", "Arial Black", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
        4: "4px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        card: "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.04)",
        float: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        // Modern sleek soft shadows replacing harsh brutalist offsets
        soft: "0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 20px 35px -8px rgba(0, 0, 0, 0.09), 0 12px 16px -8px rgba(0, 0, 0, 0.05)",
        "soft-xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 15px 25px -10px rgba(0, 0, 0, 0.08)",
        "glow-orange": "0 20px 40px -15px rgba(255, 77, 0, 0.35)",
        "glow-lime": "0 20px 40px -15px rgba(204, 255, 0, 0.45)",
        "glow-blue": "0 20px 40px -15px rgba(0, 71, 255, 0.35)",
        "glow-purple": "0 20px 40px -15px rgba(121, 40, 202, 0.35)",
        // Backwards compatibility aliases mapped to sleek soft modern shadows
        brutal: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
        "brutal-sm": "0 4px 12px -2px rgba(0, 0, 0, 0.06)",
        "brutal-lg": "0 20px 35px -8px rgba(0, 0, 0, 0.12)",
        "brutal-xl": "0 25px 50px -12px rgba(0, 0, 0, 0.18)",
        "brutal-white": "0 10px 30px -5px rgba(255, 255, 255, 0.2)",
        "brutal-lime": "0 20px 40px -15px rgba(204, 255, 0, 0.45)",
        "brutal-orange": "0 20px 40px -15px rgba(255, 77, 0, 0.35)",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "marquee-fast": "marquee 15s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
