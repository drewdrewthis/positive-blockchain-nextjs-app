import isUndefined from "lodash/fp/isUndefined";
import isNull from "lodash/fp/isNull";
import compact from "lodash/fp/compact";

export function convertSubmissionFormValuesToStringArray(
  values: Record<string, any>,
  // Map of key to column index
  keyColumnMapForSubmission: { [key: string]: number }
) {
  const unsorted = Object.values(keyColumnMapForSubmission);
  const sortedArray = unsorted.sort((a, b) => a - b);
  const lastIndex = sortedArray.reverse()[0];
  const arr: any[] = new Array(lastIndex).fill("");
  const additionalValues: string[] = [];

  Object.entries(values).forEach((entry) => {
    const [key, value] = entry;
    const idx = keyColumnMapForSubmission[key];

    // If the key can't be found, it means it's an additional value
    // not part of the current project schema
    if (!idx && !isNull(value)) {
      console.warn("Input not found for key: " + key);
      additionalValues.push(value);
    } else {
      arr[idx] = value;
    }
  });

  arr[keyColumnMapForSubmission["submitted_at"]] = Date.now();
  arr[keyColumnMapForSubmission["submitted_at_ISO"]] = new Date().toISOString();

  return arr.concat(compact(additionalValues)).map(formatValueForSheet);
}

function formatValueForSheet(value: any) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (isNull(value) || isUndefined(value)) {
    return "";
  }

  return value.toString();
}
