import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";

export type PlayerStatId = "top-scorers" | "top-assists";

export const DEFAULT_PLAYER_STATS_LIMIT = 5;
export const PLAYER_STATS_LIMIT_STEP = 5;

export interface PlayerStatViewData {
  id: PlayerStatId;
  title: string;
  players: LeagueRankingPlayer[];
}

interface GetPlayerStatByIdParams {
  statId: string | null;
  topScorers: LeagueRankingPlayer[];
  topAssists: LeagueRankingPlayer[];
}

export const PLAYER_STAT_OPTIONS: {
  label: string;
  value: PlayerStatId;
}[] = [
  {
    label: "Top Scorers",
    value: "top-scorers",
  },
  {
    label: "Top Assists",
    value: "top-assists",
  },
];

//======= Get Player Stat By ID =======//
export const getPlayerStatById = ({
  statId,
  topScorers,
  topAssists,
}: GetPlayerStatByIdParams): PlayerStatViewData => {
  if (statId === "top-assists") {
    return {
      id: "top-assists",
      title: "Top Assists",
      players: topAssists,
    };
  }

  return {
    id: "top-scorers",
    title: "Top Scorers",
    players: topScorers,
  };
};
