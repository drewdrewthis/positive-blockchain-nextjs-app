import type { NextApiRequest, NextApiResponse } from "next";
import { fetchCountriesData } from "@/lib/google/fetchCountriesData";
import { CountryData } from "@/types";

export default async function countries(
  req: NextApiRequest,
  res: NextApiResponse<CountryData[] | { message: string }>
) {
  try {
    const countriesData = await fetchCountriesData();
    res.status(200).json(countriesData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
