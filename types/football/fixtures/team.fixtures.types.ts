export interface TeamFixturePeriod {
  first: number | null;
  second: number | null;
}

export interface TeamFixtureVenue {
  id: number | null;
  name: string | null;
  city: string | null;
}

export interface TeamFixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface TeamFixtureDetails {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: TeamFixturePeriod;
  venue: TeamFixtureVenue;
  status: TeamFixtureStatus;
}

export interface TeamFixtureLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
  round: string;
  standings: boolean;
}

export interface TeamFixtureParticipant {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface TeamFixtureTeams {
  home: TeamFixtureParticipant;
  away: TeamFixtureParticipant;
}

export interface TeamFixtureGoals {
  home: number | null;
  away: number | null;
}

export interface TeamFixtureScoreValue {
  home: number | null;
  away: number | null;
}

export interface TeamFixtureScore {
  halftime: TeamFixtureScoreValue;
  fulltime: TeamFixtureScoreValue;
  extratime: TeamFixtureScoreValue;
  penalty: TeamFixtureScoreValue;
}

export interface TeamFixtureItem {
  fixture: TeamFixtureDetails;
  league: TeamFixtureLeague;
  teams: TeamFixtureTeams;
  goals: TeamFixtureGoals;
  score: TeamFixtureScore;
}

export interface TeamFixturesData {
  get: string;
  parameters: {
    team?: string;
    next?: string;
    last?: string;
  };
  errors: unknown[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: TeamFixtureItem[];
}

export interface TeamFixturesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TeamFixturesData;
  timestamp: string;
  path: string;
}

export type TeamMatchBase = {
  id: string;
  date: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  competition: string;
};

export type TeamPreviousMatch = TeamMatchBase & {
  score: string;
};

export type TeamUpcomingMatch = TeamMatchBase & {
  time: string;
};