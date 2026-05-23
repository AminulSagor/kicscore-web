import type { LeagueTeamStatsData } from "@/types/football/leagues/league.team-stats.types";

import type { TeamStatId, TeamStatViewData } from "./team-stats.utils";

type BuildTeamStatViewDataParams = {
  categoryTeamStats: LeagueTeamStatsData[];
};

//======= Build Category Team Stat ID =======//
const buildCategoryTeamStatId = (
  category: LeagueTeamStatsData["category"],
  sectionKey: string,
): TeamStatId => {
  return `${category}:${sectionKey}`;
};

//======= Build Team Stats View Data =======//
export const buildTeamStatViewData = ({
  categoryTeamStats,
}: BuildTeamStatViewDataParams): TeamStatViewData[] => {
  return categoryTeamStats.flatMap((categoryStats) =>
    categoryStats.sections.map((section) => ({
      id: buildCategoryTeamStatId(categoryStats.category, section.key),
      title: section.title,
      teams: section.items,
    })),
  );
};
