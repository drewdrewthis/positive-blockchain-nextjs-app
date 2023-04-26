// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { isValidApiKeyAsync } from "@/lib/apiKeyChecker";
import Routes from "@/lib/Routes";
import type { Project } from "@/types";
import isUndefined from "lodash/fp/isUndefined";

/**
 * This is the API V1 endpoint for the project data.
 */
async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const key = req.headers["x-api-key"] as string;

  console.log('headers', req.headers);

  try {
    if (isUndefined(key)) {
      res.status(401).json({ error: "Unauthorized: Missing API Key" });
      return;
    }

    if (!(await isValidApiKeyAsync(key))) {
      res.status(401).json({ error: "Unauthorized: Bad Api Key" });
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }

  try {
    const projectData = await fetchAllProjectData();
    const paginationOptions = parsePaginationOptions(req.query);
    const pagedData = paginateData(projectData.data, paginationOptions);
    res.status(200).json({ data: pagedData });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}

const allowCors = (fn: any) => async (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-api-key, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

export default allowCors(handler);

async function fetchAllProjectData() {
  const url = `${Routes.getBaseUrl()}/api/project-data`;
  // Use the other API endpoint to fetch the data
  // to leverage the caching mechanism
  return fetch(url).then((res) => res.json());
}

type PaginationOptions = {
  limit: number;
  offset: number;
};
function parsePaginationOptions(
  query: NextApiRequest["query"]
): PaginationOptions {
  const limit = parseInt(query.limit as string, 10);
  const offset = parseInt(query.offset as string, 10);

  return {
    limit: isUndefined(limit) ? 10 : limit,
    offset: isUndefined(offset) ? 0 : offset,
  };
}
function paginateData(data: Project[], options: PaginationOptions): Project[] {
  const startIndex = options.offset;
  const endIndex = startIndex + options.limit;
  return data.slice(startIndex, endIndex);
}
