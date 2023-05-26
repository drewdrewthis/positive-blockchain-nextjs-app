import { chain } from "lodash";
import { Project } from "../../../types";

/**
 * Extracts filters from project data to create a record of possible values for each filter.
 * @param projectData - The project data array.
 * @returns A record of possible values for each filter.
 */
export function extractFiltersFromProjectData(
  projectData: Partial<Project>[]
): Record<string, string[]> {
  if (!projectData?.length) return {};

  return {
    ...extractPossibleValuesFromKeys(projectData, [
      "active",
      "blockchain_type",
      "primary_headquarter_country",
      "pb_partner_tag",
    ]),
    categories: extractPossibleValuesFromArrayKey(
      projectData,
      "categories_list"
    ),
    sub_categories: extractPossibleValuesFromArrayKey(
      projectData,
      "sub_categories_list"
    ),
    servicing_area: extractPossibleValuesFromListKey(
      projectData,
      "servicing_area"
    ),
    servicing_region: extractPossibleValuesFromListKey(
      projectData,
      "servicing_region"
    ),
    blockchain_technology: extractPossibleValuesFromListKey(
      projectData,
      "blockchain_technology"
    ),
  };
}

/**
 * Extracts possible values from specified keys in the project data.
 * @param data - The project data array.
 * @param keys - The keys to extract possible values from.
 * @returns A record of possible values for each specified key.
 */
function extractPossibleValuesFromKeys(
  data: Record<string, any>[],
  keys: string[]
) {
  if (!data?.length) return [];

  return keys.reduce((acc, key) => {
    const values = extractPossibleValuesFromListKey(data, key);
    return {
      ...acc,
      [key]: values,
    };
  }, {});
}

/**
 * Extracts possible values from an array-based key in the project data.
 * @param data - The project data array.
 * @param key - The key to extract possible values from.
 * @returns An array of possible values for the specified key.
 */
function extractPossibleValuesFromArrayKey(
  data: Record<string, any>[],
  key: string
) {
  if (!data?.length) return [];
  const items = data.map((item) => item[key]);
  const arr = items.flat().map((item) => item?.trim());
  return chain(arr)
    .uniqBy((value) => value?.toLocaleLowerCase())
    .compact()
    .sort()
    .value();
}

/**
 * Formats items for a select component.
 * @param items - The items to format.
 * @returns An array of formatted items for the select component.
 */
export function formatItemsForSelect(items: string[]) {
  return items.map((item) => ({
    label: item,
    value: item,
  }));
}

/**
 * Extracts possible values from a list-based key in the project data.
 * @param data - The project data array.
 * @param key - The key to extract possible values from.
 * @returns An array of possible values for the specified key.
 */
function extractPossibleValuesFromListKey(
  data: Record<string, any>[],
  key: string
) {
  if (!data?.length) return [];
  const items = data.map((item) => item[key]?.split(","));
  const arr = items.flat().map((item) => item?.trim());
  return chain(arr)
    .uniqBy((value) => value?.toLocaleLowerCase())
    .compact()
    .sort()
    .value();
}
