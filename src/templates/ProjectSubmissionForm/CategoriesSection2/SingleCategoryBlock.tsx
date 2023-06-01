import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  id: string;
  categories: Record<string, string[]>;
  // These are the categories that have already been selected
  // but this is not the same as a fully controlled
  // component. It's just used to disable categories that
  // have already been selected.
  selectedCategories?: string[];
}

const SingleCategoryBlock = (props: Props) => {
  const { id } = props;
  const { register, watch, setValue, getValues, formState } = useFormContext();
  const categories = Object.keys(props.categories);

  const selectedCategory = watch(id);
  const subcategoryId = "sub_" + id;

  // Handle updating subcategories when a category is selected
  React.useEffect(() => {
    setValue(subcategoryId, []);
  }, [selectedCategory, setValue, subcategoryId]);

  const subcategories = props.categories[selectedCategory];

  // This seems pretty hacky, but it works
  const subcategoryValues = getValues(subcategoryId)?.length
    ? getValues(subcategoryId)
    : formState?.defaultValues?.[id]?.length
    ? formState.defaultValues[subcategoryId]
    : [];

  if (subcategoryValues.length > 3) subcategoryValues.length = 3;

  return (
    <div className="w-full gap-3 flex">
      <FormControl className="w-full mb-3">
        <Select
          {...register(id)}
          labelId="category-label"
          // This seems pretty hacky, but it works
          value={getValues(id) || formState?.defaultValues?.[id] || [""]}
        >
          <MenuItem value="" disabled>
            Select a category
          </MenuItem>
          {[...(categories || [])].sort().map((category) => (
            <MenuItem
              key={category}
              value={category}
              disabled={props.selectedCategories?.includes(category)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategory && (
        <FormControl className="w-full">
          <InputLabel id="subcategory-label">Subcategories</InputLabel>
          <Select
            {...register(subcategoryId)}
            label="Subcategories"
            labelId="subcategory-label"
            value={subcategoryValues || [""]}
            multiple
          >
            {[...(subcategories || [])].sort().map((subcategory) => (
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

export default SingleCategoryBlock;
