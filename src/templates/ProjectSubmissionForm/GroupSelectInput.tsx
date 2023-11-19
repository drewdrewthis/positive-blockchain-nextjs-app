import {
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

import withErrorBoundary from "@/lib/withErrorBoundary";

import Label from "./Label";
import Prompt from "./Prompt";

interface Props {
  id: string;
  label: string;
  options: Record<string, string[]>;
  placeholder: string;
  helperText?: string;
  multiple?: boolean;
  prompt?: string;
  headerTitle?: string;
  required?: boolean;
}

function GroupSelectInput(props: Props) {
  const { id, options, placeholder } = props;
  const { register, watch, formState } = useFormContext();

  const hasValues = Array.isArray(watch(id));
  const value = props.multiple ? (hasValues ? watch(id) : []) : watch(id);

  return (
    <FormControl className="w-full mb-3" error={!!formState.errors[id]}>
      <Label text={props.label} />
      <Prompt text={props.prompt} />
      <Select
        {...register(id)}
        required={props.required}
        placeholder={props.headerTitle}
        labelId={id + "-label"}
        id={props.id}
        value={value || ""}
        multiple={props.multiple}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {Object.entries(options).map(([group, values]) => [
          <ListSubheader className="bold" key={group + "-header"}>
            <b>{group}</b>
          </ListSubheader>,
          ...values.map((option) => (
            <MenuItem key={option} value={option} className="text-sm pl-7">
              {option}
            </MenuItem>
          )),
        ])}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}

export default withErrorBoundary(GroupSelectInput);
