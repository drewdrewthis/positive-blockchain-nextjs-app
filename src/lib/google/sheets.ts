import * as google from "@googleapis/sheets";
import { parseGoogleSheetsData } from "./utils/parseGoogleSheetsData";
import MemCache from "memory-cache";
import { getAuth } from "./auth";
import { config } from "@/configuration";

const cache = new MemCache.Cache();

const {
  SPREADSHEET_ID,
  sheets: { mainDatabase, pendingProjects },
} = config.constants.google.sheets.databaseSheet;

export async function fetchSingleProjectData(slug: string) {
  const projectData = await fetchProjectData();

  if (!projectData) {
    return null;
  }

  return projectData.find((project) => project.slug === slug);
}

export async function fetchProjectData(): Promise<{ slug: string }[] | null> {
  const cachedData = cache.get("projectData");
  if (cachedData) {
    return cachedData as {
      slug: string;
    }[];
  }

  const sheetData = await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range: mainDatabase.name,
  });

  if (!sheetData) {
    return null;
  }

  const parsedData = parseGoogleSheetsData(sheetData, {
    headerRow: mainDatabase.headerRow,
  });

  cache.put("projectData", parsedData, 1000 * 60 * 60);

  return parsedData;
}

async function fetchSheetData(args: { spreadsheetId: string; range?: string }) {
  const { spreadsheetId = SPREADSHEET_ID, range } = args;
  const auth = getAuth();

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const projectData = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  sheets.spreadsheets.context;

  return projectData.data.values;
}

export async function uploadProjectData(data: string[][]) {
  const auth = getAuth();

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const projectData = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: pendingProjects.name,
    valueInputOption: "USER_ENTERED",
    requestBody: createResource(data),
  });

  return projectData;
}

function createResource(data: string[][]) {
  const resource = {
    majorDimension: "ROWS",
    values: data,
  };

  return resource;
}
