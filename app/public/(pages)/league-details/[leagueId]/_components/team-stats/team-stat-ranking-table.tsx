import type { TeamStatItem } from "@/mock/league-details/league-team-stats.mock.types";

type TeamStatRankingTableProps = {
  teams: TeamStatItem[];
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

            <div className="flex min-w-0 items-center gap-3">
              <div className="size-12 shrink-0 rounded-full border border-secondary bg-white/30 dark:bg-[#111d1a]" />
              <h4 className="truncate text-sm font-bold text-[#10201B] dark:text-white">
                {team.name}
              </h4>
            </div>

            <span className="text-right text-sm font-bold text-[#10201B] dark:text-white">
              {team.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
