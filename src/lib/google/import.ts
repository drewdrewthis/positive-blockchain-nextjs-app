import { parseCsvBuffer } from "../utils";
import { uploadProjectData } from "./sheets";

export async function importCSVBufferToGoogleSheetsApi(
  csvBuffer: ArrayBuffer
): Promise<any> {
  const parsedCsv = await parseCsvBuffer(csvBuffer);
  console.log("PARSED CSV", parsedCsv);
  const data = parsedCsv.slice(1);
  const response = await uploadProjectData(data);
  return response;
}
