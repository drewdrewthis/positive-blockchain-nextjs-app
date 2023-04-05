import { Button, FormControl, TextField, Typography } from "@mui/material";
import { titleCase } from "../lib/utils";

export default function ProjectSubmissionForm(props: {
  inputs: [string, any][];
  initialValues: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
}) {
  return (
    <form className="w-full">
      <Typography variant="h2" className="mb-10">
        Project Submission
      </Typography>
      <Button
        onClick={() => {
          props.onSubmit &&
            props.onSubmit(
              Object.values(props.initialValues).map((value) =>
                value.toString()
              )
            );
        }}
      >
        SUBMIT
      </Button>
      <FormControl className="w-full flex flex-col gap-4">
        {props.inputs.map(([key, value]) => {
          const { type, headerTitle } = value;
          if (type === "text") {
            return (
              <TextField
                className="w-full"
                id={key}
                label={titleCase(headerTitle)}
                variant="outlined"
                key={key}
                defaultValue={props.initialValues[key]}
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
      </FormControl>
    </form>
  );
}

function renderBooleanInputWithRadioButtons() {
  return (
    <div>
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
