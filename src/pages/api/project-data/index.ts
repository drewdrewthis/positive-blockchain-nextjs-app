// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchProjectData } from "@/lib/google";

async function handler(_req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const projectData = await fetchProjectData();
    res.setHeader("Cache-Control", "s-maxage=60 , stale-while-revalidate");
    res.status(200).json({ data: projectData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export default handler;
