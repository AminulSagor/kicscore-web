"use client";

import { useSearchParams } from "next/navigation";

import { playerStatsMockData } from "@/mock/league-details/league-player-stats.mock.data";
import PlayerStatCard from "./player-stat-card";
import PlayerStatDetails from "./player-stat-details";

function getCardClassName(layout: "full" | "half" | "third" | "quarter") {
  if (layout === "full") return "lg:col-span-12";
  if (layout === "half") return "lg:col-span-6";
  if (layout === "third") return "lg:col-span-4";
  return "lg:col-span-3";
}

export default function PlayerStatsTab() {
  const searchParams = useSearchParams();
  const selectedStat = searchParams.get("stat");

  if (selectedStat) {
    return <PlayerStatDetails />;
  }

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-6">
      {playerStatsMockData.map((stat) => (
        <div key={stat.id} className={getCardClassName(stat.layout)}>
          <PlayerStatCard stat={stat} />
        </div>
      ))}
    </div>
  );
}
