import type { NextApiRequest, NextApiResponse } from "next";

import multer from "multer";
import nextConnect from "next-connect";

import { importCSVBufferToGoogleSheetsApi } from "@/lib/google/import";

interface ExtendedRequest {
  files: {
    fieldname: "files";
    originalname: string;
    encoding: "7bit";
    mimetype: "text/csv";
    buffer: Buffer;
  }[];
}

interface ExtendedResponse {
  cookie(_name: string, _value: string): void;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

function extractArrayBufferFromRequest(req: ExtendedRequest) {
  return req.files[0].buffer;
}

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

  apiRoute.use(multer().any());

  apiRoute.post<ExtendedRequest, ExtendedResponse>(async (req, res) => {
    console.log("Received request to import csv");
    console.log(req.files); // Your files here
    console.log(req.body); // Your form data here

    // Any logic with your data here
    try {
      const bufferArray = extractArrayBufferFromRequest(req);
      const response = await importCSVBufferToGoogleSheetsApi(bufferArray);

      res.status(200).json({ response });
    } catch (e) {
      console.error(e);
      // @ts-expect-error Error has a message
      res.status(500).json({ error: e.message });
    }
  });

  return apiRoute(req, res);
}
