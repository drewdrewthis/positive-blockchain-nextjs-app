/**
 * tailwind.config.js
 *
 * This file configures Tailwind CSS for your Next.js project.
 * Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces.
 *
 * For more information, visit: https://tailwindcss.com/
 * For MUI (Material-UI) interoperability with Tailwind CSS, visit: https://mui.com/material-ui/guides/interoperability/#tailwind-css
 */

const config = require("./src/configuration/config.ts");

// MUI (Material-UI) interoperability configuration
const muiInterOperability = {
  /**
   * Use MUI's Preflight.
   * Preflight is a set of base styles provided by MUI that reset and normalize CSS across different browsers.
   * Uncomment the line below to enable MUI's Preflight.
   */
  // corePlugins: {
  //   preflight: false,
  // },
  // important: "#__next",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * Include MUI (Material-UI) interoperability configuration.
   * Uncomment the line below to enable MUI interoperability with Tailwind CSS.
   */
  // ...muiInterOperability,

  /**
   * Define the content files for Tailwind CSS to process.
   * This determines which files are scanned for utility classes to generate CSS.
   * Add or remove file patterns as needed for your project.
   */
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  /**
   * Customize the default theme of Tailwind CSS.
   * You can extend or override existing theme values to match your design requirements.
   * Add or modify theme values as needed for your project.
   */
  theme: {
    extend: {
      /**
       * Define custom colors for your project.
       * You can extend the existing color palette or define new colors.
       * Add or modify color values as needed for your project.
       */
      colors: {
        "brand-primary": "#19486A",
        "brand-secondary": "#19486A",
        "brand-link": "#19486A",
        white: "#FFFFFF",
      },
      screens: {
        ...config.breakpoints,
      },
    },
  },

  /**
   * Include additional plugins for Tailwind CSS.
   * Add or remove plugins as needed for your project.
   * In this example, we include the `@tailwindcss/typography` plugin.
   */
  plugins: [require("@tailwindcss/typography")],
};
