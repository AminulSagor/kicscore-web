export type SearchCategory = "all" | "teams" | "leagues" | "players";

export type SearchResultCategory = Exclude<SearchCategory, "all">;

export interface FootballSearchRequestParams {
  query: string;
  category: SearchCategory;
  signal?: AbortSignal;
}

export interface ApiFootballSearchResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    get: string;
    parameters: {
      search: string;
    };
    errors: unknown[];
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response: T[];
  };
  timestamp?: string;
  path?: string;
}

export interface ApiLeagueSearchItem {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string | null;
  };
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
}

export interface ApiTeamSearchItem {
  team: {
    id: number;
    name: string;
    code: string | null;
    country: string | null;
    founded: number | null;
    national: boolean;
    logo: string | null;
  };
}

export interface ApiPlayerSearchItem {
  player: {
    id: number;
    name: string;
    firstname: string | null;
    lastname: string | null;
    nationality: string | null;
    position: string | null;
    photo: string | null;
  };
}

export interface FootballSearchSourceData {
  teams: ApiTeamSearchItem[];
  leagues: ApiLeagueSearchItem[];
  players: ApiPlayerSearchItem[];
}

export interface FootballSearchResult {
  id: number;
  category: SearchResultCategory;
  name: string;
  subtitle: string;
  image: string | null;
  href: string;
}
