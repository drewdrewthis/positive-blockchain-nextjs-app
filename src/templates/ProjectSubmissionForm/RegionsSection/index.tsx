import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  options: string[];
  placeholder: string;
  initialValues?: string[];
}

/**
 * DEPRECATED: This component is currently not used.
 * @param props
 * @returns
 */
export function RegionsSection(props: Props) {
  const { id, options, placeholder, label } = props;
  const methods = useForm();
  const { register, watch, setValue } = methods;

  return (
    <FormProvider {...methods}>
      <FormControl className="w-full mb-3">
        <InputLabel id="category-label">{label}</InputLabel>
        <Select
          label="Category"
          labelId="category-label"
          {...register(id)}
          defaultValue=""
          value={watch(id)}
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormProvider>
  );
}
