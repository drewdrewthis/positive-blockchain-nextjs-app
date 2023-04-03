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

/**
 * WARNING: This Will fetch all of the project data in the process,
 * so it is as slower than just fetching all of the data.
 */
export async function fetchSingleProjectData(slug: string) {
  const projectData = await fetchProjectData();

  if (!projectData) {
    return null;
  }

  return projectData.find((project) => project.slug === slug);
}

export async function fetchProjectData(): Promise<{ slug: string }[] | null> {
  const PROJECT_DATA_CACHE_KEY = "projectData";

  const cachedData = cache.get(PROJECT_DATA_CACHE_KEY);

  if (cachedData) {
    console.log("Returning cached data", PROJECT_DATA_CACHE_KEY);
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

  cache.put(PROJECT_DATA_CACHE_KEY, parsedData, 1000 * 60 * 60);

  return parsedData;
}

export async function fetchSheetData(args: {
  spreadsheetId: string;
  range?: string;
}) {
  const SHEET_DATA_CACHE_KEY = "sheet_cache_key";

  const cachedData = cache.get(SHEET_DATA_CACHE_KEY);

  if (cachedData) {
    console.log("Returning cached data", SHEET_DATA_CACHE_KEY);
    return cachedData as string[][];
  }

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

  const values = projectData.data.values;

  cache.put(SHEET_DATA_CACHE_KEY, values, 1000 * 60 * 60);

  return values;
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
