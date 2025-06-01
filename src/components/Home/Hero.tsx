import { Fixture } from "@/types/match";
import { Calendar, Map } from "lucide-react";
import Image from "next/image";

function TeamLogo({ src, alt }: { src: string; alt: string }) {
  return <Image width={256} height={256} src={src} alt={alt} />;
}

export function Hero({ latestFixture }: { latestFixture: Fixture | null }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 to-blue-600 text-white py-16 px-6 shadow-lg min-h-[50vh] flex h-full overflow-hidden">
      <div className="container mx-auto flex flex-col justify-between relative z-10">
        {latestFixture ? (
          <>
            <h1 className="text-5xl font-bold mb-4">Upcoming Match</h1>
            <div>
              <div className="flex items-center justify-center mb-4 gap-4">
                <TeamLogo
                  src={latestFixture.teams[0].logo as string}
                  alt={latestFixture.teams[0].name}
                />
                <TeamLogo
                  src={latestFixture.teams[1].logo as string}
                  alt={latestFixture.teams[1].name}
                />
              </div>
              <div className="text-3xl font-semibold mb-2">
                {latestFixture.teams[0].name} vs {latestFixture.teams[1].name}
              </div>
              <span className="text-xl font-semibold">
                {latestFixture.matchOrder}
              </span>
              <div className="flex my-1 text-sm">
                <Calendar size={18} />
                <span>
                  :&nbsp;
                  {latestFixture.schedule.time}&nbsp;
                  {latestFixture.schedule.date}
                </span>
              </div>
              <div className="flex mb-1 text-sm">
                <Map size={18} />
                <span>:&nbsp;{latestFixture.venue}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-9xl">Coming Soon in 2026</div>
        )}
      </div>
    </section>
  );
}
