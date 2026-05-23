"use client";

import { useSearchParams } from "next/navigation";

import {
  getPlayerStatById,
  type PlayerStatViewData,
} from "@/app/public/(pages)/league-details/_utils/player-stats.utils";
import { buildPlayerStatViewData } from "@/app/public/(pages)/league-details/_utils/player-stats.mapper.utils";
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

  const [topScorersStat, ...remainingStats] = visiblePlayerStats;

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-6">
      {topScorersStat && (
        <div className="lg:col-span-12">
          <PlayerStatCard
            title={topScorersStat.title}
            statId={topScorersStat.id}
            players={topScorersStat.players}
            layout="full"
          />
        </div>
      )}

      {remainingStats.map((stat) => (
        <div key={stat.id} className="lg:col-span-6">
          <PlayerStatCard
            title={stat.title}
            statId={stat.id}
            players={stat.players}
          />
        </div>
      ))}
    </div>
  );
}
