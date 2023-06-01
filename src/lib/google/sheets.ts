import * as google from "@googleapis/sheets";
<<<<<<< HEAD
import MemCache from "memory-cache";

import { config , config as configuration } from "@/configuration";

import { Project } from "../../types";

import { getAuth } from "./auth";
import { parseGoogleSheetsData } from "./utils/parseGoogleSheetsData";
=======
import {
  parseGoogleSheetsData,
  removePrivateFields,
  stripPublicPrefixFromKeys,
} from "./utils/parseGoogleSheetsData";
import MemCache from "memory-cache";
import { getAuth } from "./auth";
import { config } from "@/configuration";
import { Project } from "@/types";
>>>>>>> 0caf539 (Finalize custom submission form for submitting)

const {
  serverlessFunctions: { CACHE_TTL },
} = config.constants;

// Create a memory cache instance
const cache = new MemCache.Cache();

const {
  SPREADSHEET_ID,
  sheets: { mainDatabase, pendingProjects },
} = config.constants.google.sheets.databaseSheet;

/**
 * Fetches the data of a single project based on its slug.
 * WARNING: This will fetch all project data in the process, so it is slower than fetching all data.
 * @param slug - The slug of the project to fetch.
 * @returns The project data matching the provided slug, or null if not found.
 */
export async function fetchSingleProjectData(slug: string) {
  const projectData = await fetchPublicProjectData();

  if (!projectData) {
    return null;
  }

  return findProjectBySlug(projectData, slug);
}

/**
 * Finds a project in the project data array based on its slug.
 * @param projectData - The project data array.
 * @param slug - The slug of the project to find.
 * @returns The project object matching the provided slug, or undefined if not found.
 */
export async function findProjectBySlug(
  projectData: { slug: string }[],
  slug: string
) {
  return projectData.find((project) => project.slug === slug);
}

/**
 * Fetches the project data from Google Sheets.
 * @returns A Promise that resolves to the project data array, or null if the data couldn't be fetched.
 */
export async function fetchPublicProjectData(): Promise<
  { slug: string }[] | null
> {
  const PROJECT_DATA_CACHE_KEY = "projectData";

  const cachedData = cache.get(PROJECT_DATA_CACHE_KEY) as Project[] | null;

  if (cachedData && cachedData?.length > 0) {
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
    keyRow: mainDatabase.keyRow,
  })
    .map(removePrivateFields)
    .map(stripPublicPrefixFromKeys) as Project[];

  cache.put(PROJECT_DATA_CACHE_KEY, parsedData, 1000 * CACHE_TTL);

  return parsedData;
}

/**
 * Fetches the project data from Google Sheets. Includes prefixes and private fields.
 * @returns A Promise that resolves to the project data array, or null if the data couldn't be fetched.
 */
export async function fetchAllProjectData(): Promise<
  { slug: string }[] | null
> {
  const PROJECT_DATA_CACHE_KEY = "projectData-all";

  const cachedData = cache.get(PROJECT_DATA_CACHE_KEY) as Project[] | null;

  if (cachedData && cachedData?.length > 0) {
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
    keyRow: mainDatabase.keyRow,
  });

  cache.put(PROJECT_DATA_CACHE_KEY, parsedData, 1000 * CACHE_TTL);

  return parsedData;
}

/**
 * Fetches the sheet data from Google Sheets.
 * @param args - The arguments including the spreadsheetId and range.
 * @returns A Promise that resolves to the sheet data array, or null if the data couldn't be fetched.
 */
export async function fetchSheetData(args: {
  spreadsheetId: string;
  range?: string;
}) {
  const { spreadsheetId = SPREADSHEET_ID, range } = args;

  const SHEET_DATA_CACHE_KEY = "sheet_cache_key" + spreadsheetId + range;

  const cachedData = cache.get(SHEET_DATA_CACHE_KEY);

  if (!!cachedData) {
    console.log("Returning cached data", SHEET_DATA_CACHE_KEY);
    return cachedData as string[][];
  }

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

  cache.put(SHEET_DATA_CACHE_KEY, values, 1000 * CACHE_TTL);

  return values;
}

/**
 * Uploads project data to Google Sheets.
 * @param data - The project data to upload.
 * @returns A Promise that resolves to the response from uploading the project data to Google Sheets.
 */
export async function uploadProjectData(data: string[][]) {
  const auth = getAuth();

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const projectData = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: pendingProjects.name + "!A:A",
    valueInputOption: "USER_ENTERED",
    requestBody: createResource(data),
  });

  return projectData;
}

/**
 * Creates a resource object for the project data to be uploaded to Google Sheets.
 * @param data - The project data to be uploaded.
 * @returns The resource object for the project data.
 */
function createResource(data: string[][]) {
  const resource = {
    majorDimension: "ROWS",
    values: data,
  };

  return resource;
}
