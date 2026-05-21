"use client";

import { useSearchParams } from "next/navigation";

import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";
import PlayerStatCard from "./player-stat-card";
import PlayerStatDetails from "./player-stat-details";

type PlayerStatsTabProps = {
  topScorers: LeagueRankingPlayer[];
  topAssists: LeagueRankingPlayer[];
  playerStatsLimit: number;
};

export default function PlayerStatsTab({
  topScorers,
  topAssists,
  playerStatsLimit,
}: PlayerStatsTabProps) {
  const searchParams = useSearchParams();
  const selectedStat = searchParams.get("stat");

  const visibleTopScorers = topScorers.slice(0, playerStatsLimit);
  const visibleTopAssists = topAssists.slice(0, playerStatsLimit);

  const hasMoreTopScorers = topScorers.length > playerStatsLimit;
  const hasMoreTopAssists = topAssists.length > playerStatsLimit;

  const selectedStatHasMore =
    selectedStat === "top-assists" ? hasMoreTopAssists : hasMoreTopScorers;

  if (selectedStat) {
    return (
      <PlayerStatDetails
        selectedStatId={selectedStat}
        topScorers={visibleTopScorers}
        topAssists={visibleTopAssists}
        playerStatsLimit={playerStatsLimit}
        hasMore={selectedStatHasMore}
      />
    );
  }

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-12">
        <PlayerStatCard
          title="Top Scorers"
          statId="top-scorers"
          players={visibleTopScorers}
          layout="full"
        />
      </div>

      <div className="lg:col-span-6">
        <PlayerStatCard
          title="Top Assists"
          statId="top-assists"
          players={visibleTopAssists}
        />
      </div>
    </div>
  );
}
