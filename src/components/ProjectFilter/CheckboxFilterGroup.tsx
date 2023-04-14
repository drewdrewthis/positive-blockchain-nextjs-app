import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { covertBooleanMapToArray } from "../../lib/utils";
import { Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import { kebabCase } from "lodash/fp";
import cx from "classnames";

export default function CheckboxFilterGroup(props: {
  title: string;
  labels: (string | number)[];
  onChange: (values: any) => void;
}) {
  const { onChange, title, labels } = props;
  const methods = useForm();

  methods.watch((values) => {
    const valuesArray = covertBooleanMapToArray(values);
    onChange(valuesArray);
  });

  return (
    <FormProvider {...methods}>
      <b className="mb-3 text-teal-600">{title}</b>
      <Checkboxes className="h-auto" labels={labels} />
      <Divider />
    </FormProvider>
  );
}

function Checkboxes(props: {
  labels: (string | number)[];
  className?: string;
}) {
  const { className = "" } = props;
  const { register } = useFormContext();

  return (
    <FormGroup className={cx(className)}>
      {props.labels?.map((label) => {
        return (
          <FormControlLabel
            className="p-0"
            control={
              <Checkbox
                className="py-0"
                {...register(kebabCase(label.toString()))}
              />
            }
            label={<span className="text-xs">{label}</span>}
            key={label}
          />
        );
      })}
    </FormGroup>
  );
}
