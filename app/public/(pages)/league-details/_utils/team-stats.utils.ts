import type {
  LeagueTeamStatItem,
  LeagueTeamStatsCategory,
} from "@/types/football/leagues/league.team-stats.types";

export type TeamStatId = `${LeagueTeamStatsCategory}:${string}`;

export const DEFAULT_TEAM_STATS_LIMIT = 5;
export const TEAM_STATS_LIMIT_STEP = 5;
export const TEAM_STATS_END_CHECK_OFFSET = 1;

export const TEAM_STATS_CATEGORIES: LeagueTeamStatsCategory[] = [
  "topStats",
  "attack",
  "defense",
  "discipline",
];

export interface TeamStatViewData {
  id: TeamStatId;
  title: string;
  teams: LeagueTeamStatItem[];
}

interface GetTeamStatByIdParams {
  statId: string | null;
  teamStats: TeamStatViewData[];
}

//======= Get Team Stat By ID =======//
export const getTeamStatById = ({
  statId,
  teamStats,
}: GetTeamStatByIdParams): TeamStatViewData => {
  const selectedStat = teamStats.find((stat) => stat.id === statId);

  if (selectedStat) {
    return selectedStat;
  }

  return (
    teamStats[0] ?? {
      id: "topStats:goalsPerMatch",
      title: "Goals per Match",
      teams: [],
    }
  );
};

//======= Get Team Stat Select Options =======//
export const getTeamStatOptions = (teamStats: TeamStatViewData[]) => {
  return teamStats.map((stat) => ({
    label: stat.title,
    value: stat.id,
  }));
};
