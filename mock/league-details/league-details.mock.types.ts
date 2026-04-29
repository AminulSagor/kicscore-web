export type LeagueDetailsTab =
  | "overview"
  | "table"
  | "fixtures"
  | "player-stats"
  | "team-stats";

export type LeagueHeaderInfo = {
  id: string;
  name: string;
  country: string;
  logo: string;
  season: string;
  isFollowed: boolean;
};

export type StandingForm = "W" | "D" | "L";

export type StandingTeam = {
  position: number;
  teamName: string;
  shortName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: readonly StandingForm[];
};

export type RankingPlayer = {
  id: string;
  rank: number;
  name: string;
  teamName: string;
  image: string;
  value: number;
};

export type TeamOfWeekPlayer = {
  id: string;
  name: string;
  image: string;
  positionClassName: string;
};

export type TeamOfWeek = {
  teamName: string;
  round: string;
  players: TeamOfWeekPlayer[];
};
