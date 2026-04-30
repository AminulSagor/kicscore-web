"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

import type { TeamStatCategory } from "@/mock/league-details/league-team-stats.mock.types";

type TeamStatCardProps = {
  stat: TeamStatCategory;
};

export default function TeamStatCard({ stat }: TeamStatCardProps) {
  const params = useParams<{ leagueId: string }>();
  const href = `/public/league-details/${params.leagueId}?tab=team-stats&teamStat=${stat.id}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white dark:border-white/10 dark:bg-[#111d1a]">
      <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-[#25302B]">
        <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
          {stat.title}
        </h3>

        <Link href={href}>
          <ChevronRight size={18} className="text-[#6B7A75] dark:text-white" />
        </Link>
      </div>

      <div className="space-y-3 p-4">
        {stat.teams.map((team) => (
          <div
            key={team.id}
            className="flex items-center gap-4 rounded-2xl bg-[#EAF3EF] px-4 py-4 dark:bg-[#25302B]"
          >
            <span className="w-6 text-sm font-bold text-[#6B7A75] dark:text-white/45">
              {team.rank}.
            </span>

            <div className="size-12 shrink-0 rounded-full border border-secondary bg-white/30 dark:bg-[#111d1a]" />

            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-bold text-[#10201B] dark:text-white">
                {team.name}
              </h4>
            </div>

            <span className="text-base font-bold text-secondary">
              {team.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
