// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchProjectData } from "@/lib/google";
import { isValidApiKeyAsync } from "../../../lib/apiKeyChecker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("req.headers", req.headers);

  const key = req.headers["x-api-key"] as string;

  if (!(await isValidApiKeyAsync(key))) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const projectData = await fetchProjectData();

  res.setHeader("Cache-Control", "s-maxage=60 , stale-while-revalidate");

  res.status(200).json({ data: projectData });
}
