import LeagueDetailsHeader from "./_components/league-details-header";
import LeagueDetailsTabs from "./_components/league-details-tabs";
import FixturesTab from "./_components/fixtures/fixtures-tab";
import OverviewTab from "./_components/overview/overview-tab";
import PlayerStatsTab from "./_components/player-stats/player-stats-tab";
import TableTab from "./_components/table/table.tab";
import TeamStatsTab from "./_components/team-stats/team-stats-tab";
import KnockoutTab from "./_components/knockout/knockout-tab";
import SeasonTab from "./_components/season/season-tab";

import {
  DEFAULT_PLAYER_STATS_LIMIT,
  PLAYER_STATS_CATEGORIES,
  PLAYER_STATS_END_CHECK_OFFSET,
} from "@/app/public/(pages)/league-details/_utils/player-stats.utils";
import {
  DEFAULT_TEAM_STATS_LIMIT,
  TEAM_STATS_CATEGORIES,
  TEAM_STATS_END_CHECK_OFFSET,
} from "@/app/public/(pages)/league-details/_utils/team-stats.utils";
import { getLeagueFixtures } from "@/service/football/fixtures/league.fixtures.service";
import { getLeagueDetails } from "@/service/football/leagues/league.details.service";
import type { LeagueDetailsItem } from "@/types/football/leagues/league.details";
import { getLeaguePlayerStats } from "@/service/football/leagues/league.player-stats.service";
import {
  getLeagueTopAssists,
  getLeagueTopScorers,
} from "@/service/football/leagues/league.rankings.service";
import { getLeagueStandings } from "@/service/football/leagues/league.standing.service";
import { getLeagueTeamStats } from "@/service/football/leagues/league.team-stats.service";

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
    teamStat?: string;
    teamStatsLimit?: string;
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

//======= Get Valid Team Stats Limit =======//
const getValidTeamStatsLimit = (limit?: string) => {
  const parsedLimit = Number(limit);

  if (
    !Number.isInteger(parsedLimit) ||
    parsedLimit < DEFAULT_TEAM_STATS_LIMIT
  ) {
    return DEFAULT_TEAM_STATS_LIMIT;
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

  let leagueDetails: LeagueDetailsItem | null = null;
  try {
    leagueDetails = await getLeagueDetails({ id: leagueId });
  } catch (err) {
    // Backend may timeout or be unavailable; proceed with null so UI can render
    // partial data and show fallbacks. Log for diagnostics.
    // eslint-disable-next-line no-console
    console.error("getLeagueDetails failed for leagueId:", leagueId, err);
    leagueDetails = null;
  }

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

  const teamStatsLimit =
    activeTab === "team-stats"
      ? getValidTeamStatsLimit(queryParams?.teamStatsLimit)
      : DEFAULT_TEAM_STATS_LIMIT;

  const teamStatsRequestLimit =
    activeTab === "team-stats"
      ? teamStatsLimit + TEAM_STATS_END_CHECK_OFFSET
      : DEFAULT_TEAM_STATS_LIMIT;

  const shouldFetchStandings =
    activeTab === "overview" || activeTab === "table";
  const shouldFetchFixtures = activeTab === "fixtures";
  const shouldFetchKnockout = activeTab === "knockout";
  const shouldFetchPlayerRankings =
    activeTab === "overview" || activeTab === "player-stats";
  const shouldFetchCategoryPlayerStats = activeTab === "player-stats";
  const shouldFetchCategoryTeamStats = activeTab === "team-stats";

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

  const categoryTeamStatsPromise = shouldFetchCategoryTeamStats
    ? Promise.all(
        TEAM_STATS_CATEGORIES.map((category) =>
          // Wrap each request so a single timeout/error doesn't reject the whole Promise.all
          (async () => {
            try {
              return await getLeagueTeamStats({
                leagueId,
                season: selectedSeason,
                category,
                page: 1,
                limit: teamStatsRequestLimit,
              });
            } catch (err) {
              // Return an empty safe shape so UI can render without data
              return {
                leagueId: leagueId,
                season: selectedSeason,
                category,
                sections: [],
                meta: { page: 1, limit: teamStatsRequestLimit },
              } as import("@/types/football/leagues/league.team-stats.types").LeagueTeamStatsData;
            }
          })(),
        ),
      )
    : Promise.resolve([]);

  const [
    standings,
    topScorers,
    topAssists,
    fixtureData,
    categoryPlayerStats,
    categoryTeamStats,
  ] = await Promise.all([
    shouldFetchStandings
      ? (async () => {
          try {
            return await getLeagueStandings(leagueId, selectedSeason);
          } catch (err) {
            return [];
          }
        })()
      : Promise.resolve([]),

    shouldFetchPlayerRankings
      ? (async () => {
          try {
            return await getLeagueTopScorers({
              leagueId,
              season: selectedSeason,
              limit: playerRankingRequestLimit,
            });
          } catch (err) {
            return [];
          }
        })()
      : Promise.resolve([]),

    shouldFetchPlayerRankings
      ? (async () => {
          try {
            return await getLeagueTopAssists({
              leagueId,
              season: selectedSeason,
              limit: playerRankingRequestLimit,
            });
          } catch (err) {
            return [];
          }
        })()
      : Promise.resolve([]),

    shouldFetchFixtures
      ? getLeagueFixtures({
          leagueId,
          season: selectedSeason,
          page: fixturePage,
          limit: fixtureLimit,
          date: fixtureDate,
        })
      : shouldFetchKnockout
      ? getLeagueFixtures({
          leagueId,
          season: selectedSeason,
          page: 1,
          limit: 500,
        })
      : Promise.resolve(null),

    categoryPlayerStatsPromise,

    categoryTeamStatsPromise,
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

        {activeTab === "knockout" && (
          <KnockoutTab fixtures={fixtureData?.response ?? []} />
        )}

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

        {activeTab === "team-stats" && (
          <TeamStatsTab
            categoryTeamStats={categoryTeamStats}
            teamStatsLimit={teamStatsLimit}
          />
        )}

        {activeTab === "season" && <SeasonTab seasons={leagueDetails?.seasons ?? []} activeSeason={selectedSeason} />}
      </div>
    </main>
  );
}
