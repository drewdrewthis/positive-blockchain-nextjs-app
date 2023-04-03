// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSingleProjectData } from "@/lib/google";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { slug } = req.query;
  const projectData = await fetchSingleProjectData(slug as string);
  res.status(200).json({ data: projectData });
}
