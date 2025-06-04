import { Fixture } from "@/types/match";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import Image from "next/image";
import { Clock, RefreshCcw } from "lucide-react";
import clsx from "clsx";
import { FixturesResponse } from "@/pages/api/fixtures";
import { useQueryClient } from "@tanstack/react-query";
import { useFixturesInfiniteQuery } from "@/lib/queries";
import Head from "next/head";

type FixturesProps = { apiResponse: FixturesResponse | null };

function FixtureTeam({ team }: { team: Fixture["teams"][0] }) {
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

export function FixturesTimeline({ apiResponse }: FixturesProps) {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useFixturesInfiniteQuery(apiResponse ?? undefined);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["fixtures"] });
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading fixtures...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load fixtures.</p>;

  const fixtures = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <Head>
        <title>Fixtures | Cricket Pulse IPL T20</title>
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
      {fixtures.length === 0 ? (
        <p className="text-center text-gray-500">No fixtures found.</p>
      ) : (
        <TimelineLayout
          items={fixtures.map((fixture, id) => ({
            date: fixture.schedule.date,
            id,
            title: (
              <div className="flex justify-center items-center">
                <FixtureTeam team={fixture.teams[0]} />
                <span className="mx-2">vs</span>
                <FixtureTeam team={fixture.teams[1]} />
              </div>
            ),
            description: (
              <div className="flex flex-col">
                <span>
                  <b>{fixture.teams[0].name}</b> vs{" "}
                  <b>{fixture.teams[1].name}</b>
                </span>
                <div className="flex items-center mt-1">
                  <Clock size={14} />
                  <span className="text-xs ml-1">{fixture.schedule.time}</span>
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
}
