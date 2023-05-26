import * as google from "@googleapis/drive";
import { getAuth } from "./auth";

/**
 * Retrieves the latest CSV file information from Google Drive.
 * @returns A Promise that resolves to the latest CSV file information (id, name, parents), or void if no files are found.
 */
export async function getLatestCsvInfo(): Promise<{ id: string; name: string; parents: string[] } | void> {
  // Get the Google authentication client
  const auth = getAuth();

  // Create a Google Drive instance
  const drive = google.drive({ version: "v3", auth });

  // Define the query to search for files
  const query = "name contains 'pb_database_download'";

  // List files that match the query
  const response = await drive.files.list({
    q: query,
    fields: "files(id, name, parents)",
  });

  // Retrieve the files from the response
  const files = response.data.files;

  if (files?.length) {
    // If files are found, return the first file
    const file = files[0] as { id: string; name: string; parents: string[] };
    console.log("Latest CSV file:", file);
    return file;
  } else {
    console.log("No files found.");
  }
}

/**
 * Retrieves the ID of the latest CSV file from Google Drive.
 * @returns A Promise that resolves to the ID of the latest CSV file, or undefined if no files are found.
 */
export async function getLatestCsvId(): Promise<string | undefined> {
  const info = await getLatestCsvInfo();
  return info?.id;
}
