export type H2HOverview = {
  homeTeam: string;
  awayTeam: string;
  homeWins: number;
  draws: number;
  awayWins: number;
};

export type H2HMatch = {
  id: string;
  date: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  winner?: "home" | "away";
};
