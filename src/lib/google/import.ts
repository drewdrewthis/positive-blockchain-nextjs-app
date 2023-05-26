import { parseCsvBuffer } from "../utils";
import { uploadProjectData } from "./sheets";

/**
 * Imports a CSV buffer to Google Sheets API by parsing the buffer, uploading the project data, and returning the response.
 * @param csvBuffer - The CSV buffer to import.
 * @returns A Promise that resolves to the response from uploading the project data to Google Sheets API.
 */
export async function importCSVBufferToGoogleSheetsApi(
  csvBuffer: ArrayBuffer
): Promise<any> {
  // Parse the CSV buffer
  const parsedCsv = await parseCsvBuffer(csvBuffer);
  console.log("PARSED CSV", parsedCsv);

  // Extract the data from the parsed CSV (excluding the header row)
  const data = parsedCsv.slice(1);

  // Upload the project data to Google Sheets API
  const response = await uploadProjectData(data);

  return response;
}
