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

    csvContent = arr2csv(sheetData);

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

function arr2csv(arr: string[][]) {
  const csvWriter = createArrayCsvStringifier({});

  return csvWriter.stringifyRecords(arr);
}
