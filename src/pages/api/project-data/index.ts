// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchProjectData } from "@/lib/google";
import { isValidApiKeyAsync } from "@/lib/apiKeyChecker";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const key = req.headers["x-api-key"] as string;

  if (!(await isValidApiKeyAsync(key))) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const projectData = await fetchProjectData();

  res.setHeader("Cache-Control", "s-maxage=60 , stale-while-revalidate");

  res.status(200).json({ data: projectData });
}

const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET");

  res.setHeader("Access-Control-Allow-Headers", "x-api-key");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

export default allowCors(handler);
