import serviceServer from "@/service/base/service.server";
import type {
  ApiLeagueTeamStatsItem,
  LeagueTeamStatItem,
  LeagueTeamStatsData,
  LeagueTeamStatsParams,
  LeagueTeamStatsResponse,
} from "@/types/football/leagues/league.team-stats.types";

//======= Format Team Stat Item =======//
const formatTeamStatItem = (
  item: ApiLeagueTeamStatsItem,
): LeagueTeamStatItem => {
  return {
    id: item.team.id,
    rank: item.rank,
    name: item.team.name,
    logo: item.team.logo ?? "",
    value: item.value,
  };
};

//======= Get League Team Stats By Category =======//
export const getLeagueTeamStats = async ({
  leagueId,
  season,
  category,
  page = 1,
  limit = 5,
}: LeagueTeamStatsParams): Promise<LeagueTeamStatsData> => {
  const response = await serviceServer.get<LeagueTeamStatsResponse>(
    `/football/leagues/${leagueId}/team-stats?season=${season}&category=${category}&page=${page}&limit=${limit}`,
  );

  const teamStats = response.data.data;

  return {
    ...teamStats,
    sections: teamStats.sections.map((section) => ({
      key: section.key,
      title: section.title,
      items: section.items.map(formatTeamStatItem),
    })),
  };
};
