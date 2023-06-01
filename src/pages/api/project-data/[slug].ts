// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
<<<<<<< HEAD

import { config } from "@/configuration";
import { fetchSingleProjectData } from "@/lib/google";
=======
import { fetchSingleProjectData } from "@/lib/google";
import { config } from "@/configuration/config";
>>>>>>> 0caf539 (Finalize custom submission form for submitting)

const {
  projects: { CACHE_TTL },
} = config.constants;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${CACHE_TTL}, stale-while-revalidate`
  );

  const { slug } = req.query;
  const projectData = await fetchSingleProjectData(slug as string);
  res.status(200).json({ data: projectData });
}
