import Grid from "@mui/material/Unstable_Grid2";
import { Project } from "@/types";
import ProjectGridItem from "./ProjectGridItem";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";

interface Props {
  projectData: (Project & { searchRelevance?: number })[];
  className?: string;
}

function ProjectGrid(props: Props) {
  const { projectData, className = "" } = props;

  return (
    <Grid container spacing={2} className={className}>
      {projectData.map((project, idx: number) => (
        <ProjectGridItem
          key={project.slug + idx}
          status={project.active}
          slug={project.slug}
          name={project["project_name"]}
          description={
            project["description_short_value_proposition_in_a_tweet"]
          }
          category={project["main_category"] || project["categories"]}
          thumbnailSrc={project["logo_url"]}
          blockchainTechnology={project["blockchain_technology"]}
          blockchainType={project["blockchain_type"]}
          headquarters={project["primary_headquarter_country"]}
          searchRelevance={project.searchRelevance}
          sdgOccurences={parseSdgOccurences(project["sdg_occurences"])}
        />
      ))}
    </Grid>
  );
}

export default ProjectGrid;

function parseSdgOccurences(sdgOccurences: string) {
  return uniq(compact(sdgOccurences.split(",")))
    .map(Number)
    .sort((a, b) => a - b);
}
