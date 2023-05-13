// https://mui.com/material-ui/guides/interoperability/#tailwind-css
const muiInterOperability = {
  // Use MUI's Preflight
  corePlugins: {
    // preflight: false,
  },
  important: "#__next",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...muiInterOperability,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#40D194",
        "brand-secondary": "#0095AA",
        "brand-link": "#004b57",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
