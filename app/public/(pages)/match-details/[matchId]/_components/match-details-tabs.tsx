"use client";

import { MatchDetailsTab } from "@/types/football/matches/match.details.tab";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

//tabs
export const matchDetailsTabs: { label: string; value: MatchDetailsTab }[] = [
  { label: "Facts", value: "facts" },
  { label: "Lineup", value: "lineup" },
  { label: "Stats", value: "stats" },
  { label: "Head-to-head", value: "head-to-head" },
];

//component
export default function MatchDetailsTabs() {
  const params = useParams<{ matchId: string }>();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "facts";

  return (
    <div className="mt-10 border-b border-[#DDE8E3] dark:border-white/10">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {matchDetailsTabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <Link
              key={tab.value}
              href={`/public/match-details/${params.matchId}?tab=${tab.value}`}
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
