import { defineConfig } from "cypress";

const dotenv = require("dotenv");

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  env: {
    API_KEY: process.env.API_KEY,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
