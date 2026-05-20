import LeagueDetailsHeader from "./_components/league-details-header";
import LeagueDetailsTabs from "./_components/league-details-tabs";
import OverviewTab from "./_components/overview/overview-tab";
import TableTab from "@/app/public/(pages)/league-details/[leagueId]/_components/table/table.tab";
import FixturesTab from "@/app/public/(pages)/league-details/[leagueId]/_components/fixtures/fixtures-tab";
import PlayerStatsTab from "@/app/public/(pages)/league-details/[leagueId]/_components/player-stats/player-stats-tab";
import TeamStatsTab from "@/app/public/(pages)/league-details/[leagueId]/_components/team-stats/team-stats-tab";
import { getLeagueDetails } from "@/service/football/leagues/league.details.service";
import {
  getLeagueTopAssists,
  getLeagueTopScorers,
} from "@/service/football/leagues/league.rankings.service";
import { getLeagueStandings } from "@/service/football/leagues/league.standing.service";

type LeagueDetailsPageProps = {
  params: Promise<{
    leagueId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
    season?: string;
  }>;
};

export default async function page({
  params,
  searchParams,
}: LeagueDetailsPageProps) {
  const { leagueId } = await params;
  const queryParams = await searchParams;

  const activeTab = queryParams?.tab ?? "overview";

  const leagueDetails = await getLeagueDetails({ id: leagueId });

  const currentSeason =
    leagueDetails?.seasons.find((season) => season.current) ??
    leagueDetails?.seasons.at(-1);

  const selectedSeason =
    queryParams?.season ?? String(currentSeason?.year ?? "");

  const shouldFetchStandings =
    activeTab === "overview" || activeTab === "table";

  const [standings, topScorers, topAssists] = shouldFetchStandings
    ? await Promise.all([
        getLeagueStandings(leagueId, selectedSeason),
        activeTab === "overview"
          ? getLeagueTopScorers({ leagueId, season: selectedSeason, limit: 5 })
          : Promise.resolve([]),
        activeTab === "overview"
          ? getLeagueTopAssists({ leagueId, season: selectedSeason, limit: 5 })
          : Promise.resolve([]),
      ])
    : [[], [], []];

  return (
    <main>
      <div className="mx-auto">
        {leagueDetails && (
          <LeagueDetailsHeader
            league={leagueDetails}
            selectedSeason={selectedSeason}
          />
        )}

        <LeagueDetailsTabs />

        {activeTab === "overview" && (
          <OverviewTab
            standings={standings}
            topScorers={topScorers}
            topAssists={topAssists}
          />
        )}

        {activeTab === "table" && <TableTab standings={standings} />}
        {activeTab === "fixtures" && <FixturesTab />}
        {activeTab === "player-stats" && <PlayerStatsTab />}
        {activeTab === "team-stats" && <TeamStatsTab />}
      </div>
    </main>
  );
}