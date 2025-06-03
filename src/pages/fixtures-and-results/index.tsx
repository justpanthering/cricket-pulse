import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { FixturesTimeline } from "@/components/Fixtures-and-Results/Fixtures";
import { ResultsTimeline } from "@/components/Fixtures-and-Results/Results";
import { ResultsResponse } from "../api/results";
import { FixturesResponse } from "../api/fixtures";

type FixturesPageProps = {
  fixturesResponse: FixturesResponse | null;
  resultsResponse: ResultsResponse | null;
  error?: string;
};

export default function FixturesAndResultsPage({
  fixturesResponse,
  resultsResponse,
  error,
}: FixturesPageProps) {
  const router = useRouter();
  const showParam = router.query.show;
  const show =
    showParam === "results" || showParam === "fixtures"
      ? showParam
      : "fixtures";

  const handleTabChange = (value: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, show: value },
      },
      undefined,
      { shallow: true }
    );
  };

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Something went wrong! Please try again later.
      </div>
    );

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Fixtures & Results
      </h1>
      <Tabs.Root value={show} onValueChange={handleTabChange}>
        <Tabs.List className="flex justify-center mb-6 gap-4">
          <Tabs.Trigger
            value="fixtures"
            className="px-4 py-2 rounded data-[state=active]:border-white data-[state=active]:border-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Fixtures
          </Tabs.Trigger>
          <Tabs.Trigger
            value="results"
            className="px-4 py-2 rounded data-[state=active]:border-white data-[state=active]:border-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Results
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="fixtures">
          <FixturesTimeline apiResponse={fixturesResponse} />
        </Tabs.Content>
        <Tabs.Content value="results">
          <ResultsTimeline apiResponse={resultsResponse} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  FixturesPageProps
> = async () => {
  try {
    const [fixturesRes, resultsRes] = await Promise.all([
      fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/fixtures?page=1&limit=5`
      ),
      fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/results`
      ),
    ]);
    const fixturesJson: FixturesResponse = await fixturesRes.json();
    const resultsJson = await resultsRes.json();
    return {
      props: {
        fixturesResponse: fixturesJson,
        resultsResponse: resultsJson,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        fixturesResponse: null,
        resultsResponse: null,
        error: "Failed to load data",
      },
    };
  }
};
