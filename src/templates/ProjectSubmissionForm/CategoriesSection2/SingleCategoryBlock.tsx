import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

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
  const subcategories = props.categories[selectedCategory];
  const subcategoryValues = getValues(subcategoryId);

  if (subcategoryValues.length > 3) subcategoryValues.length = 3;

  // Handle updating subcategories when a category is selected
  useEffect(() => {
    setValue(subcategoryId, []);
  }, [selectedCategory, setValue, subcategoryId]);

  // Set the default value to the value on mount
  useEffect(() => {
    setValue(id, formState.defaultValues?.[id]);
    setValue(subcategoryId, formState.defaultValues?.[subcategoryId]);
  }, [formState.defaultValues, id, setValue, subcategoryId]);

  return (
    <div className="w-full gap-3 flex">
      <FormControl className="w-full mb-3">
        <Select
          {...register(id)}
          labelId="category-label"
          value={getValues(id) || [""]}
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
        <FormControl
          className="w-full"
          error={formState.isDirty && !subcategoryValues.length}
        >
          <InputLabel id="subcategory-label" required>
            Subcategories
          </InputLabel>
          <Select
            {...register(subcategoryId, { required: true })}
            label="Subcategories"
            labelId="subcategory-label"
            value={subcategoryValues || [""]}
            required
            multiple
            inputProps={{ required: true }}
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
