import { Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import cx from "classnames";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import kebabCase from "lodash/kebabCase";
import { useController } from "./useController";

function ProjectFilter(props: ReturnType<typeof useController>) {
  const { filters, className = "", handleFilterChange } = props;

  return (
    <div
      className={"flex flex-col w-full border rounded p-2 text-sm" + className}
    >
      <h2 className="mt-0">Filters</h2>
      {filters.map((filter) => (
        <FilterGroup
          key={filter.title}
          title={filter.title}
          labels={filter.labels}
          onChange={(values) => handleFilterChange(filter.title, values)}
        />
      ))}
    </div>
  );
}

export function FilterGroup(props: {
  title: string;
  labels: (string | number)[];
  onChange: (values: any) => void;
}) {
  const { onChange, title, labels } = props;
  const methods = useForm();

  methods.watch((values) => {
    onChange(values);
  });

  return (
    <FormProvider {...methods}>
      <b>{title}</b>
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
      {props.labels.map((label) => {
        return (
          <FormControlLabel
            control={<Checkbox {...register(kebabCase(label.toString()))} />}
            label={<span className="text-sm">{label}</span>}
            key={label}
          />
        );
      })}
    </FormGroup>
  );
}

export default ProjectFilter;
