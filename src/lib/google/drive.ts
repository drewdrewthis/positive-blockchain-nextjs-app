import * as google from "@googleapis/drive";
import { getAuth } from "./auth";

export async function getLatestCsvInfo(): Promise<{
  id: string;
  name: string;
  parents: string[];
} | void> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  const query = "name contains 'pb_database_download'";

  const response = await drive.files.list({
    q: query,
    fields: "files(id, name, parents)",
  });

  const files = response.data.files;

  if (files?.length) {
    const file = files[0] as { id: string; name: string; parents: string[] };
    console.log("Latest CSV file:", file);
    return file;
  } else {
    console.log("No files found.");
  }
}

export async function getLatestCsvId() {
  const info = await getLatestCsvInfo();
  return info?.id;
}
