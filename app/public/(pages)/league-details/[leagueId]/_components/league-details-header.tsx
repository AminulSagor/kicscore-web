import Image from "next/image";
import { ChevronDown } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import type { LeagueHeaderInfo } from "@/mock/league-details/league-details.mock.types";

type LeagueDetailsHeaderProps = {
  league: LeagueHeaderInfo;
};

export default function LeagueDetailsHeader({
  league,
}: LeagueDetailsHeaderProps) {
  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="relative size-20 overflow-hidden rounded-lg bg-[#18224A] sm:size-24">
          <Image
            src={league.logo}
            alt={league.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#10201B] dark:text-white sm:text-3xl">
            {league.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-[#6B7A75] dark:text-white/70">
            {league.country}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:pt-7">
        <button
          type="button"
          className="
            flex h-8 items-center gap-2 rounded-full border border-[#DDE8E3]
            px-4 text-sm font-semibold text-[#10201B]
            dark:border-white/20 dark:text-white
          "
        >
          {league.season}
          <ChevronDown size={14} />
        </button>

        <Button size="sm" rounded="full" className="h-8 px-5 font-bold">
          Follow
        </Button>
      </div>
    </section>
  );
}
