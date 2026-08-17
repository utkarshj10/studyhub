import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#18202A",
        paper: "#F7F5F0",
        accent: "#E85D3F",
        sage: "#A7B8A0",
        sand: "#E9E0D0",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(24, 32, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
