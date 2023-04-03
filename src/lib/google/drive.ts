import * as google from "@googleapis/drive";
import { getAuth } from "./auth";
import fs from "fs";

/**
 * Upload a file from the file system to Google Drive using the Google Drive API.
 */
export async function uploadFile() {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  const requestBody = {
    name: "pb-database.csv",
    // fields: "id",
    parents: ["1tMmVWWxe_ZREIRkw9AaQWawe1vE35VTf"],
    role: "reader",
    type: "anyone",
  };

  const media = {
    uploadType: "media",
    mimeType: "text/csv",
    body: fs.createReadStream("src/files/positive-blockchain-database.csv"),
  };

  try {
    const file = await drive.files.create({
      includePermissionsForView: "published",
      requestBody: {
        name: "pb-database.csv",
        parents: ["1tMmVWWxe_ZREIRkw9AaQWawe1vE35VTf"],
      },
      media: media,
    });

    console.log("File Id:", file.data.id, file);

    await drive.permissions.create({
      fileId: file.data.id as string,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return file.data.id;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getLatestCsvId() {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  const query = "name = 'pb-database.csv'";

  const response = await drive.files.list({
    q: query,
    fields: "files(id, name, parents)",
  });

  const files = response.data.files;

  if (files?.length) {
    const file = files[0];
    console.log("Latest CSV file:", file);
    return file.id;
  } else {
    console.log("No files found.");
  }
}
