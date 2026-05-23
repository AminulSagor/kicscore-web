import type { LeagueRankingPlayer } from "./league.rankings";

export type LeaguePlayerStatsCategory =
  | "attack"
  | "minutes"
  | "defense"
  | "goalkeeping"
  | "discipline";

export interface LeaguePlayerStatsParams {
  leagueId: string;
  season: string;
  category: LeaguePlayerStatsCategory;
  page?: number;
  limit?: number;
}

export interface ApiLeaguePlayerStatsItem {
  rank: number;
  value: number;
  player: {
    id: number;
    name: string;
    photo: string | null;
  };
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
}

export interface ApiLeaguePlayerStatsSection {
  key: string;
  title: string;
  items: ApiLeaguePlayerStatsItem[];
}

export interface LeaguePlayerStatsMeta {
  page: number;
  limit: number;
}

export interface ApiLeaguePlayerStatsData {
  leagueId: string;
  season: string;
  category: LeaguePlayerStatsCategory;
  sections: ApiLeaguePlayerStatsSection[];
  meta: LeaguePlayerStatsMeta;
}

export interface LeaguePlayerStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiLeaguePlayerStatsData;
  timestamp: string;
  path: string;
}

export interface LeaguePlayerStatsSection {
  key: string;
  title: string;
  items: LeagueRankingPlayer[];
}

export interface LeaguePlayerStatsData {
  leagueId: string;
  season: string;
  category: LeaguePlayerStatsCategory;
  sections: LeaguePlayerStatsSection[];
  meta: LeaguePlayerStatsMeta;
}
