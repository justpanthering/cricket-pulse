import { getResultsData } from "@/utils/api/web-scraping";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = getResultsData();

    res.status(200).json({ data: results });
  } catch (error: unknown) {
    console.error("Error fetching results data:", error);
    res.status(500).json({ error: "Failed to fetch results data" });
  }
}
