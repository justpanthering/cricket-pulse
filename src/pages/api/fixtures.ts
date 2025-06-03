import { Fixture } from "@/types/match";
import { getFixturesData } from "@/utils/api/web-scraping";
import type { NextApiRequest, NextApiResponse } from "next";

export type FixturesResponse = {
  data: Fixture[];
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
    const fixtures = getFixturesData();

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedFixtures = fixtures.slice(start, end);

    res.status(200).json({
      data: paginatedFixtures,
      total: fixtures.length,
      page,
      limit,
      totalPages: Math.ceil(fixtures.length / limit),
    } as FixturesResponse);
  } catch (error: unknown) {
    console.error("Error fetching fixtures:", error);
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
}
