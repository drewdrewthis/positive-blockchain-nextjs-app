import { chain } from "lodash";
import { Project } from "../../../types";

export function extractFiltersFromProjectData(
  projectData: Partial<Project>[]
): Record<string, string[]> {
  if (!projectData?.length) return {};

  console.log(projectData[0].categories_list);

  return {
    ...extactPossibleValuesFromKeys(projectData, [
      "active",
      "blockchain_type",
      "primary_headquarter_country",
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

function extactPossibleValuesFromKeys(
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

export function formatItemsForSelect(items: string[]) {
  return items.map((item) => ({
    label: item,
    value: item,
  }));
}

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
