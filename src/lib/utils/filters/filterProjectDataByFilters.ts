/**
 * This file contains a TypeScript implementation of a function for filtering project data based on certain filters.
 * It utilizes various functions from the lodash library to perform operations on arrays and strings.
 */

import type { Project } from "@/types";

import intersection from "lodash/fp/intersection";
import isEmpty from "lodash/fp/isEmpty";
import kebabCase from "lodash/fp/kebabCase";
import memoize from "lodash/fp/memoize";

/**
 * Memoized version of the kebabCase function from lodash.
 * It converts a string to kebab case.
 */
const memoizedKebabCase = memoize(kebabCase);

/**
 * Standardizes an array of strings by converting each string to kebab case.
 * @param arr - The array of strings to be standardized.
 * @returns The standardized array of strings.
 */
function standardizeStringArray(arr: string[]): string[] {
  if (!arr) return [];
  return arr.flat().map((str) => memoizedKebabCase(str));
}

/**
 * Memoized version of the standardizeStringArray function.
 * @param arr - The array of strings to be standardized.
 * @returns The memoized result of the standardizeStringArray function.
 */
const memoizedStandardizeStringArray = memoize(standardizeStringArray);

/**
 * Filters project data based on the provided filters.
 * @param projectData - The array of project data to be filtered.
 * @param filters - The filters to be applied to the project data.
 * @returns The filtered array of project data.
 */
export function filterProjectDataByFilters(
  projectData: Project[],
  filters: Record<string, string[]>
): Project[] {
  let result = [...projectData];
  if (isEmpty(filters)) return projectData;

  const { sdg_occurences, ...rest } = filters;

  // Handle SDGs separately
  if (sdg_occurences?.length) {
    const sdgs = getSdgs({ sdg_occurences });

    result = result.filter((project: Project) => {
      const projectSdgs = project.sdg_occurrences_list;
      const hasMatch =
        projectSdgs && sdgs.some((sdg) => sdg && projectSdgs.includes(sdg));
      return hasMatch;
    });
  }

  Object.keys(rest).forEach((filter) => {
    result = result.filter((project: any) => {
      const filterValues = memoizedStandardizeStringArray(filters[filter]);
      if (isEmpty(filterValues)) return true;
      const projectAttributeValues = getProjectAttributeValue(project[filter]);
      const projectValues = memoizedStandardizeStringArray(
        projectAttributeValues
      );
      const isMatch = intersection(projectValues, filterValues).length > 0;
      return isMatch;
    });
  });

  return result;
}

/**
 * Extracts the SDGs (Sustainable Development Goals) from the provided SDG occurrences.
 * @param props - The object containing the SDG occurrences.
 * @returns The extracted SDGs.
 */
function getSdgs(props: { sdg_occurences: string[] }) {
  const { sdg_occurences } = props;
  return sdg_occurences.map((sdg: string) => sdg.match(/\d+/)?.[0]);
}

/**
 * Retrieves the attribute values from the project attributes.
 * @param attributes - The attributes to retrieve values from.
 * @returns The attribute values.
 */
function getProjectAttributeValue(attributes: any) {
  if (!attributes) return attributes;
  if (Array.isArray(attributes)) return attributes;
  return attributes.split(",");
}
