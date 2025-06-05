import {
  HeroFixturesSection,
  ResultsSection,
  PointsTableSection,
} from "@/components/Home";
import { GetServerSideProps } from "next";
import { fetchFixtures, fetchResults, fetchPointsTable } from "@/lib/api";
import Head from "next/head";
import { FixturesResponse } from "./api/fixtures";
import { ResultsResponse } from "./api/results";
import { PointsTableResponse } from "./api/points-table";

type HomeProps = {
  fixturesResponse: FixturesResponse | null;
  resultsResponse: ResultsResponse | null;
  pointsTableResponse: PointsTableResponse | null;
};

export default function Home({
  fixturesResponse,
  resultsResponse,
  pointsTableResponse,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Cricket Pulse IPL T20</title>
      </Head>
      <div className="min-h-screen">
        <HeroFixturesSection initialFixtures={fixturesResponse} />
        <ResultsSection initialResults={resultsResponse} />
        <PointsTableSection initialPoints={pointsTableResponse} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const fetchers: ({
    errorMsg: string;
  } & (
    | {
        fn: typeof fetchFixtures;
        key: "fixturesResponse";
      }
    | {
        fn: typeof fetchResults;
        key: "resultsResponse";
      }
    | {
        fn: typeof fetchPointsTable;
        key: "pointsTableResponse";
      }
  ))[] = [
    {
      fn: fetchFixtures,
      key: "fixturesResponse",
      errorMsg: "Error fetching fixtures:",
    },
    {
      fn: fetchResults,
      key: "resultsResponse",
      errorMsg: "Error fetching results:",
    },
    {
      fn: fetchPointsTable,
      key: "pointsTableResponse",
      errorMsg: "Error fetching points table:",
    },
  ];

  const results = await Promise.allSettled(fetchers.map((f) => f.fn()));

  const props: HomeProps = {
    fixturesResponse: null,
    resultsResponse: null,
    pointsTableResponse: null,
  };

  results.forEach((result, idx) => {
    const { key, errorMsg } = fetchers[idx];
    if (result.status === "fulfilled") {
      // Type assertion based on key
      if (key === "fixturesResponse") {
        props.fixturesResponse = result.value as FixturesResponse;
      } else if (key === "resultsResponse") {
        props.resultsResponse = result.value as ResultsResponse;
      } else if (key === "pointsTableResponse") {
        props.pointsTableResponse = result.value as PointsTableResponse;
      }
    } else {
      console.error(errorMsg, result.reason);
    }
  });

  return { props };
};
