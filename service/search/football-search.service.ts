import serviceClient from "@/service/base/service.client";
import type {
  ApiFootballSearchResponse,
  ApiLeagueSearchItem,
  ApiPlayerSearchItem,
  ApiTeamSearchItem,
  FootballSearchRequestParams,
  FootballSearchSourceData,
} from "@/types/search/football-search.types";

type SearchRequestParams = {
  query: string;
  signal?: AbortSignal;
};

//======= Search Players =======//
const searchPlayers = async ({
  query,
  signal,
}: SearchRequestParams): Promise<ApiPlayerSearchItem[]> => {
  const response = await serviceClient.get<
    ApiFootballSearchResponse<ApiPlayerSearchItem>
  >("/football/players/profiles", {
    params: {
      search: query,
    },
    signal,
  });

  return response.data.data.response;
};

//======= Search Leagues =======//
const searchLeagues = async ({
  query,
  signal,
}: SearchRequestParams): Promise<ApiLeagueSearchItem[]> => {
  const response = await serviceClient.get<
    ApiFootballSearchResponse<ApiLeagueSearchItem>
  >("/football/leagues", {
    params: {
      search: query,
    },
    signal,
  });

  return response.data.data.response;
};

//======= Search Teams =======//
const searchTeams = async ({
  query,
  signal,
}: SearchRequestParams): Promise<ApiTeamSearchItem[]> => {
  const response = await serviceClient.get<
    ApiFootballSearchResponse<ApiTeamSearchItem>
  >("/football/teams", {
    params: {
      search: query,
    },
    signal,
  });

  return response.data.data.response;
};

//======= Create Empty Search Source Data =======//
const createEmptySearchSourceData = (): FootballSearchSourceData => ({
  teams: [],
  leagues: [],
  players: [],
});

//======= Search Football Data =======//
export const searchFootballData = async ({
  query,
  category,
  signal,
}: FootballSearchRequestParams): Promise<FootballSearchSourceData> => {
  const emptySearchData = createEmptySearchSourceData();

  if (category === "players") {
    const players = await searchPlayers({ query, signal });

    return {
      ...emptySearchData,
      players,
    };
  }

  if (category === "leagues") {
    const leagues = await searchLeagues({ query, signal });

    return {
      ...emptySearchData,
      leagues,
    };
  }

  if (category === "teams") {
    const teams = await searchTeams({ query, signal });

    return {
      ...emptySearchData,
      teams,
    };
  }

  const [teams, leagues, players] = await Promise.all([
    searchTeams({ query, signal }),
    searchLeagues({ query, signal }),
    searchPlayers({ query, signal }),
  ]);

  return {
    teams,
    leagues,
    players,
  };
};
