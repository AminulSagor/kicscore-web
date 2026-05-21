import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import type { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";
import { PlayerStatId } from "@/app/public/(pages)/league-details/_utils/player-stats.utils";

type PlayerStatCardProps = {
  title: string;
  statId: PlayerStatId;
  players: LeagueRankingPlayer[];
  layout?: "full" | "default";
};

export default function PlayerStatCard({
  title,
  statId,
  players,
  layout = "default",
}: PlayerStatCardProps) {
  const params = useParams<{ leagueId: string }>();
  const href = `/public/league-details/${params.leagueId}?tab=player-stats&stat=${statId}`;
  const visiblePlayers = players.slice(0, 3);

  const playerListClassName =
    layout === "full" ? "grid gap-3 p-4 lg:grid-cols-3" : "space-y-3 p-4";

  return (
    <div className="overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white dark:border-white/10 dark:bg-[#111d1a]">
      <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-[#25302B]">
        <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
          {title}
        </h3>

        <Link href={href}>
          <ChevronRight size={18} className="text-[#6B7A75] dark:text-white" />
        </Link>
      </div>

      <div className={playerListClassName}>
        {visiblePlayers.map((player) => (
          <Link
            href={`/public/player-details/${player.id}`}
            key={player.id}
            className="flex items-center gap-4 rounded-2xl bg-[#EAF3EF] px-4 py-4 transition hover:bg-[#DDE8E3] dark:bg-[#25302B] dark:hover:bg-white/10"
          >
            <span className="w-6 text-sm font-bold text-[#6B7A75] dark:text-white/45">
              {player.rank}.
            </span>

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

            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-bold text-[#10201B] dark:text-white">
                {player.name}
              </h4>
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7A75] dark:text-white/40">
                {player.teamName}
              </p>
            </div>

            <span className="text-base font-bold text-secondary">
              {player.value}
            </span>
          </Link>
        ))}

        {visiblePlayers.length === 0 && (
          <div className="rounded-2xl bg-[#EAF3EF] px-4 py-6 text-center text-sm font-semibold text-[#6B7A75] dark:bg-[#25302B] dark:text-white/45">
            No player stats available.
          </div>
        )}
      </div>
    </div>
  );
}
