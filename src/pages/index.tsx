import { Hero } from "@/components/Home/Hero";
import { Fixtures } from "@/components/Home/Fixtures";
import { Results } from "@/components/Home/Results";
import { PointsTable } from "@/components/Home/PointsTable";
import { Fixture, Result, Point } from "@/types/match";
import { GetServerSideProps } from "next";

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
    <div className="min-h-screen">
      <Hero latestFixture={latestFixture} />
      <Fixtures fixtures={fixtures} />
      <Results results={results} />
      <PointsTable points={points} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch fixtures
    const fixturesRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/fixtures`
    );
    const { data: fixturesData } = (await fixturesRes.json()) as {
      data: Fixture[];
    };
    const latestFixture = fixturesData.length > 0 ? fixturesData[0] : null;

    // Fetch results
    const resultsRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/results`
    );
    const { data: resultsData } = (await resultsRes.json()) as {
      data: Result[];
    };

    // Fetch points table
    const pointsRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/points-table`
    );
    const { data: pointsData } = (await pointsRes.json()) as {
      data: Point[];
    };

    return {
      props: {
        latestFixture,
        fixtures: fixturesData,
        results: resultsData,
        points: pointsData,
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
