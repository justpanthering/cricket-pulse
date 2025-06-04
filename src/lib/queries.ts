import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPointsTable, fetchFixtures, fetchResults } from "@/lib/api";
import { PointsTableResponse } from "@/pages/api/points-table";
import { FixturesResponse } from "@/pages/api/fixtures";
import { ResultsResponse } from "@/pages/api/results";

// Points Table
export function usePointsTableQuery(
  page: number,
  limit: number,
  initialData?: PointsTableResponse
) {
  return useQuery({
    queryKey: ["points-table", page, limit],
    queryFn: () => fetchPointsTable(page, limit),
    initialData,
  });
}

// Fixtures (infinite)
export function useFixturesInfiniteQuery(initialData?: FixturesResponse) {
  return useInfiniteQuery<FixturesResponse>({
    queryKey: ["fixtures"],
    queryFn: ({ pageParam = 1 }) => fetchFixtures(Number(pageParam), 5),
    getNextPageParam: (lastFetchedPage, allFetchedPages) => {
      if (
        lastFetchedPage &&
        allFetchedPages.length < (lastFetchedPage.totalPages || 1)
      ) {
        return allFetchedPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    initialData: initialData
      ? { pages: [initialData], pageParams: [1] }
      : undefined,
    refetchOnMount: false,
  });
}

// Results (infinite)
export function useResultsInfiniteQuery(initialData?: ResultsResponse) {
  return useInfiniteQuery<ResultsResponse>({
    queryKey: ["results"],
    queryFn: ({ pageParam = 1 }) => fetchResults(Number(pageParam), 5),
    getNextPageParam: (lastFetchedPage, allFetchedPages) => {
      if (
        lastFetchedPage &&
        allFetchedPages.length < (lastFetchedPage.totalPages || 1)
      ) {
        return allFetchedPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    initialData: initialData
      ? { pages: [initialData], pageParams: [1] }
      : undefined,
    refetchOnMount: false,
  });
}
