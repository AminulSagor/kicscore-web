"use client";

import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
  getTeamStatById,
  getTeamStatOptions,
  TEAM_STATS_LIMIT_STEP,
  type TeamStatId,
  type TeamStatViewData,
} from "@/app/public/(pages)/league-details/_utils/team-stats.utils";
import Button from "@/components/UI/buttons/button";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import CustomSelect from "@/components/UI/select/custom-select";

import TeamStatRankingTable from "./team-stat-ranking-table";

type TeamStatDetailsProps = {
  selectedStatId: string | null;
  teamStats: TeamStatViewData[];
  teamStatsLimit: number;
  hasMore: boolean;
};

export default function TeamStatDetails({
  selectedStatId,
  teamStats,
  teamStatsLimit,
  hasMore,
}: TeamStatDetailsProps) {
  const router = useRouter();
  const params = useParams<{ leagueId: string }>();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedStat = getTeamStatById({
    statId: selectedStatId,
    teamStats,
  });

  const teamStatOptions = getTeamStatOptions(teamStats);
  const basePath = `/public/league-details/${params.leagueId}`;

  //======= Build Team Stats URL =======//
  const buildTeamStatsUrl = ({
    statId,
    limit,
    removeStat = false,
  }: {
    statId?: TeamStatId;
    limit?: number;
    removeStat?: boolean;
  }) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    nextParams.set("tab", "team-stats");

    if (removeStat) {
      nextParams.delete("teamStat");
      nextParams.delete("teamStatsLimit");
    }

    if (statId) {
      nextParams.set("teamStat", statId);
      nextParams.set("teamStatsLimit", String(limit ?? teamStatsLimit));
    }

    if (limit && !removeStat) {
      nextParams.set("teamStatsLimit", String(limit));
    }

    return `${basePath}?${nextParams.toString()}`;
  };

  //======= Handle Stat Change =======//
  const handleStatChange = (value: TeamStatId) => {
    startTransition(() => {
      router.push(
        buildTeamStatsUrl({
          statId: value,
          limit: TEAM_STATS_LIMIT_STEP,
        }),
      );
    });
  };

  //======= Handle Load More =======//
  const handleLoadMore = () => {
    startTransition(() => {
      router.push(
        buildTeamStatsUrl({
          statId: selectedStat.id,
          limit: teamStatsLimit + TEAM_STATS_LIMIT_STEP,
        }),
      );
    });
  };

  const backHref = buildTeamStatsUrl({ removeStat: true });
  const canLoadMore = selectedStat.teams.length >= teamStatsLimit;

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

        <CustomSelect<TeamStatId>
          value={selectedStat.id}
          options={teamStatOptions}
          onChange={handleStatChange}
        />
      </div>

      <TeamStatRankingTable teams={selectedStat.teams} />

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
