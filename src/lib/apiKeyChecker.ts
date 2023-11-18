import { config } from "../configuration";

import { fetchSheetData } from "./google";

const { SPREADSHEET_ID, sheets } = config.constants.google.sheets.apiSheet;
const { apiKeys } = sheets;

/**
 * Checks if an API key is valid asynchronously.
 * @param key - The API key to validate.
 * @returns A Promise that resolves to a boolean indicating whether the API key is valid.
 */
export async function isValidApiKeyAsync(key: string): Promise<boolean> {
  const keys = (await fetchApiKeys()) as string[];
  console.log("DEBUG: keys", key);
  return keys.includes(key);
}

/**
 * Fetches the API keys from Google Sheets.
 * @returns A Promise that resolves to an array of API keys.
 * @throws If no data is found.
 */
async function fetchApiKeys(): Promise<string[]> {
  const sheetData = await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: apiKeys.name + "!A2:A",
  });

  if (!sheetData) {
    throw new Error("No data found.");
  }

  return sheetData.map((row) => row[0]);
}
