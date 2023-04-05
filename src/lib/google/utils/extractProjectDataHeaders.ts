import snakeCase from "lodash/snakeCase";
import { config } from "@/configuration";

type Project = {
  slug: string;
} & Record<string, string | number | string[]>;

const {
  sheets: { mainDatabase },
} = config.constants.google.sheets.databaseSheet;

export function extractProjectDataHeaders(
  data: string[][],
  options: {
    keyRow?: number;
    headerRow?: number;
  } = {}
): Project[] {
  const { keyRow = mainDatabase.keyRow, headerRow = mainDatabase.headerRow } =
    options;

  const keys = data[keyRow - 1];
  const headers = data[headerRow - 1];

  return keys.reduce((acc, key, i) => {
    if (key?.startsWith("PUBLIC_")) {
      const formattedKey = snakeCase(key.replace("PUBLIC_", ""));
      acc[formattedKey] = headers[i];
    }
    return acc;
  }, {} as any);
}
