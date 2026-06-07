"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import {
  DEFAULT_TEAM_STATS_LIMIT,
  type TeamStatId,
} from "@/app/public/(pages)/league-details/_utils/team-stats.utils";
import type { LeagueTeamStatItem } from "@/types/football/leagues/league.team-stats.types";

type TeamStatCardProps = {
  title: string;
  statId: TeamStatId;
  teams: LeagueTeamStatItem[];
};

export default function TeamStatCard({
  title,
  statId,
  teams,
}: TeamStatCardProps) {
  const params = useParams<{ leagueId: string }>();
  const searchParams = useSearchParams();

  const nextParams = new URLSearchParams(searchParams.toString());

  nextParams.set("tab", "team-stats");
  nextParams.set("teamStat", statId);
  nextParams.set("teamStatsLimit", String(DEFAULT_TEAM_STATS_LIMIT));

  const href = `/public/league-details/${params.leagueId}?${nextParams.toString()}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white dark:border-white/10 dark:bg-[#111d1a]">
      <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-[#25302B]">
        <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
          {title}
        </h3>

        <Link
          href={href}
          aria-label={`View ${title} details`}
          className="rounded-full p-1 transition hover:bg-black/5 dark:hover:bg-white/10"
        >
          <ChevronRight size={18} className="text-[#6B7A75] dark:text-white" />
        </Link>
      </div>

      <div className="space-y-3 p-4">
        {teams.map((team) => (
          <Link
            href={`/public/team-details/${team.id}`}
            key={team.id}
            className="flex items-center gap-4 rounded-2xl bg-[#EAF3EF] px-4 py-4 transition hover:bg-[#DDE8E3] dark:bg-[#25302B] dark:hover:bg-white/10"
          >
            <span className="w-6 text-sm font-bold text-[#6B7A75] dark:text-white/45">
              {team.rank}.
            </span>

            <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-secondary bg-white/30 dark:bg-[#111d1a]">
              {team.logo ? (
                <Image
                  src={team.logo}
                  alt={team?.name ?? "team"}
                  fill
                  sizes="48px"
                  className="object-contain p-1.5"
                  unoptimized
                />
              ) : (
                <span className="grid size-full place-items-center text-sm font-bold text-secondary">
                  {team?.name ? String(team.name).charAt(0) : "-"}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-bold text-[#10201B] dark:text-white">
                {team?.name ?? "Unknown Team"}
              </h4>
            </div>

            <span className="text-base font-bold text-secondary">
              {team.value}
            </span>
          </Link>
        ))}

        {teams.length === 0 && (
          <div className="py-5 text-center text-sm font-semibold text-[#6B7A75] dark:text-white/45">
            No team stats available.
          </div>
        )}
      </div>
    </div>
  );
}
