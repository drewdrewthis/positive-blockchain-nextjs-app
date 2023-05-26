/**
 * next.config.js
 *
 * This file configures Next.js for your project.
 * Next.js is a React framework for building server-side rendered and static websites.
 *
 * For more information, visit: https://nextjs.org/
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable strict mode for React components.
   * When set to "true", React components are checked for potential issues and warnings.
   * Set this value to "true" for stricter component development, or "false" to disable it.
   */
  reactStrictMode: true,

  /**
   * Define the base path for your application.
   * The base path is appended to the root URL and is used to serve your application from a subdirectory.
   * Modify this value based on your project's requirements.
   */
  basePath: "/database",

  /**
   * Specify the packages to transpile during the build process.
   * In this example, we include several packages such as "react-syntax-highlighter" and "swagger-ui-react".
   * Modify the "transpilePackages" array based on your project's requirements.
   */
  transpilePackages: [
    "react-syntax-highlighter",
    "swagger-client",
    "swagger-ui-react",
    "lodash",
    "lodash/fp",
    "react",
    "@emotion/react",
    "@emotion/styled",
    "@mui/icons-material",
    "@mui/material",
    "@mui",
  ],

  /**
   * Configure image domains for Next.js Image component.
   * Specify the domains where images are hosted to enable optimization and automatic resizing.
   * Add or remove domains as needed for your project.
   */
  images: {
    domains: ["positiveblockchain.io", "images.squarespace-cdn.com"],
  },

  /**
   * Define custom headers for your application.
   * In this example, we apply the specified headers to all routes in your application.
   * Modify the "headers" array to add or remove headers as needed for your project.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
