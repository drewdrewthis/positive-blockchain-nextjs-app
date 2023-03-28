import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import cx from "classnames";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import kebabCase from "lodash/kebabCase";
import { useController } from "./useController";

function ProjectFilter(props: ReturnType<typeof useController>) {
  const { filters, className = "", handleFilterChange } = props;

  return (
    <div
      className={
        "flex flex-col w-full border rounded p-2 text-sm bg-white" + className
      }
    >
      <h2 className="mt-0">Filters</h2>
      {filters.map((filter) => (
        <FilterGroup
          type={filter.type}
          key={filter.title}
          title={filter.title}
          labels={filter.labels}
          onChange={(values) => handleFilterChange(filter.key, values)}
        />
      ))}
    </div>
  );
}

export function FilterGroup(props: {
  type?: "checkbox" | "multi-select-search";
  title: string;
  labels: (string | number)[];
  onChange: (values: any) => void;
}) {
  const { onChange, title, labels, type } = props;
  const methods = useForm();

  methods.watch((values) => {
    onChange(values);
  });

  return (
    <FormProvider {...methods}>
      <b className="mb-3 text-teal-600">{title}</b>
      <FilterComponent type={type} labels={labels} />
      <Divider />
    </FormProvider>
  );
}

function FilterComponent(props: {
  type?: "checkbox" | "multi-select-search";
  labels: (string | number)[];
}) {
  const { labels, type } = props;

  if (type === "multi-select-search") {
    return <MutliSelectSearch labels={labels} />;
  }

  return <Checkboxes className="h-auto" labels={labels} />;
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

function MutliSelectSearch(props: { labels: (string | number)[] }) {
  const { labels } = props;
  const { register } = useFormContext();

  const options = labels.map((label) => ({
    label: label.toString(),
    title: label.toString(),
  }));

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      className={cx("w-full")}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <li {...props}>{option.title}</li>
      )}
      renderInput={(params) => (
        <TextField
          className="w-full text-xs"
          {...params}
          label=""
          placeholder="Type to search.."
          variant="standard"
        />
      )}
    />
  );
}

export default ProjectFilter;
