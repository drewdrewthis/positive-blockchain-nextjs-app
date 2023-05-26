/**
 * cypress.config.js
 *
 * This file configures Cypress for end-to-end (E2E) testing in your Next.js project.
 * Cypress is a JavaScript-based E2E testing framework for web applications.
 *
 * For more information, visit: https://www.cypress.io/
 */

import { defineConfig } from "cypress";

const dotenv = require("dotenv");

dotenv.config({
  /**
   * Specify the path to your local environment variables file.
   * In this example, the file is named ".env.local".
   * Modify the "path" value based on the actual file name and location in your project.
   */
  path: ".env.local",
});

export default defineConfig({
  /**
   * Define environment variables for your Cypress tests.
   * In this example, we include an "API_KEY" environment variable from the local environment variables file.
   * Modify or add more environment variables as needed for your tests.
   */
  env: {
    API_KEY: process.env.API_KEY,
  },

  /**
   * Configure the Cypress component settings.
   * In this example, we specify the development server framework as "next" and the bundler as "webpack".
   * Modify these values based on your project's setup.
   */
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  /**
   * Configure the Cypress E2E settings.
   * In this example, we include a custom setup for node event listeners.
   * Modify or remove this section based on your E2E testing requirements.
   */
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
