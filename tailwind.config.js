/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "brand-primary": "#40D194",
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
