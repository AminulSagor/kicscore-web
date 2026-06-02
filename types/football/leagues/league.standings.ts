export type StandingFormResult = "W" | "D" | "L";

export interface LeagueStandingTeam {
  position: number;
  teamId: number;
  teamName: string;
  teamLogo: string;
  shortName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: StandingFormResult[];
  group: string;
}

export type LeagueStandingGoals = {
  for: number;
  against: number;
};

export type LeagueStandingRecord = {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: LeagueStandingGoals;
};

export type LeagueStandingApiRow = {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string | null;
  status: string;
  description: string | null;
  all: LeagueStandingRecord;
  home: LeagueStandingRecord;
  away: LeagueStandingRecord;
  update: string;
};

export type LeagueStandingsResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    get: string;
    parameters: {
      league: string;
      season: string;
    };
    errors: unknown[] | Record<string, string>;
    results: number;
    paging: {
      current: number;
      total: number;
    };
    response: Array<{
      league: {
        id: number;
        name: string;
        country: string;
        logo: string;
        flag: string | null;
        season: number;
        standings: LeagueStandingApiRow[][];
      };
    }>;
    backendPaging: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  };
  timestamp: string;
  path: string;
};