export interface FixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface FixtureTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface FixtureLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
  round: string | null;
  standings: boolean;
}

export interface FixtureGoals {
  home: number | null;
  away: number | null;
}

export interface LiveFixtureItem {
  fixture: {
    id: number;
    date: string;
    timestamp: number;
    status: FixtureStatus;
  };
  league: FixtureLeague;
  teams: {
    home: FixtureTeam;
    away: FixtureTeam;
  };
  goals: FixtureGoals;
}

export interface LiveFixturesData {
  get: string;
  parameters: {
    live: string;
  };
  errors: unknown[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: LiveFixtureItem[];
}

export interface LiveFixturesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LiveFixturesData;
  timestamp: string;
  path: string;
}
