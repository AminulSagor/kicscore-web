export type LeagueTeamStatsCategory =
  | "topStats"
  | "attack"
  | "defense"
  | "discipline";

export interface LeagueTeamStatsParams {
  leagueId: string;
  season: string;
  category: LeagueTeamStatsCategory;
  page?: number;
  limit?: number;
}

export interface ApiLeagueTeamStatsItem {
  rank: number;
  value: number;
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
}

export interface ApiLeagueTeamStatsSection {
  key: string;
  title: string;
  items: ApiLeagueTeamStatsItem[];
}

export interface LeagueTeamStatsMeta {
  page: number;
  limit: number;
}

export interface ApiLeagueTeamStatsData {
  leagueId: string;
  season: string;
  category: LeagueTeamStatsCategory;
  sections: ApiLeagueTeamStatsSection[];
  meta: LeagueTeamStatsMeta;
}

export interface LeagueTeamStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiLeagueTeamStatsData;
  timestamp: string;
  path: string;
}

export interface LeagueTeamStatItem {
  id: number;
  rank: number;
  name: string;
  logo: string;
  value: number;
}

export interface LeagueTeamStatsSection {
  key: string;
  title: string;
  items: LeagueTeamStatItem[];
}

export interface LeagueTeamStatsData {
  leagueId: string;
  season: string;
  category: LeagueTeamStatsCategory;
  sections: LeagueTeamStatsSection[];
  meta: LeagueTeamStatsMeta;
}
