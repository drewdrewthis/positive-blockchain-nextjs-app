import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import { importCSVBufferToGoogleSheetsApi } from "@/lib/google/import";
import { uploadProjectData } from "../../lib/google";

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

  apiRoute.post<ExtendedRequest, ExtendedResponse>(async (req, res) => {
    console.log("Uploading data");
    console.log("Received request to import csv");
    console.log(req.files); // Your files here
    console.log(req.body); // Your form data here

    // Any logic with your data here
    try {
      const { body } = req;
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
