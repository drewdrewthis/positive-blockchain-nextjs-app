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
  const CACHED_CSV_STRING_KEY = "cached_csv_string_key";

  let csvContent = cache.get(CACHED_CSV_STRING_KEY) as string;

  if (csvContent) {
    console.log("Returning cached data", CACHED_CSV_STRING_KEY);
  }

  if (!csvContent) {
    const sheetData = await fetchSheetData({
      spreadsheetId: SPREADSHEET_ID,
      range: name,
    });

    if (!sheetData) {
      return null;
    }

    let csvContent = arr2csv(sheetData);

    cache.put(CACHED_CSV_STRING_KEY, csvContent, 1000 * 60 * 60);
  }

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=positive-blockchain-database.csv"
  );
  await pipeline(csvContent, res);
};

export default handler;

const BLANK_CELL = "{{DELETE ME}}";
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
