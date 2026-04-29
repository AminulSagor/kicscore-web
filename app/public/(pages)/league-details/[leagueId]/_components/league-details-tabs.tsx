"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import type { LeagueDetailsTab } from "@/mock/league-details/league-details.mock.types";

const leagueDetailsTabs: { label: string; value: LeagueDetailsTab }[] = [
  { label: "Overview", value: "overview" },
  { label: "Table", value: "table" },
  { label: "Fixtures", value: "fixtures" },
  { label: "Player stats", value: "player-stats" },
  { label: "Team stats", value: "team-stats" },
];

export default function LeagueDetailsTabs() {
  const params = useParams<{ leagueId: string }>();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "overview";

  return (
    <div className="mt-12 border-b border-[#DDE8E3] dark:border-white/10">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {leagueDetailsTabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <Link
              key={tab.value}
              href={`/public/league-details/${params.leagueId}?tab=${tab.value}`}
              className={`relative pb-3 text-sm font-semibold transition sm:text-base ${
                isActive
                  ? "text-[#10201B] dark:text-white"
                  : "text-[#6B7A75] hover:text-[#10201B] dark:text-white/45 dark:hover:text-white"
              }`}
            >
              {tab.label}

              {isActive && (
                <span className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-full bg-secondary" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
