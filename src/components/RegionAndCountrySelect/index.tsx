import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { CountryData } from "../../types";

interface Props {
  id: string;
  countries: CountryData[];
}

const RegionAndCountrySelect = (props: Props) => {
  const { countries, id } = props;
  const { register, watch, setValue, getValues } = useFormContext();
  const values = getValues()[id] || [];

  return (
    <div className="w-full gap-3 flex flex-col text-xs">
      <FormControl className="w-full mb-3">
        <InputLabel id={id}>Region/Country</InputLabel>
        <Select
          id={id}
          className="w-full"
          label="Category"
          labelId="category-label"
          {...register(id)}
          multiple
          value={watch(id) || []}
          input={<OutlinedInput label="Name" />}
        >
          {createRegionAndCountrySelects(
            groupCountriesByHemisphereRegionSubregion(countries),
            values || []
          )}
        </Select>
      </FormControl>
      <ul>
        {values
          ?.map((area: string) => area.split("-").pop())
          .map((area: string) => (
            <li key={area}>{area}</li>
          ))}
      </ul>
    </div>
  );
};

export default RegionAndCountrySelect;

// Function group countries by hemisphere, region, and subregion
function groupCountriesByHemisphereRegionSubregion(countries: CountryData[]): {
  [hemisphere: string]: {
    [region: string]: {
      [subregion: string]: CountryData[];
    };
  };
} {
  const hemisphereGroups = countries.reduce((acc, country) => {
    const hemisphere = country.hemisphere;
    const region = country.region;
    const subregion = country.subregion;

    if (!acc[hemisphere]) {
      acc[hemisphere] = {};
    }

    if (!acc[hemisphere][region]) {
      acc[hemisphere][region] = {};
    }

    if (!acc[hemisphere][region][subregion]) {
      acc[hemisphere][region][subregion] = [];
    }

    acc[hemisphere][region][subregion].push(country);

    return acc;
  }, {} as any);

  return hemisphereGroups;
}

// For each hemisphere, region, and subregion, create a nested select
function createRegionAndCountrySelects(
  hemisphereGroups: ReturnType<
    typeof groupCountriesByHemisphereRegionSubregion
  >,
  values: string[]
) {
  return Object.keys(hemisphereGroups).map((hemisphere) => {
    const hemisphereGroup = hemisphereGroups[hemisphere];

    return [
      <MenuItem value={hemisphere} key={hemisphere} className="font-bold">
        {hemisphere} (All)
      </MenuItem>,
      ...Object.keys(hemisphereGroup).map((region) => {
        const regionGroup = hemisphereGroup[region];
        let isDisabled = values.includes([hemisphere].join("-"));

        return [
          <MenuItem
            value={[hemisphere, region].join("-")}
            key={[hemisphere, region].join("-")}
            className="pl-6"
            disabled={isDisabled}
          >
            {region} (All)
          </MenuItem>,
          ...Object.keys(regionGroup).map((subregion) => {
            const subregionGroup = regionGroup[subregion];
            isDisabled =
              isDisabled || values.includes([hemisphere, region].join("-"));

            return [
              <MenuItem
                disabled={isDisabled}
                className="pl-8 text-sm"
                value={[hemisphere, region, subregion].join("-")}
                key={[hemisphere, region, subregion].join("-")}
              >
                {subregion} (All)
              </MenuItem>,
              ...subregionGroup.map((country) => {
                isDisabled =
                  isDisabled ||
                  values.includes([hemisphere, region, subregion].join("-"));

                return (
                  <MenuItem
                    disabled={isDisabled}
                    value={[
                      hemisphere,
                      region,
                      subregion,
                      country.country,
                    ].join("-")}
                    key={[hemisphere, region, subregion, country.country].join(
                      "-"
                    )}
                    className="pl-10 text-sm"
                  >
                    {country.country}
                  </MenuItem>
                );
              }),
            ];
          }),
        ];
      }),
    ];
  });
}
