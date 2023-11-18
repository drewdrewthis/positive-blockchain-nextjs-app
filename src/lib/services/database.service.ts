import { uniq } from "lodash/fp";

import { config } from "../../configuration";
import { fetchSheetData } from "../google";

const { SPREADSHEET_ID } = config.constants.google.sheets.databaseSheet;
const { dataTables } = config.constants.google.sheets.databaseSheet.sheets;
const { partnerTags } = dataTables.ranges;

export class DatabaseService {
  /**
   * Fetches the partner tags from the database sheet.
   * Uses the ranges defined in the config file.
   */
  async fetchPartnerTags(): Promise<string[]> {
    const data = await this.fetchRangeData({
      sheetName: dataTables.name,
      range: partnerTags,
    }).catch((err) => {
      console.error(err, "Failed to fetch partner tags");
      return [];
    });

    return uniq(data?.flat());
  }

  private async fetchRangeData(args: {
    range: string;
    sheetName: string;
    spreadsheetId?: string;
  }): Promise<string[][]> {
    const { range, sheetName, spreadsheetId = SPREADSHEET_ID } = args;

    return fetchSheetData({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!${range}`,
    })
      .then((data) => {
        if (!data) {
          throw new Error("No data returned");
        }

        if (!Array.isArray(data[0])) {
          throw new Error("No values returned");
        }

        return data;
      })
      .catch((err) => {
        console.error(err, "Failed to fetch data: " + JSON.stringify(args));
        return [[]] as string[][];
      });
  }
}
