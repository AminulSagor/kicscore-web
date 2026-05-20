import serviceServer from "@/service/base/service.server";
import {
  ApiFootballRankingItem,
  LeagueRankingParams,
  LeagueRankingPlayer,
  LeagueRankingsResponse,
  LeagueRankingValueKey,
} from "@/types/football/leagues/league.rankings";

//======= Format Ranking Players =======//
const formatRankingPlayers = (
  players: ApiFootballRankingItem[],
  valueKey: LeagueRankingValueKey,
): LeagueRankingPlayer[] => {
  return players.map((item, index) => {
    const statistics = item.statistics[0];

    return {
      id: item.player.id,
      rank: index + 1,
      name: item.player.name,
      image: item.player.photo,
      teamName: statistics?.team.name ?? "Unknown Team",
      value:
        valueKey === "goals"
          ? (statistics?.goals.total ?? 0)
          : (statistics?.goals.assists ?? 0),
    };
  });
};

//======= Get Top Scorers =======//
export const getLeagueTopScorers = async ({
  leagueId,
  season,
  page = 1,
  limit = 5,
}: LeagueRankingParams): Promise<LeagueRankingPlayer[]> => {
  const response = await serviceServer.get<LeagueRankingsResponse>(
    `/football/players/top-scorers?league=${leagueId}&season=${season}&page=${page}&limit=${limit}`,
  );

  return formatRankingPlayers(response.data.data.response, "goals");
};

//======= Get Top Assists =======//
export const getLeagueTopAssists = async ({
  leagueId,
  season,
  page = 1,
  limit = 5,
}: LeagueRankingParams): Promise<LeagueRankingPlayer[]> => {
  const response = await serviceServer.get<LeagueRankingsResponse>(
    `/football/players/top-assists?league=${leagueId}&season=${season}&page=${page}&limit=${limit}`,
  );

  return formatRankingPlayers(response.data.data.response, "assists");
};
