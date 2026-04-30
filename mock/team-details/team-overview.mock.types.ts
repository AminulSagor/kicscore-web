export type TeamOverviewMatch = {
  id: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  time: string;
  dateLabel: string;
};

export type TeamTopPlayer = {
  id: string;
  name: string;
  role: string;
  value: number;
  image: string;
};

export type TeamLastMatchResult = {
  id: string;
  homeLogo: string;
  awayLogo: string;
  score: string;
  status: "win" | "loss";
};

export type TeamLeague = {
  id: string;
  name: string;
  season: string;
  logo: string;
};

export type TeamRanking = {
  id: string;
  name: string;
  position: number;
  logo: string;
};

export type TeamStadium = {
  name: string;
  location: string;
  capacity: string;
  surface: string;
  opened: string;
};

export type TeamLeagueTableRow = {
  id: string;
  position: number;
  team: string;
  logo: string;
  played: number;
  form: string;
  goalDifference: number;
  points: number;
};
