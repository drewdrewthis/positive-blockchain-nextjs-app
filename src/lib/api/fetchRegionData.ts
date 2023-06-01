import { fetchSheetData } from "@/lib/google";
import { config } from "@/configuration/config";
import { CountryData } from "@/types";
import { camelCase } from "lodash";

const { dataTables } = config.constants.google.sheets.databaseSheet.sheets;
const { SPREADSHEET_ID } = config.constants.google.sheets.databaseSheet;
const { name: sheetName, ranges } = dataTables;

/**
 * Fetches the region data from the Google Sheet
 * @returns {Promise<CountryData[]>} The region data.
 */
export async function fetchRegionData(): Promise<CountryData[]> {
  const data = (await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!${ranges.regions}`,
  })) as any;

  return rowsToArrayOfObjects(data) as unknown as CountryData[];
}

function rowsToArrayOfObjects(matrix: string[][]) {
  const keys = matrix[0];
  const values = matrix.slice(1);

  return values.map((row) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < keys.length; i++) {
      if (row[i] === "") {
        continue;
      }

      obj[camelCase(keys[i])] = row[i];
    }
    return obj;
  });
}
