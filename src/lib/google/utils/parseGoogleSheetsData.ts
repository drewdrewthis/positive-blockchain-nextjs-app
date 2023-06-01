import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";
<<<<<<< HEAD
import kebabCase from "lodash/kebabCase";

import { projectSchema } from "../../../zod/schemas";
=======
import mapKeys from "lodash/fp/mapKeys";
import omitBy from "lodash/fp/omitBy";
import { projectSchema } from "@/zod/schemas";
>>>>>>> 0caf539 (Finalize custom submission form for submitting)

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

  // Iterate through rows to create a project object (key/value map) for each row
  return rows.map((row) => {
    const projectObj = row.reduce(
      (acc, cell, i) => {
        let key = keys[i];

        // Skip if key is empty
        if (!key) {
          return acc;
        }

        // Set the value for the key
        acc[key] = formatValue(key, cell);

        return acc;
      },
      {
        slug: "",
      } as Project
    );

    const projectName = projectObj["PUBLIC_project_name"] as string;

    if (projectName) {
      projectObj.slug = kebabCase(projectName);
    } else {
      console.warn("Project doesn't have a name", projectObj);
    }

    // Emit warning if project doesn't match schema
    projectSchema.safeParseAsync(projectObj).catch((err) => {
      console.warn("Project doesn't match schema", projectObj, err);
    });

    return projectObj;
  });
}

/**
 * Removes private fields from a project object.
 * A field is considered private if it doesn't start with "PUBLIC_" or if it's the "slug" field.
 * @param project
 * @returns
 */
export function removePrivateFields(project: Record<string, any>) {
  return omitBy((_value: any, key: string) => !isPublic(key), project);
}

export function stripPublicPrefixFromKeys(project: Record<string, any>) {
  return mapKeys((key) => stripPublicPrefix(key), project);
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
 * Checks if a string starts with "PUBLIC_" or if the string is 'slug'.
 * @param str - The string to check.
 * @returns A boolean indicating whether the string starts with "PUBLIC_".
 */
function isPublic(str: string) {
  return str.startsWith("PUBLIC_") || str === "slug";
}

/**
 * Removes the "PUBLIC_" prefix from a string.
 * @param str - The string to remove the prefix from.
 * @returns The string without the "PUBLIC_" prefix.
 */
function stripPublicPrefix(str: string) {
  return str.replace("PUBLIC_", "");
}
