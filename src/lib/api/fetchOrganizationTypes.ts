import { config } from "@/configuration/config";
import { fetchSheetData } from "@/lib/google";

const { dataTables } = config.constants.google.sheets.databaseSheet.sheets;
const { SPREADSHEET_ID } = config.constants.google.sheets.databaseSheet;
const { name: sheetName, ranges } = dataTables;

/**
 * Fetches the list of organization types we recognize.
 * @returns {Promise<CountryData[]>} The list of organization types.
 */
export async function fetchOrganizationTypes(): Promise<string[]> {
  const data = (await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!${ranges.organizationTypes}`,
  })) as any;

  return data.flat();
}
