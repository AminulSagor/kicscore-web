export interface LeagueDetailsParams {
  id: string;
}

export interface LeagueSeasonCoverage {
  fixtures: {
    events: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
  };
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface LeagueSeason {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: LeagueSeasonCoverage;
}

export interface LeagueDetailsItem {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: LeagueSeason[];
}

export interface LeagueDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    response: LeagueDetailsItem[];
  };
}
