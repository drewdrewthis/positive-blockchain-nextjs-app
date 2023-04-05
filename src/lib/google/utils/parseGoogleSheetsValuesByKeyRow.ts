import snakeCase from "lodash/snakeCase";
import kebabCase from "lodash/kebabCase";
import { config } from "../../../configuration";

type Project = {
  slug: string;
} & Record<string, string | number | string[]>;

const {
  sheets: { mainDatabase },
} = config.constants.google.sheets.databaseSheet;

export function parseGoogleSheetValuesByKeyRow(
  data: string[][],
  options: {
    keyRow?: number;
    headerRow?: number;
  } = {}
): Project[] {
  const { keyRow = mainDatabase.keyRow, headerRow = mainDatabase.headerRow } =
    options;

  const keys = data[keyRow - 1];
  const rows = data.slice(headerRow);

  return rows.map((row) => {
    const projectObj = row.reduce(
      (acc, cell, i) => {
        const key = keys[i];

        // Skip private fields
        if (key?.startsWith("PUBLIC_")) {
          const formattedKey = snakeCase(key.replace("PUBLIC_", ""));
          acc[formattedKey] = formatCell(key, cell);
        }

        return acc;
      },
      {
        slug: "",
      } as Project
    );

    // Add slug
    const projectName = projectObj["project_name"] as string;

    if (projectName) {
      projectObj.slug = kebabCase(projectName);
    }

    return projectObj;
  });
}

function formatCell(key: string, cell: string) {
  if (key?.endsWith("_list")) {
    return cell.split(",").map((item) => item.trim());
  }

  return cell;
}
