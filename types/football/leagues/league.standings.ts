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
}
