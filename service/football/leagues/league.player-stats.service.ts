import serviceServer from "@/service/base/service.server";
import type {
  ApiLeaguePlayerStatsItem,
  LeaguePlayerStatsData,
  LeaguePlayerStatsParams,
  LeaguePlayerStatsResponse,
} from "@/types/football/leagues/league.player-stats.types";
import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";

//======= Format Player Stat Item =======//
const formatPlayerStatItem = (
  item: ApiLeaguePlayerStatsItem,
): LeagueRankingPlayer => {
  return {
    id: item.player.id,
    rank: item.rank,
    name: item.player.name,
    image: item.player.photo ?? "",
    teamName: item.team.name,
    value: item.value,
  };
};

//======= Get League Player Stats By Category =======//
export const getLeaguePlayerStats = async ({
  leagueId,
  season,
  category,
  page = 1,
  limit = 5,
}: LeaguePlayerStatsParams): Promise<LeaguePlayerStatsData> => {
  const response = await serviceServer.get<LeaguePlayerStatsResponse>(
    `/football/leagues/${leagueId}/player-stats?season=${season}&category=${category}&page=${page}&limit=${limit}`,
  );

  const playerStats = response.data.data;

  return {
    ...playerStats,
    sections: playerStats.sections.map((section) => ({
      key: section.key,
      title: section.title,
      items: section.items.map(formatPlayerStatItem),
    })),
  };
};
