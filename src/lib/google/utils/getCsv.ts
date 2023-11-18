import { config } from "@/configuration/config";

// Extract necessary constants from the configuration
const {
  constants: {
    google: {
      sheets: {
        databaseSheet: { SPREADSHEET_ID, SPREADSHEET_NAME },
      },
    },
  },
} = config;

/**
 * Retrieves CSV data from a Google Sheets document.
 * @returns {Promise<Response>} A promise that resolves to the fetched CSV data.
 */
export function getCsv() {
  // Construct the URL for fetching the CSV data
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SPREADSHEET_NAME}`;

  // Fetch the CSV data from the specified URL
  return fetch(url);
}
