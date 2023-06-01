// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSheetData } from "@/lib/google";
import { config } from "@/configuration";

const { dataFrame } = config.constants.google.sheets.databaseSheet.sheets;
const { SPREADSHEET_ID } = config.constants.google.sheets.databaseSheet;

const { headerRow, name: sheetName } = dataFrame;

/**
 * Fetches all categories from the database sheet via the Google Sheets API
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader("Cache-Control", "s-maxage=60 , stale-while-revalidate");

  const categories = await fetchAllCategoriesData();

  res.status(200).json({
    data: {
      categories,
    },
  });
}

async function fetchAllCategoriesData() {
  try {
    const data = (await fetchSheetData({
      spreadsheetId: SPREADSHEET_ID,
      range: sheetName,
    })) as any;

    console.log("DATA", data);

    return matrixToDictionary(data);
  } catch (e) {
    console.error(e);
  }
}

function matrixToDictionary(matrix: string[][]): Record<string, string[]> {
  const dictionary: Record<string, string[]> = {};
  const keys = matrix[headerRow - 1];
  for (let i = 1; i < keys.length; i++) {
    const key = keys[i];

    const values = [];

    for (let j = 2; j < matrix.length; j++) {
      values.push(matrix[j][i]);
    }

    dictionary[key] = values.filter((value) => !!value?.trim());
  }
  return dictionary;
}
