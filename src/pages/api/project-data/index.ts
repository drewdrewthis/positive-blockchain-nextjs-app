// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchProjectData } from "@/lib/google";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const projectData = await fetchProjectData();

  res.setHeader("Cache-Control", "s-maxage=60 , stale-while-revalidate");

  res.status(200).json({ data: projectData });
}
