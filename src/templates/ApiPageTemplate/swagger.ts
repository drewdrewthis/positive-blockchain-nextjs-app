import Routes from "../../lib/Routes";

import { projectProperties } from "./definitions";

const isProd = process.env.NODE_ENV === "production";

const swaggerSpec = {
  swagger: "2.0",
  info: {
    description:
      "Simple API endpoint to receive PositiveBlockchain data as a JSON object",
    version: "1.0.0",
    title: "PositiveBlockchain API",
  },
  host: isProd ? process.env.VERCEL_URL : "localhost:3000",
  basePath: `${Routes.API.BASE_PATH}/v1`,
  tags: [],
  schemes: isProd ? ["https"] : ["http", "https"],
  externalDocs: {
    description: "Find out more about PositiveBlockchain",
    url: "https://positiveblockchain.io/about",
  },
  paths: {
    [`/projects`]: {
      get: {
        summary: "Returns all projects",
        description: "Returns all projects",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: { $ref: "#/definitions/Project" },
            },
          },
        },
        security: [{ api_key: [] }],
        parameters: [
          {
            name: "limit",
            in: "query",
            description:
              "Number of projects to return (NB: large integers will create a large payload that could timeout)",
            required: false,
            type: "integer",
            default: 10,
          },
          {
            name: "offset",
            in: "query",
            description: "Number of projects to skip",
            required: false,
            type: "integer",
            default: 0,
          },
        ],
      },
    },
  },
  securityDefinitions: {
    api_key: { type: "apiKey", name: "x-api-key", in: "header" },
  },
  definitions: {
    Project: {
      type: "object",
      properties: projectProperties,
    },
  },
};

export default swaggerSpec;
