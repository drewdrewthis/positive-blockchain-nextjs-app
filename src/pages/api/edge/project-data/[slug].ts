import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { config as configuration } from "@/configuration";

export const config = {
  runtime: "edge",
};

const {
  projects: { CACHE_TTL },
} = configuration.constants;

export default async function handler(req: NextRequest) {
  // Vercel's edge functions don't pass the slug as a query param
  // like is done by Next locally, so we need to manually extract
  // the slug from the url
  const slug = getSlug(req.nextUrl.pathname);

  try {
    // Fetch projects
    const allProjects = await fetch(
      req.nextUrl.origin + "/nextjs-app/api/edge/project-data"
    ).then((res) => res.json());

    // Handle error
    if (allProjects?.error) {
      throw new Error(allProjects.error);
    }

    // Handle no data
    if (allProjects?.data?.length < 1) {
      return NoDataResponse;
    }

    const projectData = allProjects.data.find(
      (project: any) => project.slug === slug
    );

    // Return data
    return NextResponse.json(
      {
        slug,
        data: projectData,
      },
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

// Get path after project-data from url
function getSlug(url: string) {
  const urlParts = url.split("/");

  return urlParts[urlParts.length - 1];
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
