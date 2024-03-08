import type { Project } from "@/types";

import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Unstable_Grid2";
import cx from "classnames";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";
import { useState, useEffect } from "react";

import { config } from "@/configuration/config";

import ProjectGridItem from "./ProjectGridItem";
import Skeleton from "@/components/Skeleton";

interface Props {
  projectData: (Project & { searchRelevance?: number })[];
  className?: string;
  isLoading?: boolean;
}

function ProjectGrid(props: Props) {
  const { projectData, className = "", isLoading } = props;
  const itemsPerPage = config.constants.projects.INITIAL_DATA_LOAD_COUNT; // Number of items to display per page
  const [page, setPage] = useState(1);

  // Calculate the start and end indexes for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(projectData.length / itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [projectData.length])

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  if (projectData.length === 0 && !isLoading) {
    return <p className="p-3">No projects were found. Try changing the filters or the search term.</p>
  }

  return (
    <div className={cx("flex flex-col w-full", className)}>
      <Grid container spacing={2}>
        {isLoading ? (
          [...Array(16)].map((_, index) => (
            <div key={`${index}`} className="mr-4 mb-5 ml-2">
              <Skeleton width={220} height={350} />
            </div>
          ))
        ) : (
          projectData.slice(startIndex, endIndex).map((project, idx: number) => (
            <ProjectGridItem
              key={project.slug + idx}
              status={project.active}
              slug={project.slug}
              name={project["project_name"]}
              description={
                project["description_short_value_proposition_in_a_tweet"]
              }
              categories={project["categories_list"]}
              thumbnailSrc={project["logo_url"]}
              blockchainTechnology={project["blockchain_technology"]}
              blockchainType={project["blockchain_type"]}
              headquarters={formatHq(project)}
              searchRelevance={project.searchRelevance}
              sdgOccurences={parseSdgOccurences(project["sdg_occurrences_list"])}
            />
          ))
        )}
      </Grid>
      <Pagination
        sx={{
          ul: {
            listStyle: "none",
          },
        }}
        aria-label="Project pagination"
        className="w-full flex justify-center"
        count={totalPages}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
}

export default ProjectGrid;

function parseSdgOccurences(sdgOccurences: string[]) {
  return uniq(compact(sdgOccurences))
    .map(Number)
    .sort((a, b) => a - b);
}

function formatHq(project: Project) {
  return compact([
    project["primary_headquarter_city"],
    project["primary_headquarter_country"],
  ]).join(", ");
}
