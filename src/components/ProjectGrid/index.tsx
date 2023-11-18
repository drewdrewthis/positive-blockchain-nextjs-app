import type { Project } from "@/types";

import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Unstable_Grid2";
import cx from "classnames";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";
import { useState } from "react";

import { config } from "@/configuration/config";

import ProjectGridItem from "./ProjectGridItem";

interface Props {
  projectData: (Project & { searchRelevance?: number })[];
  className?: string;
}

function ProjectGrid(props: Props) {
  const { projectData, className = "" } = props;
  const itemsPerPage = config.constants.projects.INITIAL_DATA_LOAD_COUNT; // Number of items to display per page
  const [page, setPage] = useState(1);

  // Calculate the start and end indexes for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(projectData.length / itemsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <div className={cx("flex flex-col w-full", className)}>
      <Grid container spacing={2}>
        {projectData.slice(startIndex, endIndex).map((project, idx: number) => (
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
        ))}
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
