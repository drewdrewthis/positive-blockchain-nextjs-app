import { GetServerSideProps } from "next";
import { fetchProjectDataSchema } from "@/lib/google";
import ProjectSubmissionForm from "../../templates/ProjectSubmissionForm";
import Header from "../../templates/partials/Header";
import Footer from "../../templates/partials/Footer";
import { ProjectDataSchema } from "../../types";
import { Typography } from "@mui/material";

function ProjectPage(props: any) {
  const { projectData } = props;

  const handleSubmit = async (values: Record<string, any>) => {
    const valuesArr = convertValuesToStringArray(
      values,
      props.projectDataHeaders
    );

    // console.log(JSON.stringify(valuesArr));

    await submitProjectData([valuesArr]);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div className="container mx-auto mt-10 max-w-3xl py-10">
        <Typography variant="h2" className="mb-10">
          {!!projectData
            ? "Project Update/Claim Form"
            : "New Project Submission"}
        </Typography>
        <p className="mb-10">
          {`Submitting the form below will create an update request for this
          project. If you'd like to claim ownership of this project, click here.`}
        </p>
        <ProjectSubmissionForm
          inputs={Object.entries(props.projectDataHeaders)}
          initialValues={props.projectData}
          onSubmit={(values) => handleSubmit(values)}
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

// TODO: Move this serverside and allow the submitting of an object
function convertValuesToStringArray(
  values: Record<string, any>,
  projectDataHeaders: ProjectDataSchema
) {
  const arr = new Array();
  Object.entries(projectDataHeaders).forEach((entry) => {
    const [key, value] = entry;
    const index = value.columnIdx;
    console.log("build", key, value, index);
    arr[index] = values[key].toString();
  });

  arr[0] = Date.now();
  return arr.map((value) => (value === null ? " " : value));
}

async function submitProjectData(values: string[][]) {
  const body = JSON.stringify(values);
  console.log("submitting", body);
  fetch("/nextjs-app/api/submit-project-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
