export type FixtureViewMode = "date" | "round" | "team";

export type FixtureMatch = {
  id: string;
  status: "FT" | "LIVE" | "NS";
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  aggregateScore?: string;
  dateLabel: string;
};

export type FixtureGroup = {
  id: string;
  label: string;
  matches: FixtureMatch[];
};