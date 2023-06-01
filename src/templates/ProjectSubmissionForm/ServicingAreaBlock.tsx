import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  id: string;
  servicingAreas: Record<string, string[]>;
  // Countries
  servicingAreaKey: string;
  // Regions
  subregionsKey: string;
}

const ID = "servicing-area-block";
const SUB_REGIONS_LABEL = "Subregions";
const COUNTRIES_LABEL = "Countries";
// TODO: This is cruft. We should remove it.
const ServicingAreasBlock = (props: Props) => {
  const { subregionsKey, servicingAreaKey } = props;
  const { register, watch, setValue, getValues, formState } = useFormContext();

  const servicingAreas = Object.keys(props.servicingAreas);
  const selectedSubregion = watch(subregionsKey);

  // Handle updating subcategories when a category is selected
  React.useEffect(() => {
    setValue(servicingAreaKey, []);
  }, [selectedSubregion, setValue, servicingAreaKey]);

  const subcategories = props.servicingAreas[selectedSubregion];

  // This seems pretty hacky, but it works
  const countriesFieldValue =
    getValues(servicingAreaKey)?.length > 0
      ? getValues(servicingAreaKey)
      : formState?.defaultValues?.[servicingAreaKey]?.length
      ? formState.defaultValues[servicingAreaKey]
      : [];

  const subregionsFieldValue = getValues(subregionsKey) ||
    formState?.defaultValues?.[subregionsKey] || [""];

  return (
    <div className="w-full gap-3 flex">
      <FormControl className="w-full mb-3">
        <InputLabel id={SUB_REGIONS_LABEL + "-label"}>
          {SUB_REGIONS_LABEL}
        </InputLabel>
        <Select
          {...register(subregionsKey)}
          label={SUB_REGIONS_LABEL}
          labelId={SUB_REGIONS_LABEL + "-label"}
          value={subregionsFieldValue}
        >
          <MenuItem value="" disabled>
            Select a subregion
          </MenuItem>
          {servicingAreas.map((subregion) => (
            <MenuItem key={subregion} value={subregion}>
              {subregion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedSubregion && (
        <FormControl className="w-full">
          <InputLabel id={COUNTRIES_LABEL + "-label"}>
            {COUNTRIES_LABEL}
          </InputLabel>
          <Select
            {...register(servicingAreaKey)}
            label="COUNTRIES_LABEL"
            labelId={COUNTRIES_LABEL + "-label"}
            value={countriesFieldValue || [""]}
            multiple
          >
            {subcategories?.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default ServicingAreasBlock;
