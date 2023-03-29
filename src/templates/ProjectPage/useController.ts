import React, { useEffect } from "react";
import throttle from "lodash/throttle";
import { filterProjectDataByFilters } from "@/lib/utils";

interface Props {
  projectData: any;
  filters: Record<string, string[]>;
}

export function useController(props: Props) {
  const { projectData, filters } = props;
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<any>(projectData);
  const [activeFilters, setActiveFilters] = React.useState<any>({});

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  // useEffect(() => {
  //   setFilteredData(filterDataBySearch(projectData, search));
  // }, [search, projectData]);

  useEffect(() => {
    const filteredDataByFilters = filterProjectDataByFilters(
      projectData,
      activeFilters
    );
    console.log("filtering", filteredDataByFilters, activeFilters);
    setFilteredData(filteredDataByFilters);
  }, [projectData, activeFilters]);

  return {
    ...props,
    handleSearch: throttle(handleSearch, 500),
    projectData: filteredData,
    filters: [
      {
        title: "Categories",
        key: "main_category",
        labels: filters.main_category,
      },
      {
        title: "Blockchain Type",
        key: "blockchain_type",
        labels: filters.blockchain_type,
      },
      {
        type: "multi-select-search" as const,
        title: "Blockchain Technology",
        key: "blockchain_technology",
        labels: filters.blockchain_technology,
      },
      {
        title: "HQ",
        type: "multi-select-search" as const,
        key: "primary_headquarter_country",
        labels: filters.primary_headquarter_country,
      },
    ],
    handleFilterUpdate: (filters: any) => {
      setActiveFilters(filters);
    },
  };
}
