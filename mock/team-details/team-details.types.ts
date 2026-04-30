export type TeamDetailsTabValue =
  | "overview"
  | "table"
  | "matches"
  | "squad"
  | "trophies";

export type TeamDetailsTabItem = {
  label: string;
  value: TeamDetailsTabValue;
};
