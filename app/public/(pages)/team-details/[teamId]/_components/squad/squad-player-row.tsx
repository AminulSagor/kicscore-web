import Image from "next/image";
import Link from "next/link";

import type { TeamSquadMember } from "@/types/football/teams/team.squad.types";
import { getValidImage } from "@/utils/image/image.utils";

type Props = {
  player: TeamSquadMember;
  showNumber?: boolean;
};

export default function SquadPlayerRow({ player, showNumber = true }: Props) {
  return (
    <Link href={player.link} className="block w-full">
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#F3F7F5] px-4 py-4 dark:bg-dark-green">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-mint-green bg-white dark:bg-primary">
            <Image
              src={getValidImage(player.image)}
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

            <div className="mt-1 flex items-center gap-1.5 text-xs text-[#6B7A75] dark:text-white/45">
              {player.flag && (
                <Image
                  src={player.flag}
                  alt={`${player.country} flag`}
                  width={14}
                  height={10}
                  className="h-2.5 w-3.5 shrink-0 object-cover"
                />
              )}

              <span>{player.country}</span>
            </div>
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
    </Link>
  );
}
