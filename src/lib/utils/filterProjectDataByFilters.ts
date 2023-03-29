import intersection from "lodash/fp/intersection";
import isEmpty from "lodash/fp/isEmpty";
import kebabCase from "lodash/fp/kebabCase";
import memoize from "lodash/fp/memoize";
import { Project } from "@/types";

const memoizedKebabCase = memoize(kebabCase);

function standardizeStringArray(arr: string[]) {
  if (!arr) return [];
  return arr.flat().map((str) => memoizedKebabCase(str));
}

const memoizedStandardizeStringArray = memoize(standardizeStringArray);

export function filterProjectDataByFilters(
  projectData: Project[],
  filters: Record<string, string[]>
) {
  let result = [...projectData];
  if (isEmpty(filters)) return projectData;

  Object.keys(filters).forEach((filter) => {
    result = result.filter((project: any) => {
      const filterValues = memoizedStandardizeStringArray(filters[filter]);
      if (isEmpty(filterValues)) return true;
      const projectAttributeValues = project[filter]?.split(",");
      const projectValues = memoizedStandardizeStringArray(
        projectAttributeValues
      );
      const isMatch = intersection(projectValues, filterValues).length > 0;
      return isMatch;
    });
  });

  return result;
}
