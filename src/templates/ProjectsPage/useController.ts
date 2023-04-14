import React, { useEffect } from "react";
import debounce from "lodash/debounce";
import { filterProjectDataByFilters } from "@/lib/utils";
import { Project } from "@/types";
import { getSearchResults } from "../../lib/utils/getSearchResults";

interface Props {
  /**
   * Performance optimization:
   * Returns a subset of the project data for initial render.
   * Subsequent searches return all data.
   */
  initialData: Project[];
  filters: Record<string, string[]>;
}

export function useController(props: Props) {
  const { initialData, filters } = props;
  const [projectData, setProjectData] = React.useState<any>(initialData);
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<any>(projectData);
  const [activeFilters, setActiveFilters] = React.useState<any>({});

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  // Optimization:
  // We start with a subset of data.
  // Here we fetch all of the data after initial render
  useEffect(() => {
    fetch("/nextjs-app/api/project-data")
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          setProjectData(data.data);
        } else {
          console.error("Error fetching project data", data);
        }
      });
  }, []);

  // Handles filtering and search sorting
  useEffect(() => {
    // 1. Filter data by active filters
    const filteredDataByFilters = filterProjectDataByFilters(
      projectData,
      activeFilters
    );

    // 2a. Handle search if term is present
    // We handle the search async so that the UI updates don't reflect the search
    if (search) {
      getSearchResults(filteredDataByFilters, search).then((results) => {
        const finalData = results.map((result: any) => result.item);
        setFilteredData(finalData);
      });
      // 2b. Return filtered data if no search term is present
    } else {
      setFilteredData(filteredDataByFilters);
    }
  }, [projectData, activeFilters, search]);

  useEffect(() => {}, [search, projectData]);

  return {
    ...props,
    handleSearch: debounce(handleSearch, 500, { trailing: true }),
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
