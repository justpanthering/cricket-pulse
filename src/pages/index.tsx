import { Hero } from "@/components/Home/Hero";
import { Fixtures } from "@/components/Home/Fixtures";
import { Results } from "@/components/Home/Results";
import { PointsTable } from "@/components/Home/PointsTable";
import { Fixture, Result, Point } from "@/types/match";
import { GetServerSideProps } from "next";
import { fetchFixtures, fetchResults, fetchPointsTable } from "@/lib/api";
import Head from "next/head";

type HomeProps = {
  latestFixture: Fixture | null;
  fixtures: Fixture[];
  results: Result[];
  points: Point[];
};

export default function Home({
  latestFixture,
  fixtures,
  results,
  points,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Cricket Pulse IPL T20</title>
      </Head>
      <div className="min-h-screen">
        <Hero latestFixture={latestFixture} />
        <Fixtures fixtures={fixtures} />
        <Results results={results} />
        <PointsTable points={points} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const fixturesJson = await fetchFixtures();
    const latestFixture =
      fixturesJson.data.length > 0 ? fixturesJson.data[0] : null;

    const resultsJson = await fetchResults();
    const pointsJson = await fetchPointsTable();

    return {
      props: {
        latestFixture,
        fixtures: fixturesJson.data,
        results: resultsJson.data,
        points: pointsJson.data,
      },
    };
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return {
      props: {
        latestFixture: null,
        fixtures: [],
        results: [],
        points: [],
      },
    };
  }
};
