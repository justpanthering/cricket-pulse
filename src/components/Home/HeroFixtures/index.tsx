import { Hero } from "@/components/Home/HeroFixtures/Hero";
import { Fixtures } from "@/components/Home/HeroFixtures/Fixtures";
import { useFixturesInfiniteQuery } from "@/lib/queries";
import { FixturesResponse } from "@/pages/api/fixtures";

export function HeroFixturesSection({
  initialFixtures,
}: {
  initialFixtures: FixturesResponse | null;
}) {
  const { data } = useFixturesInfiniteQuery(initialFixtures ?? undefined);

  const fixtures = data?.pages?.flatMap((page) => page.data) ?? initialFixtures;
  const latestFixture = fixtures.length > 0 ? fixtures[0] : null;

  return (
    <>
      <Hero latestFixture={latestFixture} />
      <Fixtures fixtures={fixtures} />
    </>
  );
}
