import Header from "../components/Header";
import InputBase from "@mui/material/InputBase";
import ProjectGrid from "../components/ProjectGrid";
import React, { useCallback, useEffect, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
import { withController } from "../lib/withContoller";
import throttle from "lodash/throttle";
import filter from "lodash/fp/filter";

interface Props {
  projectData: any;
}

function useController(props: Props) {
  const { projectData } = props;
  const [search, setSearch] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<any>(projectData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setFilteredData(filterDataBySearch(projectData, search));
  }, [search, projectData]);

  return {
    ...props,
    handleSearch: throttle(handleSearch, 500),
    projectData: filteredData,
  };
}
function ProjectPageTemplate(props: ReturnType<typeof useController>) {
  const { projectData, handleSearch } = props;

  console.log(projectData);

  return (
    <div className="flex flex-col gap-10">
      <Header />
      <div className="prose max-w-none max-w-7xl m-auto p-10">
        <h1>Project Page</h1>
        <div>
          <Search>
            <SearchIcon />
          </Search>
          <InputBase placeholder="Search anything…" onChange={handleSearch} />
        </div>
        <p>{projectData["project_name"]}</p>
        <ProjectGrid projectData={projectData} />
      </div>
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
