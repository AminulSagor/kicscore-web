"use client";

import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
  getPlayerStatById,
  getPlayerStatOptions,
  PLAYER_STATS_LIMIT_STEP,
  type PlayerStatId,
  type PlayerStatViewData,
} from "@/app/public/(pages)/league-details/_utils/player-stats.utils";
import Button from "@/components/UI/buttons/button";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import CustomSelect from "@/components/UI/select/custom-select";

import PlayerStatRankingTable from "./player-stat-ranking-table";

type PlayerStatDetailsProps = {
  selectedStatId: string | null;
  playerStats: PlayerStatViewData[];
  playerStatsLimit: number;
  hasMore: boolean;
};

export default function PlayerStatDetails({
  selectedStatId,
  playerStats,
  playerStatsLimit,
  hasMore,
}: PlayerStatDetailsProps) {
  const router = useRouter();
  const params = useParams<{ leagueId: string }>();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedStat = getPlayerStatById({
    statId: selectedStatId,
    playerStats,
  });

  const playerStatOptions = getPlayerStatOptions(playerStats);
  const basePath = `/public/league-details/${params.leagueId}`;

  //======= Build Player Stats URL =======//
  const buildPlayerStatsUrl = ({
    statId,
    limit,
    removeStat = false,
  }: {
    statId?: PlayerStatId;
    limit?: number;
    removeStat?: boolean;
  }) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    nextParams.set("tab", "player-stats");

    if (removeStat) {
      nextParams.delete("stat");
      nextParams.delete("playerStatsLimit");
    }

    if (statId) {
      nextParams.set("stat", statId);
      nextParams.set("playerStatsLimit", String(limit ?? playerStatsLimit));
    }

    if (limit && !removeStat) {
      nextParams.set("playerStatsLimit", String(limit));
    }

    return `${basePath}?${nextParams.toString()}`;
  };

  //======= Handle Stat Change =======//
  const handleStatChange = (value: PlayerStatId) => {
    startTransition(() => {
      router.push(
        buildPlayerStatsUrl({
          statId: value,
          limit: PLAYER_STATS_LIMIT_STEP,
        }),
      );
    });
  };

  //======= Handle Load More =======//
  const handleLoadMore = () => {
    startTransition(() => {
      router.push(
        buildPlayerStatsUrl({
          statId: selectedStat.id,
          limit: playerStatsLimit + PLAYER_STATS_LIMIT_STEP,
        }),
      );
    });
  };

  const backHref = buildPlayerStatsUrl({ removeStat: true });
  const canLoadMore = selectedStat.players.length >= playerStatsLimit;

  return (
    <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-white p-4 dark:border-white/10 dark:bg-[#111d1a] sm:p-5">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link href={backHref}>
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
          options={playerStatOptions}
          onChange={handleStatChange}
        />
      </div>

      <PlayerStatRankingTable players={selectedStat.players} />

      {canLoadMore && (
        <div className="mt-6 flex justify-center">
          <div className="group relative">
            <Button
              rounded="lg"
              size="base"
              disabled={isPending || !hasMore}
              onClick={handleLoadMore}
              className="h-9 px-5 text-sm font-bold"
            >
              {isPending ? <ButtonLoader /> : "Load More"}
              <ChevronDown size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
