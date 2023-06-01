import upperFirst from "lodash/fp/upperFirst";
import { FormInput } from ".";
import GroupSelectInput from "./GroupSelectInput";
import SelectInput from "./SelectInput";
import { TextField, TextareaAutosize } from "@mui/material";
import { useFormContext } from "react-hook-form";
import withErrorBoundary from "../../lib/withErrorBoundary";
import Prompt from "./Prompt";
import Label from "./Label";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

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
  const { register } = methods;

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
      <>
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
          // headerTitle={props.headerTitle}
          required={props.required}
        />
      </>
    );
  }

  if (type === "textarea") {
    const isTextArea = true;

    return (
      <>
        <Label text={props.label} required={props.required} />
        <Prompt text={props.prompt} />
        <TextareaAutosize
          {...register(databaseKey)}
          className="border border-gray-300 rounded-md p-4"
          placeholder={props.placeholder}
          maxLength={props.characterLimit}
        />
      </>
    );
  }

  // Types: text, number, email, url, tel, password
  if (["text", "number", "email", "url"].includes(type || "")) {
    const value =
      methods.getValues(databaseKey) ||
      methods.formState?.defaultValues?.[databaseKey];

    return (
      <>
        <Label text={props.label} required={props.required} />
        <Prompt text={props.prompt} />
        <TextField
          {...register(databaseKey)}
          className="w-full"
          id={databaseKey}
          label={upperFirst(props.headerTitle)}
          required={props.required}
          variant="outlined"
          helperText={props.helperText}
          placeholder={props.placeholder}
          type={type}
          // value={value}
          inputProps={{
            maxLength: props.characterLimit,
          }}
        />
      </>
    );
  }

  return null;
}

export default withErrorBoundary(FormInputItem);
