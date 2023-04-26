import { config } from "../configuration";
import { fetchSheetData } from "./google";

const { SPREADSHEET_ID, sheets } = config.constants.google.sheets.apiSheet;
const { apiKeys } = sheets;

export async function isValidApiKeyAsync(key: string) {
  const keys = (await fetchApiKeys()) as string[];
  console.log("DEGUG: keys", key);
  return keys.includes(key);
}

async function fetchApiKeys() {
  const sheetData = await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: apiKeys.name + "!A2:A",
  });

  if (!sheetData) {
    throw new Error("No data found.");
  }

  return sheetData.map((row) => row[0]);
}
