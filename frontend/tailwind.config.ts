import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#101211",
        panel: "#191c1a",
        muted: "#929991",
        line: "#2a302b",
        accent: "#c3ef69",
        foreground: "#f1f2ec",
      },
      screens: { tablet: "701px", desktop: "1101px", wide: "1500px" },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
      backgroundImage: {
        "hero-mobile":
          "linear-gradient(0deg,#080f0efd,#080f0e88 65%,#080f0e22)",
        hero: "linear-gradient(90deg,rgba(8,15,14,.94) 0%,rgba(8,15,14,.75) 36%,rgba(8,15,14,.08) 85%),linear-gradient(0deg,rgba(4,10,9,.5),transparent 70%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
