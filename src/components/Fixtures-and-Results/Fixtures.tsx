import { Fixture } from "@/types/match";
import { TimelineLayout } from "@/components/ui/timeline-layout";
import Image from "next/image";
import { Clock } from "lucide-react";
import clsx from "clsx";

type FixturesProps = {
  fixtures: Fixture[];
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

export function FixturesTimeline({ fixtures }: FixturesProps) {
  return (
    <>
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
    </>
  );
}
