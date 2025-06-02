import { getResultsData } from "@/utils/api/web-scraping";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = getResultsData();

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedResults = results.slice(start, end);

    res.status(200).json({
      data: paginatedResults,
      total: results.length,
      page,
      limit,
      totalPages: Math.ceil(results.length / limit),
    });
  } catch (error: unknown) {
    console.error("Error fetching results data:", error);
    res.status(500).json({ error: "Failed to fetch results data" });
  }
}
