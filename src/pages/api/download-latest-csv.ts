import type { NextApiRequest, NextApiResponse } from "next";
import { getLatestCsvInfo } from "@/lib/google/drive";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const info = await getLatestCsvInfo();

  if (!info?.id) {
    res.status(404).json({ error: "No CSV file found" });
    return;
  }

  const parsedInfo = parseFileContents(info);

  // res.redirect("/download-csv");
  res.redirect(parsedInfo.downloadLink);
}

function parseFileContents(fileInfo: {
  id: string;
  name: string;
  parents: string[];
}) {
  const timestamp = fileInfo?.name
    ?.split("pb_database_download-")[1]
    .split(".csv")[0];

  return {
    ...fileInfo,
    timestamp,
    downloadLink: createDownloadLink(fileInfo?.id),
  };
}

function createDownloadLink(id: string) {
  return `https://drive.google.com/uc?id=${id}&export=`;
}
