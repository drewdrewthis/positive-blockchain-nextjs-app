import { FormControl, TextField, TextareaAutosize } from "@mui/material";
import upperFirst from "lodash/fp/upperFirst";
import { useFormContext } from "react-hook-form";

import withErrorBoundary from "../../lib/withErrorBoundary";

import GroupSelectInput from "./GroupSelectInput";
import Label from "./Label";
import Prompt from "./Prompt";
import SelectInput from "./SelectInput";

import { FormInput } from ".";

interface FormInputItemProps extends FormInput {
  prompt?: string;
  databaseKey: string;
  type?: string;
  characterLimit?: number;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

/**
 * A form input item for the project submission form.
 *
 * It renders a single input item, choosing the correct component based on the type or databaseKey.
 */
function FormInputItem(props: FormInputItemProps) {
  const { databaseKey, type } = props;
  const methods = useFormContext();
  const { register, formState } = methods;

  if (
    databaseKey === "PUBLIC_subregions_list" ||
    databaseKey === "PUBLIC_hq_subregion"
  ) {
    return (
      <GroupSelectInput
        prompt={props.prompt}
        helperText={props.helperText || "Select all that apply"}
        id={databaseKey}
        label={upperFirst(props.headerTitle)}
        required={props.required}
        options={(props.options as Record<string, string[]>) || {}}
        placeholder={props.helperText || "Select all that apply"}
        multiple
      />
    );
  }

  if (type === "select" || type === "multi-select") {
    const isMultiSelect = type === "multi-select";

    return (
      <FormControl error={!!formState.errors[databaseKey]}>
        <Label text={props.label} required={props.required} />
        <Prompt text={props.prompt} />
        <SelectInput
          prompt={props.prompt}
          id={databaseKey}
          label={upperFirst(props.headerTitle)}
          options={(props.options as string[]) || []}
          placeholder={props.placeholder}
          helperText={props.helperText}
          multiple={isMultiSelect}
          required={props.required}
        />
      </FormControl>
    );
  }

  if (type === "textarea") {
    return (
      <FormControl error={!!formState.errors[databaseKey]} className="mb-3">
        <Label text={props.label} required={props.required} />
        <Prompt text={props.prompt} />
        <TextareaAutosize
          {...register(databaseKey)}
          className="border border-gray-300 rounded-md p-4"
          placeholder={props.placeholder}
          maxLength={props.characterLimit}
        />
      </FormControl>
    );
  }

  // Types: text, number, email, url, tel, password
  if (["text", "number", "email", "url"].includes(type || "")) {
    return (
      <FormControl error={!!formState.errors[databaseKey]}>
        <Label text={props.label} required={props.required} />
        <Prompt text={props.prompt} />
        <TextField
          {...register(databaseKey, {
            required: props.required,
          })}
          error={!!formState.errors[databaseKey]}
          className="w-full"
          id={databaseKey}
          label={upperFirst(props.headerTitle)}
          required={props.required}
          variant="outlined"
          helperText={
            props.helperText ?? <span className="invisible">helperTesxt</span>
          }
          placeholder={props.placeholder}
          type={type === "url" ? "text" : type}
          inputProps={{
            maxLength: props.characterLimit,
          }}
        />
      </FormControl>
    );
  }

  return null;
}

export default withErrorBoundary(FormInputItem);
