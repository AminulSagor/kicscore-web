import LineupTab from "@/app/public/(pages)/match-details/[matchId]/_components/lineup/lineup-tab";
import StatsTab from "@/app/public/(pages)/match-details/[matchId]/_components/stats/stats-tab";
import HeadToHeadTab from "@/app/public/(pages)/match-details/[matchId]/_components/head-to-head/head-to-head-tab";

import FactsTab from "./_components/facts/facts-tab";
import MatchDetailsHeader from "./_components/match-details-header";
import MatchDetailsTabs from "./_components/match-details-tabs";
import { getMatchDetails } from "@/service/football/matches/match.details.service";

//props type
type MatchDetailsPageProps = {
  params: Promise<{
    matchId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
  }>;
};

//===== Main Component =====//
export default async function MatchDetailsPage({
  params,
  searchParams,
}: MatchDetailsPageProps) {
  const routeParams = await params;
  const queryParams = searchParams ? await searchParams : {};

  const activeTab = queryParams.tab ?? "facts";
  const { match, follow } = await getMatchDetails(routeParams.matchId);

  if (!match) {
    return (
      <main>
        <section className="mx-auto w-full pb-16">
          <p className="mt-10 text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
            Match details not found.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="mx-auto w-full pb-16">
        <MatchDetailsHeader match={match} follow={follow} />
        <MatchDetailsTabs />

        {activeTab === "facts" && <FactsTab />}
        {activeTab === "lineup" && <LineupTab />}
        {activeTab === "stats" && <StatsTab />}
        {activeTab === "head-to-head" && <HeadToHeadTab />}
      </section>
    </main>
  );
}
