// https://mui.com/material-ui/guides/interoperability/#tailwind-css
const muiInterOperability = {
  // Use MUI's Preflight
  corePlugins: {
    // preflight: false,
  },
  // important: "#__next",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...muiInterOperability,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#19486A",
        "brand-secondary": "#19486A",
        "brand-link": "#19486A",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
