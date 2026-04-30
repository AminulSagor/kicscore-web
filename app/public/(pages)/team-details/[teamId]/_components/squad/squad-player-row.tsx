import Image from "next/image";
import type { TeamSquadMember } from "@/mock/team-details/team-squad.mock.types";

type Props = {
  player: TeamSquadMember;
  showNumber?: boolean;
};

export default function SquadPlayerRow({ player, showNumber = true }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#F3F7F5] px-4 py-4 dark:bg-dark-green">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-mint-green bg-white dark:bg-primary">
          <Image
            src={player.image}
            alt={player.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-base font-bold text-[#10201B] dark:text-white">
            {player.name}
          </h4>
          <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/45">
            <span className="mr-1">{player.flag}</span>
            {player.country}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-7">
        {showNumber && (
          <div className="text-center">
            <p className="text-xs uppercase text-[#6B7A75] dark:text-white/50">
              No
            </p>
            <p className="text-base font-bold text-secondary dark:text-mint-green">
              {player.number}
            </p>
          </div>
        )}

        <div className="text-center">
          <p className="text-xs uppercase text-[#6B7A75] dark:text-white/50">
            Age
          </p>
          <p className="text-base font-bold text-[#10201B] dark:text-white">
            {player.age}
          </p>
        </div>
      </div>
    </div>
  );
}
