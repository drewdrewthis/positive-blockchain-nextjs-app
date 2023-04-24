import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { config as configuration } from "@/configuration";

export const config = {
  runtime: "edge",
};

const {
  projects: { CACHE_TTL },
} = configuration.constants;

const apiKey = process.env.API_KEY as string;

if (!apiKey) {
  throw new Error("API_KEY is not defined");
}

export default async function handler(req: NextRequest, res: NextResponse) {
  if (!fromValidReferer(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch projects
    const allProjects = await fetchProjects(req);

    // Handle error
    if (allProjects?.error) {
      throw new Error(allProjects.error);
    }

    // Handle no data
    if (allProjects?.data?.length < 1) {
      return NoDataResponse;
    }

    // Return data
    return NextResponse.json(
      { data: allProjects.data },
      {
        status: 200,
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate`,
        },
      }
    );
  } catch (error) {
    // Handle error
    return handleError(error as Error);
  }
}

// Fetch projects
async function fetchProjects(req: NextRequest) {
  return await fetch(req.nextUrl.origin + "/nextjs-app/api/project-data", {
    headers: {
      "x-api-key": apiKey,
    },
  }).then((res) => res.json());
}

// Handle no data
const NoDataResponse = NextResponse.json(
  { error: "No projects found" },
  { status: 404 }
);

// Handle error
async function handleError(error: Error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}

/**
 * Since this route is accessing a protected API route, we need to make sure
 * with a protected key, we need to make sure that the request is coming from
 * a valid source.
 *
 * - From the project page
 * - From a catch-all request for the individual project pages
 */
function fromValidReferer(req: NextRequest) {
  const referer = req.headers.get("referer");

  if (referer?.includes("/nextjs-app/projects")) {
    return true;
  }

  const subrequest = req.headers.get("x-middleware-subrequest");

  if (subrequest === "pages/api/edge/project-data/[slug]") {
    return true;
  }

  return false;
}
