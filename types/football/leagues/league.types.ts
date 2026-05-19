export interface FootballLeague {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface FootballCountry {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface FootballLeagueSeason {
  year: number;
  start: string;
  end: string;
  current: boolean;
}

export interface FootballLeagueItem {
  league: FootballLeague;
  country: FootballCountry;
  seasons: FootballLeagueSeason[];
}

export interface FootballLeaguesData {
  get: string;
  parameters: {
    current?: string;
  };
  errors: unknown[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: FootballLeagueItem[];
}

export interface FootballLeaguesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: FootballLeaguesData;
  timestamp: string;
  path: string;
}
