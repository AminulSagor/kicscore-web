export type MatchTabType = "ongoing" | "by-time";

export type MatchStatusGroup = "ALL" | "LIVE" | "FINISHED" | "SCHEDULED";

export interface GetMatchesParams {
  date: string;
  timezone?: string;
  page?: number;
  limit?: number;
  statusGroup?: MatchStatusGroup;
}

export interface MatchFixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface MatchFixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  status: MatchFixtureStatus;
}

export interface MatchLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
  round: string | null;
  standings: boolean;
}

export interface MatchTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface MatchGoals {
  home: number | null;
  away: number | null;
}

export interface MatchScorePeriod {
  home: number | null;
  away: number | null;
}

export interface MatchScore {
  halftime: MatchScorePeriod;
  fulltime: MatchScorePeriod;
  extratime: MatchScorePeriod;
  penalty: MatchScorePeriod;
}

export interface MatchFixtureItem {
  fixture: MatchFixture;
  league: MatchLeague;
  teams: {
    home: MatchTeam;
    away: MatchTeam;
  };
  goals: MatchGoals;
  score: MatchScore;
}

export interface GroupedLeagueMatches {
  league: MatchLeague;
  matchCount: number;
  fixtures: MatchFixtureItem[];
}

export interface GroupedMatchesData {
  date: string;
  timezone: string;
  items: GroupedLeagueMatches[];
}

export interface GroupedMatchesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GroupedMatchesData;
  timestamp: string;
  path: string;
}

export interface ByTimeMatchesData {
  date: string;
  timezone: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: MatchFixtureItem[];
}

export interface ByTimeMatchesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ByTimeMatchesData;
  timestamp: string;
  path: string;
}
