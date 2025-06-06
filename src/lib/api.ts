import { FixturesResponse } from "@/pages/api/fixtures";
import { PointsTableResponse } from "@/pages/api/points-table";
import { ResultsResponse } from "@/pages/api/results";

export async function fetchFixtures(
  page = 1,
  limit = 5
): Promise<FixturesResponse> {
  const res = await fetch(`/api/fixtures?page=${page}&limit=${limit}`);
  return res.json();
}

export async function fetchResults(
  page?: number,
  limit?: number
): Promise<ResultsResponse> {
  let url = `/api/results`;
  if (page && limit) url += `?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchPointsTable(
  page?: number,
  limit?: number
): Promise<PointsTableResponse> {
  let url = `/api/points-table`;
  if (page && limit) url += `?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  return res.json();
}
