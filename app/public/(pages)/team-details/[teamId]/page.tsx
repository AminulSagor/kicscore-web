import { notFound } from "next/navigation";

import TeamDetailsHeader from "./_components/team-details-header";
import TeamDetailsTabs from "./_components/team-details-tabs";
import TeamOverviewTab from "./_components/overview/team-overview-tab";

import TeamMatchesTab from "@/app/public/(pages)/team-details/[teamId]/_components/matches/team-matches-tab";
import TeamSquadTab from "@/app/public/(pages)/team-details/[teamId]/_components/squad/team-squad-tab";
import TableTab from "@/app/public/(pages)/team-details/[teamId]/_components/table/table.tab";
import TeamTrophiesTab from "@/app/public/(pages)/team-details/[teamId]/_components/trophies/team-trophies-tab";
import {
  getPositiveInteger,
  getTeamSeason,
  getTeamTrophySeasonRange,
} from "@/app/public/(pages)/team-details/[teamId]/_utils/team-details-query.utils";
import {
  mapTeamPreviousMatches,
  mapTeamUpcomingMatches,
} from "@/app/public/(pages)/team-details/[teamId]/_utils/team-matches.utils";
import {
  mapCurrentTeamCoach,
  mapTeamSquadGroups,
} from "@/app/public/(pages)/team-details/[teamId]/_utils/team-squad.utils";
import { mapTeamTrophies } from "@/app/public/(pages)/team-details/[teamId]/_utils/team-trophies.utils";
import {
  getTeamLastFixtures,
  getTeamUpcomingFixtures,
} from "@/service/football/fixtures/team.fixtures.service";
import { getLeagueStandings } from "@/service/football/leagues/league.standing.service";
import { getTeamAbout } from "@/service/football/teams/team.about.service";
import { getTeamDetails } from "@/service/football/teams/team.details.service";
import { getTeamLeagues } from "@/service/football/teams/team.leagues.service";
import {
  getTeamCoaches,
  getTeamPlayers,
} from "@/service/football/teams/team.squad.service";
import { getTeamTrophiesPreview } from "@/service/football/teams/team.trophies.service";
import type {
  TeamPreviousMatch,
  TeamUpcomingMatch,
} from "@/types/football/fixtures/team.fixtures.types";
import type { LeagueStandingTeam } from "@/types/football/leagues/league.standings";
import type { TeamLeagueItem } from "@/types/football/teams/team.leagues.types";
import type {
  TeamSquadGroup,
  TeamSquadMember,
} from "@/types/football/teams/team.squad.types";
import type { TeamTrophy } from "@/types/football/teams/team.trophies.types";

type Props = {
  params: Promise<{
    teamId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
    season?: string;
    squadPage?: string;
    squadLimit?: string;
    fromSeason?: string;
    toSeason?: string;
  }>;
};

const OVERVIEW_UPCOMING_LIMIT = 2;
const OVERVIEW_LAST_LIMIT = 6;
const MATCHES_FIXTURE_LIMIT = 15;
const DEFAULT_API_PAGE = 1;
const DEFAULT_API_LIMIT = 20;
const DEFAULT_TROPHY_LIMIT = 4;

export default async function TeamDetailsPage({ params, searchParams }: Props) {
  const routeParams = await params;
  const queryParams = searchParams ? await searchParams : {};
  const teamId = routeParams.teamId;
  const activeTab = queryParams.tab ?? "overview";

  const isOverviewTab = activeTab === "overview";
  const isTableTab = activeTab === "table";
  const isMatchesTab = activeTab === "matches";
  const isSquadTab = activeTab === "squad";
  const isTrophiesTab = activeTab === "trophies";

  const season = getTeamSeason(queryParams.season);
  const { fromSeason, toSeason } = getTeamTrophySeasonRange(
    season,
    queryParams.fromSeason,
    queryParams.toSeason,
  );

  const upcomingLimit = isOverviewTab
    ? OVERVIEW_UPCOMING_LIMIT
    : MATCHES_FIXTURE_LIMIT;

  const lastLimit = isOverviewTab
    ? OVERVIEW_LAST_LIMIT
    : MATCHES_FIXTURE_LIMIT;

  const teamDetailsPromise = getTeamDetails(teamId);

  const upcomingFixturesPromise =
    isOverviewTab || isMatchesTab
      ? getTeamUpcomingFixtures(teamId, upcomingLimit)
      : Promise.resolve(null);

  const lastFixturesPromise =
    isOverviewTab || isMatchesTab
      ? getTeamLastFixtures(teamId, lastLimit)
      : Promise.resolve(null);

  const aboutPromise = isOverviewTab
    ? getTeamAbout(teamId)
    : Promise.resolve(null);

  const leaguesPromise =
    isOverviewTab || isTableTab
      ? getTeamLeagues({
        teamId,
        season,
        page: DEFAULT_API_PAGE,
        limit: DEFAULT_API_LIMIT,
      })
      : Promise.resolve(null);

  const coachesPromise = isSquadTab
    ? getTeamCoaches({
      teamId,
      page: getPositiveInteger(queryParams.squadPage, DEFAULT_API_PAGE),
      limit: getPositiveInteger(queryParams.squadLimit, DEFAULT_API_LIMIT),
    })
    : Promise.resolve(null);

  const playersPromise = isSquadTab
    ? getTeamPlayers({
      teamId,
      season,
      page: getPositiveInteger(queryParams.squadPage, DEFAULT_API_PAGE),
      limit: getPositiveInteger(queryParams.squadLimit, DEFAULT_API_LIMIT),
    })
    : Promise.resolve(null);

  const trophiesPromise = isTrophiesTab
    ? getTeamTrophiesPreview({
      teamId,
      fromSeason,
      toSeason,
      page: DEFAULT_API_PAGE,
      limit: DEFAULT_TROPHY_LIMIT,
    })
    : Promise.resolve(null);

  const [
    teamDetailsResponse,
    upcomingFixturesResponse,
    lastFixturesResponse,
    aboutResponse,
    leaguesResponse,
    coachesResponse,
    playersResponse,
    trophiesResponse,
  ] = await Promise.all([
    teamDetailsPromise,
    upcomingFixturesPromise,
    lastFixturesPromise,
    aboutPromise,
    leaguesPromise,
    coachesPromise,
    playersPromise,
    trophiesPromise,
  ]);

  const teamDetails = teamDetailsResponse.data.response[0];

  if (!teamDetails) {
    notFound();
  }

  const upcomingFixtures = upcomingFixturesResponse?.data.response ?? [];
  const lastFixtures = lastFixturesResponse?.data.response ?? [];
  const aboutData = aboutResponse?.data.data ?? null;

  let previousMatches: TeamPreviousMatch[] = [];
  let upcomingMatches: TeamUpcomingMatch[] = [];
  let leagues: TeamLeagueItem[] = [];
  let standings: LeagueStandingTeam[] = [];
  let standingLeagueTitle = "Premier League";
  let coach: TeamSquadMember | null = null;
  let squadGroups: TeamSquadGroup[] = [];
  let trophies: TeamTrophy[] = [];

  if ((isOverviewTab || isTableTab) && leaguesResponse) {
    leagues = leaguesResponse.data.response;

    const standingLeague =
      leagues.find((league) =>
        league.seasons.some((leagueSeason) => leagueSeason.coverage.standings),
      ) ?? null;

    if (standingLeague) {
      standingLeagueTitle = standingLeague.league.name;

      standings = await getLeagueStandings(
        String(standingLeague.league.id),
        season,
        {
          page: DEFAULT_API_PAGE,
          limit: DEFAULT_API_LIMIT,
        },
      );
    }
  }

  if (isMatchesTab) {
    previousMatches = mapTeamPreviousMatches(lastFixtures);
    upcomingMatches = mapTeamUpcomingMatches(upcomingFixtures);
  }

  if (isSquadTab) {
    coach = coachesResponse
      ? mapCurrentTeamCoach(coachesResponse.data.response, teamId)
      : null;

    squadGroups = playersResponse
      ? mapTeamSquadGroups(playersResponse.data.response, teamId)
      : [];
  }

  if (isTrophiesTab && trophiesResponse) {
    trophies = mapTeamTrophies(trophiesResponse.data.items);
  }

  return (
    <main>
      <TeamDetailsHeader
        teamId={String(teamDetails.team.id)}
        teamName={teamDetails.team.name}
        country={teamDetails.team.country}
        logo={teamDetails.team.logo}
        initialIsFollowing={teamDetailsResponse.data.follow.isFollowed}
      />

      <TeamDetailsTabs />

      {activeTab === "overview" && (
        <TeamOverviewTab
          teamDetails={teamDetails}
          upcomingFixtures={upcomingFixtures}
          lastFixtures={lastFixtures}
          aboutData={aboutData}
          leagues={leagues}
          standings={standings}
          standingLeagueTitle={standingLeagueTitle}
        />
      )}

      {activeTab === "table" && <TableTab teams={standings} />}

      {activeTab === "matches" && (
        <TeamMatchesTab
          previousMatches={previousMatches}
          upcomingMatches={upcomingMatches}
        />
      )}

      {activeTab === "squad" && (
        <TeamSquadTab coach={coach} squadGroups={squadGroups} />
      )}

      {activeTab === "trophies" && trophiesResponse && (
        <TeamTrophiesTab
          teamId={teamId}
          fromSeason={fromSeason}
          toSeason={toSeason}
          initialTrophies={trophies}
          initialMeta={trophiesResponse.data.meta}
        />
      )}
    </main>
  );
}