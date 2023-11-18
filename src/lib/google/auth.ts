import { auth } from "google-auth-library";

import { config } from "@/configuration";

/**
 * Retrieves the Google authentication client with the required scopes.
 * @returns The Google authentication client.
 */
export function getAuth() {
  // Retrieve the Google credentials from the configuration
  const creds = config.getEnv("GOOGLE_CREDS");

  // Parse the credentials JSON
  const keys = JSON.parse(creds);

  // Create a Google authentication client from the parsed credentials
  const client: any = auth.fromJSON(keys);

  // Set the required scopes for the client
  client.scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
  ];

  return client;
}
