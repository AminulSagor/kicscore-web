"use client";

import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";

import Button from "@/components/UI/buttons/button";
import CustomSelect from "@/components/UI/select/custom-select";
import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";
import {
  getPlayerStatById,
  PLAYER_STAT_OPTIONS,
  type PlayerStatId,
} from "@/app/public/(pages)/league-details/_utils/player-stats.utils";
import PlayerStatRankingTable from "./player-stat-ranking-table";

type PlayerStatDetailsProps = {
  selectedStatId: string | null;
  topScorers: LeagueRankingPlayer[];
  topAssists: LeagueRankingPlayer[];
};

export default function PlayerStatDetails({
  selectedStatId,
  topScorers,
  topAssists,
}: PlayerStatDetailsProps) {
  const params = useParams<{ leagueId: string }>();

  const selectedStat = getPlayerStatById({
    statId: selectedStatId,
    topScorers,
    topAssists,
  });

  const basePath = `/public/league-details/${params.leagueId}`;

  return (
    <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-white p-4 dark:border-white/10 dark:bg-[#111d1a] sm:p-5">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link href={`${basePath}?tab=player-stats`}>
          <button
            type="button"
            className="flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-[#DDE8E3] bg-transparent px-3 text-xs font-semibold text-[#10201B] transition hover:bg-[#EAF3EF] dark:border-white/15 dark:text-white dark:hover:bg-white/5"
          >
            <ChevronLeft size={15} />
            Back
          </button>
        </Link>

        <CustomSelect<PlayerStatId>
          value={selectedStat.id}
          options={PLAYER_STAT_OPTIONS}
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
