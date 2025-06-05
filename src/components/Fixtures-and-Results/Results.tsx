import { useQueryClient } from "@tanstack/react-query";
import { ResultsResponse } from "@/pages/api/results";
import { Result } from "@/types/match";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import Image from "next/image";
import clsx from "clsx";
import { RefreshCcw, Trophy } from "lucide-react";
import { useResultsInfiniteQuery } from "@/lib/queries";
import Head from "next/head";
import React from "react";

type ResultsProps = {
  apiResponse: ResultsResponse | null;
};

function FixtureTeam({ team }: { team: Result["teams"][0] }) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center mb-2 h-16 w-16",
        team.name === "TBD" && "rounded-full bg-gray-200"
      )}
    >
      {team.name !== "TBD" ? (
        team.logo && (
          <Image src={team.logo} alt={team.name} width={64} height={64} />
        )
      ) : (
        <span className="text-lg font-semibold">TBD</span>
      )}
    </div>
  );
}

export const ResultsTimeline = React.memo(function ResultsTimeline({
  apiResponse,
}: ResultsProps) {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useResultsInfiniteQuery(apiResponse ?? undefined);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["results"] });
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading results...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load results.</p>;

  const results = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <Head>
        <title>Results | Cricket Pulse IPL T20</title>
      </Head>
      <div className="flex justify-end mb-2">
        <button
          onClick={handleRefresh}
          className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          disabled={isFetching}
        >
          <RefreshCcw size={14} className={isFetching ? "animate-spin" : ""} />
          <span className="ml-1.5">
            {isFetching ? "Refreshing..." : "Refresh"}
          </span>
        </button>
      </div>
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <TimelineLayout
          items={[...results].reverse().map((result, id) => ({
            date: result.dateTime,
            id,
            title: (
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                  <FixtureTeam team={result.teams[0]} />
                  <span className="mx-2">vs</span>
                  <FixtureTeam team={result.teams[1]} />
                </div>
                <span className="text-yellow-600">{result.matchOrder}</span>
              </div>
            ),
            description: (
              <div className="flex flex-col">
                <span>
                  <b>{result.teams[0].name}</b> vs <b>{result.teams[1].name}</b>
                </span>
                <div className="text-green-700 flex">
                  <Trophy size={14} className="mt-1" />
                  <span className="ml-1">{result.comments}</span>
                </div>
              </div>
            ),
          }))}
          size="md"
        />
      )}
      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
});
