"use client";

import { useSearchParams } from "next/navigation";

import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";
import PlayerStatCard from "./player-stat-card";
import PlayerStatDetails from "./player-stat-details";

type PlayerStatsTabProps = {
  topScorers: LeagueRankingPlayer[];
  topAssists: LeagueRankingPlayer[];
};

export default function PlayerStatsTab({
  topScorers,
  topAssists,
}: PlayerStatsTabProps) {
  const searchParams = useSearchParams();
  const selectedStat = searchParams.get("stat");

  if (selectedStat) {
    return (
      <PlayerStatDetails
        selectedStatId={selectedStat}
        topScorers={topScorers}
        topAssists={topAssists}
      />
    );
  }

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-12">
        <PlayerStatCard
          title="Top Scorers"
          statId="top-scorers"
          players={topScorers}
          layout="full"
        />
      </div>

      <div className="lg:col-span-6">
        <PlayerStatCard
          title="Top Assists"
          statId="top-assists"
          players={topAssists}
        />
      </div>
    </div>
  );
}
