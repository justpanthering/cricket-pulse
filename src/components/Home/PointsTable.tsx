import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { PointsTableResponse } from "@/pages/api/points-table";
import { usePointsTableQuery } from "@/lib/queries";

export function PointsTableSection({
  initialPoints,
}: {
  initialPoints: PointsTableResponse | null;
}) {
  // Use react-query for caching and polling
  const { data, isLoading, isError } = usePointsTableQuery(
    1,
    5,
    initialPoints || undefined
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading points table...</div>;
  }

  if (isError || !data || data.data.length === 0) {
    return <div className="text-center py-8">No points table available.</div>;
  }

  return (
    <section className="py-8 container mx-auto">
      <div className="flex justify-center items-center mb-10">
        <h2 className="text-2xl font-bold text-center">Points Table</h2>
        <span className="text-xs ml-4 underline text-blue-500 hover:text-blue-800">
          <Link href="/points-table">(Show All)</Link>
        </span>
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-4 mx-14 md:mx-auto max-w-6xl">
        <Carousel>
          <CarouselContent>
            {data.data.map((row, idx) => (
              <CarouselItem key={row.team.name + idx} className="md:basis-1/3">
                <Card className="h-full min-h-[320px] flex flex-col">
                  <CardContent className="flex flex-col items-center justify-between px-0.5 h-full">
                    <div className="flex items-center mb-2">
                      {row.team.logo && (
                        <div className="h-20 w-20">
                          <Image
                            src={row.team.logo}
                            alt={row.team.name}
                            width={80}
                            height={80}
                            className="mr-2"
                          />
                        </div>
                      )}
                      <span className="font-bold text-lg">{row.team.name}</span>
                    </div>
                    <div className="flex flex-col items-center text-sm mb-2">
                      <div>
                        <span className="font-semibold">Position:</span>{" "}
                        {row.pos}
                      </div>
                      <div>
                        <span className="font-semibold">P:</span> {row.p}
                        &nbsp;
                        <span className="font-semibold">W:</span> {row.w}
                        &nbsp;
                        <span className="font-semibold">L:</span> {row.l}
                        &nbsp;
                        <span className="font-semibold">NR:</span> {row.nr}
                      </div>
                      <div>
                        <span className="font-semibold">Pts:</span> {row.pts}
                        &nbsp;
                        <span className="font-semibold">NRR:</span> {row.nrr}
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-sm mb-2">
                      <span className="font-semibold mr-2">Recent:</span>
                      <div className="flex gap-0.5">
                        {row.recentForm.map((f, i) => (
                          <span
                            key={i}
                            className={`rounded p-1 ${
                              f === "W"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
            <CarouselItem className="md:basis-1/3">
              <Card className="h-full min-h-[320px] flex flex-col">
                <CardContent className="flex flex-col items-center justify-center px-0.5 h-full">
                  <span className="text-xs ml-4 underline text-blue-500 hover:text-blue-800">
                    <Link href="/points-table">Show All...</Link>
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
