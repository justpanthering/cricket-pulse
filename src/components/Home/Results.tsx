import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Calendar, Map } from "lucide-react";
import { Result } from "@/types/match";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function Results({ results }: { results: Result[] }) {
  if (!results || results.length === 0) {
    return <div className="text-center py-8">No results available.</div>;
  }

  return (
    <section className="py-8 container mx-auto">
      <div className="flex justify-center items-center mb-10">
        <h2 className="text-2xl font-bold text-center">Results</h2>
        <span className="text-xs ml-4 underline text-blue-500  hover:text-blue-800">
          <Link href="/fixtures-and-results?show=results">(Show All)</Link>
        </span>
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-4 mx-14 md:mx-auto max-w-6xl">
        <Carousel>
          <CarouselContent>
            {results.map((result, idx) => (
              <CarouselItem
                key={result.matchOrder + idx}
                className="md:basis-1/3"
              >
                <Card className="h-full min-h-[420px] flex flex-col">
                  <CardContent className="flex flex-col items-center justify-between px-0.5 h-full">
                    <div className="text-center mb-2 flex flex-col justify-center md:flex-row items-center">
                      <div>
                        {result.teams[0].logo && (
                          <div className="h-20 w-20">
                            <Image
                              className="inline-block mr-2"
                              src={result.teams[0].logo}
                              alt={result.teams[0].name}
                              width={80}
                              height={80}
                            />
                          </div>
                        )}
                        <div className="font-semibold">
                          {result.teams[0].score}
                        </div>
                      </div>
                      <span className="font-semibold text-lg mx-1">vs</span>
                      <div>
                        {result.teams[1].logo && (
                          <div className="h-20 w-20">
                            <Image
                              className="inline-block mr-2"
                              src={result.teams[1].logo}
                              alt={result.teams[1].name}
                              width={80}
                              height={80}
                            />
                          </div>
                        )}
                        <div className="font-semibold">
                          {result.teams[1].score}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-xl my-4 border-2 p-2 rounded-sm border-yellow-300">
                        {result.matchOrder}
                      </h2>
                    </div>
                    <div className="flex items-center text-sm text-green-700 mb-1 max-w-3xs">
                      <Trophy className="mr-2" size={20} />
                      <span>{result.comments}</span>
                    </div>
                    <div className="flex text-sm text-gray-600 mb-1 max-w-3xs">
                      <Calendar className="mr-2" size={20} />
                      <span>{result.dateTime}</span>
                    </div>
                    <div className="flex text-sm text-gray-600 max-w-3xs">
                      <Map className="mr-2" size={24} />
                      <span>{result.venue}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
            <CarouselItem className="md:basis-1/3">
              <Card className="h-full min-h-[420px] flex flex-col">
                <CardContent className="flex flex-col items-center justify-center px-0.5 h-full">
                  <span className="text-xs ml-4 underline text-blue-500 hover:text-blue-800">
                    <Link href="/fixtures-and-results?show=results">
                      Show All...
                    </Link>
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
