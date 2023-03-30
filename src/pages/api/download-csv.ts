import stream from "stream";
import { promisify } from "util";
import { config } from "@/configuration";
import { fetchSheetData } from "@/lib/google";
import { createArrayCsvStringifier } from "csv-writer";
import MemCache from "memory-cache";

const pipeline = promisify(stream.pipeline);

const cache = new MemCache.Cache();

const {
  constants: {
    google: { sheets },
  },
} = config;

const {
  databaseSheet: {
    SPREADSHEET_ID,
    sheets: {
      mainDatabase: { name },
    },
  },
} = sheets;

const handler = async (req: any, res: any) => {
  try {
    const csvString = await getCsv();

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=positive-blockchain-database.csv"
    );

    await pipeline(csvString, res);
  } catch (error: any) {
    console.error(error);

    res.status(500).send({
      error: "Something went wrong",
      message: error.message,
    });
  }
};

export default handler;

async function getCsv() {
  const CACHED_CSV_STRING_KEY = "cached_csv_string_key";

  const cachedData = cache.get(CACHED_CSV_STRING_KEY) as string;

  if (cachedData) {
    return cachedData;
  } else {
    // Get google sheet data
    const sheetData = await fetchSheetData({
      spreadsheetId: SPREADSHEET_ID,
      range: name,
    });

    if (!sheetData) {
      throw new Error("Failed to fetch sheet data");
    }

    // Convert to CSV string
    const csvContent = arr2csv(sheetData);

    // Cache CSV string
    cache.put(CACHED_CSV_STRING_KEY, csvContent, 1000 * 60 * 60);

    return csvContent;
  }
}

const BLANK_CELL = "{{BLANK_CELL}}";
function arr2csv(arr: string[][]) {
  const preparedArray = prepareArrayForConversion(arr);
  const csvWriter = createArrayCsvStringifier({});
  const csvString = csvWriter.stringifyRecords(preparedArray);

  // Remove blank cells
  return csvString.replace(new RegExp(BLANK_CELL, "g"), "");
}

/**
 * Because we only have values, we need to determine the number of columns
 * there should be and create "blank cells" that we can strip from the final output
 **/
function prepareArrayForConversion(arr: string[][]) {
  const longestRowLength = findLongestRowLength(arr);

  return arr.map((row) => {
    const newRow = new Array(longestRowLength).fill(BLANK_CELL);

    row.forEach((cell, i) => {
      newRow[i] = cell;
    });

    return newRow;
  });
}

function findLongestRowLength(arr: string[][]) {
  let longestRowLength = 0;

  arr.forEach((row) => {
    if (row.length > longestRowLength) {
      longestRowLength = row.length;
    }
  });

  return longestRowLength;
}
