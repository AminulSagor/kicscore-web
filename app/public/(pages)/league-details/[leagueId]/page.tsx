import LeagueDetailsHeader from "./_components/league-details-header";
import LeagueDetailsTabs from "./_components/league-details-tabs";
import OverviewTab from "./_components/overview/overview-tab";
import TableTab from "@/app/public/(pages)/league-details/[leagueId]/_components/table/table.tab";
import FixturesTab from "@/app/public/(pages)/league-details/[leagueId]/_components/fixtures/fixtures-tab";
import PlayerStatsTab from "@/app/public/(pages)/league-details/[leagueId]/_components/player-stats/player-stats-tab";
import TeamStatsTab from "@/app/public/(pages)/league-details/[leagueId]/_components/team-stats/team-stats-tab";
import { getLeagueFixtures } from "@/service/football/fixtures/league.fixtures.service";
import { getLeagueDetails } from "@/service/football/leagues/league.details.service";
import {
  getLeagueTopAssists,
  getLeagueTopScorers,
} from "@/service/football/leagues/league.rankings.service";
import { getLeagueStandings } from "@/service/football/leagues/league.standing.service";
import { DEFAULT_PLAYER_STATS_LIMIT } from "@/app/public/(pages)/league-details/_utils/player-stats.utils";

type LeagueDetailsPageProps = {
  params: Promise<{
    leagueId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
    season?: string;
    fixturePage?: string;
    fixtureDate?: string;
    stat?: string;
    playerStatsLimit?: string;
  }>;
};

//======= Get Valid Player Stats Limit =======//
const getValidPlayerStatsLimit = (limit?: string) => {
  const parsedLimit = Number(limit);

  if (
    !Number.isFinite(parsedLimit) ||
    parsedLimit < DEFAULT_PLAYER_STATS_LIMIT
  ) {
    return DEFAULT_PLAYER_STATS_LIMIT;
  }

  return parsedLimit;
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

  const fixturePage = Number(queryParams?.fixturePage ?? 1);
  const fixtureDate = queryParams?.fixtureDate;
  const fixtureLimit = 20;

  const playerStatsLimit =
    activeTab === "player-stats"
      ? getValidPlayerStatsLimit(queryParams?.playerStatsLimit)
      : DEFAULT_PLAYER_STATS_LIMIT;

  const shouldFetchStandings =
    activeTab === "overview" || activeTab === "table";
  const shouldFetchFixtures = activeTab === "fixtures";
  const shouldFetchPlayerRankings =
    activeTab === "overview" || activeTab === "player-stats";

  const [standings, topScorers, topAssists, fixtureData] = await Promise.all([
    shouldFetchStandings
      ? getLeagueStandings(leagueId, selectedSeason)
      : Promise.resolve([]),

    shouldFetchPlayerRankings
      ? getLeagueTopScorers({
          leagueId,
          season: selectedSeason,
          limit: playerStatsLimit,
        })
      : Promise.resolve([]),

    shouldFetchPlayerRankings
      ? getLeagueTopAssists({
          leagueId,
          season: selectedSeason,
          limit: playerStatsLimit,
        })
      : Promise.resolve([]),

    shouldFetchFixtures
      ? getLeagueFixtures({
          leagueId,
          season: selectedSeason,
          page: fixturePage,
          limit: fixtureLimit,
          date: fixtureDate,
        })
      : Promise.resolve(null),
  ]);

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

        {activeTab === "fixtures" && (
          <FixturesTab
            fixtures={fixtureData?.response ?? []}
            pagination={fixtureData?.backendPaging}
            selectedSeason={selectedSeason}
          />
        )}

        {activeTab === "player-stats" && (
          <PlayerStatsTab
            topScorers={topScorers}
            topAssists={topAssists}
            playerStatsLimit={playerStatsLimit}
          />
        )}

        {activeTab === "team-stats" && <TeamStatsTab />}
      </div>
    </main>
  );
}
