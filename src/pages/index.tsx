import {
  HeroFixturesSection,
  ResultsSection,
  PointsTableSection,
} from "@/components/Home";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FixturesResponse } from "./api/fixtures";
import { ResultsResponse } from "./api/results";
import { PointsTableResponse } from "./api/points-table";
import {
  getFixturesData,
  getResultsData,
  getPointsData,
} from "@/utils/api/web-scraping";

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
  const page = 1;
  const limit = 5;
  const start = (page - 1) * limit;
  const end = start + limit;

  const fixtures = getFixturesData();
  const paginatedFixtures = fixtures.slice(start, end);

  const results = getResultsData();
  const paginatedResults = results.slice(start, end);

  const pointsTable = getPointsData();
  const paginatedPoints = pointsTable.slice(start, end);

  return {
    props: {
      fixturesResponse: {
        data: paginatedFixtures,
        total: fixtures.length,
        page,
        limit,
        totalPages: Math.ceil(fixtures.length / limit),
      },
      resultsResponse: {
        data: paginatedResults,
        total: results.length,
        page,
        limit,
        totalPages: Math.ceil(results.length / limit),
      },
      pointsTableResponse: {
        data: paginatedPoints,
        total: pointsTable.length,
        page,
        limit,
        totalPages: Math.ceil(pointsTable.length / limit),
      },
    },
  };
};
