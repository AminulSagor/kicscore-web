export type MatchStatRow = {
  id: string;
  label: string;
  home: number;
  away: number;
};

export type MatchStatsSection = {
  title: string;
  showPossession?: boolean;
  possession?: {
    home: number;
    away: number;
  };
  rows: MatchStatRow[];
};