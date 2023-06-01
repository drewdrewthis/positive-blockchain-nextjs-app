import { fetchSheetData } from "@/lib/google";
import { config } from "@/configuration";
import { CountryData } from "@/types";

const { dataTables } = config.constants.google.sheets.databaseSheet.sheets;
const { SPREADSHEET_ID } = config.constants.google.sheets.databaseSheet;
const { name: sheetName, ranges } = dataTables;

/**
 * Fetches the possible (supported) blockchain technologies from the Google Sheet
 * @returns {Promise<string[]>} Unsorted blockchain technologies array.
 */
export async function fetchBlockchainTechnologies(): Promise<string[]> {
  const data = (await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!${ranges.blockchainTechnoloy}`,
  })) as any;

  return data.flat();
}
