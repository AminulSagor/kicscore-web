import { leagueHeaderMockData } from "@/mock/league-details/league-details.mock.data";
import LeagueDetailsHeader from "./_components/league-details-header";
import LeagueDetailsTabs from "./_components/league-details-tabs";
import OverviewTab from "./_components/overview/overview-tab";
import TableTab from "@/app/public/(pages)/league-details/[leagueId]/_components/table/table.tab";
import FixturesTab from "@/app/public/(pages)/league-details/[leagueId]/_components/fixtures/fixtures-tab";
import PlayerStatsTab from "@/app/public/(pages)/league-details/[leagueId]/_components/player-stats/player-stats-tab";
import TeamStatsTab from "@/app/public/(pages)/league-details/[leagueId]/_components/team-stats/team-stats-tab";

type LeagueDetailsPageProps = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function page({ searchParams }: LeagueDetailsPageProps) {
  const params = await searchParams;
  const activeTab = params?.tab ?? "overview";

  return (
    <main>
      <div className="mx-auto">
        <LeagueDetailsHeader league={leagueHeaderMockData} />
        <LeagueDetailsTabs />

        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "table" && <TableTab />}
        {activeTab === "fixtures" && <FixturesTab />}
        {activeTab === "player-stats" && <PlayerStatsTab />}
        {activeTab === "team-stats" && <TeamStatsTab />}
      </div>
    </main>
  );
}
