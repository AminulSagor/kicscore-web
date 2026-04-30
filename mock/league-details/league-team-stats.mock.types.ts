export type TeamStatItem = {
  id: string;
  rank: number;
  name: string;
  value: number;
};

export type TeamStatCategory = {
  id: string;
  title: string;
  layout: "full" | "half" | "third" | "quarter";
  teams: TeamStatItem[];
};
