import { auth } from "google-auth-library";
import { config } from "@/configuration";

export function getAuth() {
  const creds = config.getEnv("GOOGLE_CREDS");
  const keys = JSON.parse(creds);
  const client: any = auth.fromJSON(keys);

  client.scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
  ];

  return client;
}
