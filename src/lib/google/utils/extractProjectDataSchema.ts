import snakeCase from "lodash/snakeCase";
import { config } from "@/configuration";
import { ProjectDataSchema } from "@/types";

type Project = {
  slug: string;
} & Record<string, string | number | string[]>;

const {
  sheets: { mainDatabase },
} = config.constants.google.sheets.databaseSheet;

/**
 * Determines the schema of the project data
 *
 */
export function extractProjectDataSchema(
  data: string[][],
  options: {
    keyRow?: number;
    headerRow?: number;
  } = {}
): ProjectDataSchema {
  const { keyRow = mainDatabase.keyRow, headerRow = mainDatabase.headerRow } =
    options;

  const keys = data[keyRow - 1];
  const headers = data[headerRow - 1];

  console.log("keys", keys);
  return keys.reduce((acc, key, i) => {
    if (key?.startsWith("PUBLIC_")) {
      const formattedKey = snakeCase(key.replace("PUBLIC_", ""));
      acc[formattedKey] = {
        headerTitle: headers[i],
        columnIdx: i,
        type: pickType(formattedKey),
      };
    }
    return acc;
  }, {} as any);
}

function pickType(key: string) {
  if (key.endsWith("_list")) {
    return "list";
  }

  if (key === "active") {
    return "boolean";
  }

  return "text";
}
