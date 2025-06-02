import { Hero } from "@/components/Home/Hero";
import { Fixtures } from "@/components/Home/Fixtures";
import { Results } from "@/components/Home/Results";
import { Fixture, Result } from "@/types/match";
import { GetServerSideProps } from "next";

type HomeProps = {
  latestFixture: Fixture | null;
  fixtures: Fixture[];
  results: Result[];
};

export default function Home({ latestFixture, fixtures, results }: HomeProps) {
  return (
    <div className="min-h-screen">
      <Hero latestFixture={latestFixture} />
      <Fixtures fixtures={fixtures} />
      <Results results={results} />
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

    return {
      props: {
        latestFixture,
        fixtures: fixturesData,
        results: resultsData,
      },
    };
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return {
      props: {
        latestFixture: null,
        fixtures: [],
        results: [],
      },
    };
  }
};
