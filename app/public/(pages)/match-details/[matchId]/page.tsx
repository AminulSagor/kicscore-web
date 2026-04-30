import LineupTab from "@/app/public/(pages)/match-details/[matchId]/_components/lineup/lineup-tab";
import FactsTab from "./_components/facts/facts-tab";
import MatchDetailsHeader from "./_components/match-details-header";
import MatchDetailsTabs from "./_components/match-details-tabs";
import KnockoutTab from "@/app/public/(pages)/match-details/[matchId]/_components/knockout/knockout-tab";
import StatsTab from "@/app/public/(pages)/match-details/[matchId]/_components/stats/stats-tab";
import HeadToHeadTab from "@/app/public/(pages)/match-details/[matchId]/_components/head-to-head/head-to-head-tab";

type MatchDetailsPageProps = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function MatchDetailsPage({
  searchParams,
}: MatchDetailsPageProps) {
  const params = searchParams ? await searchParams : {};
  const activeTab = params.tab ?? "facts";

  return (
    <main>
      <section className="mx-auto w-full pb-16">
        <MatchDetailsHeader />
        <MatchDetailsTabs />

        {activeTab === "facts" && <FactsTab />}
        {activeTab === "lineup" && <LineupTab />}
        {activeTab === "knockout" && <KnockoutTab />}
        {activeTab === "stats" && <StatsTab />}
        {activeTab === "head-to-head" && <HeadToHeadTab />}
      </section>
    </main>
  );
}
