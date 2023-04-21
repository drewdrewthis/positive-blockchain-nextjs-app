import { Button, FormControl, TextField, Typography } from "@mui/material";
import { titleCase } from "../../lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import CategoriesFormWrapper from "./CategoriesSection";
import { CountryData } from "../../types";
import RegionAndCountrySelect from "../../components/RegionAndCountrySelect";

export default function ProjectSubmissionForm(props: {
  countries: CountryData[];
  inputs: [
    string,
    {
      type: string;
      headerTitle: string;
      columnIdx: number;
    }
  ][];
  initialValues: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
}) {
  const { inputs, countries, initialValues, onSubmit = () => {} } = props;

  const methods = useForm({
    defaultValues: initialValues,
  });

  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl className="w-full flex flex-col gap-4">
          {inputs.map(([key, value], idx) => {
            const { type, headerTitle } = value;
            if (key === "main_category") {
              return (
                <>
                  <Typography variant="h5">Categories</Typography>
                  <CategoriesFormWrapper />
                </>
              );
            }
            if (type === "text") {
              return (
                <TextField
                  {...register(key)}
                  className="w-full"
                  id={key}
                  label={titleCase(headerTitle)}
                  variant="outlined"
                  key={key || idx}
                />
              );
            }
            if (type === "boolean") {
              return renderBooleanInputWithRadioButtons();
            }
          })}
          <RegionAndCountrySelect id="region" countries={countries} />;
          <Button
            className="bg-blue-500"
            type="submit"
            variant="contained"
            color="primary"
          >
            SUBMIT
          </Button>
        </FormControl>
      </form>
    </FormProvider>
  );
}

function renderBooleanInputWithRadioButtons() {
  return (
    <div key="wehrwer">
      <div>
        <input type="radio" id="yes" name="yes" value="yes" />
        <label htmlFor="yes">Yes</label>
      </div>
      <div>
        <input type="radio" id="no" name="no" value="no" />
        <label htmlFor="no">No</label>
      </div>
    </div>
  );
}
