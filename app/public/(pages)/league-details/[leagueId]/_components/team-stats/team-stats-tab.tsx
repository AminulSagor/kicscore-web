"use client";

import { useSearchParams } from "next/navigation";

import { buildTeamStatViewData } from "@/app/public/(pages)/league-details/_utils/team-stats.mapper.utils";
import {
  getTeamStatById,
  type TeamStatViewData,
} from "@/app/public/(pages)/league-details/_utils/team-stats.utils";
import { getTeamStatCardLayoutClassName } from "@/app/public/(pages)/league-details/_utils/team-stats-layout.utils";
import type { LeagueTeamStatsData } from "@/types/football/leagues/league.team-stats.types";

import TeamStatCard from "./team-stat-card";
import TeamStatDetails from "./team-stat-details";

type TeamStatsTabProps = {
  categoryTeamStats: LeagueTeamStatsData[];
  teamStatsLimit: number;
};

export default function TeamStatsTab({
  categoryTeamStats,
  teamStatsLimit,
}: TeamStatsTabProps) {
  const searchParams = useSearchParams();
  const selectedStatId = searchParams.get("teamStat");

  const teamStats = buildTeamStatViewData({
    categoryTeamStats,
  });

  const visibleTeamStats: TeamStatViewData[] = teamStats.map((stat) => ({
    ...stat,
    teams: stat.teams.slice(0, teamStatsLimit),
  }));

  const selectedStat = getTeamStatById({
    statId: selectedStatId,
    teamStats,
  });

  const selectedStatHasMore = selectedStat.teams.length > teamStatsLimit;

  if (selectedStatId) {
    return (
      <TeamStatDetails
        selectedStatId={selectedStatId}
        teamStats={visibleTeamStats}
        teamStatsLimit={teamStatsLimit}
        hasMore={selectedStatHasMore}
      />
    );
  }

  return (
    <div className="mt-6 grid grid-cols-12 gap-5 lg:gap-6">
      {visibleTeamStats.map((stat) => (
        <div
          key={stat.id}
          className={getTeamStatCardLayoutClassName({
            statId: stat.id,
          })}
        >
          <TeamStatCard
            title={stat.title}
            statId={stat.id}
            teams={stat.teams}
          />
        </div>
      ))}
    </div>
  );
}
