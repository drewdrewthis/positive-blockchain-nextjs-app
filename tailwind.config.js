/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "brand-primary": "#40D194",
      white: "#FFFFFF",
    },
    extend: {
      // colors: {
      //   gross: "#40D194",
      // },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
