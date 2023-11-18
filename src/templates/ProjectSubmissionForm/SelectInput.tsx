import {
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import compact from "lodash/fp/compact";
import { useFormContext } from "react-hook-form";

import withErrorBoundary from "../../lib/withErrorBoundary";

interface Props {
  id: string;
  label?: string;
  options: string[];
  placeholder?: string;
  initialValues?: string[];
  multiple?: boolean;
  helperText?: string;
  prompt?: string;
  headerTitle?: string;
  required?: boolean;
}

function SelectInput(props: Props) {
  const { id, options, placeholder, label } = props;
  const { register, watch } = useFormContext();

  const value = props.multiple ? [watch(id)].flat() || [] : watch(id);

  const selectProps: any = {
    ...register(id),
    required: props.required,
    multiple: props.multiple,
    // label: props.headerTitle,
    // labelId: "category-label",
    placeholder: placeholder,
    value: value || "",
  };

  return (
    <>
      <FormControl className="w-full mb-3">
        {/* <InputLabel id={props.id + "-label"}>{props.headerTitle}</InputLabel> */}
        <Select
          {...selectProps}
          renderValue={(selected: any[]) => {
            if (props.multiple) {
              if (selected.length === 0) {
                return <em>{props.headerTitle}</em>;
              }

              if (Array.isArray(selected)) {
                // TODO: Figure out why compact is necessary here.
                return compact(selected).map((value, idx) => (
                  <Chip
                    size="small"
                    className="mr-2"
                    label={value}
                    key={value + "-" + idx}
                  />
                ));
              }

              return [];
            }

            return selected;
          }}
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
        <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
    </>
  );
}

export default withErrorBoundary(SelectInput);
