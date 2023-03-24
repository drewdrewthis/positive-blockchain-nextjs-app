import { Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import { range } from "lodash/fp";
import { withController } from "../../lib/withContoller";
import cx from "classnames";
import { createRef, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import kebabCase from "lodash/kebabCase";

interface Props {
  blockChainTechnologies: string[];
  blockchainUses: string[];
  stages: string[];
  className?: string;
  onChange?: (values: any) => void;
}
function useController(props: Props) {
  return {
    ...props,
  };
}
function ProjectFilter(props: ReturnType<typeof useController>) {
  const [blockchainUsesFilter, setBlockchainUsesFilters] = useState<string[]>(
    []
  );

  const {
    blockChainTechnologies,
    blockchainUses,
    stages,
    className = "",
    onChange = () => {},
  } = props;

  useEffect(() => {
    onChange({
      blockchainUses: blockchainUsesFilter,
    });
  });

  return (
    <div
      className={"flex flex-col w-full border rounded p-2 text-sm" + className}
    >
      <h2 className="mt-0">Filters</h2>
      <FilterGroup
        title="Blockchain Technology"
        labels={blockChainTechnologies}
        onChange={(values) => {
          onChange(values);
        }}
      />
      <FilterGroup
        title="Use of Blockchain"
        labels={blockchainUses}
        onChange={(values) => {
          setBlockchainUsesFilters(values);
        }}
      />
      <b>SDG#</b>
      <Checkboxes className="h-64" labels={range(1, 17)} />
      <Divider />
      <b>Stage</b>
      <Checkboxes className="h-10" labels={stages} />
    </div>
  );
}

function FilterGroup(props: {
  title: string;
  labels: (string | number)[];
  onChange?: (values: any) => void;
}) {
  const { onChange = () => {}, title, labels } = props;
  const methods = useForm();

  methods.watch((values) => {
    onChange(values);
  });

  return (
    <FormProvider {...methods}>
      <b>{title}</b>
      <Checkboxes className="h-10" labels={labels} />
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
        const ref = createRef();

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

export default withController(ProjectFilter, useController);
