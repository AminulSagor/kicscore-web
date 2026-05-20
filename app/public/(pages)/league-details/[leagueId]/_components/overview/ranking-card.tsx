import Image from "next/image";
import Link from "next/link";

import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";

type RankingCardProps = {
  title: string;
  players: LeagueRankingPlayer[];
};

export default function RankingCard({ title, players }: RankingCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white dark:border-white/10 dark:bg-[#111d1a]">
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-[#25302B]">
        <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
          {title}
        </h3>
      </div>

      <div className="space-y-3 p-4">
        {players.length > 0 ? (
          players.map((player) => (
            <Link
              key={player.id}
              href={`/public/player-details/${player.id}`}
              className="flex items-center gap-3 rounded-2xl bg-[#EAF3EF] px-4 py-3 transition hover:bg-[#DDE8E3] dark:bg-[#25302B] dark:hover:bg-white/10"
            >
              <span className="w-5 text-sm font-bold text-[#6B7A75] dark:text-white/50">
                {player.rank}.
              </span>

              <div className="relative size-11 overflow-hidden rounded-full">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-bold text-[#10201B] dark:text-white">
                  {player.name}
                </h4>
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7A75] dark:text-white/40">
                  {player.teamName}
                </p>
              </div>

              <span className="text-sm font-bold text-secondary">
                {player.value}
              </span>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl bg-[#EAF3EF] px-4 py-8 text-center dark:bg-[#25302B]">
            <p className="text-xs font-semibold text-[#6B7A75] dark:text-white/45">
              No data found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
