import type { CountryData } from "@/types";
import uniq from "lodash/fp/uniq";

/**
 * Using the subregions, get the regions from the country data.
 */
export function getRegionsFromSubregions(
  subregions: string[],
  countryData: CountryData[]
) {
  const regions = subregions.map((subregion: string) => {
    const data = countryData.find((data) => subregion === data.subregion);
    return data?.region;
  });

  return uniq(regions);
}

/**
 * Using the subregions, get the regions from the country data.
 */
export function getSubregionsFromCountries(
  countries: string[],
  countryData: CountryData[]
) {
  const subregions = countries.map((country: string) => {
    const data = countryData.find((data) => country === data.country);
    return data?.subregion;
  });

  return uniq(subregions);
}
