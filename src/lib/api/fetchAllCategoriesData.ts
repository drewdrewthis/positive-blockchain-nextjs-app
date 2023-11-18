import { config } from "../../configuration/config";
import { fetchSheetData } from "../google";

const { SPREADSHEET_ID } = config.constants.google.sheets.databaseSheet;
const { dataFrame } = config.constants.google.sheets.databaseSheet.sheets;
const { headerRow, name: sheetName } = dataFrame;

/**
 * Fetches all of the categories data from the database sheet.
 * TODO: Update this to use the new databases sheet
 *
 * @returns
 */
export async function fetchAllCategoriesData() {
  try {
    const data = (await fetchSheetData({
      spreadsheetId: SPREADSHEET_ID,
      range: sheetName,
    })) as any;

    return matrixToDictionary(data);
  } catch (e) {
    console.error(e);
  }
}

function matrixToDictionary(matrix: string[][]): Record<string, string[]> {
  const dictionary: Record<string, string[]> = {};
  const keys = matrix[headerRow - 1];
  for (let i = 1; i < keys.length; i++) {
    const key = keys[i];

    const values = [];

    for (let j = 2; j < matrix.length; j++) {
      values.push(matrix[j][i]);
    }

    dictionary[key] = values.filter((value) => !!value?.trim());
  }
  return dictionary;
}
