import LeagueDetailsHeader from "./_components/league-details-header";
import LeagueDetailsTabs from "./_components/league-details-tabs";
import FixturesTab from "./_components/fixtures/fixtures-tab";
import OverviewTab from "./_components/overview/overview-tab";
import PlayerStatsTab from "./_components/player-stats/player-stats-tab";
import TableTab from "./_components/table/table.tab";
import TeamStatsTab from "./_components/team-stats/team-stats-tab";

import {
  DEFAULT_PLAYER_STATS_LIMIT,
  PLAYER_STATS_CATEGORIES,
  PLAYER_STATS_END_CHECK_OFFSET,
} from "@/app/public/(pages)/league-details/_utils/player-stats.utils";
import { getLeagueFixtures } from "@/service/football/fixtures/league.fixtures.service";
import { getLeagueDetails } from "@/service/football/leagues/league.details.service";
import { getLeaguePlayerStats } from "@/service/football/leagues/league.player-stats.service";
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
    !Number.isInteger(parsedLimit) ||
    parsedLimit < DEFAULT_PLAYER_STATS_LIMIT
  ) {
    return DEFAULT_PLAYER_STATS_LIMIT;
  }

  return parsedLimit;
};

export default async function Page({
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

  const playerRankingRequestLimit =
    activeTab === "player-stats"
      ? playerStatsLimit + PLAYER_STATS_END_CHECK_OFFSET
      : DEFAULT_PLAYER_STATS_LIMIT;

  const shouldFetchStandings =
    activeTab === "overview" || activeTab === "table";
  const shouldFetchFixtures = activeTab === "fixtures";
  const shouldFetchPlayerRankings =
    activeTab === "overview" || activeTab === "player-stats";
  const shouldFetchCategoryPlayerStats = activeTab === "player-stats";

  const categoryPlayerStatsPromise = shouldFetchCategoryPlayerStats
    ? Promise.all(
        PLAYER_STATS_CATEGORIES.map((category) =>
          getLeaguePlayerStats({
            leagueId,
            season: selectedSeason,
            category,
            page: 1,
            limit: playerRankingRequestLimit,
          }),
        ),
      )
    : Promise.resolve([]);

  const [standings, topScorers, topAssists, fixtureData, categoryPlayerStats] =
    await Promise.all([
      shouldFetchStandings
        ? getLeagueStandings(leagueId, selectedSeason)
        : Promise.resolve([]),

      shouldFetchPlayerRankings
        ? getLeagueTopScorers({
            leagueId,
            season: selectedSeason,
            limit: playerRankingRequestLimit,
          })
        : Promise.resolve([]),

      shouldFetchPlayerRankings
        ? getLeagueTopAssists({
            leagueId,
            season: selectedSeason,
            limit: playerRankingRequestLimit,
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

      categoryPlayerStatsPromise,
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
            categoryPlayerStats={categoryPlayerStats}
            playerStatsLimit={playerStatsLimit}
          />
        )}

        {activeTab === "team-stats" && <TeamStatsTab />}
      </div>
    </main>
  );
}
