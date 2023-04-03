import type { NextApiRequest, NextApiResponse } from "next";
import { getLatestCsvId } from "../../lib/google/drive";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = await getLatestCsvId();
  res.status(200).json({ id });
}
