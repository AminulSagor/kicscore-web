"use client";

import { useSearchParams } from "next/navigation";

import { buildPlayerStatViewData } from "@/app/public/(pages)/league-details/_utils/player-stats.mapper.utils";
import {
  getPlayerStatById,
  type PlayerStatViewData,
} from "@/app/public/(pages)/league-details/_utils/player-stats.utils";
import {
  getFirstMinutesStatId,
  getPlayerStatCardLayoutClassName,
} from "@/app/public/(pages)/league-details/_utils/player-stats-layout.utils";
import type { LeaguePlayerStatsData } from "@/types/football/leagues/league.player-stats.types";
import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";

import PlayerStatCard from "./player-stat-card";
import PlayerStatDetails from "./player-stat-details";

type PlayerStatsTabProps = {
  topScorers: LeagueRankingPlayer[];
  topAssists: LeagueRankingPlayer[];
  categoryPlayerStats: LeaguePlayerStatsData[];
  playerStatsLimit: number;
};

export default function PlayerStatsTab({
  topScorers,
  topAssists,
  categoryPlayerStats,
  playerStatsLimit,
}: PlayerStatsTabProps) {
  const searchParams = useSearchParams();
  const selectedStatId = searchParams.get("stat");

  const playerStats = buildPlayerStatViewData({
    topScorers,
    topAssists,
    categoryPlayerStats,
  });

  const visiblePlayerStats: PlayerStatViewData[] = playerStats.map((stat) => ({
    ...stat,
    players: stat.players.slice(0, playerStatsLimit),
  }));

  const selectedStat = getPlayerStatById({
    statId: selectedStatId,
    playerStats,
  });

  const selectedStatHasMore = selectedStat.players.length > playerStatsLimit;

  if (selectedStatId) {
    return (
      <PlayerStatDetails
        selectedStatId={selectedStatId}
        playerStats={visiblePlayerStats}
        playerStatsLimit={playerStatsLimit}
        hasMore={selectedStatHasMore}
      />
    );
  }

  const firstMinutesStatId = getFirstMinutesStatId(
    visiblePlayerStats.map((stat) => stat.id),
  );

  return (
    <div className="mt-6 grid grid-cols-12 gap-5 lg:gap-6">
      {visiblePlayerStats.map((stat) => (
        <div
          key={stat.id}
          className={getPlayerStatCardLayoutClassName({
            statId: stat.id,
            firstMinutesStatId,
          })}
        >
          <PlayerStatCard
            title={stat.title}
            statId={stat.id}
            players={stat.players}
            layout={stat.id === "top-scorers" ? "full" : "default"}
          />
        </div>
      ))}
    </div>
  );
}
