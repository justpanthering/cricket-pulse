import { Hero } from "@/components/Home/Hero";
import { Fixture } from "@/types/match";
import { GetServerSideProps } from "next";

type HomeProps = {
  latestFixture: Fixture | null;
};

export default function Home({ latestFixture }: HomeProps) {
  return (
    <div className="min-h-screen">
      <Hero latestFixture={latestFixture} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/fixtures`
    );
    const { data } = (await res.json()) as { data: Fixture[] };

    const latestFixture = data.length > 0 ? data[0] : null;

    return {
      props: {
        latestFixture,
      },
    };
  } catch (error: unknown) {
    console.error("Error fetching fixtures:", error);
    return {
      props: {
        latestFixture: null,
      },
    };
  }
};
