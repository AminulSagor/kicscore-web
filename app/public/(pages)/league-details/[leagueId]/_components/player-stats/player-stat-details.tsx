"use client";

import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import Button from "@/components/UI/buttons/button";
import CustomSelect from "@/components/UI/select/custom-select";
import { playerStatsMockData } from "@/mock/league-details/league-player-stats.mock.data";
import type { PlayerStatCategory } from "@/mock/league-details/league-player-stats.mock.types";
import PlayerStatRankingTable from "./player-stat-ranking-table";

type StatOption = PlayerStatCategory["id"];

export default function PlayerStatDetails() {
  const params = useParams<{ leagueId: string }>();
  const searchParams = useSearchParams();

  const selectedStatId =
    searchParams.get("stat") ?? playerStatsMockData[0]?.id ?? "";

  const selectedStat =
    playerStatsMockData.find((stat) => stat.id === selectedStatId) ??
    playerStatsMockData[0];

  const options = playerStatsMockData.map((stat) => ({
    label: stat.title,
    value: stat.id,
  }));

  const basePath = `/public/league-details/${params.leagueId}`;

  return (
    <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-white p-4 dark:border-white/10 dark:bg-[#111d1a] sm:p-5">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link href={`${basePath}?tab=player-stats`}>
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-full border border-[#DDE8E3] bg-transparent px-3 cursor-pointer text-xs font-semibold text-[#10201B] transition hover:bg-[#EAF3EF] dark:border-white/15 dark:text-white dark:hover:bg-white/5"
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
              `${basePath}?tab=player-stats&stat=${value}`,
            );
          }}
        />
      </div>

      <PlayerStatRankingTable players={selectedStat.players} />

      <div className="mt-6 flex justify-center">
        <Button rounded="lg" size="base" className="h-9 px-5 text-sm font-bold">
          Load More
          <ChevronDown size={16} />
        </Button>
      </div>
    </div>
  );
}
