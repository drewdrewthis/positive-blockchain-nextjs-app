import Grid from "@mui/material/Unstable_Grid2";
import { Project } from "@/types";
import ProjectGridItem from "./ProjectGridItem";
import styles from "./styles.module.scss";

interface Props {
  projectData: Project[];
}

function ProjectGrid(props: Props) {
  const { projectData } = props;

  return (
    <Grid container spacing={2}>
      {projectData.map((project: any, idx: number) => (
        <ProjectGridItem
          key={project.slug + idx}
          slug={project.slug}
          name={project["project_name"]}
          description={
            project["description_short_value_proposition_in_a_tweet"]
          }
          category={project["main_category"] || project["categories"]}
          thumbnailSrc={project["thumbnail_src"]}
        />
      ))}
    </Grid>
  );
}

export default ProjectGrid;
