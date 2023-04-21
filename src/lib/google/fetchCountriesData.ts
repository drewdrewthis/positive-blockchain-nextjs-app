import { fetchSheetData } from "@/lib/google";
import { config } from "@/configuration";
import { CountryData } from "../../types";
import { camelCase } from "lodash";

const { regions } = config.constants.google.sheets.databaseSheet.sheets;
const { SPREADSHEET_ID } = config.constants.google.sheets.databaseSheet;
const { headerRow, name: sheetName } = regions;

export async function fetchCountriesData(): Promise<CountryData[]> {
  const data = (await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
  })) as any;

  return rowsToArrayOfObjects(data) as unknown as CountryData[];
}

function rowsToArrayOfObjects(matrix: string[][]) {
  const keys = matrix[headerRow - 1];
  const values = matrix.slice(headerRow);

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
