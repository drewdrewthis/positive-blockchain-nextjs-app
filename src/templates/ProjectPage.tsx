import Header from "../components/Header";
import ProjectGrid from "../components/ProjectGrid";

interface Props {
  projectData: any;
}

export default function ProjectPageTemplate(props: Props) {
  const { projectData } = props;

  console.log(projectData);

  return (
    <div className="flex flex-col gap-10">
      <Header />
      <div className="prose max-w-none max-w-7xl m-auto p-10">
        <h1>Project Page</h1>
        <p>{projectData["project_name"]}</p>
        <ProjectGrid projectData={projectData} />
      </div>
    </div>
  );
}
