export type PlayerStatItem = {
  id: string;
  rank: number;
  name: string;
  teamName: string;
  value: number;
};

export type PlayerStatCategory = {
  id: string;
  title: string;
  layout: "full" | "half" | "third" | "quarter";
  players: PlayerStatItem[];
};
