import { useEffect, useState } from "react";
import { Props } from "./types";

export function useController(props: Props) {
  const [filterGroups, setFilterGroups] = useState({});
  const { onChange = () => {} } = props;

  useEffect(() => {
    // Handle the change of any of the filters.
    onChange(filterGroups);
  }, [onChange, filterGroups]);

  return {
    ...props,
    handleFilterChange: (key: string, values: Record<string, boolean>) => {
      setFilterGroups({
        ...filterGroups,
        [key]: covertBooleanMapToArray(values),
      });
    },
  };
}

function covertBooleanMapToArray(map: Record<string, boolean>) {
  return Object.values(map).reduce((acc, value, index) => {
    if (value) {
      acc.push(Object.keys(map)[index]);
    }
    return acc;
  }, [] as string[]);
}
