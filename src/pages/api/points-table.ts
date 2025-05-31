import type { NextApiRequest, NextApiResponse } from "next";
import { getPointsData } from "@/utils/api/web-scraping";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = getPointsData();

    res.status(200).json({ data });
  } catch (error: unknown) {
    console.error("Error fetching points data:", error);
    res.status(500).json({ error: "Failed to fetch points data" });
  }
}
