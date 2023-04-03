import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import IndividualProjectPage from "../../templates/IndividualProjectPage";
import { ParsedUrlQuery } from "querystring";

function ProjectPage(props: { projectData: any }) {
  return <IndividualProjectPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;
  const url = getProjectDataUrl(context);
  const projectData = await fetch(url).then((res) => res.json());

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate");

  return {
    props: {
      projectData: projectData.data,
    },
  };
};

export default ProjectPage;

type Context = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
function getProjectDataUrl(context: Context) {
  const { params, res, req } = context;
  const { slug } = params as { slug: string[] };
  const baseUrl = getBaseUrl(req);

  // We hit this route because it returns only the individual project data
  return `${baseUrl}/nextjs-app/api/project-data/${slug}`;
}

function getBaseUrl(req: any) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  return req ? `${protocol}://${req.headers.host}` : "";
}
