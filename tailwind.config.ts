/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "base-primary": "var(--color-primary)",
        "base-secondary": "var(--color-secondary)",
        "base-typography": "var(--color-typography)",
        "base-background": "var(--color-background)",
        "base-overlay": "var(--color-overlay)",
      },
      fontSize: {
        "14": ["0.875rem", { lineHeight: "1.25rem" }],
      },
      fontFamily: {
        pacifico: ["Pacifico", "serif"],
      },
    },
  },
  plugins: [],
};
