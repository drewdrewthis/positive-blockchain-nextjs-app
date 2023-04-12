import { Project } from "../../types";
import InfoBlock from "./InfoBlock";

export default function HeadquartersBlock(props: { projectData: Project }) {
  const { projectData } = props;

  return projectData["primary_headquarter_city"] ||
    projectData["primary_headquarter_country"] ? (
    <div className="mb-2">
      <InfoBlock
        title="Headquarters"
        content={[
          projectData["primary_headquarter_city"],
          projectData["primary_headquarter_country"],
        ].join(", ")}
      />
    </div>
  ) : null;
}
