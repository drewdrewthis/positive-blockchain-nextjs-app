/**
 * postcss.config.js
 *
 * This file configures PostCSS plugins for processing CSS in your Next.js project.
 * PostCSS is a tool for transforming CSS with JavaScript plugins.
 *
 * For more information, visit: https://postcss.org/
 */

module.exports = {
  /**
   * List of plugins to use for PostCSS processing.
   * Add or remove plugins as needed for your project.
   */
  plugins: {
    /**
     * Tailwind CSS is a utility-first CSS framework.
     * It allows you to rapidly build custom user interfaces.
     *
     * For more information, visit: https://tailwindcss.com/
     */
    tailwindcss: {},

    /**
     * Autoprefixer automatically adds vendor prefixes to CSS properties.
     * It ensures that your CSS works across different browsers.
     *
     * For more information, visit: https://github.com/postcss/autoprefixer
     */
    autoprefixer: {},

    /**
     * cssnano is a CSS minifier that optimizes and compresses the output CSS.
     * It removes unnecessary whitespace and reduces file size.
     *
     * Note: cssnano is only enabled in production mode.
     * It is recommended to minify CSS for production builds to improve performance.
     *
     * For more information, visit: https://cssnano.co/
     */
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
