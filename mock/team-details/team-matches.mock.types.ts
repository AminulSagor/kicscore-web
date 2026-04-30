export type TeamMatchBase = {
  id: string;
  date: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
};

export type PreviousMatch = TeamMatchBase & {
  score: string;
};

export type UpcomingMatch = TeamMatchBase & {
  time: string;
};
