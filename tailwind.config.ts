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
        gold: {
          50: '#fffef5',
          100: '#fffbea',
          200: '#fff5c4',
          300: '#ffee9e',
          400: '#ffe14d',
          500: '#ffd700',
          600: '#e6c200',
          700: '#bf9f00',
          800: '#997d00',
          900: '#7d6500',
        },
      },
    },
  },
  plugins: [],
};
export default config;
