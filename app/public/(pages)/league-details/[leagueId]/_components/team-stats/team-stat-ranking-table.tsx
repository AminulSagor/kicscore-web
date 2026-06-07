import Image from "next/image";
import Link from "next/link";

import type { LeagueTeamStatItem } from "@/types/football/leagues/league.team-stats.types";

type TeamStatRankingTableProps = {
  teams: LeagueTeamStatItem[];
};

export default function TeamStatRankingTable({
  teams,
}: TeamStatRankingTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#EAF3EF] dark:bg-[#25302B]">
      <div className="grid grid-cols-[48px_minmax(0,1fr)_80px] px-4 py-3 text-xs font-bold uppercase text-[#6B7A75] dark:text-white/35">
        <span>#</span>
        <span>Team</span>
        <span className="text-right">Stats</span>
      </div>

      <div className="divide-y divide-[#DDE8E3] dark:divide-white/10">
        {teams.map((team) => (
          <div
            key={team.id}
            className="grid grid-cols-[48px_minmax(0,1fr)_80px] items-center px-4 py-4"
          >
            <span className="text-sm font-bold text-[#6B7A75] dark:text-white/70">
              {team.rank}
            </span>

            <Link
              href={`/public/team-details/${team.id}`}
              className="flex min-w-0 items-center gap-3"
            >
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

              <h4 className="truncate text-sm font-bold text-[#10201B] dark:text-white">
                {team?.name ?? "Unknown Team"}
              </h4>
            </Link>

            <span className="text-right text-sm font-bold text-[#10201B] dark:text-white">
              {team.value}
            </span>
          </div>
        ))}

        {teams.length === 0 && (
          <div className="px-4 py-8 text-center text-sm font-semibold text-[#6B7A75] dark:text-white/45">
            No team stats available.
          </div>
        )}
      </div>
    </div>
  );
}
