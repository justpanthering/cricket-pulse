import type { NextApiRequest, NextApiResponse } from "next";
import { getPointsData } from "@/utils/api/web-scraping";
import { Point } from "@/types/match";

export type PointsTableResponse = {
  data: Point[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const points = getPointsData();

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedPoints = points.slice(start, end);

    res.status(200).json({
      data: paginatedPoints,
      total: points.length,
      page,
      limit,
      totalPages: Math.ceil(points.length / limit),
    } as PointsTableResponse);
  } catch (error: unknown) {
    console.error("Error fetching points data:", error);
    res.status(500).json({ error: "Failed to fetch points data" });
  }
}
