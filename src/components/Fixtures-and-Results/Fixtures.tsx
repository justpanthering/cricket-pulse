import { Fixture } from "@/types/match";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import Image from "next/image";
import { Clock } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { FixturesResponse } from "@/pages/api/fixtures";

type FixturesProps = {
  apiResponse: FixturesResponse | null;
};

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
  const [data, setData] = useState<Fixture[]>(apiResponse?.data || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fixtures?page=${page + 1}&limit=5`);
      const json = await res.json();
      setData((prev) => [...prev, ...json.data]);
      setPage(page + 1);
    } catch (e) {
      console.error("Failed to load more fixtures:", e);
    }
    setLoading(false);
  };

  return (
    <>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No fixtures found.</p>
      ) : (
        <TimelineLayout
          items={data.map((fixture, id) => ({
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
