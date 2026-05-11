export interface MatchMock {
  id: string;
  status: "LIVE" | "FT" | string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  aggregate: string;
}

export interface MatchGroupMock {
  id: string;
  leagueName: string;
  leagueIcon: string;
  matches: MatchMock[];
}
