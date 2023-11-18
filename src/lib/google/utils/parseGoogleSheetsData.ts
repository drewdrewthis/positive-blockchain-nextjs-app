import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";
import kebabCase from "lodash/kebabCase";

import { projectSchema } from "../../../zod/schemas";

// Define the type for a Project object
type Project = {
  slug: string;
} & Record<string, string | number | string[]>;

/**
 * Parses Google Sheets data and returns an array of Project objects.
 * @param data - The data from the Google Sheets document.
 * @param options - Options for parsing the data, including headerRow and keyRow.
 * @returns An array of Project objects.
 */
export function parseGoogleSheetsData(
  data: string[][],
  options: {
    headerRow: number;
    keyRow: number;
  }
): Project[] {
  const { headerRow, keyRow } = options;
  const keyRowIndex = keyRow - 1;
  const keys = data[keyRowIndex];
  const rows = data.slice(headerRow);

  return rows.map((row) => {
    const projectObj = row.reduce(
      (acc, cell, i) => {
        const rawKey = keys[i];
        if (rawKey && isPublic(rawKey)) {
          const key = stripPublicPrefix(rawKey);
          acc[key] = formatValue(key, cell);
        }
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

    // Emit warning if project doesn't match schema
    projectSchema.safeParseAsync(projectObj).catch((err) => {
      console.warn("Project doesn't match schema", projectObj, err);
    });

    return projectObj;
  });
}

/**
 * Formats a value based on the given key. Primarily used for formatting list values.
 * @param key - The key associated with the cell value.
 * @param cell - The value of the cell.
 * @returns The formatted cell value.
 */
function formatValue(key: string, cell: string) {
  if (key.includes("_list")) {
    return uniq(compact(cell.split(",").map((item) => item.trim())));
  }

  return cell;
}

/**
 * Checks if a string starts with "PUBLIC_".
 * @param str - The string to check.
 * @returns A boolean indicating whether the string starts with "PUBLIC_".
 */
function isPublic(str: string) {
  return str.startsWith("PUBLIC_");
}

/**
 * Removes the "PUBLIC_" prefix from a string.
 * @param str - The string to remove the prefix from.
 * @returns The string without the "PUBLIC_" prefix.
 */
function stripPublicPrefix(str: string) {
  return str.replace("PUBLIC_", "");
}
