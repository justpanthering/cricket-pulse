import { useState } from "react";
import { Result } from "@/types/match";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import Image from "next/image";
import clsx from "clsx";
import { Trophy } from "lucide-react";
import { ResultsResponse } from "@/pages/api/results";
import { fetchResults } from "@/lib/api";

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

export function ResultsTimeline({ apiResponse }: ResultsProps) {
  const [results, setResults] = useState<Result[]>(apiResponse?.data || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    try {
      const data = await fetchResults(page + 1, 5);
      setResults((prev) => [...prev, ...data.data]);
      setPage(page + 1);
    } catch (e) {
      console.error("Failed to load more results:", e);
    }
    setLoading(false);
  };

  return (
    <>
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No fixtures found.</p>
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
      {apiResponse && page < apiResponse.totalPages && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
