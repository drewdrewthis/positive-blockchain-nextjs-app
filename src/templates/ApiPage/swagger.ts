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
  host: isProd ? "positiveblockchain.io" : "localhost:3000",
  basePath: "/nextjs-app/api",
  tags: [],
  schemes: ["http", "https"],
  externalDocs: {
    description: "Find out more about PositiveBlockchain",
    url: "https://positiveblockchain.io/about",
  },
  paths: {
    "/project-data": {
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
      },
    },
  },
  securityDefinitions: {
    api_key: { type: "apiKey", name: "x-api_key", in: "header" },
  },
  definitions: {
    Project: {
      type: "object",
      properties: projectProperties,
    },
  },
};

export default swaggerSpec;
