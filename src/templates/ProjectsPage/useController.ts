import React, { useEffect } from "react";
import debounce from "lodash/debounce";
import { filterProjectDataByFilters } from "@/lib/utils";
import { Project } from "@/types";
import { getSearchResults } from "../../lib/utils/getSearchResults";
import { FilterGroupProps } from "../../components/ProjectFilter/types";

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
  const { projectData } = useProjectData({ initialData });
  const [finalData, setFinalData] = React.useState<any>(initialData);

  // Use filters
  const {
    filteredData,
    filters: filterProps,
    handleFilterUpdate,
  } = useFilters({
    projectData,
    filters,
  });

  useEffect(() => {
    setFinalData(filteredData);
  }, [filteredData]);

  // Search and sort always uses filtered data
  // This should always happen after filtering
  const { handleSearch, searchResults } = useSortBySearch({
    projectData: filteredData,
  });

  useEffect(() => {
    setFinalData(searchResults);
  }, [searchResults]);

  return {
    ...props,
    handleSearch,
    projectData: finalData,
    filters: filterProps,
    handleFilterUpdate,
  };
}

function useProjectData(props: { initialData: Project[] }) {
  const { initialData } = props;
  const [projectData, setProjectData] = React.useState<any>(initialData);

  // Optimization:
  // We start with a subset of data.
  // Here we fetch all of the data after initial render
  useEffect(() => {
    fetchAllData().then(setProjectData);
  }, []);

  return {
    projectData,
  };
}

async function fetchAllData() {
  const response = await fetch("/nextjs-app/api/project-data");
  const data = await response.json();
  if (data?.data) {
    return data.data;
  } else {
    console.error("Error fetching project data", data);
  }
}

function useFilters(props: {
  projectData: Project[];
  filters: Record<string, string[]>;
}): {
  setFilteredData: React.Dispatch<React.SetStateAction<Project[]>>;
  filteredData: Project[];
  handleFilterUpdate: (filters: any) => void;
  filters: FilterGroupProps[];
} {
  const { projectData, filters } = props;
  const [filteredData, setFilteredData] = React.useState<any>(projectData);
  const [activeFilters, setActiveFilters] = React.useState<any>({});

  // Handles filtering and search sorting
  useEffect(() => {
    // 1. Filter data by active filters
    const filteredDataByFilters = filterProjectDataByFilters(
      projectData,
      activeFilters
    );

    setFilteredData(filteredDataByFilters);
  }, [projectData, activeFilters]);

  return {
    setFilteredData,
    filters: [
      {
        title: "Status",
        key: "active",
        labels: filters.active,
      },
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
    filteredData,
    handleFilterUpdate: (filters: any) => {
      setActiveFilters(filters);
    },
  };
}

function useSortBySearch(props: { projectData: Project[] }) {
  const { projectData } = props;
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] =
    React.useState<Project[]>(projectData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (search === "") {
      setSearchResults(projectData);
      return;
    }

    getSearchResults(projectData, search).then((results) => {
      const dataSortedBySearchRelevance = results.map((result: any) => ({
        ...result.item,
        searchRelevance: (1 - result.score) * 100,
      }));

      if (search && dataSortedBySearchRelevance.length > 0) {
        setSearchResults(dataSortedBySearchRelevance);
      }
    });
  }, [search, projectData]);

  return {
    handleSearch: debounce(handleSearch, 500, { trailing: true }),
    searchResults,
  };
}
