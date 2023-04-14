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
        [key]: values,
      });
    },
  };
}
