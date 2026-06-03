export type SeasonHistoryItem = {
  season: number;
  winner: { id: string | null; name: string | null; logo: string | null };
  runnerUp: { id: string | null; name: string | null; logo: string | null };
  status: string;
};

export type SeasonHistoryResponse = {
  league: { id: string; name: string };
  seasons: SeasonHistoryItem[];
};
