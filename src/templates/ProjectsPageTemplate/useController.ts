import debounce from "lodash/debounce";
import React, { useEffect } from "react";

import { filterProjectDataByFilters } from "@/lib/utils";
import { Project } from "@/types";

import { FilterGroupProps } from "../../components/ProjectFilter/types";
import Routes from "../../lib/Routes";
import { buildFiltersConfig } from "../../lib/utils/buildFiltersConfig";
import { getSearchResults } from "../../lib/utils/getSearchResults";

interface Props {
  /**
   * Performance optimization:
   * Returns a subset of the project data for initial render.
   * Subsequent searches return all data.
   */
  initialData: Project[];
  filters: Record<string, string[]>;
  allProjectData: any;
}

export function useController(props: Props) {
  const { initialData, filters } = props;
  const { projectData } = useProjectData({ initialData });
  const [finalData, setFinalData] = React.useState<any>(initialData);
  const [showFilters, setShowFilters] = React.useState(false);

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
    toggleFilters: (show: boolean) => setShowFilters(show),
    showFilters,
  };
}

function useProjectData(props: { initialData: Project[] }) {
  const { initialData } = props;
  const [projectData, setProjectData] = React.useState<any>(initialData);

  const handleLoad = () => {
    fetchAllData().then(setProjectData);
  };

  // Optimization:
  // We start with a subset of data, and then load the rest in the background
  // after the page has loaded.
  useEffect(() => {
    // Setting listener
    // Check if the page has already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return {
    projectData,
  };
}

async function fetchAllData() {
  const url = `${Routes.API.EDGE.PROJECT_DATA}`;
  const response = await fetch(url, {
    headers: {
      "Accept-Encoding": "br, gzip, compress",
    },
  });
  const data = await response.json();
  if (data?.data) {
    return data.data;
  } else {
    console.error("Error fetching project data", data);
  }
}

/**
 * Hook for managing filters and filtering project data.
 * @param props - The props for the hook.
 * @returns An object with filter-related state and functions.
 */
function useFilters(props: {
  projectData: Project[];
  filters: Record<string, string[]>;
}): {
  setFilteredData: React.Dispatch<React.SetStateAction<Project[]>>;
  filteredData: Project[];
  handleFilterUpdate: (_filters: any) => void;
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
    filters: buildFiltersConfig(filters),
    filteredData,
    handleFilterUpdate: (updatedFilters: any) => {
      setActiveFilters(updatedFilters);
    },
  };
}

/**
 * Hook for managing search functionality and sorting by search relevance.
 * @param props - The props for the hook.
 * @returns An object with search-related state and functions.
 */
function useSortBySearch(props: { projectData: Project[] }) {
  const { projectData } = props;
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] =
    React.useState<Project[]>(projectData);

  /**
   * Handles the search input change event.
   * @param event - The change event object.
   */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (search === "") {
      setSearchResults(projectData);
      return;
    }

    /**
     * Retrieves search results and sorts them by search relevance.
     */
    getSearchResults(projectData, search).then((results) => {
      const dataSortedBySearchRelevance = results.map((result: any) => ({
        ...result.item,
        searchRelevance: (1 - result.score) * 100,
      }));

      if (search) {
        setSearchResults(dataSortedBySearchRelevance);
      }
    });
  }, [search, projectData]);

  return {
    handleSearch: debounce(handleSearch, 500, { trailing: true }),
    searchResults,
  };
}
