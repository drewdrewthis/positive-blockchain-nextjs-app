import { Autocomplete, Divider, TextField } from "@mui/material";
import cx from "classnames";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

export function AutocompleteFilterGroup(props: {
  title: string;
  labels: (string | number)[];
  onChange: (values: any) => void;
}) {
  const { onChange, title, labels } = props;
  const methods = useForm();

  methods.watch((values) => {
    const arr = values["multi-select-search"].map((item: any) => item.label);
    onChange(arr);
  });

  return (
    <FormProvider {...methods}>
      <b className="mb-3 text-teal-600">{title}</b>
      <MutliSelectSearch labels={labels} />
      <Divider />
    </FormProvider>
  );
}

function MutliSelectSearch(props: { labels: (string | number)[] }) {
  const { labels } = props;
  const { control } = useFormContext();

  const options = labels.map((label) => ({
    label: label.toString(),
    title: label.toString(),
  }));

  return (
    <Controller
      control={control}
      name="multi-select-search"
      render={({ field: { onChange } }) => (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={options}
          className={cx("w-full")}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <li {...props}>{option.title}</li>
          )}
          onChange={(event, value) => {
            onChange(value);
          }}
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
      )}
    />
  );
}
