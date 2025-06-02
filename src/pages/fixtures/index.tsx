import { Fixture } from "@/types/match";
import { GetServerSideProps } from "next";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import Image from "next/image";
import { Clock } from "lucide-react";

type FixturesPageProps = {
  fixtures: Fixture[];
  error?: string;
};

function FixtureTeam({ team }: { team: Fixture["teams"][0] }) {
  return (
    <div className="flex justify-center items-center mb-2">
      {team.name !== "TBD" ? (
        team.logo && (
          <div className="h-12 w-12 inline-block">
            <Image src={team.logo} alt={team.name} width={48} height={48} />
          </div>
        )
      ) : (
        <span className="text-lg font-semibold">TBD</span>
      )}
    </div>
  );
}

export default function FixturesPage({ fixtures, error }: FixturesPageProps) {
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Something went wrong! Please try again later.
      </div>
    );

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Fixtures</h1>
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/fixtures`
    );
    const json = await res.json();
    return {
      props: {
        fixtures: json.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return {
      props: {
        fixtures: [],
        error: "Failed to load fixtures",
      },
    };
  }
};
