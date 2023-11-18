import type { NextApiRequest, NextApiResponse } from "next";

import nextConnect from "next-connect";

import { uploadProjectData } from "@/lib/google";
import { uploadProjectScema } from "@/zod/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
    },
  });

  apiRoute.post(async (req, res) => {
    // Any logic with your data here
    try {
      const { body } = req;

      // Check if the body is valid
      uploadProjectScema.parse(body);

      const response = await uploadProjectData(body);

      res.status(200).json({ response });
    } catch (e) {
      console.error(e);
      // @ts-expect-error Error has a message
      res.status(500).json({ error: e.message });
    }
  });

  return apiRoute(req, res);
}
