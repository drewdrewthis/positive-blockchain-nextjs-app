import { useEffect } from 'react';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Checkbox, Collapse, FormControlLabel, FormGroup } from "@mui/material";
import cx from "classnames";
import kebabCase from "lodash/fp/kebabCase";
import { useState } from "react";
import { FormProvider, useForm, useFormContext, Controller } from "react-hook-form";

import { convertBooleanMapToArray } from "@/lib/utils";

export default function CheckboxFilterGroup(props: {
  title: string;
  labels: (string | number)[];
  onChange: (values: any) => void;
  defaultValues?: any;
  isOpenInitial?: boolean;
}) {
  const { onChange, title, labels, isOpenInitial, defaultValues } = props;
  const [isOpen, setIsOpen] = useState<boolean>(isOpenInitial);
  const methods = useForm({
    defaultValues
  });

  methods.watch((values) => {
    const valuesArray = convertBooleanMapToArray(values);
    onChange(valuesArray);
  });

  return (
    <FormProvider {...methods}>
      <button
        className="flex justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <b className="mb-3 text-brand-primary text-left">{title}</b>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </button>
      <Checkboxes title={props.title} className="h-auto" labels={labels} expanded={isOpen} />
    </FormProvider>
  );
}

function Checkboxes(props: {
  title: string,
  labels: (string | number)[];
  className?: string;
  expanded: boolean;
}) {
  const { expanded, className = "", title } = props;
  const { control, getValues } = useFormContext();

  return (
    <FormGroup className={cx(className)}>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="flex flex-col">
          {props.labels?.map((label) => {
            return (
              <FormControlLabel
                className="p-0"
                control={
                  <Controller
                    name={kebabCase(label.toString())}
                    control={control}
                    render={({ field: { value, ref, ...field } }) => (
                        <Checkbox
                          {...field}
                          inputRef={ref}
                          checked={!!value}
                          className="py-0"
                        />
                    )}
                  />
                }
                label={<span className="text-xs">{label}</span>}
                key={label}
              />
            );
          })}
        </div>
      </Collapse>
    </FormGroup>
  );
}
