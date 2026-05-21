import {
  MatchFixtureInfo,
  MatchGoalsInfo,
  MatchLeagueInfo,
  MatchScoreInfo,
  MatchTeamsInfo,
} from "@/types/football/matches/match.details.types";

export type MatchHeadToHeadErrors = [] | Record<string, string | string[]>;

export interface MatchHeadToHeadApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MatchHeadToHeadData;
  timestamp: string;
  path: string;
}

export interface MatchHeadToHeadData {
  get: string;
  parameters: MatchHeadToHeadParameters;
  errors: MatchHeadToHeadErrors;
  results: number;
  paging: MatchHeadToHeadPaging;
  response: MatchHeadToHeadItem[];
}

export interface MatchHeadToHeadParameters {
  last: string;
  h2h: string;
}

export interface MatchHeadToHeadPaging {
  current: number;
  total: number;
}

export interface MatchHeadToHeadItem {
  fixture: MatchFixtureInfo;
  league: MatchLeagueInfo;
  teams: MatchTeamsInfo;
  goals: MatchGoalsInfo;
  score: MatchScoreInfo;
}

export interface MatchHeadToHeadParams {
  homeTeamId: number;
  awayTeamId: number;
  last?: number;
}
