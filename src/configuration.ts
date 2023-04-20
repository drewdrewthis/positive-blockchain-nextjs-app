class Configuration {
  getEnv(key: string) {
    const keysEnvVar = process.env[key];

    if (!keysEnvVar) {
      throw new Error(`The $${key} environment variable was not found!`);
    }

    return keysEnvVar;
  }

  constants = {
    google: {
      sheets: {
        databaseSheet: {
          SPREADSHEET_ID: "1-Imie1YgTv4cRGmDTSQWoFgDxiUqmgFfnDLEfFcbCGg",
          // SPREADSHEET_ID: "1r8Nts5qtXau_-17mF1PE6HvyFrs8in98_1VVKg8QLAs",
          SPREADSHEET_NAME: "Template CSV DB",
          // SPREADSHEET_NAME: "Positive Blockchain Core Database (Working Copy)",
          sheets: {
            mainDatabase: {
              // name: "MAIN DATABASE",
              // name: "Copy of CSV Template",
              name: "CSV Template",
              headerRow: 6,
              keyRow: 2,
            },
            pendingProjects: {
              name: "Projects Pending Review",
            },
          },
        },
      },
    },
    positiveBlockchain: {
      HOST: "https://positiveblockchain.io",
    },
    projects: {
      INITIAL_DATA_LOAD_COUNT: 50,
      CACHE_TTL: 60 * 5,
    },
    warmableEndpoints: [
      "https://positiveblockchain.io/nextjs-app/projects",
      "https://positiveblockchain.io/nextjs-app/projects/modum",
      "https://positiveblockchain.io/nextjs-app/api/project-data",
    ],
  };
}

export const config = new Configuration();
