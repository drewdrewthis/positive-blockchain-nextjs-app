import * as google from "@googleapis/drive";
import { getAuth } from "./auth";

export async function fetchLatestCsvInfoEnhanced(): Promise<{
  id: string;
  name: string;
  parents: string[];
  downloadLink: string;
}> {
  const info = await getLatestCsvInfo();
  return parseFileContents(info);
}

export async function getLatestCsvId() {
  const info = await getLatestCsvInfo();
  return info?.id;
}

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

function parseFileContents(
  fileInfo: {
    id: string;
    name: string;
    parents: string[];
  } | void
) {
  if (!fileInfo) throw new Error("fileInfo cannot be undefined");

  const timestamp = fileInfo?.name
    ?.split("pb_database_download-")[1]
    .split(".csv")[0];

  return {
    ...fileInfo,
    timestamp,
    downloadLink: createDownloadLink(fileInfo?.id),
  };
}

export function createDownloadLink(id: string) {
  return `https://drive.google.com/uc?id=${id}&export=`;
}
