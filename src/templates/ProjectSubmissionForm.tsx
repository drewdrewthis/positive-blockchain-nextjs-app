import { useEffect, useState } from "react";
import Footer from "./partials/Footer";
import Header from "./partials/Header";
import { FormControl, TextField, Typography } from "@mui/material";
import { titleCase } from "../lib/utils";

export default function ProjectSubmissionForm(props: {
  inputs: [string, any][];
  // iframeSrc: string;
  // onSubmit?: () => void;
}) {
  // const [loadCount, setLoadCount] = useState(0);
  // const { iframeSrc, onSubmit } = props;

  // useEffect(() => {
  //   if (loadCount === 2) {
  //     onSubmit && onSubmit();
  //   }
  // }, [loadCount, onSubmit]);

  return (
    <form className="w-full">
      <Typography variant="h2" className="mb-10">
        Project Submission
      </Typography>
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
                defaultValue=""
              />
            );
          }
          if (type === "list") {
            return <div key={key}>list</div>;
          }
        })}
      </FormControl>
    </form>
  );
}
