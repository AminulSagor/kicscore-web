import type { LeaguePlayerStatsCategory } from "@/types/football/leagues/league.player-stats.types";
import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";

export type PlayerStatId =
  | "top-scorers"
  | "top-assists"
  | `${LeaguePlayerStatsCategory}:${string}`;

export const DEFAULT_PLAYER_STATS_LIMIT = 5;
export const PLAYER_STATS_LIMIT_STEP = 5;
export const PLAYER_STATS_END_CHECK_OFFSET = 1;

export const PLAYER_STATS_CATEGORIES: LeaguePlayerStatsCategory[] = [
  "attack",
  "minutes",
  "defense",
  "goalkeeping",
  "discipline",
];

export interface PlayerStatViewData {
  id: PlayerStatId;
  title: string;
  players: LeagueRankingPlayer[];
}

interface GetPlayerStatByIdParams {
  statId: string | null;
  playerStats: PlayerStatViewData[];
}

//======= Get Player Stat By ID =======//
export const getPlayerStatById = ({
  statId,
  playerStats,
}: GetPlayerStatByIdParams): PlayerStatViewData => {
  const selectedStat = playerStats.find((stat) => stat.id === statId);

  if (selectedStat) {
    return selectedStat;
  }

  return (
    playerStats[0] ?? {
      id: "top-scorers",
      title: "Top Scorers",
      players: [],
    }
  );
};

//======= Get Player Stat Select Options =======//
export const getPlayerStatOptions = (playerStats: PlayerStatViewData[]) => {
  return playerStats.map((stat) => ({
    label: stat.title,
    value: stat.id,
  }));
};
