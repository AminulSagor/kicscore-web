"use client";

import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import Button from "@/components/UI/buttons/button";
import CustomSelect from "@/components/UI/select/custom-select";
import { teamStatsMockData } from "@/mock/league-details/league-team-stats.mock.data";
import type { TeamStatCategory } from "@/mock/league-details/league-team-stats.mock.types";
import TeamStatRankingTable from "./team-stat-ranking-table";

type StatOption = TeamStatCategory["id"];

export default function TeamStatDetails() {
  const params = useParams<{ leagueId: string }>();
  const searchParams = useSearchParams();

  const selectedStatId =
    searchParams.get("teamStat") ?? teamStatsMockData[0]?.id ?? "";

  const selectedStat =
    teamStatsMockData.find((stat) => stat.id === selectedStatId) ??
    teamStatsMockData[0];

  const options = teamStatsMockData.map((stat) => ({
    label: stat.title,
    value: stat.id,
  }));

  const basePath = `/public/league-details/${params.leagueId}`;

  return (
    <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-white p-4 dark:border-white/10 dark:bg-[#111d1a] sm:p-5">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link href={`${basePath}?tab=team-stats`}>
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 cursor-pointer rounded-full border border-[#DDE8E3] bg-transparent px-3 text-xs font-semibold text-[#10201B] transition hover:bg-[#EAF3EF] dark:border-white/15 dark:text-white dark:hover:bg-white/5"
          >
            <ChevronLeft size={15} />
            Back
          </button>
        </Link>

        <CustomSelect<StatOption>
          value={selectedStat.id}
          options={options}
          onChange={(value) => {
            window.history.pushState(
              null,
              "",
              `${basePath}?tab=team-stats&teamStat=${value}`,
            );
          }}
        />
      </div>

      <TeamStatRankingTable teams={selectedStat.teams} />

      <div className="mt-6 flex justify-center">
        <Button rounded="lg" size="base" className="h-9 px-5 text-sm font-bold">
          Load More
          <ChevronDown size={16} />
        </Button>
      </div>
    </div>
  );
}
