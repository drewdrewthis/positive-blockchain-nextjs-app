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
  const allProjects = await fetch(
    req.nextUrl.origin + "/nextjs-app/api/project-data"
  ).then((res) => res.json());

  return NextResponse.json(
    {
      data: allProjects.data,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_TTL}, stale-while-revalidate`,
      },
    }
  );
}
