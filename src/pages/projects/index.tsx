import { GetStaticProps } from "next";
import { fetchProjectData } from "@/lib/google";

function AllProjectPage(props: { projectData: any }) {
  const { projectData } = props;

  console.log(projectData);

  return (
    <div>
      <h1>Project Page</h1>
      <p>{projectData["project_name"]}</p>
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          maxWidth: "60rem",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Project Status</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project: any, idx: number) => (
            <tr key={project.slug + idx}>
              <td style={{ cursor: "pointer", color: "blue", padding: "1rem" }}>
                <a href={`/projects/${project.slug}`}>
                  {project["project_name"]}
                </a>
              </td>
              <td>
                {project["description_short_value_proposition_in_a_tweet"]}
              </td>
              <td>{project["active"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const projectData = await fetchProjectData();

  return {
    props: {
      projectData,
    },
  };
};

export default AllProjectPage;
