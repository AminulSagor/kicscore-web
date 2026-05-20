export interface LeagueRankingParams {
  leagueId: string;
  season: string;
  page?: number;
  limit?: number;
}

export interface LeagueRankingPlayer {
  id: number;
  rank: number;
  name: string;
  image: string;
  teamName: string;
  value: number;
}

interface ApiFootballRankingItem {
  player: {
    id: number;
    name: string;
    photo: string;
  };
  statistics: {
    team: {
      name: string;
    };
    goals: {
      total: number | null;
      assists: number | null;
    };
  }[];
}

export interface LeagueRankingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    response: ApiFootballRankingItem[];
  };
}

export type LeagueRankingValueKey = "goals" | "assists";

export type { ApiFootballRankingItem };
