import type { FormInput } from "@/templates/ProjectSubmissionForm";

import uniq from "lodash/fp/uniq";

import { config } from "@/configuration/config";
import {
  DatabaseColumnKey,
  constants,
  overrides,
} from "@/configuration/submission-form-config";
import { CountryData } from "@/types";

import { fetchSheetData } from "../google/sheets";
import { DatabaseService } from "../services/database.service";

import { fetchAllCategoriesData } from "./fetchAllCategoriesData";
import { fetchBlockchainTechnologies } from "./fetchBlockchainTechnologies";
import { fetchOrganizationTypes } from "./fetchOrganizationTypes";
import { fetchRegionData } from "./fetchRegionData";


const {
  SPREADSHEET_ID,
  sheets: { mainDatabase },
} = config.constants.google.sheets.databaseSheet;

/**
 * Fetches the project submission form inputs from the database sheet
 * and adds the options for specific inputs.
 *
 * The sheet information is defined in the config file.
 */
export async function fetchProjectSubmissionFormInputs(): Promise<FormInput[]> {
  const { keyRow, headerRow } = mainDatabase;
  const range = `${mainDatabase.name}!${keyRow}:${headerRow}`;

  // Fetch the sheet data for data from keyRow to headerRow
  const sheetData = await fetchSheetData({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  if (!sheetData) throw new Error("No sheet data found");

  // Get the inputs (key, header) for the public keys
  const inputs = sheetDataToFormInputs(sheetData);

  // Add the options for the inputs
  return addOptionsToFormInputs(inputs);
}

/**
 * Converts the sheet data to an array of form inputs.
 */
function sheetDataToFormInputs(sheetData: string[][]): FormInput[] {
  const formInputs = sheetData[0].map((_, index) => {
    const key = sheetData[0][index] as DatabaseColumnKey;
    const helperText = sheetData[1][index];
    const headerTitle = sheetData[sheetData.length - 1][index];

    return {
      columnIdx: index,
      key,
      headerTitle,
      helperText,
      // Options comes from the overrides file.
      ...overrides[key],
    };
  });

  return formInputs;
}

/**
 * Add the options to all of the form inputs that have options, returning
 * a new array of form inputs.
 */
async function addOptionsToFormInputs(
  formInputs: FormInput[]
): Promise<FormInput[]> {
  return Promise.all(
    formInputs.map(async (formInput) => {
      const options = (await fetchOptionsFor(formInput.key)) || null;
      return { ...formInput, options };
    })
  );
}

/**
 * Fetches the options for the given key (corresponds to a specific input)
 */
async function fetchOptionsFor(key: string) {
  const dbService = new DatabaseService();

  if (key === "PUBLIC_categories_list") {
    const categoryData = await fetchAllCategoriesDataCached();
    if (categoryData) return Object.keys(categoryData);
  }

  if (key === "PUBLIC_sub_categories_list") {
    return fetchAllCategoriesDataCached();
  }

  if (key === "PUBLIC_active") {
    return ["Active", "Inactive"];
  }

  if (key === "PUBLIC_servicing_area") {
    const data = await fetchAllRegionsDataCached();
    if (data) return uniq(data.map((data) => data.country));
  }

  if (key === "PUBLIC_organization_type") {
    return fetchOrganizationTypes();
  }

  if (key === "PUBLIC_year_creation") {
    const earliestYear = constants.EARLEST_FOUNDING_YEAR;
    const length = new Date().getFullYear() - earliestYear + 1;
    return Array.from({ length }, (_, i) => i + earliestYear);
  }

  if (key === "PUBLIC_blockchain_technology") {
    return (await fetchBlockchainTechnologies())
      .sort()
      .filter((value) => value !== "- Other")
      .concat(["Other"]);
  }

  if (key === "PUBLIC_subregions_list" || key === "PUBLIC_hq_subregion") {
    const data = await fetchAllRegionsDataCached();
    if (data)
      return data.reduce((acc, data) => {
        // If the region doesn't exist in the accumulator, add it
        if (!acc[data.subregion]) {
          acc[data.subregion] = [];
        }

        // If the subregion doesn't exist in the accumulator, add it
        if (data.country && !acc[data.subregion].includes(data.country)) {
          acc[data.subregion].push(data.country);
        }

        return acc;
      }, {} as Record<string, string[]>);
  }

  if (
    key === "PUBLIC_primary_headquarter_country" ||
    key === "PUBLIC_secondary_headquarter_country"
  ) {
    const data = await fetchAllRegionsDataCached();
    if (data) return uniq(data.map((data) => data.country));
  }

  if (key === "PUBLIC_pb_partner_tag") {
    return dbService.fetchPartnerTags();
  }
}

let _cached_categories: any;
async function fetchAllCategoriesDataCached() {
  if (_cached_categories) return _cached_categories;
  _cached_categories = await fetchAllCategoriesData();
  return _cached_categories;
}

let _cached_regions: CountryData[];
async function fetchAllRegionsDataCached() {
  if (_cached_regions) return _cached_regions;
  _cached_regions = await fetchRegionData();
  return _cached_regions;
}
