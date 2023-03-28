import Header from "./partials/Header";
import InputBase from "@mui/material/InputBase";
import ProjectGrid from "../components/ProjectGrid";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
import { withController } from "../lib/withContoller";
import throttle from "lodash/throttle";
import filter from "lodash/fp/filter";
import Footer from "./partials/Footer/index";
import ProjectFilter from "../components/ProjectFilter";
import { intersection } from "lodash";
import { intersectionBy, isEmpty, kebabCase } from "lodash/fp";

interface Props {
  projectData: any;
  filters: Record<string, string[]>;
}

function useController(props: Props) {
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
    const filteredDataByFilters = filterDataByFilters(
      projectData,
      activeFilters
    );
    // console.log("filtering", filteredDataByFilters, activeFilters);
    setFilteredData(filteredDataByFilters);
  }, [projectData, activeFilters]);

  console.log(filters);

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
function ProjectPageTemplate(props: ReturnType<typeof useController>) {
  const { projectData, handleSearch, filters, handleFilterUpdate } = props;

  return (
    <div className="flex flex-col gap-10">
      <Header />
      <div className="prose max-w-none max-w-7xl m-auto p-10">
        <h1>Project Page</h1>
        <div className="flex justify-center w-full">
          <div className="m-auto border rounded p-2">
            <Search>
              <SearchIcon />
            </Search>
            <InputBase
              className="w-52"
              placeholder="Type to filter (ex. logistics)"
              onChange={handleSearch}
            />
          </div>
        </div>
        <p>{projectData["project_name"]}</p>
        <div className="flex gap-3">
          <div className="w-3/12">
            <ProjectFilter filters={filters} onChange={handleFilterUpdate} />
          </div>
          <ProjectGrid className="flex-1" projectData={projectData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withController(ProjectPageTemplate, useController);

function filterDataBySearch(projectData: any, search: string) {
  if (!search) return projectData;

  return filter((item: any) => {
    const text = (
      item["project_name"] +
      " " +
      item["description_short_value_proposition_in_a_tweet"]
    ).toLowerCase();

    return text.includes(search);
  }, projectData);
}

function filterDataByFilters(projectData: any, filters: any) {
  if (isEmpty(filters)) return projectData;

  return projectData.filter((project: any) => {
    const filterableAttributes = Object.keys(filters);

    if (!filterableAttributes.length) return true;

    const areAllFiltersEmpty = filterableAttributes.every((attribute) => {
      return !filters[attribute].length;
    });

    if (areAllFiltersEmpty) return true;

    if (!filterableAttributes.find((attribute) => filters[attribute].length))
      return true;

    for (const attribute of filterableAttributes) {
      if (!filters[attribute].length) continue;

      // Get project values for filter attribute
      const projectAttributeValues = project[attribute]?.split(",");

      if (!projectAttributeValues) continue;

      const arr = projectAttributeValues
        .flat()
        .map((value: string) => kebabCase(value?.trim()));

      const isMatch = intersection(arr, filters[attribute]).length > 0;

      if (isMatch) return true;
    }

    return false;
  });
}

function standardizePropertyValues(projectData: any) {
  return projectData.map((data: any) => {
    const keys = Object.keys(data);

    for (const key of keys) {
      if (Array.isArray(data[key])) {
        data[key] = data[key].join(",");
      }
    }

    return data;
  });
}
