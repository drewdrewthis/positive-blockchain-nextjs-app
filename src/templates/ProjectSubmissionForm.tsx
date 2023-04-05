import { Button, FormControl, TextField, Typography } from "@mui/material";
import { titleCase } from "../lib/utils";
import { useForm } from "react-hook-form";

export default function ProjectSubmissionForm(props: {
  inputs: [string, any][];
  initialValues: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
}) {
  const { inputs, initialValues, onSubmit = () => {} } = props;

  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2" className="mb-10">
        Project Submission
      </Typography>
      <FormControl className="w-full flex flex-col gap-4">
        {inputs.map(([key, value], idx) => {
          const { type, headerTitle } = value;
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
          if (type === "list") {
            return <div key={key}>list</div>;
          }
          if (type === "boolean") {
            return renderBooleanInputWithRadioButtons();
          }
        })}
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
