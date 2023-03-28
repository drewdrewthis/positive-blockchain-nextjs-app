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

interface Props {
  projectData: any;
  filters: Record<string, string[]>;
}

function useController(props: Props) {
  const { projectData, filters } = props;
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<any>(projectData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setFilteredData(filterDataBySearch(projectData, search));
  }, [search, projectData]);

  console.log(filters);

  return {
    ...props,
    handleSearch: throttle(handleSearch, 500),
    projectData: filteredData,
    filters: [
      {
        title: "Categories",
        labels: filters.main_category,
      },
      {
        type: "multi-select-search",
        title: "Blockchain Technology",
        labels: filters.blockchain_technology,
      },
      {
        title: "Blockchain Type",
        labels: filters.blockchain_type,
      },
      {
        title: "HQ",
        type: "multi-select-search",
        labels: filters.primary_headquarter_country,
      },
    ],
    handleFilterUpdate: (filters: any) => {
      console.log(filters);
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
