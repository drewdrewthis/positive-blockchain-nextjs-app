import { fetchSheetData } from "../google/sheets";
import { config } from "@/configuration/config";

const {
  SPREADSHEET_ID,
  sheets: { pendingProjects },
} = config.constants.google.sheets.databaseSheet;

export async function fetchKeyColumnMapForProjectSubmission(): Promise<
  Record<string, number>
> {
  const { keyRow } = pendingProjects;
  const range = `${pendingProjects.name}!A${keyRow}:${keyRow}`;

  // Fetch the sheet data for data from keyRow to headerRow
  const sheetData = await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  if (!sheetData) throw new Error("No sheet data found");

  return sheetDataToKeyMap(sheetData);
}

/**
 * Iterate through the sheet data and create a map of key to column index
 * @param sheetData
 * @returns
 */
function sheetDataToKeyMap(sheetData: string[][]) {
  const keyMap: { [key: string]: number } = {};
  const [...keys] = sheetData[0];

  keys.forEach((key, index) => {
    // Ignore empty keys
    if (key) {
      keyMap[key] = index;
    }
  });

  return keyMap;
}
