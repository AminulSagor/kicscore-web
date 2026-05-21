import Image from "next/image";

import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";

type PlayerStatRankingTableProps = {
  players: LeagueRankingPlayer[];
};

export default function PlayerStatRankingTable({
  players,
}: PlayerStatRankingTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#EAF3EF] dark:bg-[#25302B]">
      <div className="grid grid-cols-[48px_minmax(0,1fr)_80px] px-4 py-3 text-xs font-bold uppercase text-[#6B7A75] dark:text-white/35">
        <span>#</span>
        <span>Player</span>
        <span className="text-right">Stats</span>
      </div>

      <div className="divide-y divide-[#DDE8E3] dark:divide-white/10">
        {players.map((player) => (
          <div
            key={player.id}
            className="grid grid-cols-[48px_minmax(0,1fr)_80px] items-center px-4 py-4"
          >
            <span className="text-sm font-bold text-[#6B7A75] dark:text-white/70">
              {player.rank}
            </span>

            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-secondary bg-white/30 dark:bg-[#111d1a]">
                {player.image ? (
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="grid size-full place-items-center text-sm font-bold text-secondary">
                    {player.name.charAt(0)}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-[#10201B] dark:text-white">
                  {player.name}
                </h4>
                <p className="truncate text-xs text-[#6B7A75] dark:text-white/45">
                  {player.teamName}
                </p>
              </div>
            </div>

            <span className="text-right text-sm font-bold text-[#10201B] dark:text-white">
              {player.value}
            </span>
          </div>
        ))}

        {players.length === 0 && (
          <div className="px-4 py-8 text-center text-sm font-semibold text-[#6B7A75] dark:text-white/45">
            No player stats available.
          </div>
        )}
      </div>
    </div>
  );
}
