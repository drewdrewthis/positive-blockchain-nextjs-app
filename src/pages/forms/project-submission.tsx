import { GetServerSideProps } from "next";
import IndividualProjectPage from "@/templates/IndividualProjectPage";
import { fetchProjectDataSchema } from "@/lib/google";
import ProjectSubmissionForm from "../../templates/ProjectSubmissionForm";
import Header from "../../templates/partials/Header";
import Footer from "../../templates/partials/Footer";

function ProjectPage(props: any) {
  console.log(props);
  // return <div>TEST</div>;
  return (
    <div
      className="flex flex-col h-full"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div className="container mx-auto mt-10 max-w-lg">
        <ProjectSubmissionForm
          inputs={Object.entries(props.projectDataHeaders)}
        />
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context;
  const slug = query["prefill_slug"];

  const props: any = {};

  if (slug) {
    const projectData = await getProjectData(context);
    props["projectData"] = projectData.data;
  }

  const projectDataHeaders = await fetchProjectDataSchema();

  return {
    props: {
      ...props,
      projectDataHeaders,
    },
  };
};

export default ProjectPage;

async function getProjectData(context: any) {
  const { res, req, query } = context;
  const slug = query["prefill_slug"];
  const baseUrl = getBaseUrl(req);

  // We hit this route because it returns only the individual project data
  const url = `${baseUrl}/nextjs-app/api/project-data/${slug}`;
  return fetch(url).then((res) => res.json());
}

function getBaseUrl(req: any) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  return req ? `${protocol}://${req.headers.host}` : "";
}
