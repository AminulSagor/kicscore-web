import serviceServer from "@/service/base/service.server";
import type {
  LeagueStandingsResponse,
  LeagueStandingTeam,
  StandingFormResult,
} from "@/types/football/leagues/league.standings";

type GetLeagueStandingsOptions = {
  page?: number;
  limit?: number;
};

const isStandingFormResult = (
  result: string,
): result is StandingFormResult => {
  return result === "W" || result === "D" || result === "L";
};

//======= Get League Standings =======//
export const getLeagueStandings = async (
  leagueId: string,
  season: string,
  options?: GetLeagueStandingsOptions,
): Promise<LeagueStandingTeam[]> => {
  const response = await serviceServer.get<LeagueStandingsResponse>(
    "/football/standings",
    {
      params: {
        league: leagueId,
        season,
        page: options?.page,
        limit: options?.limit,
      },
    },
  );

  const standingsGroups =
    response.data.data.response[0]?.league.standings ?? [];

  return standingsGroups.flatMap((groupArray) =>
    groupArray.map((item) => ({
      position: item.rank,
      teamId: item.team.id,
      teamName: item.team.name,
      teamLogo: item.team.logo,
      shortName: item.team.name.slice(0, 1).toUpperCase(),
      played: item.all.played,
      won: item.all.win,
      drawn: item.all.draw,
      lost: item.all.lose,
      goalsFor: item.all.goals.for,
      goalsAgainst: item.all.goals.against,
      goalDifference: item.goalsDiff,
      points: item.points,
      form: item.form
        ? item.form.split("").filter(isStandingFormResult)
        : [],
      group: item.group,
    }))
  );
};