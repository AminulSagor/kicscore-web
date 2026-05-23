import type { LeaguePlayerStatsData } from "@/types/football/leagues/league.player-stats.types";
import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";

import type { PlayerStatId, PlayerStatViewData } from "./player-stats.utils";

type BuildPlayerStatViewDataParams = {
  topScorers: LeagueRankingPlayer[];
  topAssists: LeagueRankingPlayer[];
  categoryPlayerStats: LeaguePlayerStatsData[];
};

//======= Build Category Stat ID =======//
const buildCategoryStatId = (
  category: LeaguePlayerStatsData["category"],
  sectionKey: string,
): PlayerStatId => {
  return `${category}:${sectionKey}`;
};

//======= Build Player Stats View Data =======//
export const buildPlayerStatViewData = ({
  topScorers,
  topAssists,
  categoryPlayerStats,
}: BuildPlayerStatViewDataParams): PlayerStatViewData[] => {
  const rankingStats: PlayerStatViewData[] = [
    {
      id: "top-scorers",
      title: "Top Scorers",
      players: topScorers,
    },
    {
      id: "top-assists",
      title: "Top Assists",
      players: topAssists,
    },
  ];

  const additionalStats = categoryPlayerStats.flatMap((categoryStats) =>
    categoryStats.sections.map((section) => ({
      id: buildCategoryStatId(categoryStats.category, section.key),
      title: section.title,
      players: section.items,
    })),
  );

  return [...rankingStats, ...additionalStats];
};
