import serviceServer from "@/service/base/service.server";
import { LeagueStandingTeam } from "@/types/football/leagues/league.standings";

//======= Get League Standings =======//
export const getLeagueStandings = async (
  leagueId: string,
  season: string,
): Promise<LeagueStandingTeam[]> => {
  const response = await serviceServer.get(
    `/football/standings?league=${leagueId}&season=${season}`,
  );

  const standings =
    response.data.data.response[0]?.league?.standings?.[0] ?? [];

  return standings.map((item: any) => ({
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
    form: item.form ? item.form.split("") : [],
  }));
};
