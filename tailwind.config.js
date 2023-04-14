/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#40D194",
        "brand-secondary": "#0095AA",
        "brand-link": "#0095AA",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
