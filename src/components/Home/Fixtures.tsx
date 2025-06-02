import { Card, CardContent } from "@/components/ui/card";
import { Fixture } from "@/types/match";
import Image from "next/image";
import { Calendar, Map } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

type FixturesProps = {
  fixtures: Fixture[];
};

export function Fixtures({ fixtures }: FixturesProps) {
  if (!fixtures || fixtures.length === 0) {
    return <div className="text-center py-8">No fixtures available.</div>;
  }

  return (
    <section className="py-8">
      <div className="flex justify-center items-center mb-10">
        <h2 className="text-2xl font-bold text-center">Fixtures</h2>
        <span className="text-xs ml-4 underline text-blue-600">
          <Link href="/fixtures">(Show All)</Link>
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 max-w-6xl mx-auto">
        {fixtures.map((fixture) => (
          <Card
            key={fixture.schedule.date + fixture.schedule.time}
            className="h-full"
          >
            <CardContent className="flex flex-col items-center justify-center px-6">
              <div className="text-center mb-2 flex flex-col justify-center md:flex-row items-center">
                <div>
                  {fixture.teams[0].logo && (
                    <div className="h-24 w-24">
                      <Image
                        className="inline-block mr-2"
                        src={fixture.teams[0].logo}
                        alt={fixture.teams[0].name}
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </div>
                <span className="font-semibold text-lg mx-1">vs</span>
                <div>
                  <div
                    className={clsx(
                      "h-24 w-24 flex justify-center items-center",
                      fixture.teams[1].name === "TBD" && "bg-gray-200"
                    )}
                  >
                    {fixture.teams[1].name === "TBD" ? (
                      <span className="text-lg font-semibold">TBD</span>
                    ) : (
                      fixture.teams[1].logo && (
                        <Image
                          className="inline-block mr-2"
                          src={fixture.teams[1].logo}
                          alt={fixture.teams[1].name}
                          width={100}
                          height={100}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl my-4 border-2 p-2 rounded-sm border-amber-600">
                  {fixture.matchOrder}
                </h2>
              </div>
              <div className="flex text-sm text-gray-600 mb-1">
                <Calendar className="mr-2" size={20} />
                <span>
                  {fixture.schedule.date} at {fixture.schedule.time}
                </span>
              </div>
              <div className="flex text-sm text-gray-600">
                <Map className="mr-2" size={24} />
                <span>{fixture.venue}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
