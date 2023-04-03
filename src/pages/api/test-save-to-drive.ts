import type { NextApiRequest, NextApiResponse } from "next";
import { uploadFile } from "../../lib/google/drive";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = await uploadFile();
  res.status(200).json({ id });
}
