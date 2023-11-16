import { FormInput } from ".";
import Prompt from "./Prompt";
import Label from "./Label";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@mui/material";

interface FormInputItemProps extends FormInput {
  className?: string;
  prompt?: string;
  databaseKey: string;
  label?: string;
  required?: boolean;
}

/**
 * A form input item for the project submission form.
 *
 * It renders a single input item, choosing the correct component based on the type or databaseKey.
 */
export function DataPrivacyAgreement(props: FormInputItemProps) {
  const { databaseKey, className } = props;
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div className={className}>
      <Label className="mb-4" text={props.label} required={props.required} />
      <div className="flex items-start text-sm">
        <Controller
          name={databaseKey}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Checkbox
              {...field}
              className="mr-4 -mt-2 -ml-3"
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          )}
        />
        <Prompt text={props.prompt} />
      </div>
    </div>
  );
}
