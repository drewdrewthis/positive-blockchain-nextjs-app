import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Redirect to the download page
  res.redirect("/nextjs-app/download-csv");
}
