import { intersection, isEmpty, kebabCase } from "lodash/fp";
import { Project } from "@/types";

export function filterProjectDataByFilters(
  projectData: Project[],
  filters: Record<string, string[]>
) {
  if (isEmpty(filters)) return projectData;

  return projectData.filter((project: any) => {
    const filterableAttributes = Object.keys(filters);

    if (!filterableAttributes.length) return true;

    const areAllFiltersEmpty = filterableAttributes.every((attribute) => {
      return !filters[attribute].length;
    });

    if (areAllFiltersEmpty) return true;

    if (!filterableAttributes.find((attribute) => filters[attribute].length))
      return true;

    for (const attribute of filterableAttributes) {
      if (!filters[attribute].length) continue;

      // Get project values for filter attribute
      const projectAttributeValues = project[attribute]?.split(",");

      if (!projectAttributeValues) continue;

      const arr = projectAttributeValues
        .flat()
        .map((value: string) => kebabCase(value?.trim()));

      const isMatch = intersection(arr, filters[attribute]).length > 0;

      if (isMatch) return true;
    }

    return false;
  });
}
