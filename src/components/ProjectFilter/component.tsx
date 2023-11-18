import { Divider } from "@mui/material";

import { AutocompleteFilterGroup } from "./AutocompleteFilterGroup";
import CheckboxFilterGroup from "./CheckboxFilterGroup";
import { FilterGroupProps } from "./types";
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
        <>
          {renderFilterGroup({
            ...filter,
            onChange: (values: any) => handleFilterChange(filter.key, values),
          })}
          {filter.helperText && (
            <div
              key={filter.key + filter.helperText}
              className="text-xs italic mt-2"
            >
              {filter.helperText}
            </div>
          )}
          <Divider className="my-5" />
        </>
      ))}
    </div>
  );
}

function renderFilterGroup(
  props: FilterGroupProps & { onChange: (values: any) => void }
) {
  switch (props.type) {
    case "multi-select-search":
      return <AutocompleteFilterGroup {...props} id={props.key} />;
    case "checkbox":
    default:
      return <CheckboxFilterGroup {...props} />;
  }
}

export default ProjectFilter;
