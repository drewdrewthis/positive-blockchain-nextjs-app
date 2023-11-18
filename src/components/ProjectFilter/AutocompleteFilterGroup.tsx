import { Autocomplete, TextField } from "@mui/material";
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
  id: string;
  onChange: (values: any) => void;
}) {
  const { onChange, title, labels, id } = props;
  const methods = useForm();

  methods.watch((values) => {
    const arr = values["multi-select-search"].map((item: any) => item.label);
    onChange(arr);
  });

  return (
    <FormProvider {...methods}>
      <b className="mb-3 text-brand-primary mt-3">{title}</b>
      <MutliSelectSearch labels={labels} id={id} />
    </FormProvider>
  );
}

function MutliSelectSearch(props: { id: string; labels: (string | number)[] }) {
  const { labels, id } = props;
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
          id={id}
          options={options}
          className={cx("w-full mb-34")}
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
