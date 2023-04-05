import snakeCase from "lodash/snakeCase";
import { config } from "@/configuration";

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
): {
  [data_key: string]: {
    headerTitle: string;
    columnIdx: number;
    type: "text" | "list";
    // TODO: Add options for list
    // options
  };
} {
  const { keyRow = mainDatabase.keyRow, headerRow = mainDatabase.headerRow } =
    options;

  const keys = data[keyRow - 1];
  const headers = data[headerRow - 1];

  return keys.reduce((acc, key, i) => {
    if (key?.startsWith("PUBLIC_")) {
      const formattedKey = snakeCase(key.replace("PUBLIC_", ""));
      acc[formattedKey] = {
        headerTitle: headers[i],
        columnIdx: i + 1,
        type: key.endsWith("_list") ? "list" : "text",
      };
    }
    return acc;
  }, {} as any);
}
