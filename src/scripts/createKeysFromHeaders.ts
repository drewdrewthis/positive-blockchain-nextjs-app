/**
 * Outputs of list of keys from the headers of the Google Spreadsheet
 * SPREADSHEET_ID is the ID of the Google Spreadsheet with a default
 * set in the config file. This is a helper file.
 *
 * When pasting into Google Sheet:
 * 1. Right click on the cell
 * 2. Click "Paste Special"
 * 3. Select Transposed
 * 4. Click "Split text to columns"
 */

import { fetchSheetData } from "@/lib/google";
import dotenv from "dotenv";
// @ts-expect-error - No types
import isPlural from "is-plural";
import { config } from "../configuration";
import { parseGoogleSheetsValuesByHeaderRow } from "../lib/google/utils/parseGoogleSheetsValuesByHeaderRow";

const {
  SPREADSHEET_ID,
  sheets: { mainDatabase },
} = config.constants.google.sheets.databaseSheet;

dotenv.config({
  path: `.env.local`,
});

(async () => {
  console.log("Fetching project data...");

  const sheetData = await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: mainDatabase.name,
  });

  if (!sheetData) {
    console.log("No sheet data found");
    return;
  }

  const parsedData = parseGoogleSheetsValuesByHeaderRow(sheetData);

  console.log(Object.keys(parsedData[0]).map(addListSuffix).join(", "));

  process.exit(0);
})();

function addListSuffix(str: string) {
  if (!str) return str;
  return isPlural(str) ? `${str}_list` : str;
}
