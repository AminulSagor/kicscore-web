"use client";

import { useSearchParams } from "next/navigation";

import { teamStatsMockData } from "@/mock/league-details/league-team-stats.mock.data";
import TeamStatCard from "./team-stat-card";
import TeamStatDetails from "./team-stat-details";

function getCardClassName(layout: "full" | "half" | "third" | "quarter") {
  if (layout === "full") return "lg:col-span-12";
  if (layout === "half") return "lg:col-span-6";
  if (layout === "third") return "lg:col-span-4";
  return "lg:col-span-3";
}

export default function TeamStatsTab() {
  const searchParams = useSearchParams();
  const selectedStat = searchParams.get("teamStat");

  if (selectedStat) {
    return <TeamStatDetails />;
  }

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-6">
      {teamStatsMockData.map((stat) => (
        <div key={stat.id} className={getCardClassName(stat.layout)}>
          <TeamStatCard stat={stat} />
        </div>
      ))}
    </div>
  );
}
