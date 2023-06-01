import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { CountryData } from "../../types";
import { omit } from "lodash";
import cx from "classnames";

interface Props {
  id: string;
  countries: CountryData[];
}

/**
 * DEPRECATED: This component is no longer used in the project submission form.
 * @param props
 * @returns
 */
const RegionAndCountrySelect = (props: Props) => {
  const { countries, id } = props;
  const { control, register, watch, setValue, getValues } = useFormContext();
  const groups = groupCountriesByHemisphereRegionSubregion(countries);
  const [options, setOptions] = React.useState<any[]>(
    createRegionAndCountrySelects(groups, [])
  );

  watch(() => {
    const values = getValues()[id] || [];
    setOptions(createRegionAndCountrySelects(groups, values || []));
  });

  return (
    <Controller
      control={control}
      name={id}
      render={({ field: { onChange } }) => (
        <Autocomplete
          multiple
          id={id}
          options={options}
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => {
            onChange(value);
          }}
          renderOption={(props, option) => (
            <li
              {...props}
              className={cx(
                createClassNameForLevel(option.level),
                props.className,
                option.disabled && "text-gray-400"
              )}
            >
              {option.label}
            </li>
          )}
          getOptionDisabled={(option) => {
            return getValues()[id]?.includes(option.label);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
      )}
    />
  );
};

const createClassNameForLevel = (level: string) => {
  switch (level) {
    case "hemisphere":
      return "font-bold !pl-1 text-sm";
    case "region":
      return "font-semibold !pl-3 text-sm";
    case "subregion":
      return "font-medium !pl-5 text-sm";
    case "country":
      return "font-normal !pl-7 text-sm";
    default:
      return "";
  }
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
  return Object.keys(hemisphereGroups)
    .map((hemisphere) => {
      const hemisphereGroup = hemisphereGroups[hemisphere];

      return [
        {
          value: hemisphere,
          label: hemisphere,
          disabled: false,
          level: "hemisphere",
        },
        ...Object.keys(hemisphereGroup).map((region) => {
          const regionGroup = hemisphereGroup[region];
          let isDisabled = values.includes([hemisphere].join("-"));

          return [
            {
              value: [hemisphere, region].join("-"),
              label: region + " (All)",
              disabled: isDisabled,
              level: "region",
            },
            ...Object.keys(regionGroup).map((subregion) => {
              const subregionGroup = regionGroup[subregion];
              isDisabled =
                isDisabled || values.includes([hemisphere, region].join("-"));

              return [
                {
                  value: [hemisphere, region, subregion].join("-"),
                  label: subregion + " (All)",
                  disabled: isDisabled,
                  level: "subregion",
                },
                ...subregionGroup.map((country) => {
                  isDisabled =
                    isDisabled ||
                    values.includes([hemisphere, region, subregion].join("-"));

                  return {
                    level: "country",
                    value: [
                      hemisphere,
                      region,
                      subregion,
                      country.country,
                    ].join("-"),
                    label: country.country,
                    disabled: isDisabled,
                  };
                }),
              ];
            }),
          ];
        }),
      ];
    })
    .flat(3);
}
