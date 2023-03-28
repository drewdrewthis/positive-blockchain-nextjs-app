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
          SPREADSHEET_ID: "1r8Nts5qtXau_-17mF1PE6HvyFrs8in98_1VVKg8QLAs",
          SPREADSHEET_NAME: "Positive Blockchain Core Database (Working Copy)",
          sheets: {
            mainDatabase: {
              // name: "MAIN DATABASE",
              name: "Copy of CSV Template",
              headerRow: 4,
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
  };
}

export const config = new Configuration();
