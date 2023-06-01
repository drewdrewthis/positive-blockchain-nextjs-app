// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
<<<<<<< HEAD

import { config as configuration } from "@/configuration";
import { fetchProjectData } from "@/lib/google";
=======
import { fetchPublicProjectData } from "@/lib/google";
import { config as configuration } from "@/configuration/config";
>>>>>>> 0caf539 (Finalize custom submission form for submitting)

const {
  projects: { CACHE_TTL },
} = configuration.constants;

async function handler(_req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const projectData = await fetchPublicProjectData();
    res.setHeader(
      "Cache-Control",
      `s-maxage=${CACHE_TTL} , stale-while-revalidate`
    );
    res.status(200).json({ data: projectData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export default handler;
