import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  id: string;
  categories: Record<string, string[]>;
}

const SingleCategoryBlock = (props: Props) => {
  const { id } = props;
  const { register, watch, setValue } = useFormContext();
  const categories = Object.keys(props.categories);

  const selectedCategory = watch(id);
  const subcategoryId = "sub-" + id;

  // Handle updating subcategories when a category is selected
  React.useEffect(() => {
    setValue(subcategoryId, []);
  }, [selectedCategory, setValue]);

  const subcategories = props.categories[selectedCategory];

  return (
    <div className="w-full gap-3 flex">
      <FormControl className="w-full mb-3">
        <InputLabel id="category-label">Category</InputLabel>
        <Select labelId="category-label" {...register(id)} defaultValue="">
          <MenuItem value="" disabled>
            Select a category
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategory && (
        <FormControl className="w-full">
          <InputLabel id="subcategory-label">
            Subcategories (Optional)
          </InputLabel>
          <Select
            labelId="subcategory-label"
            {...register(subcategoryId)}
            multiple
            value={watch(subcategoryId)}
            // onChange={(event) => {
            //   setValue(subcategoryId, event.target.value);
            // }}
          >
            {subcategories.map((subcategory) => (
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
