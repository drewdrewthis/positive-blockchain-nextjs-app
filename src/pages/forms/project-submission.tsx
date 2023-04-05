import { GetServerSideProps } from "next";
import IndividualProjectPage from "@/templates/IndividualProjectPage";
import { fetchProjectDataHeaders } from "@/lib/google";

function ProjectPage(props: { projectData: any }) {
  // return <div>TEST</div>;
  return <IndividualProjectPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context;
  const slug = query["prefill_slug"];

  const props: any = {};

  if (slug) {
    const projectData = await getProjectData(context);
    props["projectData"] = projectData.data;
  }

  const projectDataHeaders = await fetchProjectDataHeaders();

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
