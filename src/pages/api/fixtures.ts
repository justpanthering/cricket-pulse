import { getFixturesData } from "@/utils/api/web-scraping";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fixtures = getFixturesData();

    res.status(200).json({ data: fixtures });
  } catch (error: unknown) {
    console.error("Error fetching fixtures:", error);
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
}
