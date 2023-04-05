import snakeCase from "lodash/snakeCase";
import kebabCase from "lodash/kebabCase";
import { config } from "@/configuration";

type Project = {
  slug: string;
} & Record<string, string | number | string[]>;

const { mainDatabase } = config.constants.google.sheets.databaseSheet.sheets;

/**
 * Parses Google Sheets values into an array of objects
 * headerRow is the row number of the header row
 * and it is used to determine the keys of the objects
 */
export function parseGoogleSheetsValuesByHeaderRow(
  data: string[][],
  options: {
    headerRow?: number;
  } = {}
): {
  slug: string;
}[] {
  const { headerRow = mainDatabase.headerRow } = options;
  const headerRowIndex = headerRow - 1;
  const headers = data[headerRowIndex];
  const rows = data.slice(headerRow);
  return rows.map((row) => {
    const projectObj = row.reduce(
      (acc, cell, i) => {
        const key = snakeCase(headers[i]);
        acc[key] = formatCell(key, cell);
        return acc;
      },
      {
        slug: "",
      } as Project
    );

    const projectName = projectObj["project_name"] as string;

    if (projectName) {
      projectObj.slug = kebabCase(projectName);
    }

    return projectObj;
  });
}

function formatCell(key: string, cell: string) {
  switch (key) {
    case "sub_categories": {
      return cell.split(",").map((item) => item.trim());
    }
    case "founders": {
      return cell.split(";").map((item) => item.trim());
    }
    default:
      return cell;
  }
}
