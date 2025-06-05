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
  try {
    const fixturesResponse = await fetchFixtures();

    const resultsResponse = await fetchResults();
    const pointsTableResponse = await fetchPointsTable();

    return {
      props: {
        fixturesResponse,
        resultsResponse,
        pointsTableResponse,
      },
    };
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return {
      props: {
        fixturesResponse: null,
        resultsResponse: null,
        pointsTableResponse: null,
      },
    };
  }
};
