import Image from "next/image";

import type { RankingPlayer } from "@/mock/league-details/league-details.mock.types";

type RankingCardProps = {
  title: string;
  players: RankingPlayer[];
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
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-3 rounded-2xl bg-[#EAF3EF] px-4 py-3 dark:bg-[#25302B]"
          >
            <span className="w-5 text-sm font-bold text-[#6B7A75] dark:text-white/50">
              {player.rank}.
            </span>

            <div className="relative size-11 overflow-hidden rounded-full border border-secondary">
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
          </div>
        ))}
      </div>
    </div>
  );
}
