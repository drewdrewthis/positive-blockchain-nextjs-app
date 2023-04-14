import { chain } from "lodash";
import { Project } from "../../types";

export function extractFiltersFromProjectData(
  projectData: Partial<Project>[]
): Record<string, string[]> {
  if (!projectData?.length) return {};

  return {
    ...extactPossibleValuesFromKeys(projectData, [
      "active",
      "main_category",
      "blockchain_type",
      "primary_headquarter_country",
    ]),
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
